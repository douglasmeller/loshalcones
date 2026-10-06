import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Titulo } from "@/components/ui";
import { clube } from "@/data/clube";
import { noticiasRecentes } from "@/data/noticias";
import { formatarData } from "@/lib/datas";

export const metadata: Metadata = { title: "Notícias" };

export default function Noticias() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Titulo sobre="Notícias">O que rolou</Titulo>
      <ul className="space-y-4">
        {noticiasRecentes.map((n) => (
          <li key={n.slug} data-revelar>
            <Link
              href={`/noticias/${n.slug}`}
              className="reluz botao group grid gap-4 rounded-xl border border-line bg-card p-4 hover:border-gold sm:grid-cols-[180px_1fr]"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-card-2">
                {n.foto ? (
                  <Image src={n.foto} alt="" fill sizes="180px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <Image src={clube.escudo} alt="" fill sizes="180px" className="object-contain p-4 opacity-80" />
                )}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted">{formatarData(n.data)}</span>
                <h2 className="mt-1 font-display text-xl font-extrabold uppercase group-hover:text-gold">{n.titulo}</h2>
                <p className="mt-1 text-sm text-muted">{n.resumo}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
