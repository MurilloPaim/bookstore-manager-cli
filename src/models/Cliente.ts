import type { Entidade } from "./Entidade";

export interface DadosCliente {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export class Cliente implements Entidade, DadosCliente {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly cpf: string,
    public readonly email: string,
    public readonly telefone: string,
  ) {}
}
