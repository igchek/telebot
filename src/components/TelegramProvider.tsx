'use client'
import { useEffect } from 'react'
import { isTMA, mockTelegramEnv } from "@telegram-apps/sdk"

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !isTMA()) {
 const initDataRaw = new URLSearchParams({
  user: JSON.stringify({
    id: 99281932,
    first_name: 'Andrew',
    last_name: 'Rogue',
    username: 'rogue',
    language_code: 'en',
  }),
  auth_date: '1716922846',
  hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
  signature: 'abc',
  start_param: 'debug',
  chat_type: 'sender',
  chat_instance: '8428209589180549439',
}).toString();

  mockTelegramEnv({
    launchParams: new URLSearchParams({
      tgWebAppPlatform: 'tdesktop',
      tgWebAppVersion: '8.0',
      tgWebAppData: initDataRaw,
      tgWebAppThemeParams: JSON.stringify({
        bg_color: '#020617',
        text_color: '#ffffff',
        button_color: '#4f46e5',
        button_text_color: '#ffffff',
      }),
    }),
  })
}

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.Telegram?.WebApp?.ready()
  }, [])

  return <>{children}</>
}