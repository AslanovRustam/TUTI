import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import { allTags, articles, articlesPage, toCard } from "@/content/articles";
import { site } from "@/content/site";

import ArticlesBrowser from "./ArticlesBrowser";

export const metadata: Metadata = {
  title: `${articlesPage.title} — ${site.name}`,
  description: articlesPage.lead,
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${articlesPage.title} — ${site.name}`,
    description: articlesPage.lead,
    url: `${site.url}/articles`,
  },
};

export default function ArticlesIndex() {
  return (
    <section className="stars stars-fall relative overflow-hidden px-5 pt-32 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: "Головна", href: "/" }, { label: articlesPage.title }]} />

        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)]">{articlesPage.title}</h1>
        <p className="mt-4 max-w-2xl text-[clamp(1.05rem,2vw,1.35rem)] leading-snug font-bold">
          {articlesPage.lead}
        </p>

        <ArticlesBrowser
          cards={articles.map(toCard)}
          tags={allTags}
          labels={{
            searchLabel: articlesPage.searchLabel,
            searchPlaceholder: articlesPage.searchPlaceholder,
            allTag: articlesPage.allTag,
            empty: articlesPage.empty,
          }}
        />
      </div>
    </section>
  );
}
