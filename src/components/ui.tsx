import Image from "next/image";
import Contador from "./Contador";
import type { Resultado } from "@/data/edicoes";

export function Titulo({ children, sobre, sub }: { children: React.ReactNode; sobre?: string; sub?: React.ReactNode }) {
  return (
    <div className="mb-10">
      {sobre && (
        <p className="hero-item text-xs font-semibold uppercase tracking-[0.3em] text-halcon" style={{ "--i": 0 } as React.CSSProperties}>
          {sobre}
        </p>
      )}
      <h1
        className="hero-item mt-1 font-display text-4xl font-extrabold uppercase brilho-ouro sm:text-5xl"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {children}
      </h1>
      <div
        className="hero-item mt-4 h-px w-24 bg-gradient-to-r from-gold to-transparent"
        style={{ "--i": 2 } as React.CSSProperties}
      />
      {sub && (
        <p className="hero-item mt-4 max-w-2xl text-muted" style={{ "--i": 3 } as React.CSSProperties}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Secao({ titulo, children, acao }: { titulo: string; children: React.ReactNode; acao?: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div data-revelar="esquerda" className="mb-5 flex items-end justify-between gap-4">
        <h2 className="flex items-center gap-3 font-display text-2xl font-semibold uppercase text-gold">
          <span className="crescer inline-block h-px w-6 bg-gold" />
          {titulo}
        </h2>
        {acao}
      </div>
      {children}
    </section>
  );
}

const estilosSelo: Record<Resultado, string> = {
  campeao: "bg-gold text-black",
  vice: "bg-zinc-300 text-black",
  outro: "bg-line text-foreground",
};

export function Selo({ resultado, children }: { resultado: Resultado; children: React.ReactNode }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${estilosSelo[resultado]}`}>
      {children}
    </span>
  );
}

export function Foto({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div data-revelar="zoom" className="group relative aspect-[3/2] w-full overflow-hidden rounded-lg borda-ouro">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
    </div>
  );
}

export function Numero({ valor, rotulo, destaque }: { valor: React.ReactNode; rotulo: string; destaque?: boolean }) {
  return (
    <div
      data-revelar
      className={`reluz rounded-lg p-4 text-center ${destaque ? "borda-ouro bg-card-2" : "border border-line bg-card"}`}
    >
      <div className="font-display text-3xl font-extrabold text-gold sm:text-4xl">
        <Contador valor={valor} />
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-muted">{rotulo}</div>
    </div>
  );
}

export function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <p data-revelar className="rounded-lg border border-dashed border-line p-5 text-center text-sm text-muted">
      {children}
    </p>
  );
}
