'use client'

import { useMemo, useState } from 'react'
import { MessageCircle, MessageCircleMore, Plus, SendHorizonal, X } from 'lucide-react'
import { getShowroomCars } from '@/lib/data/showroom-stock'

const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Bonjour, vous etes en ligne avec Makan Luxury Motors. Je suis la pour vous aider concernant nos vehicules, disponibilites et informations. Comment puis-je vous assister ?',
  },
]

const assistantAvatar = '/makan-assistant-avatar.svg'
const whatsappHref =
  'https://wa.me/212641389898?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d%E2%80%99informations%20sur%20vos%20vehicules%20disponibles.'

const suggestedCars = getShowroomCars().map((car) => ({
  id: car.id,
  name: car.name,
  price: car.price ?? 'Prix sur demande',
  subtitle: car.subtitle,
  summary: car.summary.slice(0, 3),
}))

export function FloatingChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const canSend = useMemo(() => input.trim().length > 0, [input])

  function appendAssistantCarMessage(carId: string) {
    const car = suggestedCars.find((item) => item.id === carId)
    if (!car) return

    const details = car.summary.map((item) => `${item.label}: ${item.value}`).join(' | ')

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: car.name },
      {
        id: `assistant-${Date.now() + 1}`,
        role: 'assistant',
        content: `${car.name}${car.subtitle ? ` - ${car.subtitle}` : ''}\nPrix: ${car.price}\n${details}`,
      },
    ])
  }

  function handleSend() {
    const content = input.trim()
    if (!content) return

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content },
      {
        id: `assistant-${Date.now() + 1}`,
        role: 'assistant',
        content:
          'Merci pour votre message. Notre equipe reviendra vers vous rapidement pour vous accompagner sur votre demande.',
      },
    ])
    setInput('')
  }

  return (
    <>
      <div className="fixed right-3 bottom-3 z-[70] flex flex-col items-end gap-2.5 sm:right-5 sm:bottom-5 lg:right-6 lg:bottom-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter Makan Luxury Motors sur WhatsApp"
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#4ee28a]/35 bg-[linear-gradient(180deg,#1ecb67_0%,#0b9d46_100%)] text-white shadow-[0_18px_60px_-20px_rgba(4,74,33,0.75)] transition hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#92f1b8]/55 sm:h-16 sm:w-16"
        >
          <span className="absolute inset-[3px] rounded-full border border-white/12" />
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%),rgba(0,0,0,0.08)] sm:h-12 sm:w-12">
            <MessageCircleMore size={22} />
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
          className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a96d]/35 bg-[linear-gradient(180deg,#171a22_0%,#0a0d14_100%)] text-white shadow-[0_18px_60px_-20px_rgba(0,0,0,0.85)] transition hover:-translate-y-0.5 hover:border-[#e3c58e]/55 sm:h-16 sm:w-16"
        >
          <span className="absolute inset-[3px] rounded-full border border-white/8" />
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#c9a96d]/30 bg-[#0f131b] shadow-[0_0_0_5px_rgba(201,169,109,0.06)] sm:h-12 sm:w-12">
            <img src={assistantAvatar} alt="Makan Assistant" className="h-full w-full object-cover" />
          </span>
        </button>
      </div>

      <div
        className={`fixed right-3 bottom-32 z-[69] w-[calc(100vw-1.5rem)] max-w-[390px] origin-bottom-right rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,21,28,0.98),rgba(8,10,15,0.98))] shadow-[0_30px_90px_-28px_rgba(0,0,0,0.92)] backdrop-blur-2xl transition duration-300 sm:right-5 sm:bottom-38 sm:w-[min(390px,calc(100vw-2.5rem))] sm:rounded-[30px] lg:right-6 lg:bottom-42 ${open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'}`}
      >
        <div className="border-b border-white/10 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#c9a96d]/30 bg-[#0f131b] text-[#e3c58e] shadow-[0_0_0_5px_rgba(201,169,109,0.06)]">
                <img src={assistantAvatar} alt="Makan Assistant" className="h-full w-full object-cover" />
              </span>
              <div>
                <p className="font-serif text-2xl text-white">Makan Assistant</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                  Luxury advisor
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#c9a96d]/35 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="max-h-[46vh] space-y-4 overflow-y-auto px-4 py-4 sm:max-h-[360px] sm:px-5 sm:py-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-[22px] px-4 py-3 text-sm leading-7 shadow-[0_16px_50px_-32px_rgba(0,0,0,0.85)] ${
                  message.role === 'user'
                    ? 'rounded-br-md border border-[#c9a96d]/30 bg-[#c9a96d] text-black'
                    : 'rounded-bl-md border border-white/10 bg-white/6 text-slate-100'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-4 py-4 sm:px-5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Vehicules suggérés</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedCars.map((car) => (
              <button
                key={car.id}
                type="button"
                onClick={() => appendAssistantCarMessage(car.id)}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-[#c9a96d]/35 hover:text-white"
              >
                {car.name}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 p-3.5 sm:p-4">
          <div className="flex items-end gap-3 rounded-[22px] border border-white/10 bg-[#0b0f16]/85 p-2">
            <button
              type="button"
              aria-label="Options"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#c9a96d]/35 hover:text-white"
            >
              <Plus size={16} />
            </button>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  handleSend()
                }
              }}
              rows={1}
              placeholder="Votre message..."
              className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Envoyer"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a96d]/35 bg-[#c9a96d] text-black transition hover:bg-[#d8b97e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendHorizonal size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
