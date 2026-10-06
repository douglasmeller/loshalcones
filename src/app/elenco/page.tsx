import type { Metadata } from "next";
import CardJogador from "@/components/CardJogador";
import { Titulo } from "@/components/ui";
import { todasAsFichas } from "@/lib/calculos";

export const metadata: Metadata = { title: "Elenco" };

export default function Elenco() {
  const fichas = todasAsFichas();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Titulo sobre="Elenco" sub={`${fichas.length} jogadores já vestiram a camisa do Halcones.`}>
        Quem já voou com a gente
      </Titulo>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {fichas.map((f) => (
          <CardJogador key={f.slug} f={f} />
        ))}
      </div>
    </div>
  );
}
