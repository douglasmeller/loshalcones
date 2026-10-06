"use client";

import { useRef } from "react";

// Inclina o conteúdo em 3D seguindo o mouse e move um brilho dourado por cima.
export default function Inclinar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function mover(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.dataset.ativo = "1";
  }

  function sair() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.ativo;
  }

  return (
    <div ref={ref} onPointerMove={mover} onPointerLeave={sair} className={`inclinar ${className}`}>
      {children}
      <span aria-hidden className="inclinar-brilho" />
    </div>
  );
}
