// Próxima Meller Cup. Quando a data for confirmada, preencha "dataConfirmada"
// (AAAA-MM-DD) e a página passa a mostrar só ela.
// "elenco" lista os convocados: "jogador" é o slug de jogadores.ts.
// Depois do torneio, mova o elenco para uma edição nova em edicoes.ts.

export const proxima = {
  nome: "Próxima Meller Cup",
  datasPossiveis: ["2026-11-28", "2026-12-05"],
  dataConfirmada: "2026-12-05" as string | null,
  local: null as string | null,
  elenco: [
    { jogador: "gringo", numero: 3 },
    { jogador: "douglas", numero: 4 },
    { jogador: "gustavo", numero: 6 },
    { jogador: "will", numero: 7 },
    { jogador: "ricardo", numero: 8, apelido: "R.Guirado" },
    { jogador: "morrone", numero: 9 },
    { jogador: "lucas-guirado", numero: 10, apelido: "Guirado" },
    { jogador: "galego", numero: 11 },
    { jogador: "falaschi", numero: 12 },
    { jogador: "guiradinho", numero: 14 },
    { jogador: "joao-g", numero: 17 },
    { jogador: "guizao", numero: 22 },
    { jogador: "renan-bicudo", numero: 30 },
    { jogador: "sacoman", numero: 67 },
    { jogador: "diogo-s", numero: 99 },
  ] as { jogador: string; numero: number; apelido?: string }[],
};
