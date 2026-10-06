import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DiasAte from "@/components/DiasAte";
import { Aviso, Secao, Titulo } from "@/components/ui";
import { clube } from "@/data/clube";
import { edicoesRecentes } from "@/data/edicoes";
import { acharJogador } from "@/data/jogadores";
import { proxima } from "@/data/proxima";
import { diaDaSemana, formatarData } from "@/lib/datas";

export const metadata: Metadata = { title: "Próxima Meller Cup" };

export default function ProximaMellerCup() {
  const confirmada = proxima.dataConfirmada;
  const datas = confirmada ? [confirmada] : proxima.datasPossiveis;
  const ultima = edicoesRecentes[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Titulo
        sobre="Próxima Meller Cup"
        sub={
          ultima.resultado === "campeao"
            ? `O ${clube.nome} chega como atual campeão, depois do título na ${ultima.nome}.`
            : undefined
        }
      >
        A volar de novo
      </Titulo>

      <div className={`grid gap-4 ${datas.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {datas.map((d) => (
          <div key={d} className="rounded-xl borda-ouro bg-gradient-to-br from-card-2 to-card p-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted">{diaDaSemana(d)}</p>
            <p className="mt-2 font-display text-3xl font-extrabold">{formatarData(d)}</p>
            <p className="mt-3 font-display text-xl text-gold">
              <DiasAte data={d} />
            </p>
          </div>
        ))}
      </div>
      {!confirmada && (
        <p className="mt-3 text-center text-sm text-muted">
          Data ainda não confirmada. Uma das duas vai ser a escolhida.
        </p>
      )}

      <Secao titulo="Local">
        {proxima.local ? <p className="text-lg">{proxima.local}</p> : <Aviso>Local a definir.</Aviso>}
      </Secao>

      <Secao titulo="Presenças confirmadas">
        {proxima.confirmados.length === 0 ? (
          <Aviso>Ninguém confirmou ainda.</Aviso>
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {proxima.confirmados.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/elenco/${slug}`}
                  className="block rounded-lg border border-line bg-card px-4 py-3 text-sm font-semibold hover:border-gold"
                >
                  ✓ {acharJogador(slug)?.apelido ?? slug}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Secao>

      <div className="mt-16 flex justify-center">
        <Image src={clube.escudo} alt="" width={96} height={96} className="opacity-60" />
      </div>
    </div>
  );
}
