import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Numero, Secao, Selo } from "@/components/ui";
import { clube } from "@/data/clube";
import { camisasPesadas } from "@/data/hall";
import { acharJogador, jogadores } from "@/data/jogadores";
import { fichaDe } from "@/lib/calculos";
import { formatarData } from "@/lib/datas";

export function generateStaticParams() {
  return jogadores.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/elenco/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: acharJogador(slug)?.apelido ?? "Jogador" };
}

export default async function Jogador({ params }: PageProps<"/elenco/[slug]">) {
  const { slug } = await params;
  const j = acharJogador(slug);
  if (!j) notFound();

  const f = fichaDe(j);
  const lenda = camisasPesadas.find((l) => l.jogador === j.slug);
  const numeros = [...new Set(f.participacoes.map((p) => p.numero).filter((n) => n !== undefined))];
  const outrosApelidos = [...new Set(f.participacoes.map((p) => p.apelido))].filter((a) => a !== j.apelido);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/elenco" className="text-sm text-muted hover:text-gold">
        ← Elenco
      </Link>

      <div className="mt-6 grid items-center gap-8 sm:grid-cols-[auto_1fr]">
        <div className="escudo-entrar relative mx-auto flex aspect-[3/4] w-48 items-center justify-center overflow-hidden rounded-xl borda-ouro bg-gradient-to-b from-card-2 to-card">
          {f.foto ? (
            <Image src={f.foto} alt={f.apelido} fill sizes="192px" className="object-cover" />
          ) : (
            <span className="font-display text-8xl font-extrabold texto-ouro">{f.numeroAtual ?? "–"}</span>
          )}
        </div>
        <div className="hero-item">
          <div className="flex flex-wrap gap-2">
            {f.fundador && <Selo resultado="campeao">Fundador</Selo>}
            {f.capitao && <Selo resultado="campeao">Capitão</Selo>}
            {f.goleiro && <Selo resultado="outro">Goleiro</Selo>}
            {lenda && <Selo resultado="campeao">Camisa pesada</Selo>}
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase texto-ouro sm:text-5xl">{f.apelido}</h1>
          <p className="mt-1 text-lg">{f.nome}</p>
          {outrosApelidos.length > 0 && (
            <p className="text-sm text-muted">Também já jogou como {outrosApelidos.join(", ")}</p>
          )}
          {f.fundador && (
            <p className="mt-3 text-sm text-gold-light">Fundou o {clube.nomeCompleto} em {formatarData(clube.fundacaoData)}.</p>
          )}
          {numeros.length > 0 && (
            <p className="mt-3 text-sm text-muted">
              {numeros.length === 1 ? "Camisa" : "Camisas"} <span className="text-gold">{numeros.map((n) => `#${n}`).join(", ")}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-3">
        <Numero valor={f.participacoes.length} rotulo={f.participacoes.length === 1 ? "Edição" : "Edições"} />
        <Numero valor={f.gols} rotulo="Gols" destaque={f.gols > 0} />
        <Numero valor={f.jogos ?? "–"} rotulo="Partidas" />
      </div>

      {lenda && (
        <Secao titulo={lenda.titulo}>
          <ul className="space-y-2">
            {lenda.feitos.map((feito) => (
              <li key={feito} data-revelar className="flex gap-3 rounded-lg border border-line bg-card px-4 py-3">
                <span className="text-gold">★</span>
                {feito}
              </li>
            ))}
          </ul>
        </Secao>
      )}

      <Secao titulo="Pelo Halcones">
        <div data-revelar className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Edição</th>
                <th className="px-4 py-3">Camisa</th>
                <th className="px-4 py-3">Gols</th>
                <th className="px-4 py-3">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {f.participacoes.map((p) => (
                <tr key={p.edicao.slug}>
                  <td className="px-4 py-3">
                    <Link href={`/edicoes/${p.edicao.slug}`} className="hover:text-gold">
                      {p.edicao.nome}
                    </Link>
                    <span className="block text-xs text-muted">{p.edicao.mes}</span>
                  </td>
                  <td className="px-4 py-3 text-gold">{p.numero !== undefined ? `#${p.numero}` : "–"}</td>
                  <td className="px-4 py-3">{p.gols}</td>
                  <td className="px-4 py-3">
                    <Selo resultado={p.edicao.resultado}>{p.edicao.resultadoTexto}</Selo>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>
    </div>
  );
}
