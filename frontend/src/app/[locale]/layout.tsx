// app/[locale]/layout.js  (App Router)
import { cookies } from 'next/headers';
import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }) {
    // Počkejte na locale parametr
    const locale = (await params).locale;

    const navRes = await fetch(
        `${process.env.STRAPI_URL}/api/navigation/render/main-menu?type=TREE&locale=${locale}`
    );
    const navigation = await navRes.json();
    // … můžete přidat do metadata
}

export default async function RootLayout({ children, params }) {
    // Počkejte na locale parametr
    const locale = (await params).locale;

    const navRes = await fetch(
        `${process.env.STRAPI_URL}/api/navigation/render/main-menu?type=TREE&locale=${locale}`
    );
    const navigation = await navRes.json();
    // console.log(navigation);
    return (
        <html lang={locale}>
        <body>
        <Navbar items={navigation} locale={locale} />
        {children}
        </body>
        </html>
    );
}