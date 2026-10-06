"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type ItemNav = { href: string; label: string };

function estaAtivo(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

// Navegação do desktop com a barrinha dourada que desliza até o link ativo
// (e acompanha o mouse enquanto ele passa pelos links).
export default function NavLinks({ links }: { links: ItemNav[] }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itens = useRef(new Map<string, HTMLAnchorElement>());
  const [barra, setBarra] = useState({ left: 0, width: 0, visivel: false });
  const [pronta, setPronta] = useState(false);

  const ativo = links.find((l) => estaAtivo(pathname, l.href))?.href;

  const moverPara = useCallback((href?: string) => {
    const el = href ? itens.current.get(href) : undefined;
    if (!el) {
      setBarra((b) => ({ ...b, visivel: false }));
      return;
    }
    setBarra({ left: el.offsetLeft, width: el.offsetWidth, visivel: true });
  }, []);

  useLayoutEffect(() => {
    moverPara(ativo);
    // Só liga a animação depois da primeira medida, para a barra não "voar" do canto ao carregar.
    const id = requestAnimationFrame(() => setPronta(true));
    const aoRedimensionar = () => moverPara(ativo);
    window.addEventListener("resize", aoRedimensionar);
    document.fonts?.ready.then(aoRedimensionar);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [ativo, moverPara]);

  return (
    <nav ref={navRef} className="relative hidden gap-1 text-sm lg:flex" onMouseLeave={() => moverPara(ativo)}>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          ref={(el) => {
            if (el) itens.current.set(l.href, el);
            else itens.current.delete(l.href);
          }}
          onMouseEnter={() => moverPara(l.href)}
          onFocus={() => moverPara(l.href)}
          aria-current={l.href === ativo ? "page" : undefined}
          className={`relative px-3 py-2 transition-colors duration-300 ${
            l.href === ativo ? "text-gold" : "text-muted hover:text-foreground"
          }`}
        >
          {l.label}
        </Link>
      ))}
      <span
        aria-hidden
        className={`nav-barra pointer-events-none absolute -bottom-[9px] h-[3px] rounded-full ${pronta ? "nav-barra-animada" : ""}`}
        style={{
          transform: `translateX(${barra.left}px)`,
          width: barra.width,
          opacity: barra.visivel ? 1 : 0,
        }}
      />
    </nav>
  );
}
