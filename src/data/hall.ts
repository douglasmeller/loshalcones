// Camisas pesadas: os nomes que marcaram a história do clube.

export type Lenda = {
  jogador: string; // slug de jogadores.ts
  numero: number;
  titulo: string;
  feitos: string[];
};

export const camisasPesadas: Lenda[] = [
  {
    jogador: "silvarenga",
    numero: 17,
    titulo: "O MVP do título",
    feitos: [
      "2 gols na final do título (2ª Meller Cup)",
      "Artilheiro da 2ª Meller Cup",
      "MVP da 2ª Meller Cup",
      "6 gols em 5 partidas pelo clube",
    ],
  },
  {
    jogador: "lucas-guirado",
    numero: 77,
    titulo: "O capitão",
    feitos: [
      "Maior artilheiro da história do clube: 10 gols em 11 partidas",
      "Capitão do clube",
      "Levou o clube à sua primeira final, com 5 dos 7 gols da 1ª Meller Cup",
    ],
  },
  {
    jogador: "falaschi",
    numero: 12,
    titulo: "O paredão",
    feitos: [
      "Jogador com mais minutos em campo pelo Halcones",
      "Esteve em campo em 100% do tempo de todas as partidas do clube",
    ],
  },
  {
    jogador: "miranda",
    numero: 7,
    titulo: "A lenda",
    feitos: ["3 jogos disputados", "1 vômito em campo", "Se aposentou no Halcones"],
  },
];
