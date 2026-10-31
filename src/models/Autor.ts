import type { Entidade } from "./Entidade";

export interface DadosAutor {
  nome: string;
  nacionalidade: string;
}

export class Autor implements Entidade, DadosAutor {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly nacionalidade: string,
  ) {}
}
