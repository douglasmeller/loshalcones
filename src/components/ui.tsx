import Image from "next/image";
import type { Resultado } from "@/data/edicoes";

export function Titulo({ children, sobre, sub }: { children: React.ReactNode; sobre?: string; sub?: React.ReactNode }) {
  return (
    <div className="mb-10">
      {sobre && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-halcon">{sobre}</p>}
      <h1 className="mt-1 font-display text-4xl font-extrabold uppercase texto-ouro sm:text-5xl">{children}</h1>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
      {sub && <p className="mt-4 max-w-2xl text-muted">{sub}</p>}
    </div>
  );
}

export function Secao({ titulo, children, acao }: { titulo: string; children: React.ReactNode; acao?: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold uppercase text-gold">{titulo}</h2>
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
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg borda-ouro">
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
    </div>
  );
}

export function Numero({ valor, rotulo, destaque }: { valor: React.ReactNode; rotulo: string; destaque?: boolean }) {
  return (
    <div className={`rounded-lg p-4 text-center ${destaque ? "borda-ouro bg-card-2" : "border border-line bg-card"}`}>
      <div className="font-display text-3xl font-extrabold text-gold sm:text-4xl">{valor}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-muted">{rotulo}</div>
    </div>
  );
}

export function Aviso({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-dashed border-line p-5 text-center text-sm text-muted">{children}</p>;
}
