import type { Emprestimo } from "../models/Emprestimo";
import type { Repository } from "./Repository";
import { RepositoryEmMemoria } from "./RepositoryEmMemoria";

export interface IEmprestimoRepository extends Repository<Emprestimo> {
  listarAtivos(): Promise<Emprestimo[]>;
  listarPorLivro(livroId: number): Promise<Emprestimo[]>;
  listarPorCliente(clienteId: number): Promise<Emprestimo[]>;
  buscarAtivo(livroId: number, clienteId: number): Promise<Emprestimo | null>;
}

export class EmprestimoRepository extends RepositoryEmMemoria<Emprestimo> implements IEmprestimoRepository {
  public async listarAtivos(): Promise<Emprestimo[]> {
    const emprestimos = await this.listarTodos();
    return emprestimos.filter((emprestimo) => emprestimo.estaAtivo());
  }

  public async listarPorLivro(livroId: number): Promise<Emprestimo[]> {
    const emprestimos = await this.listarTodos();
    return emprestimos.filter((emprestimo) => emprestimo.livroId === livroId);
  }

  public async listarPorCliente(clienteId: number): Promise<Emprestimo[]> {
    const emprestimos = await this.listarTodos();
    return emprestimos.filter((emprestimo) => emprestimo.clienteId === clienteId);
  }

  public async buscarAtivo(livroId: number, clienteId: number): Promise<Emprestimo | null> {
    const ativos = await this.listarAtivos();
    return ativos.find((emprestimo) => emprestimo.livroId === livroId && emprestimo.clienteId === clienteId) ?? null;
  }
}
