import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Načtení všech stránek ze Strapi
    const res = await fetch(`${process.env.STRAPI_URL}/api/pages?fields=slug,updatedAt,locale&locale=cs&pagination[pageSize]=100`);
    const { data } = await res.json();

    const domain = process.env.SITE_URL || 'http://localhost:3000';
    console.log("BAF",data);
    // Převeďte data na formát sitemap
    const entries = data.map(item => {
        const { slug, locale, updatedAt } = item;
        // Pro homepage použijeme kořenovou cestu
        const path = slug === null ? '' : slug;
        //TODO vyresit lepe pro homepage
        return {
            url: `${domain}/${locale}/${path}`,
            lastModified: new Date(updatedAt),
            changeFrequency: 'weekly',
            priority: 0.8,
        };
    });

    return entries;
}