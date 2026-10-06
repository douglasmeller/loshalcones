// Todo mundo que já vestiu a camisa do Halcones, uma vez só por pessoa.
// Número e gols de cada torneio ficam em edicoes.ts, no elenco de cada edição.
// "jogos" só está preenchido quando sabemos o número certo.
// Para colocar foto: salve em /public/jogadores e preencha foto: "/jogadores/arquivo.jpg".

export type Jogador = {
  slug: string;
  apelido: string;
  nome: string;
  goleiro?: boolean;
  capitao?: boolean;
  jogos?: number;
  foto?: string;
};

export const jogadores: Jogador[] = [
  { slug: "lucas-guirado", apelido: "Lucas Guirado", nome: "Lucas Augusto Rodrigues Guirado", capitao: true, jogos: 11 },
  { slug: "silvarenga", apelido: "Silvarenga", nome: "Gabriel Silvarenga", jogos: 5 },
  { slug: "falaschi", apelido: "Falaschi", nome: "Felipe Falaschi Cadedo", goleiro: true, jogos: 11 },
  { slug: "doug", apelido: "Doug", nome: "Douglas Fabiano Guirado" },
  { slug: "douglas", apelido: "Douglas", nome: "Douglas Meller Guirado" },
  { slug: "guiradinho", apelido: "Guiradinho", nome: "Joshua Filipe Rodrigues Guirado" },
  { slug: "gringo", apelido: "Gringo", nome: "Diego Povidaiko" },
  { slug: "ricardo", apelido: "Ricardo", nome: "Ricardo Augusto Guirado" },
  { slug: "enzo", apelido: "Enzo", nome: "Enzo Yugo Miyamoto Rosada" },
  { slug: "luizin", apelido: "Luizin", nome: "Luiz Felipe Angeli" },
  { slug: "miranda", apelido: "Mirandinha", nome: "Arthur Miranda", jogos: 3 },
  { slug: "euclides", apelido: "Euclides", nome: "Euclides Cortês Guirado" },
  { slug: "joao-paulo", apelido: "João Paulo", nome: "João Paulo Campiolo Almeida" },
  { slug: "joao", apelido: "João", nome: "João" },
  { slug: "will", apelido: "Will", nome: "William Andrade" },
  { slug: "joao-lucas", apelido: "João Lucas", nome: "João Lucas Marinelli" },
  { slug: "samu", apelido: "Samu", nome: "Samuel" },
  { slug: "sacoman", apelido: "Sacoman", nome: "Guilherme Sacoman Navarrete" },
  { slug: "saulo", apelido: "Saulo", nome: "Saulo Melo Neto" },
  { slug: "bronzetti", apelido: "Bronzetti", nome: "Eduardo Bronzetti" },
];

export function acharJogador(slug: string) {
  return jogadores.find((j) => j.slug === slug);
}
