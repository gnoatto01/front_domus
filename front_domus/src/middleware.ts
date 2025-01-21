import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { destroyCookie } from "nookies";

//FIXME: verificar o porque o token "recria" quando atualiza a tela

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('attossoluctions.token')?.value;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    if (!accessToken) {
        console.log('No token found')
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {

        const response = await axios.get(`${baseUrl}/verify-token`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.data) {
            return NextResponse.next();

        } else {
            destroyCookie(null, 'attossoluctions.token');
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// export const config = {
//     matcher: [
//         '/app/:path*',
//     ]
// }

export const config = {
    matcher: ['/dashboard'], // Baseado no prefixo de rotas acessíveis no navegador. Colocar todas as rotas que precisam ser encapsuladas. 
};