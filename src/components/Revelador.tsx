"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Faz os elementos marcados com data-revelar aparecerem ao entrar na tela.
// Quem entra junto aparece em sequência (efeito cascata).
export default function Revelador() {
  const pathname = usePathname();

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        // O que já ficou para trás (pulou direto para baixo) aparece sem animação.
        entradas
          .filter((e) => !e.isIntersecting && e.boundingClientRect.bottom < 0)
          .forEach((e) => {
            e.target.classList.add("visivel");
            observador.unobserve(e.target);
          });
        const visiveis = entradas.filter((e) => e.isIntersecting);
        visiveis.forEach((e, i) => {
          const el = e.target as HTMLElement;
          const atraso = Math.min(i, 8) * 80;
          el.style.setProperty("--atraso", `${atraso}ms`);
          el.classList.add("visivel");
          observador.unobserve(el);
          // Depois de aparecer, tira o atraso para o hover responder na hora.
          setTimeout(() => el.style.setProperty("--atraso", "0ms"), atraso + 1000);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observarNovos = () =>
      document.querySelectorAll("[data-revelar]:not(.visivel)").forEach((el) => observador.observe(el));

    observarNovos();
    // Conteúdo que chega depois (streaming) também entra na animação.
    const mutacoes = new MutationObserver(observarNovos);
    mutacoes.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      mutacoes.disconnect();
    };
  }, [pathname]);

  return null;
}
