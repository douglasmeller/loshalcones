"use client";

import { useEffect, useRef, useState } from "react";

// Conta de 0 até o valor quando aparece na tela. Aceita "79%", "+14", "11"...
// Valores que não são número (ex: "🏆", "–") aparecem como estão.
export default function Contador({ valor }: { valor: React.ReactNode }) {
  const texto = typeof valor === "number" ? String(valor) : typeof valor === "string" ? valor : null;
  const partes = texto?.match(/^([+-]?)(\d+)(.*)$/);
  const alvo = partes ? Number(partes[2]) : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(alvo);

  useEffect(() => {
    const el = ref.current;
    if (!partes || !el || alvo === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let quadro = 0;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observador.disconnect();
        const duracao = 1100;
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          setAtual(Math.round(alvo * (1 - Math.pow(1 - t, 4))));
          if (t < 1) quadro = requestAnimationFrame(passo);
        };
        setAtual(0);
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );
    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alvo]);

  if (!partes) return <>{valor}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {partes[1]}
      {atual}
      {partes[3]}
    </span>
  );
}
