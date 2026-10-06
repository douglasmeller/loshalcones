import { edicoesAntigas, type Edicao } from "@/data/edicoes";
import { jogadores, type Jogador } from "@/data/jogadores";

export type Participacao = {
  edicao: Edicao;
  numero?: number;
  gols: number;
  apelido: string;
};

export type FichaJogador = Jogador & {
  participacoes: Participacao[];
  gols: number;
  numeroAtual?: number;
};

export function fichaDe(j: Jogador): FichaJogador {
  const participacoes: Participacao[] = [];
  for (const e of edicoesAntigas) {
    const c = e.elenco.find((x) => x.jogador === j.slug);
    if (c) participacoes.push({ edicao: e, numero: c.numero, gols: c.gols ?? 0, apelido: c.apelido ?? j.apelido });
  }
  return {
    ...j,
    participacoes,
    gols: participacoes.reduce((t, p) => t + p.gols, 0),
    numeroAtual: participacoes.at(-1)?.numero,
  };
}

// Mais gols primeiro, depois quem jogou mais edições, depois ordem alfabética.
export function todasAsFichas() {
  return jogadores
    .map(fichaDe)
    .sort(
      (a, b) =>
        b.gols - a.gols ||
        b.participacoes.length - a.participacoes.length ||
        a.apelido.localeCompare(b.apelido, "pt-BR"),
    );
}

export function artilharia() {
  return todasAsFichas().filter((f) => f.gols > 0);
}

// Posição com empate: quem tem os mesmos gols divide a colocação (1, 2, 3, 4, 4, 4...).
export function comPosicao<T extends { gols: number }>(lista: T[]) {
  return lista.map((item, i) => ({
    ...item,
    posicao: lista.findIndex((x) => x.gols === item.gols) + 1,
    empatado: lista.filter((x) => x.gols === item.gols).length > 1,
    indice: i,
  }));
}
