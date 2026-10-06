import Image from "next/image";
import Link from "next/link";
import { clube } from "@/data/clube";

export const links = [
  { href: "/elenco", label: "Elenco" },
  { href: "/edicoes", label: "Edições" },
  { href: "/estatisticas", label: "Estatísticas" },
  { href: "/hall-da-fama", label: "Hall da Fama" },
  { href: "/museu", label: "Museu" },
  { href: "/noticias", label: "Notícias" },
  { href: "/proxima-meller-cup", label: "Próxima Cup" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" aria-label={`${clube.nomeCompleto}, página inicial`} className="shrink-0">
          <Image src={clube.logo} alt={clube.nomeCompleto} width={136} height={58} priority className="h-12 w-auto" />
        </Link>

        <nav className="hidden gap-5 text-sm text-muted lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded border border-line px-3 py-2 text-sm text-muted">
            Menu
            <span className="transition-transform group-open:rotate-180">▾</span>
          </summary>
          <nav className="absolute right-0 mt-2 flex w-52 flex-col rounded-lg border border-line bg-card p-2 shadow-xl">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded px-3 py-2 text-sm hover:bg-card-2 hover:text-gold">
                {l.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
