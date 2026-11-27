import type { Metadata } from "next";
import Image from "next/image";
import CardJogador from "@/components/CardJogador";
import DiasAte from "@/components/DiasAte";
import { Aviso, Secao, Titulo } from "@/components/ui";
import { clube } from "@/data/clube";
import { edicoesRecentes } from "@/data/edicoes";
import { acharJogador } from "@/data/jogadores";
import { proxima } from "@/data/proxima";
import { fichaDe } from "@/lib/calculos";
import { diaDaSemana, formatarData } from "@/lib/datas";

export const metadata: Metadata = { title: "Próxima Meller Cup" };

export default function ProximaMellerCup() {
  const confirmada = proxima.dataConfirmada;
  const datas = confirmada ? [confirmada] : proxima.datasPossiveis;
  const ultima = edicoesRecentes[0];
  // Fichas na ordem dos números da camisa.
  const convocados = [...proxima.elenco]
    .sort((a, b) => a.numero - b.numero)
    .map((c) => fichaDe(acharJogador(c.jogador)!));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
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
          <div
            key={d}
            data-revelar
            className="reluz rounded-xl borda-ouro bg-gradient-to-br from-card-2 to-card p-6 text-center"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              {diaDaSemana(d)}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold">
              {formatarData(d)}
            </p>
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
        {proxima.local ? (
          <p className="text-lg">{proxima.local}</p>
        ) : (
          <Aviso>Local a definir.</Aviso>
        )}
      </Secao>

      <Secao titulo={`Elenco · ${convocados.length} convocados`}>
        {convocados.length === 0 ? (
          <Aviso>O elenco ainda não foi definido.</Aviso>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {convocados.map((f) => (
              <CardJogador key={f.slug} f={f} />
            ))}
          </div>
        )}
      </Secao>

      <div className="mt-16 flex justify-center">
        <Image
          src={clube.escudo}
          alt=""
          width={96}
          height={96}
          className="escudo-flutuante opacity-60"
        />
      </div>
    </div>
  );
}
