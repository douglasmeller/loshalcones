function paraData(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d ?? 1);
}

// "2025-07" vira "julho de 2025"; "2026-11-28" vira "28 de novembro de 2026".
export function formatarData(iso: string) {
  const data = paraData(iso);
  const temDia = iso.split("-").length === 3;
  return data.toLocaleDateString("pt-BR", {
    ...(temDia ? { day: "numeric" } : {}),
    month: "long",
    year: "numeric",
  });
}

export function formatarDataCurta(iso: string) {
  return paraData(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function diaDaSemana(iso: string) {
  return paraData(iso).toLocaleDateString("pt-BR", { weekday: "long" });
}
