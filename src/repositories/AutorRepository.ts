import type { Autor } from "../models/Autor";
import { textosIguais } from "../utils/validacoes";
import type { Repository } from "./Repository";
import { RepositoryEmMemoria } from "./RepositoryEmMemoria";

export interface IAutorRepository extends Repository<Autor> {
  buscarPorNome(nome: string): Promise<Autor | null>;
}

export class AutorRepository extends RepositoryEmMemoria<Autor> implements IAutorRepository {
  public async buscarPorNome(nome: string): Promise<Autor | null> {
    const autores = await this.listarTodos();
    return autores.find((autor) => textosIguais(autor.nome, nome)) ?? null;
  }
}
