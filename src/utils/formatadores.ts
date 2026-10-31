import type { Autor } from "../models/Autor";
import type { Cliente } from "../models/Cliente";
import type { EmprestimoDetalhado } from "../models/Emprestimo";
import type { LivroDetalhado } from "../models/Livro";

export function formatarData(data: Date): string {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${data.getFullYear()}`;
}

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

export function formatarEmprestimo({ emprestimo, tituloLivro, nomeCliente }: EmprestimoDetalhado): string {
  const devolucao = emprestimo.dataDevolucao ? ` | Devolução: ${formatarData(emprestimo.dataDevolucao)}` : "";
  return (
    `#${emprestimo.id} - Livro: ${tituloLivro} | Cliente: ${nomeCliente} | ` +
    `Empréstimo: ${formatarData(emprestimo.dataEmprestimo)}${devolucao} | Status: ${emprestimo.status}`
  );
}
