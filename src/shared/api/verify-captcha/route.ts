import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { token } = await request.json();
    
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            secret: secretKey!,
            response: token,
        }),
    });
    
    const data = await response.json();
    
    return NextResponse.json({ success: data.success });
}