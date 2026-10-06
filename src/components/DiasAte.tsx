"use client";

import { useSyncExternalStore } from "react";

// Calcula no navegador, para o número não ficar congelado no dia em que o site foi publicado.
function diasAte(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return Math.round((new Date(a, m - 1, d).getTime() - hoje.getTime()) / 86_400_000);
}

const assinar = () => () => {};

export default function DiasAte({ data }: { data: string }) {
  const dias = useSyncExternalStore(
    assinar,
    () => diasAte(data),
    () => null,
  );

  if (dias === null) return <span className="opacity-0">…</span>;
  if (dias > 1) return <>faltam {dias} dias</>;
  if (dias === 1) return <>é amanhã</>;
  if (dias === 0) return <>é hoje</>;
  return <>já passou</>;
}
