'use client'
import { useEffect } from 'react'
import { isTMA, mockTelegramEnv } from "@telegram-apps/sdk"

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !isTMA()) {
  mockTelegramEnv({
    launchParams: {
      tgWebAppPlatform: 'tdesktop',
      tgWebAppVersion: '8.0',
      tgWebAppData: new URLSearchParams({
        auth_date: '94814',
        hash: 'valid-mock-hash-or-bypass',
        user: JSON.stringify({
          id: 999,
          first_name: 'LocalDev',
          username: 'DevUser'
        }),
      }),
      tgWebAppThemeParams: {
        bg_color: '#020617',
        text_color: '#ffffff',
        button_color: '#4f46e5',
        button_text_color: '#ffffff',
      }
    },
  })
}

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.Telegram?.WebApp?.ready()
  }, [])

  return <>{children}</>
}