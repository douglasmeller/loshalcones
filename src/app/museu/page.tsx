import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Foto, Secao, Selo, Titulo } from "@/components/ui";
import { clube } from "@/data/clube";
import { edicoesAntigas, edicoesRecentes } from "@/data/edicoes";

export const metadata: Metadata = { title: "Museu" };

export default function Museu() {
  const trofeus = edicoesRecentes.filter((e) => e.resultado !== "outro");
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Titulo sobre="Museu" sub="Troféus, uniformes, o escudo e as fotos que contam a história do clube.">
        Museu do Halcones
      </Titulo>

      <Secao titulo="Sala de troféus">
        <div className="grid gap-4 sm:grid-cols-2">
          {trofeus.map((e) => (
            <Link
              key={e.slug}
              href={`/edicoes/${e.slug}`}
              className={`flex items-center gap-5 rounded-xl p-6 transition-colors hover:border-gold ${
                e.resultado === "campeao" ? "borda-ouro bg-gradient-to-br from-card-2 to-card" : "border border-line bg-card"
              }`}
            >
              <span className="text-6xl">{e.resultado === "campeao" ? "🏆" : "🥈"}</span>
              <span>
                <Selo resultado={e.resultado}>{e.resultadoTexto}</Selo>
                <span className="mt-2 block font-display text-2xl font-extrabold uppercase">{e.nome}</span>
                <span className="text-sm text-muted">{e.mes}</span>
              </span>
            </Link>
          ))}
        </div>
      </Secao>

      <Secao titulo="O escudo">
        <div className="grid items-center gap-8 rounded-xl border border-line bg-card p-6 sm:grid-cols-[auto_1fr]">
          <Image src={clube.escudo} alt={`Escudo do ${clube.nomeCompleto}`} width={220} height={220} className="mx-auto" />
          <div>
            <h3 className="font-display text-2xl font-extrabold uppercase">{clube.nomeCompleto}</h3>
            <p className="mt-3 text-muted">
              Preto e dourado, com a coroa no alto, o falcão em dourado e vermelho, o ano de fundação ({clube.fundacao})
              e uma estrela.
            </p>
            <p className="mt-4 font-display text-lg text-gold-light">“{clube.slogan}”</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center rounded-xl border border-line bg-card p-6">
          <Image src={clube.logo} alt={`Logo do ${clube.nomeCompleto}`} width={420} height={179} className="h-auto w-full max-w-md" />
        </div>
      </Secao>

      <Secao titulo="Uniformes">
        <div className="grid gap-4 sm:grid-cols-2">
          {edicoesAntigas.map((e) => (
            <div key={e.slug} className="flex items-center gap-4 rounded-lg border border-line bg-card p-4">
              <span
                className="h-14 w-14 shrink-0 rounded-lg border-2 border-gold"
                style={{ background: e.corUniforme }}
                aria-hidden
              />
              <span>
                <span className="block font-display text-lg font-semibold uppercase">{e.uniforme}</span>
                <span className="text-sm text-muted">
                  {e.nome} · {e.mes}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Secao>

      <Secao titulo="Galeria">
        <div className="grid gap-6 md:grid-cols-2">
          {edicoesRecentes.map((e) => (
            <figure key={e.slug}>
              <Foto src={e.foto} alt={e.fotoLegenda} />
              <figcaption className="mt-2 text-sm text-muted">
                <strong className="text-foreground">{e.nome}.</strong> {e.fotoLegenda}
              </figcaption>
            </figure>
          ))}
        </div>
      </Secao>
    </div>
  );
}
