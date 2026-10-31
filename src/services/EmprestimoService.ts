import type { Cliente } from "../models/Cliente";
import { Emprestimo } from "../models/Emprestimo";
import type { EmprestimoDetalhado } from "../models/Emprestimo";
import { RegistroDuplicadoError, RegistroNaoEncontradoError } from "../models/erros";
import type { Livro } from "../models/Livro";
import type { IClienteRepository } from "../repositories/ClienteRepository";
import type { IEmprestimoRepository } from "../repositories/EmprestimoRepository";
import type { ILivroRepository } from "../repositories/LivroRepository";

export class EmprestimoService {
  constructor(
    private readonly emprestimoRepository: IEmprestimoRepository,
    private readonly livroRepository: ILivroRepository,
    private readonly clienteRepository: IClienteRepository,
  ) {}

  public async realizar(livroId: number, clienteId: number): Promise<EmprestimoDetalhado> {
    const livro = await this.obterLivro(livroId);
    const cliente = await this.obterCliente(clienteId);

    const emprestimoAtivo = await this.emprestimoRepository.buscarAtivo(livroId, clienteId);
    if (emprestimoAtivo) {
      throw new RegistroDuplicadoError(`${cliente.nome} já está com um exemplar de "${livro.titulo}".`);
    }

    livro.registrarEmprestimo();
    await this.livroRepository.atualizar(livro);

    const id = await this.emprestimoRepository.gerarProximoId();
    const emprestimo = await this.emprestimoRepository.inserir(new Emprestimo(id, livroId, clienteId, new Date()));
    return { emprestimo, tituloLivro: livro.titulo, nomeCliente: cliente.nome };
  }

  public async registrarDevolucao(id: number): Promise<EmprestimoDetalhado> {
    const emprestimo = await this.obterEmprestimo(id);
    const livro = await this.obterLivro(emprestimo.livroId);

    emprestimo.registrarDevolucao(new Date());
    await this.emprestimoRepository.atualizar(emprestimo);

    livro.registrarDevolucao();
    await this.livroRepository.atualizar(livro);

    return this.detalhar(emprestimo);
  }

  public async listar(): Promise<EmprestimoDetalhado[]> {
    return this.detalharTodos(await this.emprestimoRepository.listarTodos());
  }

  public async listarAtivos(): Promise<EmprestimoDetalhado[]> {
    return this.detalharTodos(await this.emprestimoRepository.listarAtivos());
  }

  public async buscarPorId(id: number): Promise<EmprestimoDetalhado> {
    return this.detalhar(await this.obterEmprestimo(id));
  }

  private async obterEmprestimo(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.buscarPorId(id);
    if (!emprestimo) {
      throw new RegistroNaoEncontradoError(`Empréstimo com ID ${id} não encontrado.`);
    }
    return emprestimo;
  }

  private async obterLivro(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new RegistroNaoEncontradoError(`Livro com ID ${id} não encontrado.`);
    }
    return livro;
  }

  private async obterCliente(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new RegistroNaoEncontradoError(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  private async detalhar(emprestimo: Emprestimo): Promise<EmprestimoDetalhado> {
    const livro = await this.obterLivro(emprestimo.livroId);
    const cliente = await this.obterCliente(emprestimo.clienteId);
    return { emprestimo, tituloLivro: livro.titulo, nomeCliente: cliente.nome };
  }

  private async detalharTodos(emprestimos: Emprestimo[]): Promise<EmprestimoDetalhado[]> {
    return Promise.all(emprestimos.map((emprestimo) => this.detalhar(emprestimo)));
  }
}
