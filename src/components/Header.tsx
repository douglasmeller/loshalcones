import Image from "next/image";
import Link from "next/link";
import CabecalhoFixo from "./CabecalhoFixo";
import MenuMobile from "./MenuMobile";
import NavLinks from "./NavLinks";
import { clube } from "@/data/clube";

const links = [
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
    <CabecalhoFixo>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" aria-label={`${clube.nomeCompleto}, página inicial`} className="logo-link shrink-0">
          <Image src={clube.logo} alt={clube.nomeCompleto} width={136} height={58} priority className="h-12 w-auto" />
        </Link>
        <NavLinks links={links} />
        <MenuMobile links={links} />
      </div>
    </CabecalhoFixo>
  );
}
