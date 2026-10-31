import { Autor } from "../models/Autor";
import type { IAutorRepository } from "../repositories/AutorRepository";

export interface RepositoriosAplicacao {
  autores: IAutorRepository;
}

const autoresIniciais: Autor[] = [
  new Autor(1, "Machado de Assis", "Brasileira"),
  new Autor(2, "Clarice Lispector", "Brasileira"),
  new Autor(3, "Jorge Amado", "Brasileira"),
  new Autor(4, "George Orwell", "Britânica"),
  new Autor(5, "Agatha Christie", "Britânica"),
  new Autor(6, "Cecília Meireles", "Brasileira"),
];

export async function carregarDadosIniciais(repositorios: RepositoriosAplicacao): Promise<void> {
  for (const autor of autoresIniciais) {
    await repositorios.autores.inserir(autor);
  }
}
