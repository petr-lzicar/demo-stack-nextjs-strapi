// src/app/articles/[slug]/page.tsx
import { getArticleBySlug } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

export default async function ArticleDetail({ params }) {
  const { slug } = params;
  console.log(slug);
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-block mb-6 text-blue-600 hover:underline">
        &larr; Zpět na seznam článků
      </Link>
      
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.name}</h1>
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            Publikováno: {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}
          </div>
          

        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Pokud používáte Markdown nebo HTML obsah */}
          <BlocksRenderer content={article.content} />
          {/* Pokud máte čistý text */}
          {/* <p>{attributes.content}</p> */}
        </div>
      </article>
    </div>
  );
}