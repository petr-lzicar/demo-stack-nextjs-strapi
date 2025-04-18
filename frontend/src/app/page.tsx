// src/app/page.tsx
import { getAllArticles } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // Získáme články ze Strapi
  const articles = await getAllArticles();

  return (
      <div className="min-h-screen p-8 sm:p-12 font-sans">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">HP</h1>
          <p className="text-gray-600 dark:text-gray-300">
           Seznam stránek
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
              <div className="text-center p-8">
                <p className="text-gray-500">Žádné články k zobrazení</p>
              </div>
          )}
        </main>
      </div>
  );
}

function ArticleCard({ article }) {

  console.log(article);
  return (
      <Link href={`/${article.slug}`}>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">

          <div className="p-5 flex-grow">
            <h2 className="text-xl font-semibold mb-2">{article.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {article.description}
            </p>

            <div className="mt-auto">
            <span className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}
            </span>
            </div>
          </div>
        </div>
      </Link>
  );
}