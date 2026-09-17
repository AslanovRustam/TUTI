import ArticleCard from "@/components/ArticleCard";
import Button from "@/components/Button";
import Section from "@/components/Section";
import { articles, articlesTeaser, toCard } from "@/content/articles";

export default function Articles() {
  return (
    <Section id="articles">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3.25rem)]">{articlesTeaser.title}</h2>
        <p className="mt-3 text-lg">{articlesTeaser.lead}</p>
      </header>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.slice(0, 4).map((article, i) => (
          <ArticleCard
            key={article.slug}
            card={toCard(article)}
            className="reveal reveal-card"
            style={{ transitionDelay: `${i * 80}ms` }}
          />
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button href="/articles" size="lg">
          {articlesTeaser.cta}
        </Button>
      </div>
    </Section>
  );
}
