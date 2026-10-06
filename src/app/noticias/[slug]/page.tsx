import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Foto } from "@/components/ui";
import { acharNoticia, noticias } from "@/data/noticias";
import { formatarData } from "@/lib/datas";

export function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: acharNoticia(slug)?.titulo ?? "Notícia" };
}

export default async function Noticia({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const n = acharNoticia(slug);
  if (!n) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/noticias" className="text-sm text-muted hover:text-gold">
        ← Notícias
      </Link>
      <p className="mt-6 text-xs uppercase tracking-wider text-muted">{formatarData(n.data)}</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase texto-ouro sm:text-5xl">{n.titulo}</h1>
      <p className="mt-3 text-lg text-muted">{n.resumo}</p>
      {n.foto && (
        <div className="mt-8">
          <Foto src={n.foto} alt={n.titulo} priority />
        </div>
      )}
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {n.corpo.map((p, i) => (
          <p key={i} data-revelar>
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
