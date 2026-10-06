// Próxima Meller Cup. Quando a data for confirmada, preencha "dataConfirmada"
// (AAAA-MM-DD) e a página passa a mostrar só ela.
// "confirmados" recebe slugs de jogadores.ts.

export const proxima = {
  nome: "Próxima Meller Cup",
  datasPossiveis: ["2026-11-28", "2026-12-05"],
  dataConfirmada: null as string | null,
  local: null as string | null,
  confirmados: [] as string[],
};
