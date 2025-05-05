// middleware.ts (v kořeni projektu)
import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['cs', 'en'] as const
const DEFAULT_LOCALE = 'cs'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1.  Nepovolíme /cs → /  (aby / bylo české)
    if (pathname === '/cs' || pathname.startsWith('/cs/')) {
        return NextResponse.redirect(new URL(pathname.replace('/cs', ''), request.url))
    }

    // 2.  Jsme‑li už na /en nebo /en/… → pustíme dál
    if (LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
        return
    }

    // 3.  Vše ostatní (kořen / nebo “cizí” cesta) přepiš na výchozí jazyk
    const url = request.nextUrl
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml).*)'],
}
