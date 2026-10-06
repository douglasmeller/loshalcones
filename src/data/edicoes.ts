// Cada torneio que o Halcones disputou. Para um torneio novo, copie um item e ajuste.
// "jogador" no elenco é o slug de jogadores.ts. "apelido" só precisa ser preenchido
// quando o jogador usou outro nome naquela edição.

export type Resultado = "campeao" | "vice" | "outro";

export type Jogo = {
  fase: string;
  adversario: string;
  golsPro: number;
  golsContra: number;
  observacao?: string;
  marcadores?: { jogador: string; gols: number }[];
};

export type Convocado = {
  jogador: string;
  numero?: number;
  gols?: number;
  apelido?: string;
};

export type Edicao = {
  slug: string;
  nome: string;
  torneio: string;
  mes: string;
  ordem: number; // AAAAMM, usado para ordenar
  resultado: Resultado;
  resultadoTexto: string;
  uniforme: string;
  corUniforme: string;
  foto: string;
  fotoLegenda: string;
  resumo: string;
  jogos: Jogo[];
  avisoJogos?: string;
  elenco: Convocado[];
  // Fotos extras da edição. Na legenda, cada quebra de linha vira um parágrafo.
  galeria?: { foto: string; legenda: string }[];
};

export const edicoes: Edicao[] = [
  {
    slug: "1-meller-cup",
    nome: "1ª Meller Cup",
    torneio: "Meller Cup",
    mes: "Fevereiro de 2025",
    ordem: 202502,
    resultado: "vice",
    resultadoTexto: "Vice-campeão",
    uniforme: "Vermelho",
    corUniforme: "#c4161c",
    foto: "/fotos/meller-cup-fev-2025.webp",
    fotoLegenda: "O primeiro Los Halcones, de vermelho, com as medalhas de vice-campeão.",
    resumo:
      "A estreia do clube. Em um único dia de jogos, o Halcones chegou à sua primeira final e terminou como vice-campeão. Lucas Guirado marcou 5 dos 7 gols do time.",
    jogos: [],
    avisoJogos: "Os placares desta edição se perderam.",
    elenco: [
      { jogador: "douglas", numero: 4, apelido: "D. Guirado" },
      { jogador: "guiradinho", numero: 14 },
      { jogador: "gringo", numero: 3 },
      { jogador: "euclides", numero: 33 },
      { jogador: "ricardo", numero: 10, gols: 1 },
      { jogador: "falaschi", numero: 12 },
      { jogador: "miranda", numero: 7, apelido: "Miranda" },
      { jogador: "joao-paulo", numero: 8 },
      { jogador: "enzo", numero: 11, gols: 1 },
      { jogador: "lucas-guirado", numero: 77, gols: 5 },
      { jogador: "joao", numero: 88 },
      { jogador: "will", numero: 28 },
    ],
  },
  {
    slug: "2-meller-cup",
    nome: "2ª Meller Cup",
    torneio: "Meller Cup",
    mes: "Julho de 2025",
    ordem: 202507,
    resultado: "campeao",
    resultadoTexto: "Campeão",
    uniforme: "Preto",
    corUniforme: "#111111",
    foto: "/fotos/meller-cup-jul-2025.jpg",
    fotoLegenda: "O Los Halcones de preto, campeão da Meller Cup, com a taça no meio do grupo.",
    resumo:
      "O primeiro título. De preto, o Halcones passou pelos Pipizudos no clássico da semifinal e venceu o Namoral na grande final. Silvarenga fez 2 gols na decisão e saiu como artilheiro, MVP, e com o prêmio de gol mais bonito. Falaschi foi eleito o melhor goleiro do torneio. O Halcones papou tudo e todos.",
    jogos: [
      { fase: "Semifinal", adversario: "Pipizudos", golsPro: 4, golsContra: 0, observacao: "Clássico" },
      {
        fase: "Final",
        adversario: "Namoral",
        golsPro: 3,
        golsContra: 2,
        marcadores: [{ jogador: "silvarenga", gols: 2 }],
      },
    ],
    avisoJogos: "Só a semifinal e a final foram registradas.",
    elenco: [
      { jogador: "douglas", numero: 4 },
      { jogador: "guiradinho", numero: 10, gols: 1 },
      { jogador: "luizin", numero: 8, gols: 1 },
      { jogador: "joao-lucas", numero: 55 },
      { jogador: "gringo", numero: 3 },
      { jogador: "samu", numero: 7 },
      { jogador: "silvarenga", numero: 17, gols: 6 },
      { jogador: "falaschi", numero: 12 },
      { jogador: "doug", numero: 11, gols: 3 },
      { jogador: "sacoman", numero: 5 },
      { jogador: "saulo", numero: 80 },
      { jogador: "bronzetti", numero: 9 },
      { jogador: "lucas-guirado", numero: 77, gols: 5 },
    ],
    galeria: [
      {
        foto: "/EuclidesTrofeu.jpeg",
        legenda:
          "Após a 1º Meller Cup, Euclides, aos seus 77 anos de idade, pendurou as chuteiras. Ao fim da 2ª Meller Cup, ele teve o privilégio de erguer a taça juntamente a Douglas, Guiradinho, Lucas Guirado e Doug. Seus netos, e seu filho.\nEuclides é o jogador mais velho a ter jogado pelo Los Halcones. Com 76 anos na época.",
      },
    ],
  },
];

export const edicoesRecentes = [...edicoes].sort((a, b) => b.ordem - a.ordem);
export const edicoesAntigas = [...edicoes].sort((a, b) => a.ordem - b.ordem);

export function acharEdicao(slug: string) {
  return edicoes.find((e) => e.slug === slug);
}

export function golsDaEdicao(e: Edicao) {
  return e.elenco.reduce((t, c) => t + (c.gols ?? 0), 0);
}
