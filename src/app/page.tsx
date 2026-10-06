import Image from "next/image";
import Link from "next/link";
import DiasAte from "@/components/DiasAte";
import { Foto, Numero, Secao, Selo } from "@/components/ui";
import { campanhaGeral as c, clube } from "@/data/clube";
import { edicoesRecentes } from "@/data/edicoes";
import { camisasPesadas } from "@/data/hall";
import { acharJogador } from "@/data/jogadores";
import { noticiasRecentes } from "@/data/noticias";
import { proxima } from "@/data/proxima";
import { formatarData } from "@/lib/datas";

export default function Inicio() {
  const ultima = edicoesRecentes[0];
  const datas = proxima.dataConfirmada ? [proxima.dataConfirmada] : proxima.datasPossiveis;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="grid items-center gap-10 py-12 md:grid-cols-[1fr_auto] md:py-16">
        <div className="order-2 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-halcon">Club de Futbol</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none texto-ouro sm:text-7xl">
            Los Halcones
          </h1>
          <p className="mt-5 font-display text-xl text-gold-light">“{clube.slogan}”</p>
          <p className="mt-4 max-w-md text-muted">
            {clube.descricao} {clube.sigla}, desde {clube.fundacao}.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/elenco" className="rounded bg-gold px-5 py-2.5 text-sm font-bold text-black hover:bg-gold-light">
              Conheça o elenco
            </Link>
            <Link href="/edicoes" className="rounded border border-line px-5 py-2.5 text-sm hover:border-gold hover:text-gold">
              Nossa história
            </Link>
          </div>
        </div>
        <Image
          src={clube.escudo}
          alt={`Escudo do ${clube.nomeCompleto}`}
          width={340}
          height={340}
          priority
          className="order-1 mx-auto w-52 drop-shadow-[0_0_40px_rgba(224,176,60,0.25)] sm:w-72 md:order-2 md:w-[340px]"
        />
      </section>

      <Link
        href="/proxima-meller-cup"
        className="flex flex-col gap-3 rounded-xl borda-ouro bg-gradient-to-r from-card-2 via-card to-card p-5 transition-colors hover:border-gold sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-halcon">{proxima.nome}</p>
          <p className="mt-1 font-display text-xl font-semibold">
            {datas.map((d) => formatarData(d)).join(" ou ")}
          </p>
          {!proxima.dataConfirmada && <p className="text-xs text-muted">Data ainda não confirmada</p>}
        </div>
        <p className="font-display text-2xl font-extrabold text-gold">
          <DiasAte data={datas[0]} />
        </p>
      </Link>

      <Secao titulo="Em números" acao={<MaisLink href="/estatisticas">Estatísticas</MaisLink>}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          <Numero valor={c.partidas} rotulo="Partidas" />
          <Numero valor={c.vitorias} rotulo="Vitórias" destaque />
          <Numero valor={c.empates} rotulo="Empates" />
          <Numero valor={c.derrotas} rotulo="Derrotas" />
          <Numero valor={c.golsMarcados} rotulo="Gols pró" />
          <Numero valor={c.golsSofridos} rotulo="Gols contra" />
        </div>
      </Secao>

      <Secao titulo="Atual campeão" acao={<MaisLink href={`/edicoes/${ultima.slug}`}>Ver edição</MaisLink>}>
        <div className="grid items-center gap-6 md:grid-cols-[3fr_2fr]">
          <Foto src={ultima.foto} alt={ultima.fotoLegenda} />
          <div>
            <Selo resultado={ultima.resultado}>{ultima.resultadoTexto}</Selo>
            <h3 className="mt-3 font-display text-3xl font-extrabold uppercase">{ultima.nome}</h3>
            <p className="text-sm text-muted">{ultima.mes}</p>
            <p className="mt-4">{ultima.resumo}</p>
          </div>
        </div>
      </Secao>

      <Secao titulo="Camisas pesadas" acao={<MaisLink href="/hall-da-fama">Hall da Fama</MaisLink>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {camisasPesadas.map((l) => (
            <Link
              key={l.jogador}
              href={`/elenco/${l.jogador}`}
              className="rounded-lg border border-line bg-card p-4 transition-colors hover:border-gold"
            >
              <div className="font-display text-4xl font-extrabold texto-ouro">{l.numero}</div>
              <div className="mt-1 font-display font-semibold uppercase">{acharJogador(l.jogador)?.apelido}</div>
              <div className="text-xs text-muted">{l.titulo}</div>
            </Link>
          ))}
        </div>
      </Secao>

      <Secao titulo="Últimas notícias" acao={<MaisLink href="/noticias">Todas</MaisLink>}>
        <ul className="divide-y divide-line border-y border-line">
          {noticiasRecentes.slice(0, 3).map((n) => (
            <li key={n.slug}>
              <Link href={`/noticias/${n.slug}`} className="group block py-4">
                <span className="text-xs uppercase tracking-wider text-muted">{formatarData(n.data)}</span>
                <span className="block font-display text-lg font-semibold group-hover:text-gold">{n.titulo}</span>
                <span className="block text-sm text-muted">{n.resumo}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>
    </div>
  );
}

function MaisLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="shrink-0 text-sm text-muted hover:text-gold">
      {children} →
    </Link>
  );
}
