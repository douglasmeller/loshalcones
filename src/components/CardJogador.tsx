import Image from "next/image";
import Link from "next/link";
import type { FichaJogador } from "@/lib/calculos";

// Card estilo figurinha.
export default function CardJogador({ f }: { f: FichaJogador }) {
  return (
    <Link
      href={`/elenco/${f.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl borda-ouro bg-gradient-to-b from-card-2 to-card transition-transform hover:-translate-y-1"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
        {f.foto ? (
          <Image src={f.foto} alt={f.apelido} fill sizes="300px" className="object-cover" />
        ) : (
          <span className="font-display text-7xl font-extrabold texto-ouro opacity-90">{f.numeroAtual ?? "–"}</span>
        )}
        <div className="absolute left-3 top-3 flex gap-1">
          {f.capitao && <Tag titulo="Capitão">C</Tag>}
          {f.goleiro && <Tag titulo="Goleiro">🧤</Tag>}
        </div>
      </div>
      <div className="flex flex-1 flex-col border-t border-line p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="min-w-0 break-words font-display text-base font-semibold uppercase group-hover:text-gold sm:text-lg">
            {f.apelido}
          </h3>
          {/* Sem foto, o número já aparece grande no card. */}
          {f.foto && f.numeroAtual !== undefined && <span className="shrink-0 font-display text-gold">#{f.numeroAtual}</span>}
        </div>
        <p className="text-xs text-muted">{f.nome}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted">
          <span>
            {f.participacoes.length} {f.participacoes.length === 1 ? "edição" : "edições"}
          </span>
          <span className={f.gols > 0 ? "font-semibold text-foreground" : ""}>
            {f.gols} {f.gols === 1 ? "gol" : "gols"}
          </span>
        </div>
      </div>
    </Link>
  );
}

function Tag({ children, titulo }: { children: React.ReactNode; titulo: string }) {
  return (
    <span title={titulo} aria-label={titulo} className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-bold text-black">
      {children}
    </span>
  );
}
