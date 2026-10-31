import type { Entidade } from "./Entidade";
import { RegraDeNegocioError } from "./erros";

export interface DadosLivro {
  titulo: string;
  isbn: string;
  anoPublicacao: number;
  autorId: number;
  quantidadeTotal: number;
}

export interface LivroDetalhado {
  livro: Livro;
  nomeAutor: string;
}

export class Livro implements Entidade, DadosLivro {
  private exemplaresDisponiveis: number;

  constructor(
    public readonly id: number,
    public readonly titulo: string,
    public readonly isbn: string,
    public readonly anoPublicacao: number,
    public readonly autorId: number,
    public readonly quantidadeTotal: number,
    quantidadeDisponivel: number,
  ) {
    this.exemplaresDisponiveis = quantidadeDisponivel;
  }

  public get quantidadeDisponivel(): number {
    return this.exemplaresDisponiveis;
  }

  public get quantidadeEmprestada(): number {
    return this.quantidadeTotal - this.exemplaresDisponiveis;
  }

  public registrarEmprestimo(): void {
    if (this.exemplaresDisponiveis === 0) {
      throw new RegraDeNegocioError(`O livro "${this.titulo}" não tem exemplares disponíveis.`);
    }
    this.exemplaresDisponiveis -= 1;
  }

  public registrarDevolucao(): void {
    if (this.exemplaresDisponiveis === this.quantidadeTotal) {
      throw new RegraDeNegocioError(`Todos os exemplares de "${this.titulo}" já estão disponíveis.`);
    }
    this.exemplaresDisponiveis += 1;
  }
}
