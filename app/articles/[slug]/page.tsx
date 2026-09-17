import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import ArticleBody from "@/components/ArticleBody";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareLinks from "@/components/ShareLinks";
import Toc from "@/components/Toc";
import {
  articles,
  articlesPage,
  formatDate,
  getArticle,
  prepare,
  relatedArticles,
  toCard,
} from "@/content/articles";
import { getArt } from "@/content/images";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `${site.url}/articles/${article.slug}`;

  return {
    title: `${article.title} — ${site.name}`,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      locale: site.locale,
      siteName: site.name,
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.date,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { blocks, toc } = prepare(article.body);
  const related = relatedArticles(article.slug);
  const url = `${site.url}/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };

  return (
    <>
      <article className="stars relative px-5 pt-32 pb-20 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Головна", href: "/" },
              { label: articlesPage.title, href: "/articles" },
              { label: article.title },
            ]}
          />

          {/* Заголовок ширший за решту шапки: це великий кегль, і на
              вузькій колонці довга назва розсипається на три рядки. */}
          <header className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-sky-soft text-sky-deep rounded-full px-3 py-1 text-xs font-bold"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <h1 className="mt-4 max-w-[62rem] text-[clamp(2.1rem,5vw,3.75rem)]">{article.title}</h1>

            <p className="mt-4 max-w-[46rem] text-[clamp(1.05rem,2vw,1.3rem)] leading-snug font-bold">
              {article.excerpt}
            </p>

            <p className="text-ink-soft mt-6 text-sm font-semibold">
              {article.author.name}, {article.author.role} · {formatDate(article.date)} ·{" "}
              {article.readingMinutes} хв читання
            </p>
          </header>

          <div className="mt-10 overflow-hidden rounded-[2rem]">
            <Image
              src={getArt(article.cover)}
              alt={article.coverAlt}
              sizes="(min-width: 1152px) 1152px, 94vw"
              className="block aspect-[2/1] w-full object-cover"
              priority
            />
          </div>

          {/* Текст ліворуч і не ширший за ~70 знаків у рядку, зміст
              праворуч. На вузькому екрані зміст іде першим: до нього
              треба дотягнутися до читання, а не після. */}
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,46rem)_minmax(0,1fr)] lg:gap-16">
            <div className="order-2 lg:order-1">
              <ArticleBody blocks={blocks} />

              <div className="border-ink/10 mt-14 border-t pt-8">
                <ShareLinks url={url} title={article.title} />
              </div>
            </div>

            <aside className="order-1 lg:order-2">
              <Toc items={toc} />
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="stars stars-light stars-fall bg-berry relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)]">Схожі статті</h2>

            <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} card={toCard(item)} onColor />
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
