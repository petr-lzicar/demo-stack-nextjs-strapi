import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const res = await fetch(`${process.env.STRAPI_URL}/api/pages?fields=slug&locale=all`);
    const { data } = await res.json();
    return data.map(({ attributes: { slug, locale } }) => ({ slug, locale }));
}

export default async function Page({ params }) {
    const url = `${process.env.STRAPI_URL}/api/pages?filters[slug][$eq]=${(await params).slug}&locale=${(await params).locale}&populate=*`;
    const pageRes = await fetch(url);
    const pageData = await pageRes.json();

    // Zkontrolujeme, zda data obsahují nějaké výsledky
    if (!pageData.data || pageData.data.length === 0) {
        // Pokud stránka neexistuje, vrátíme 404
        notFound();
    }

    const page = pageData.data[0];

    return (
        <>
            <h1>{page.title}</h1>
            <BlocksRenderer content={page.content} />
        </>
    );
}