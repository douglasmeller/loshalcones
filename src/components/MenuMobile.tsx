"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ItemNav } from "./NavLinks";

export default function MenuMobile({ links }: { links: ItemNav[] }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  // Fecha o menu quando a página muda.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded border border-line px-3 py-2 text-sm text-muted">
        Menu
        <span className="transition-transform duration-300 group-open:rotate-180">▾</span>
      </summary>
      <nav className="menu-mobile absolute right-0 mt-2 flex w-56 flex-col rounded-lg border border-line bg-card p-2 shadow-2xl">
        {links.map((l, i) => {
          const ativo = pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              style={{ "--i": i } as React.CSSProperties}
              className={`menu-item relative rounded px-3 py-2 text-sm hover:bg-card-2 ${
                ativo ? "bg-card-2 text-gold" : "hover:text-gold"
              }`}
            >
              {ativo && <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gold" />}
              {l.label}
            </Link>
          );
        })}
      </nav>
    </details>
  );
}
