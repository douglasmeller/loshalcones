// Uma notícia por item. A mais nova aparece primeiro.
// "data" pode ser AAAA-MM-DD ou só AAAA-MM quando não sabemos o dia.
// "corpo" é uma lista de parágrafos.

export type Noticia = {
  slug: string;
  titulo: string;
  data: string;
  resumo: string;
  foto?: string;
  corpo: string[];
};

export const noticias: Noticia[] = [
  {
    slug: "proxima-meller-cup-tem-duas-datas-possiveis",
    titulo: "Próxima Meller Cup tem duas datas possíveis",
    data: "2026-10-06",
    resumo: "O torneio deve acontecer em 28 de novembro ou 5 de dezembro de 2026.",
    corpo: [
      "A próxima Meller Cup já tem duas datas na mesa: 28 de novembro ou 5 de dezembro de 2026. A confirmação ainda não saiu.",
      "O Halcones chega como atual campeão, depois do título conquistado em julho de 2025.",
    ],
  },
  {
    slug: "los-halcones-campeao-da-meller-cup",
    titulo: "Los Halcones é campeão da Meller Cup",
    data: "2025-07",
    resumo: "4 a 0 nos Pipizudos na semifinal, 3 a 2 no Namoral na final. O título é do Halcones.",
    foto: "/fotos/meller-cup-jul-2025.jpg",
    corpo: [
      "Seis meses depois do vice na estreia, o Halcones voltou à Meller Cup de camisa preta e saiu com o título.",
      "Na semifinal, o clássico contra os Pipizudos terminou 4 a 0. Na grande final, vitória por 3 a 2 sobre o Namoral, com 2 gols de Silvarenga.",
      "Silvarenga terminou o torneio como artilheiro e MVP, com 6 gols. O capitão Lucas Guirado marcou mais 5.",
    ],
  },
  {
    slug: "estreia-com-vice-na-meller-cup",
    titulo: "Na estreia, Los Halcones é vice da Meller Cup",
    data: "2025-02",
    resumo: "O clube nasceu, foi à final no primeiro torneio e voltou para casa com a medalha de prata.",
    foto: "/fotos/meller-cup-fev-2025.webp",
    corpo: [
      "O Club de Futbol Los Halcones fez sua estreia na Meller Cup de fevereiro de 2025, de camisa vermelha.",
      "Em um único dia de jogos, o time chegou à final e terminou como vice-campeão. O capitão Lucas Guirado fez 5 dos 7 gols do clube no torneio.",
    ],
  },
];

export const noticiasRecentes = [...noticias].sort((a, b) => b.data.localeCompare(a.data));

export function acharNoticia(slug: string) {
  return noticias.find((n) => n.slug === slug);
}
