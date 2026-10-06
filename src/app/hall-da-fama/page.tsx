import type { Metadata } from "next";
import Link from "next/link";
import { Secao, Titulo } from "@/components/ui";
import { edicoes } from "@/data/edicoes";
import { camisasPesadas } from "@/data/hall";
import { acharJogador } from "@/data/jogadores";
import { todasAsFichas } from "@/lib/calculos";

export const metadata: Metadata = { title: "Hall da Fama" };

export default function HallDaFama() {
  const fichas = todasAsFichas();
  const artilheiro = fichas[0];
  const maisEdicoes = Math.max(...fichas.map((f) => f.participacoes.length));
  const presentes = fichas.filter((f) => f.participacoes.length === maisEdicoes);
  const melhorEdicao = edicoes
    .flatMap((e) => e.elenco.map((c) => ({ ...c, edicao: e })))
    .sort((a, b) => (b.gols ?? 0) - (a.gols ?? 0))[0];

  const recordes = [
    {
      rotulo: "Maior artilheiro",
      valor: `${artilheiro.gols} gols`,
      quem: [artilheiro],
    },
    {
      rotulo: "Mais gols em uma edição",
      valor: `${melhorEdicao.gols} gols · ${melhorEdicao.edicao.nome}`,
      quem: [acharJogador(melhorEdicao.jogador)!],
    },
    {
      rotulo: maisEdicoes === edicoes.length ? "Presentes em todas as edições" : "Mais edições disputadas",
      valor: `${maisEdicoes} edições`,
      quem: presentes,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Titulo sobre="Hall da Fama" sub="Os nomes que carregam a história do clube nas costas.">
        Camisas pesadas
      </Titulo>

      <div className="grid gap-5 md:grid-cols-2">
        {camisasPesadas.map((l) => {
          const j = acharJogador(l.jogador)!;
          return (
            <Link
              key={l.jogador}
              href={`/elenco/${l.jogador}`}
              className="group relative overflow-hidden rounded-xl borda-ouro bg-gradient-to-br from-card-2 to-card p-6 transition-transform hover:-translate-y-1"
            >
              <span className="pointer-events-none absolute -right-4 -top-8 font-display text-[9rem] font-extrabold leading-none text-gold/10">
                {l.numero}
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-halcon">{l.titulo}</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold uppercase group-hover:text-gold">
                <span className="texto-ouro">{l.numero}</span> {j.apelido}
              </h2>
              <p className="text-sm text-muted">{j.nome}</p>
              <ul className="relative mt-5 space-y-2 text-sm">
                {l.feitos.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-gold">★</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Link>
          );
        })}
      </div>

      <Secao titulo="Recordes">
        <div className="grid gap-3 md:grid-cols-3">
          {recordes.map((r) => (
            <div key={r.rotulo} className="rounded-lg border border-line bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted">{r.rotulo}</p>
              <p className="mt-2 font-display text-2xl font-extrabold text-gold">{r.valor}</p>
              <p className="mt-2 text-sm">
                {r.quem.map((q, i) => (
                  <span key={q.slug}>
                    {i > 0 && ", "}
                    <Link href={`/elenco/${q.slug}`} className="hover:text-gold">
                      {q.apelido}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </Secao>
    </div>
  );
}
