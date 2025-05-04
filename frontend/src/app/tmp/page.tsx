import React from 'react';
import 'dotenv/config'

// Funkce pro načtení všech dostupných parametrů stránek
// export async function generateStaticParams() {
//     const res = await fetch(process.env.STRAPI_URL + '/api/pages');
//     const pages = await res.json();
//     console.log(url);
//     return pages.data.map((page) => ({
//         slug: page.attributes.slug,
//     }));
// }

// Hlavní komponenta stránky s funkcí pro načtení dat
export default async function Page({ params }) {
    const url = `${process.env.STRAPI_URL}/api/pages?filters[slug][$eq]=${params.slug}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    const page = data.data[0].attributes;

    return (
        <div>
            <h1>{page?.title}</h1>
            {page?.cover && <img src={page?.cover.url} alt={page.title} />}
            <div dangerouslySetInnerHTML={page?.content ? {__html: page.content} : undefined}/>
        </div>
    );
}