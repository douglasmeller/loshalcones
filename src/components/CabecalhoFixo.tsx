"use client";

import { useEffect, useState } from "react";

// Casca do cabeçalho: escurece ao rolar e mostra a barra de progresso da leitura.
export default function CabecalhoFixo({ children }: { children: React.ReactNode }) {
  const [rolou, setRolou] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let quadro = 0;
    const atualizar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setRolou(window.scrollY > 8);
        setProgresso(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur transition-[background-color,border-color,box-shadow] duration-500 ${
        rolou ? "border-line bg-background/95 shadow-[0_8px_30px_rgba(0,0,0,0.6)]" : "border-transparent bg-background/70"
      }`}
    >
      {children}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
        style={{ width: "100%", transform: `scaleX(${progresso})` }}
      />
    </header>
  );
}
