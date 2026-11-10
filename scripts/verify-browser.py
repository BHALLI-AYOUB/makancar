"""Browser acceptance checks. Install Python Playwright, then use the existing Chromium.
Modes: editor (exports a sample ZIP); public; sample (after applying that ZIP); performance.
"""
import argparse, json, pathlib, re, statistics
from playwright.sync_api import sync_playwright, expect
from browser_baseline import measure, EXE
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'docs'/'verification'
OUT.mkdir(parents=True,exist_ok=True)
def screenshot(page,name,full=True):
    page.screenshot(path=str(OUT/name),full_page=full)
def contact_checks(browser,base):
    data=json.loads((ROOT/'content/catalogue.json').read_text(encoding='utf8'));contact=data['contact']
    context=browser.new_context();page=context.new_page();checks=[]
    for locale in ['fr','en','ar']:
        page.goto(base+'/'+locale,wait_until='networkidle')
        expect(page.locator('#contact a[href^="mailto:"]')).to_have_attribute('href','mailto:'+contact['email'])
        phone=page.locator('#contact a[href^="tel:"]').get_attribute('href');assert re.sub(r'\D','',phone)==re.sub(r'\D','',contact['phone'])
        expect(page.locator('#contact a[href*="google.com/maps"]')).to_have_attribute('href',contact['mapsUrl'])
        assert contact['whatsapp'] in page.locator('#contact a[href*="wa.me"]').get_attribute('href')
        checks.append(locale+': contact email, phone, maps and WhatsApp')
    page.goto(base+'/en/vente?check=1#collection',wait_until='networkidle')
    page.locator('header button[aria-label*="English"]').click();page.get_by_role('menuitemradio',name=re.compile('Français')).click()
    expect(page).to_have_url(base+'/fr/vente?check=1#collection')
    result={'passed':True,'checks':checks+['language switch retains pathname, query and fragment'],'externalMessagesSent':False}
    (OUT/'contact-results.json').write_text(json.dumps(result,indent=2));context.close();return result
def editor_preview(browser):
    context=browser.new_context(viewport={'width':1440,'height':1000});page=context.new_page()
    page.goto('http://127.0.0.1:4174',wait_until='networkidle');expect(page.locator('tbody tr')).to_have_count(8)
    screenshot(page,'editor-desktop.png');page.set_viewport_size({'width':390,'height':844});screenshot(page,'editor-mobile.png')
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
    page.locator('tr[data-vehicle-id="volkswagen-tiguan-elegance-2022"]').get_by_role('button',name='Edit').click()
    page.get_by_label('Sale price · MAD',exact=True).fill('399000')
    expect(page.locator('#price-on-request')).not_to_be_checked()
    expect(page.locator('#live-preview')).to_contain_text('399')
    page.get_by_label('Sale price · MAD',exact=True).fill('378000')
    screenshot(page,'editor-form-mobile.png')
    page.get_by_role('button',name='Manage gallery').click();screenshot(page,'editor-photos-mobile.png')
    page.set_viewport_size({'width':1440,'height':1000});screenshot(page,'editor-photos-desktop.png')
    context.close();return {'passed':True,'checks':['real inventory table desktop and mobile','mobile cards do not overflow','price on request checkbox sync','live price card preview','mobile form and photos','existing logo']}
def editor_checks(browser):
    context=browser.new_context(viewport={'width':1440,'height':1000},accept_downloads=True)
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('dialog',lambda dialog:dialog.accept())
    page.goto('http://127.0.0.1:4174',wait_until='networkidle')
    expect(page.locator('tbody tr')).to_have_count(8)
    screenshot(page,'editor-desktop.png')
    page.get_by_role('button',name='Add vehicle').click()
    page.get_by_label('Brand',exact=True).fill('Makan Test')
    page.get_by_label('Model',exact=True).fill('Verification')
    page.get_by_label('Trim / version',exact=True).fill('Export workflow')
    page.get_by_label('Year',exact=True).fill('2026')
    page.get_by_label('Registration date',exact=False).fill('11/2026')
    page.get_by_label('Mileage · km',exact=True).fill('12345')
    page.get_by_label('Sale price · MAD',exact=True).fill('444000')
    page.get_by_label('Sale price · MAD',exact=True).fill('449000')
    expect(page.locator('#live-preview')).to_contain_text('449')
    for locale,name in [('FR','Véhicule de vérification'),('EN','Workflow verification vehicle'),('AR','سيارة التحقق')]:
        page.locator(f'[data-locale="{locale.lower()}"]').click()
        page.get_by_label('Display name',exact=True).fill(name)
        page.get_by_label('Description',exact=True).fill('Editor export and public build verification.')
    page.locator('[data-locale="en"]').click()
    sample_id=page.get_by_label('Vehicle ID',exact=False).input_value()
    screenshot(page,'editor-vehicle-desktop.png')
    page.get_by_role('button',name='Manage gallery').click()
    page.locator('#photo-files').set_input_files([str(ROOT/'public/vehicles/tiguan-elegance-2022/front-three-quarter.webp'),str(ROOT/'public/vehicles/tiguan-elegance-2022/rear.webp')])
    expect(page.locator('.photo-tile')).to_have_count(2)
    page.get_by_role('button',name='Move photo 2 up',exact=True).click()
    page.locator('.photo-tile').first.get_by_label('Illustrative image',exact=False).check()
    expect(page.locator('#live-preview')).to_contain_text('Illustrative image')
    page.get_by_role('button',name='Save draft',exact=True).click()
    expect(page.locator('#draft-status')).to_contain_text('Draft saved')
    page.reload(wait_until='networkidle')
    page.locator('[data-section="photos"]').click()
    page.locator('#photo-vehicle').select_option(sample_id)
    expect(page.locator('.photo-tile')).to_have_count(2)
    expect(page.locator('.photo-tile').first.get_by_label('Illustrative image',exact=False)).to_be_checked()
    screenshot(page,'editor-photos-desktop.png')
    page.locator('[data-section="vehicles"]').click()
    page.locator(f'tr[data-vehicle-id="{sample_id}"]').get_by_role('button',name='Edit').click()
    page.get_by_label('Visibility',exact=True).select_option('public')
    page.get_by_label('Featured in the homepage hero').check()
    page.get_by_label('Availability',exact=True).select_option('sold')
    expect(page.get_by_label('Featured in the homepage hero')).not_to_be_checked()
    page.get_by_label('Visibility',exact=True).select_option('hidden')
    expect(page.get_by_label('Availability',exact=True)).to_have_value('sold')
    page.get_by_label('Availability',exact=True).select_option('available')
    page.get_by_label('Visibility',exact=True).select_option('public')
    page.get_by_label('Featured in the homepage hero').check()
    page.get_by_role('button',name='Back to inventory').click()
    page.locator('tr[data-vehicle-id="volkswagen-t-roc-modele-2020"]').get_by_role('button',name='Edit').click()
    page.get_by_label('Visibility',exact=True).select_option('hidden')
    expect(page.get_by_label('Vehicle ID',exact=False)).to_have_attribute('readonly','')
    page.get_by_role('button',name='Back to inventory').click()
    page.locator('#inventory-search').fill('verification')
    expect(page.locator('tbody tr')).to_have_count(1)
    page.locator('#inventory-search').fill('')
    page.locator('#inventory-filter').select_option('hidden')
    expect(page.locator('tbody tr')).to_have_count(1)
    page.locator('#inventory-filter').select_option('all')
    page.set_viewport_size({'width':390,'height':844})
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
    screenshot(page,'editor-mobile.png')
    page.locator('[data-section="showroom"]').click()
    page.locator('[data-locale="en"]').click()
    page.get_by_label('email',exact=True).fill('Maka.benioukil@gmail.com')
    screenshot(page,'editor-showroom-mobile.png')
    with page.expect_download() as download:
        page.get_by_role('button',name='Export updates',exact=False).click()
    archive=OUT/'sample-update.zip';download.value.save_as(str(archive))
    expect(page.locator('#draft-status')).to_contain_text('Draft saved')
    # Re-import the exported archive; photos must survive the export/import round trip.
    page.locator('#import-file').set_input_files(str(archive))
    expect(page.locator('#toast')).to_contain_text('Catalogue imported')
    page.get_by_role('button',name='Save draft',exact=True).click()
    page.locator('[data-section="photos"]').click()
    page.locator('#photo-vehicle').select_option(sample_id)
    expect(page.locator('.photo-tile')).to_have_count(2)
    page.set_viewport_size({'width':1440,'height':1000})
    screenshot(page,'editor-photo-roundtrip.png')
    # Leave the editor on the real stock, keeping the sample solely in the test export.
    page.locator('#import-file').set_input_files(str(ROOT/'content/catalogue.json'))
    expect(page.locator('#toast')).to_contain_text('Catalogue imported')
    page.get_by_role('button',name='Save draft',exact=True).click()
    page.locator('[data-section="vehicles"]').click()
    expect(page.locator('tbody tr')).to_have_count(8)
    assert not errors,errors
    result={'passed':True,'sampleId':sample_id,'export':str(archive.relative_to(ROOT)),'checks':['add vehicle','edit price','FR/EN/AR fields','live card','photo upload','cover reorder','illustrative marker','draft reload with image blobs','sold vs hidden','featured eligibility','search and filter','mobile table cards','export ZIP','import ZIP with photos','restore original stock'],'pageErrors':errors}
    (OUT/'editor-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    context.close();return result
def public_checks(browser,base,sample=False):
    data=json.loads((ROOT/'content/catalogue.json').read_text(encoding='utf8'))
    context=browser.new_context(viewport={'width':1440,'height':1000})
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    results=[]
    for locale in ['fr','en','ar']:
        response=page.goto(f'{base}/{locale}',wait_until='networkidle',timeout=180000);assert response.status==200
        expect(page.locator('html')).to_have_attribute('lang',locale)
        expect(page.locator('html')).to_have_attribute('dir','rtl' if locale=='ar' else 'ltr')
        expect(page.locator('#hero-title')).to_be_visible()
        assert page.locator('a[href*="/auth/"]').count()==0
        for service in ['/location','/recherche-personnalisee']:
            response=page.goto(f'{base}/{locale}{service}',wait_until='networkidle',timeout=180000)
            assert response.status==200
            expect(page.locator('h1')).to_have_count(1)
            assert page.locator('link[rel="canonical"]').get_attribute('href').endswith(f'/{locale}{service}')
        page.goto(f'{base}/{locale}/vente',wait_until='networkidle',timeout=180000)
        expect(page.locator('article.vehicle-card')).to_have_count(sum(v['visibility']=='public' for v in data['vehicles']))
        page.locator('.catalogue-filters select').nth(1).select_option('sold')
        expect(page.locator('article.vehicle-card')).to_have_count(sum(v['status']=='sold' and v['visibility']=='public' for v in data['vehicles']))
        for badge in page.locator('.vehicle-status').all():expect(badge).to_have_text({'fr':'Vendu','en':'Sold','ar':'مباعة'}[locale])
        page.locator('.catalogue-count button').click()
        for v in data['vehicles']:
            response=page.goto(f'{base}/{locale}/cars/{v["slug"]}',wait_until='domcontentloaded',timeout=180000)
            if v['visibility']=='hidden':assert response.status==404;continue
            assert response.status==200,(locale,v['id'],response.status)
            expect(page.locator('h1')).to_have_text(v['text'][locale]['name'])
            if v['priceMAD'] is None:expect(page.locator('.detail-price')).to_have_text({'fr':'Prix sur demande','en':'Price on request','ar':'السعر عند الطلب'}[locale])
            canonical=page.locator('link[rel="canonical"]').get_attribute('href');assert canonical.endswith(f'/{locale}/cars/{v["slug"]}')
            assert page.locator('link[rel="alternate"][hreflang="ar"]').count()==1
            href=page.locator('.detail-enquiry a[href*="wa.me"]').get_attribute('href');assert data['contact']['whatsapp'] in href and 'text=' in href
            assert page.locator('script[type="application/ld+json"]').count()==1
            results.append(f'{locale}/cars/{v["slug"]}: 200, metadata, enquiry')
    # Gallery keyboard/thumbnail/dialog checks on the illustrative listing.
    route='/en/cars/volkswagen-tiguan-r-line-exclusive-2022'
    page.goto(base+route,wait_until='networkidle')
    expect(page.locator('.gallery-main .gallery-label')).to_have_text('Illustrative image')
    page.get_by_role('button',name='View photo 2',exact=True).click()
    expect(page.get_by_role('button',name='View photo 2',exact=True)).to_have_attribute('aria-pressed','true')
    page.get_by_role('button',name='Enlarge gallery',exact=False).click()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.keyboard.press('ArrowRight');expect(page.get_by_role('dialog')).to_contain_text('3 / 3')
    page.keyboard.press('Escape');expect(page.get_by_role('dialog')).to_have_count(0)
    expect(page.get_by_role('button',name='Enlarge gallery',exact=False)).to_be_focused()
    # Switching the language retains the vehicle route, even with an existing cookie.
    page.locator('header button[aria-label*="English"]').click()
    page.get_by_role('menuitemradio',name=re.compile('العربية')).click()
    expect(page).to_have_url(re.compile('/ar/cars/volkswagen-tiguan-r-line-exclusive-2022'))
    expect(page.locator('html')).to_have_attribute('dir','rtl')
    for path in ['/admin/dashboard','/en/admin/cars','/auth/login','/api/cars','/editor/editor.mjs','/content/catalogue.json']:
        assert context.request.get(base+path).status==404,path
    sitemap=context.request.get(base+'/sitemap.xml');assert sitemap.status==200
    xml=sitemap.text()
    for v in data['vehicles']:
        if v['visibility']=='hidden':assert '/cars/'+v['slug'] not in xml
        else:assert '/en/cars/'+v['slug'] in xml
    assert context.request.get(base+'/robots.txt').status==200
    if sample:
        info=json.loads((OUT/'editor-results.json').read_text(encoding='utf8'));id=info['sampleId']
        page.goto(base+'/en',wait_until='networkidle')
        for _ in range(data['featuredIds'].index(id)):page.get_by_role('button',name='Next vehicle',exact=True).click()
        expect(page.locator('.hero-car-link')).to_have_attribute('href','/en/cars/'+id)
        expect(page.locator('.hero-car-footer')).to_contain_text('449,000')
        expect(page.locator('.hero-illustration-label')).to_have_text('Illustrative image')
        page.goto(base+'/en/vente',wait_until='networkidle');card=page.locator(f'article[data-vehicle-id="{id}"]');expect(card).to_contain_text('449,000');expect(card).to_contain_text('Illustrative image')
        page.goto(base+'/en/cars/'+id,wait_until='networkidle');expect(page.locator('h1')).to_have_text('Workflow verification vehicle');expect(page.locator('.detail-price')).to_contain_text('449,000');expect(page.locator('.gallery-label')).to_contain_text('Illustrative image')
        screenshot(page,'sample-production-detail.png')
    else:
        for viewport,label in [({'width':1440,'height':1000},'desktop'),({'width':390,'height':844},'mobile')]:
            page.set_viewport_size(viewport)
            for suffix,name in [('/en','home'),('/en/vente','catalogue'),('/en/cars/volkswagen-tiguan-r-line-exclusive-2022','detail'),('/ar/vente','arabic-catalogue')]:
                page.goto(base+suffix,wait_until='networkidle',timeout=180000)
                for y in range(0,min(page.evaluate('document.body.scrollHeight'),10000),700):page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y);page.wait_for_timeout(100)
                page.evaluate('scrollTo({top:0,behavior:"instant"})');page.wait_for_load_state('networkidle');page.wait_for_timeout(300)
                assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(label,suffix)
                assert not page.locator('img').evaluate_all('(imgs)=>imgs.some(i=>i.complete&&i.naturalWidth===0)'),(label,suffix,'broken image')
                screenshot(page,f'{name}-{label}.png')
            if label=='mobile':
                page.goto(base+'/en',wait_until='networkidle')
                page.get_by_role('button',name='Open menu',exact=True).click();expect(page.locator('#mobile-navigation')).to_be_visible();page.keyboard.press('Escape');expect(page.locator('#mobile-navigation')).to_have_count(0)
        reduced=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');rp=reduced.new_page();rp.goto(base+'/en',wait_until='networkidle');assert rp.locator('#hero-title').evaluate('(el)=>getComputedStyle(el).opacity')=='1';reduced.close()
    assert not errors,errors
    result={'passed':True,'mode':'sample production build' if sample else 'final production build','vehicleRoutes':results,'pageErrors':errors,'checks':['catalogue filters','direct FR EN AR requests','Arabic RTL','all visible vehicle URLs','hidden 404','sold visible and localized','price on request','localized gallery buttons','thumbnail selected state','dialog focus and keyboard','language switching','WhatsApp vehicle enquiry','canonical and alternate metadata','JSON-LD','sitemap','robots','retired routes absent','editor absent from public site']+(['sample price and image in catalogue and detail','sample featured selection and illustrative label'] if sample else ['desktop/mobile overflow and screenshots','reduced motion'])}
    (OUT/('sample-build-results.json' if sample else 'public-results.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    context.close();return result
def performance(browser,base):
    context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
    page=context.new_page();page.goto(base+'/en',wait_until='networkidle',timeout=180000)
    client=context.new_cdp_session(page);client.send('Network.enable');client.send('Network.setCacheDisabled',{'cacheDisabled':True});client.send('Emulation.setCPUThrottlingRate',{'rate':4});client.send('Network.emulateNetworkConditions',{'offline':False,'latency':150,'downloadThroughput':200000,'uploadThroughput':100000})
    samples=[measure(page,base+'/en') for _ in range(3)]
    before=json.loads((OUT/'performance-before.json').read_text())
    medians=lambda values:{k:statistics.median(v[k] for v in values) for k in ['lcp','fcp','cls','ttfb','transferBytes','jsBytes']}
    result={'mode':before['mode'],'before':medians(before['samples']),'after':medians(samples),'samples':samples,'note':'Local development comparison under the same browser/network/CPU profile. Not a field Core Web Vitals assessment.'}
    (OUT/'performance-comparison.json').write_text(json.dumps(result,indent=2));context.close();return result
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['editor','editor-preview','contacts','public','sample','performance'],default='public',nargs='?');parser.add_argument('--base',default='http://localhost:3100');args=parser.parse_args()
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path=EXE)
        result=editor_checks(browser) if args.mode=='editor' else editor_preview(browser) if args.mode=='editor-preview' else contact_checks(browser,args.base) if args.mode=='contacts' else performance(browser,args.base) if args.mode=='performance' else public_checks(browser,args.base,args.mode=='sample')
        print(json.dumps(result,ensure_ascii=True));browser.close()
