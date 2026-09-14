import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        
        if (!body) {
            return NextResponse.json({ error: 'No launch params provided' }, { status: 400 })
        }

        const telegramUser = body?.tgWebAppData?.user || body?.initData?.user

        if (!telegramUser) {
            return NextResponse.json({ error: 'No user data found' }, { status: 400 })
        }

        const user = await prisma.user.upsert({
            where: { TelegramID: telegramUser.id },
            update: {
                FirstName: telegramUser.first_name,
                userName: telegramUser.username,
                SecondName: telegramUser.last_name,
                photo: telegramUser.photo_url,
            },
            create: {
                TelegramID: telegramUser.id,
                FirstName: telegramUser.first_name,
                SecondName: telegramUser.last_name,
                userName: telegramUser.username,
                photo: telegramUser.photo_url,
            }
        })

        return NextResponse.json({ success: true, user }, { status: 200 })
    } catch (error) {
        console.error(`Auth initialization error`, error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}