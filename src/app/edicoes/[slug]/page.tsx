import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Placar from "@/components/Placar";
import { Aviso, Foto, Numero, Secao, Selo } from "@/components/ui";
import { acharEdicao, edicoes, golsDaEdicao } from "@/data/edicoes";
import { acharJogador } from "@/data/jogadores";
import { comPosicao } from "@/lib/calculos";

export function generateStaticParams() {
  return edicoes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/edicoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: acharEdicao(slug)?.nome ?? "Edição" };
}

export default async function Edicao({ params }: PageProps<"/edicoes/[slug]">) {
  const { slug } = await params;
  const e = acharEdicao(slug);
  if (!e) notFound();

  const elenco = e.elenco
    .map((c) => ({ ...c, j: acharJogador(c.jogador)! }))
    .sort((a, b) => (a.numero ?? 999) - (b.numero ?? 999));
  const artilheiros = comPosicao(
    elenco.filter((c) => (c.gols ?? 0) > 0).map((c) => ({ ...c, gols: c.gols ?? 0 })).sort((a, b) => b.gols - a.gols),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/edicoes" className="text-sm text-muted hover:text-gold">
        ← Edições
      </Link>

      <div className="mt-6 grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <Foto src={e.foto} alt={e.fotoLegenda} priority />
        <div data-revelar="direita">
          <Selo resultado={e.resultado}>{e.resultadoTexto}</Selo>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase texto-ouro sm:text-5xl">{e.nome}</h1>
          <p className="mt-1 text-muted">
            {e.mes} · uniforme {e.uniforme.toLowerCase()}
          </p>
          <p className="mt-4">{e.resumo}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{e.fotoLegenda}</p>

      <div className="mt-10 grid grid-cols-3 gap-3">
        <Numero valor={e.elenco.length} rotulo="Jogadores" />
        <Numero valor={golsDaEdicao(e)} rotulo="Gols marcados" destaque />
        <Numero valor={e.resultado === "campeao" ? "🏆" : e.resultado === "vice" ? "🥈" : "–"} rotulo={e.resultadoTexto} />
      </div>

      <Secao titulo="Jogos">
        {e.jogos.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {e.jogos.map((jogo) => (
              <div key={jogo.fase + jogo.adversario} data-revelar>
                <Placar jogo={jogo} />
              </div>
            ))}
          </div>
        )}
        {e.avisoJogos && (
          <div className={e.jogos.length > 0 ? "mt-3" : ""}>
            <Aviso>{e.avisoJogos}</Aviso>
          </div>
        )}
      </Secao>

      <Secao titulo="Artilheiros">
        <ol className="divide-y divide-line rounded-lg border border-line">
          {artilheiros.map((a) => (
            <li key={a.jogador} data-revelar className="flex items-center justify-between px-4 py-3">
              <Link href={`/elenco/${a.jogador}`} className="hover:text-gold">
                <span className="mr-3 inline-block w-5 font-display text-gold">{a.posicao}</span>
                {a.apelido ?? a.j.apelido}
              </Link>
              <span className="font-display text-xl font-semibold">{a.gols}</span>
            </li>
          ))}
        </ol>
      </Secao>

      {e.galeria && e.galeria.length > 0 && (
        <Secao titulo="Galeria">
          <div className="space-y-10">
            {e.galeria.map((g) => (
              <figure key={g.foto} data-revelar className="grid items-center gap-6 md:grid-cols-2">
                <Image
                  src={g.foto}
                  alt={g.legenda.split("\n")[0]}
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 500px, 100vw"
                  className="h-auto w-full rounded-lg borda-ouro"
                />
                <figcaption className="space-y-3 text-muted">
                  {g.legenda.split("\n").map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        </Secao>
      )}

      <Secao titulo="Elenco">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {elenco.map((c) => (
            <li key={c.jogador} data-revelar>
              <Link
                href={`/elenco/${c.jogador}`}
                className="botao flex items-center gap-3 rounded-lg border border-line bg-card px-3 py-2.5 hover:border-gold"
              >
                <span className="w-8 text-center font-display text-lg font-extrabold text-gold">{c.numero ?? "–"}</span>
                <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold">
                  <span className="truncate">{c.apelido ?? c.j.apelido}</span>
                  {c.j.capitao && (
                    <span className="shrink-0 text-gold" title="Capitão" aria-label="Capitão">
                      (C)
                    </span>
                  )}
                  {c.j.goleiro && (
                    <span className="shrink-0" title="Goleiro" aria-label="Goleiro">
                      🧤
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>
    </div>
  );
}
