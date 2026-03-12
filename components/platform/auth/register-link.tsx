'use client'

import Link from 'next/link'
import { useState } from 'react'

export function RegisterLink() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/auth/register"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="transition-colors"
      style={{
        color: hovered ? '#d8b97e' : '#b49448',
        textDecoration: 'none',
      }}
    >
      Créer un compte
    </Link>
  )
}
