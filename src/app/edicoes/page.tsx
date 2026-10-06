import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Selo, Titulo } from "@/components/ui";
import { clube } from "@/data/clube";
import { edicoesAntigas, golsDaEdicao } from "@/data/edicoes";
import { acharJogador } from "@/data/jogadores";
import { proxima } from "@/data/proxima";
import { formatarData } from "@/lib/datas";

export const metadata: Metadata = { title: "Edições" };

export default function Edicoes() {
  const datas = proxima.dataConfirmada ? [proxima.dataConfirmada] : proxima.datasPossiveis;
  const fundador = acharJogador(clube.fundador);
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Titulo
        sobre="Nossa história"
        sub={`O ${clube.nomeCompleto} foi fundado por ${fundador?.nome} em ${formatarData(clube.fundacaoData)}, para disputar a Meller Cup, o torneio que os primos organizam e que é jogado em um único dia. Cada edição é uma página da nossa história.`}
      >
        Edições
      </Titulo>

      <ol className="linha-tempo relative space-y-10 border-l border-gold/40 pl-8">
        {edicoesAntigas.map((e) => (
          <li key={e.slug} data-revelar className="relative">
            <span
              className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-gold"
              style={{ background: e.corUniforme }}
              title={`Uniforme ${e.uniforme.toLowerCase()}`}
            />
            <Link href={`/edicoes/${e.slug}`} className="group grid gap-5 sm:grid-cols-[200px_1fr]">
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-line">
                <Image src={e.foto} alt={e.fotoLegenda} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">{e.mes}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-extrabold uppercase group-hover:text-gold">{e.nome}</h2>
                  <Selo resultado={e.resultado}>{e.resultadoTexto}</Selo>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Uniforme {e.uniforme.toLowerCase()} · {e.elenco.length} jogadores · {golsDaEdicao(e)} gols
                </p>
                <p className="mt-2">{e.resumo}</p>
              </div>
            </Link>
          </li>
        ))}
        <li data-revelar className="relative">
          <span className="ponto-pulso absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-dashed border-gold bg-background" />
          <Link href="/proxima-meller-cup" className="group block">
            <p className="text-xs uppercase tracking-wider text-muted">{datas.map((d) => formatarData(d)).join(" ou ")}</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold uppercase text-muted group-hover:text-gold">
              {proxima.nome}
            </h2>
            <p className="mt-1 text-sm text-muted">Em breve. O Halcones vai defender o título.</p>
          </Link>
        </li>
      </ol>
    </div>
  );
}
