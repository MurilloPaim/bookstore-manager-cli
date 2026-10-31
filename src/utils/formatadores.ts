import type { Autor } from "../models/Autor";
import type { Cliente } from "../models/Cliente";
import type { LivroDetalhado } from "../models/Livro";

export function formatarAutor(autor: Autor): string {
  return `#${autor.id} - ${autor.nome} | Nacionalidade: ${autor.nacionalidade}`;
}

export function formatarLivro({ livro, nomeAutor }: LivroDetalhado): string {
  return (
    `#${livro.id} - ${livro.titulo} | Autor: ${nomeAutor} | ISBN: ${livro.isbn} | ` +
    `Ano: ${livro.anoPublicacao} | Disponíveis: ${livro.quantidadeDisponivel}/${livro.quantidadeTotal}`
  );
}

export function formatarCliente(cliente: Cliente): string {
  return `#${cliente.id} - ${cliente.nome} | CPF: ${cliente.cpf} | E-mail: ${cliente.email} | Telefone: ${cliente.telefone}`;
}
