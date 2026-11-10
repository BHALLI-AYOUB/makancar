import json, pathlib, os
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'verification'
OUT.mkdir(parents=True, exist_ok=True)
_cached=list((pathlib.Path(os.environ.get('LOCALAPPDATA',''))/'ms-playwright').glob('chromium_headless_shell-*/chrome-headless-shell-win64/chrome-headless-shell.exe'))
EXE=os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE') or (str(_cached[-1]) if _cached else None)
def measure(page, url):
    page.add_init_script("""window.__perf={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__perf.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__perf.cls+=e.value}).observe({type:'layout-shift',buffered:true});""")
    page.goto(url, wait_until='networkidle', timeout=180000)
    page.wait_for_timeout(1200)
    return page.evaluate("""()=>({...window.__perf, fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,ttfb:performance.getEntriesByType('navigation')[0].responseStart, transferBytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0),jsBytes:performance.getEntriesByType('resource').filter(r=>r.name.includes('.js')).reduce((s,r)=>s+r.encodedBodySize,0),horizontalOverflow:document.documentElement.scrollWidth>innerWidth})""")
if __name__=='__main__':
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path=EXE)
        page=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
        samples=[]
        for _ in range(3):
            client=page.context.new_cdp_session(page)
            client.send('Network.enable')
            client.send('Network.setCacheDisabled',{'cacheDisabled':True})
            client.send('Emulation.setCPUThrottlingRate',{'rate':4})
            client.send('Network.emulateNetworkConditions',{'offline':False,'latency':150,'downloadThroughput':200000,'uploadThroughput':100000})
            samples.append(measure(page,'http://localhost:3100/en'))
        page.screenshot(path=str(OUT/'before-mobile.png'),full_page=True)
        page.set_viewport_size({'width':1440,'height':1000})
        page.goto('http://localhost:3100/en',wait_until='networkidle',timeout=180000)
        page.screenshot(path=str(OUT/'before-desktop.png'),full_page=True)
        (OUT/'performance-before.json').write_text(json.dumps({'mode':'Next.js development; warm compilation, disabled browser cache; 390x844; CPU 4x; 150ms latency; 1.6Mbps down; three samples','samples':samples},indent=2))
        browser.close()
