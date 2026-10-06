import Link from "next/link";
import type { Jogo } from "@/data/edicoes";
import { acharJogador } from "@/data/jogadores";
import { clube } from "@/data/clube";

export default function Placar({ jogo }: { jogo: Jogo }) {
  const venceu = jogo.golsPro > jogo.golsContra;
  const empatou = jogo.golsPro === jogo.golsContra;
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted">
        <span>
          {jogo.fase}
          {jogo.observacao && <span className="text-halcon"> · {jogo.observacao}</span>}
        </span>
        <span className={venceu ? "text-gold" : empatou ? "" : "text-halcon"}>
          {venceu ? "Vitória" : empatou ? "Empate" : "Derrota"}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className="font-display font-semibold uppercase">{clube.nome}</span>
        <span className="font-display text-3xl font-extrabold tabular-nums">
          {jogo.golsPro} <span className="text-muted">×</span> {jogo.golsContra}
        </span>
        <span className="text-right font-display font-semibold uppercase">{jogo.adversario}</span>
      </div>
      {jogo.marcadores && jogo.marcadores.length > 0 && (
        <p className="mt-3 text-xs text-muted">
          ⚽{" "}
          {jogo.marcadores.map((m, i) => {
            const j = acharJogador(m.jogador);
            return (
              <span key={m.jogador}>
                {i > 0 && ", "}
                <Link href={`/elenco/${m.jogador}`} className="hover:text-gold">
                  {j?.apelido ?? m.jogador}
                </Link>
                {m.gols > 1 && ` (${m.gols})`}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
}
