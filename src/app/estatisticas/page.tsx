import type { Metadata } from "next";
import Link from "next/link";
import Placar from "@/components/Placar";
import { Numero, Secao, Selo, Titulo } from "@/components/ui";
import { campanhaGeral as c } from "@/data/clube";
import { edicoesRecentes, golsDaEdicao } from "@/data/edicoes";
import { artilharia, comPosicao } from "@/lib/calculos";

export const metadata: Metadata = { title: "Estatísticas" };

export default function Estatisticas() {
  const saldo = c.golsMarcados - c.golsSofridos;
  const aproveitamento = Math.round(((c.vitorias * 3 + c.empates) / (c.partidas * 3)) * 100);
  const media = (c.golsMarcados / c.partidas).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  const ranking = comPosicao(artilharia());
  const maxGols = ranking[0]?.gols ?? 1;
  const jogos = edicoesRecentes.flatMap((e) => e.jogos.map((j) => ({ ...j, edicao: e })));

  const barras = [
    { n: c.vitorias, cor: "bg-gold", rotulo: "V" },
    { n: c.empates, cor: "bg-zinc-500", rotulo: "E" },
    { n: c.derrotas, cor: "bg-halcon", rotulo: "D" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Titulo sobre="Estatísticas" sub="Os números de toda a história do clube.">
        Em números
      </Titulo>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Numero valor={c.partidas} rotulo="Partidas" />
        <Numero valor={`${aproveitamento}%`} rotulo="Aproveitamento" destaque />
        <Numero valor={c.golsMarcados} rotulo="Gols marcados" />
        <Numero valor={c.golsSofridos} rotulo="Gols sofridos" />
        <Numero valor={c.vitorias} rotulo="Vitórias" />
        <Numero valor={c.empates} rotulo="Empates" />
        <Numero valor={c.derrotas} rotulo="Derrotas" />
        <Numero valor={saldo > 0 ? `+${saldo}` : saldo} rotulo="Saldo de gols" />
      </div>

      <div className="mt-6 rounded-lg border border-line bg-card p-4">
        <div className="flex h-4 overflow-hidden rounded-full">
          {barras.map((b) => (
            <div key={b.rotulo} className={b.cor} style={{ width: `${(b.n / c.partidas) * 100}%` }} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          {barras.map((b) => (
            <span key={b.rotulo} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${b.cor}`} />
              {b.n} {b.rotulo === "V" ? "vitórias" : b.rotulo === "E" ? "empates" : "derrota"}
            </span>
          ))}
          <span>· média de {media} gols por jogo</span>
        </div>
      </div>

      <Secao titulo="Artilharia histórica">
        <ol className="space-y-2">
          {ranking.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/elenco/${a.slug}`}
                className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-lg border border-line bg-card px-4 py-3 hover:border-gold"
              >
                <span className="font-display text-lg font-extrabold text-gold">{a.posicao}º</span>
                <span>
                  <span className="font-semibold">{a.apelido}</span>
                  <span className="mt-1.5 block h-1.5 rounded-full bg-line">
                    <span className="block h-full rounded-full bg-gold" style={{ width: `${(a.gols / maxGols) * 100}%` }} />
                  </span>
                </span>
                <span className="font-display text-2xl font-extrabold">{a.gols}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Secao>

      <Secao titulo="Por edição">
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Edição</th>
                <th className="px-4 py-3">Resultado</th>
                <th className="px-4 py-3">Jogadores</th>
                <th className="px-4 py-3">Gols</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {edicoesRecentes.map((e) => (
                <tr key={e.slug}>
                  <td className="px-4 py-3">
                    <Link href={`/edicoes/${e.slug}`} className="hover:text-gold">
                      {e.nome}
                    </Link>
                    <span className="block text-xs text-muted">{e.mes}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Selo resultado={e.resultado}>{e.resultadoTexto}</Selo>
                  </td>
                  <td className="px-4 py-3">{e.elenco.length}</td>
                  <td className="px-4 py-3">{golsDaEdicao(e)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>

      <Secao titulo="Jogos registrados">
        <div className="grid gap-3 md:grid-cols-2">
          {jogos.map((j) => (
            <div key={j.edicao.slug + j.fase}>
              <p className="mb-1 text-xs text-muted">{j.edicao.nome}</p>
              <Placar jogo={j} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Os outros jogos do clube não foram registrados, mas entram nos números gerais acima.
        </p>
      </Secao>
    </div>
  );
}
