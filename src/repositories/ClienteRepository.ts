import type { Cliente } from "../models/Cliente";
import type { Repository } from "./Repository";
import { RepositoryEmMemoria } from "./RepositoryEmMemoria";

export interface IClienteRepository extends Repository<Cliente> {
  buscarPorCpf(cpf: string): Promise<Cliente | null>;
  buscarPorEmail(email: string): Promise<Cliente | null>;
}

export class ClienteRepository extends RepositoryEmMemoria<Cliente> implements IClienteRepository {
  public async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    const clientes = await this.listarTodos();
    return clientes.find((cliente) => cliente.cpf === cpf) ?? null;
  }

  public async buscarPorEmail(email: string): Promise<Cliente | null> {
    const clientes = await this.listarTodos();
    return clientes.find((cliente) => cliente.email === email) ?? null;
  }
}
