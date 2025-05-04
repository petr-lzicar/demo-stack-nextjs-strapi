import {BlocksRenderer} from "@strapi/blocks-react-renderer";

export default async function Home({ params }: { params: { locale: string } }) {
    const locale = (await params).locale;

    const homepageId = 'o7hdfbxnkbncerddhhashhqg';
    const res = await fetch(
        `${process.env.STRAPI_URL}/api/pages?filters[documentId][$eq]=${homepageId}&locale=${locale}&populate=*`
    );

    const data = await res.json();

    const page = data.data[0];

    return (
        <>
            <h1>{page.title}</h1>
            <BlocksRenderer content={page.content} />
        </>
    );
}