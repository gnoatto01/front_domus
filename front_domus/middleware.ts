import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('attossoluctions.token')?.value;
    console.log("middleware funcionando");

    if (!accessToken) {
        console.log('No token found')
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try { 

        const response = await axios.get("http://localhost:8080/api/verificar-token", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.data) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        'src/app/:path*',
    ]
}