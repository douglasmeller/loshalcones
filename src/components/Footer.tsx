import Image from "next/image";
import { clube } from "@/data/clube";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
        <Image src={clube.escudo} alt={`Escudo do ${clube.nome}`} width={56} height={56} />
        <p className="font-display text-lg texto-ouro">{clube.slogan}</p>
        <p className="text-xs text-muted">
          {clube.nomeCompleto} · {clube.sigla} · desde {clube.fundacao}
        </p>
      </div>
    </footer>
  );
}
