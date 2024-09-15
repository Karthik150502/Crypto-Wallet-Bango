import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const { messages, chatId } = await req.json()

        return NextResponse.json({ 'error': 'Chat not found' }, { status: 404 })


    } catch (error) {

        return NextResponse.json({ 'error': 'Error in initializing the chat' }, { status: 500 })
    }
}

