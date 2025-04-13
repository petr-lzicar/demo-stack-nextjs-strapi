// frontend/src/lib/api.js
export async function fetchContent(path, params = {}) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

    // Převod parametrů na řetězec query
    let queryParams = new URLSearchParams();

    // Zpracování speciálních parametrů pro Strapi
    Object.entries(params).forEach(([key, value]) => {
        if (key === 'filters' && typeof value === 'object') {
            // Pro filtrování je potřeba speciální formát
            Object.entries(value).forEach(([filterKey, filterValue]) => {
                if (typeof filterValue === 'object') {
                    // Vnořené operátory jako $eq
                    Object.entries(filterValue).forEach(([operator, operatorValue]) => {
                        queryParams.append(`filters[${filterKey}][${operator}]`, operatorValue);
                    });
                } else {
                    // Jednoduché filtry
                    queryParams.append(`filters[${filterKey}]`, filterValue);
                }
            });
        } else if (key === 'populate' && typeof value === 'string') {
            // Zpracování populate parametru
            queryParams.append(`populate`, value);
        } else if (key === 'sort' && typeof value === 'string') {
            // Zpracování sort parametru
            queryParams.append(`sort`, value);
        } else {
            // Ostatní parametry
            queryParams.append(key, value);
        }
    });

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const url = `${apiUrl}/api/${path}${queryString}`;

    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

// Pomocná funkce pro získání všech článků
export async function getAllArticles() {
    const data = await fetchContent('pages', {
        sort: 'publishedAt:desc'
    });
    return data.data;
}

// Pomocná funkce pro získání článku podle slugu
export async function getArticleBySlug(slug) {
    const data = await fetchContent('pages', {
        filters: {
            slug: {
                $eq: slug
            }
        },
    });

    if (data.data.length === 0) {
        return null;
    }

    return data.data[0];
}