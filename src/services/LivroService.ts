import { EntradaInvalidaError, RegistroDuplicadoError, RegistroNaoEncontradoError, RegraDeNegocioError } from "../models/erros";
import { Livro } from "../models/Livro";
import type { DadosLivro, LivroDetalhado } from "../models/Livro";
import type { IAutorRepository } from "../repositories/AutorRepository";
import type { ILivroRepository } from "../repositories/LivroRepository";
import { exigirTexto, normalizarDigitos, validarAnoPublicacao } from "../utils/validacoes";

const TAMANHO_ISBN = 13;

export class LivroService {
  constructor(
    private readonly livroRepository: ILivroRepository,
    private readonly autorRepository: IAutorRepository,
  ) {}

  public async cadastrar(dados: DadosLivro): Promise<LivroDetalhado> {
    const dadosValidos = this.validarDados(dados);
    await this.garantirAutorExistente(dadosValidos.autorId);
    await this.garantirIsbnDisponivel(dadosValidos.isbn);

    const id = await this.livroRepository.gerarProximoId();
    const livro = this.criarLivro(id, dadosValidos, dadosValidos.quantidadeTotal);
    return this.detalhar(await this.livroRepository.inserir(livro));
  }

  public async listar(): Promise<LivroDetalhado[]> {
    return this.detalharTodos(await this.livroRepository.listarTodos());
  }

  public async buscarPorId(id: number): Promise<LivroDetalhado> {
    return this.detalhar(await this.obterLivro(id));
  }

  public async buscarPorTitulo(trecho: string): Promise<LivroDetalhado[]> {
    const trechoValido = exigirTexto(trecho, "Título");
    return this.detalharTodos(await this.livroRepository.buscarPorTitulo(trechoValido));
  }

  public async atualizar(id: number, dados: DadosLivro): Promise<LivroDetalhado> {
    const livroAtual = await this.obterLivro(id);
    const dadosValidos = this.validarDados(dados);
    await this.garantirAutorExistente(dadosValidos.autorId);
    await this.garantirIsbnDisponivel(dadosValidos.isbn, id);

    if (dadosValidos.quantidadeTotal < livroAtual.quantidadeEmprestada) {
      throw new RegraDeNegocioError(
        `A quantidade total não pode ser menor que os ${livroAtual.quantidadeEmprestada} exemplares emprestados.`,
      );
    }

    const quantidadeDisponivel = dadosValidos.quantidadeTotal - livroAtual.quantidadeEmprestada;
    const livro = this.criarLivro(id, dadosValidos, quantidadeDisponivel);
    return this.detalhar(await this.livroRepository.atualizar(livro));
  }

  public async remover(id: number): Promise<void> {
    await this.obterLivro(id);
    await this.livroRepository.remover(id);
  }

  private criarLivro(id: number, dados: DadosLivro, quantidadeDisponivel: number): Livro {
    return new Livro(id, dados.titulo, dados.isbn, dados.anoPublicacao, dados.autorId, dados.quantidadeTotal, quantidadeDisponivel);
  }

  private validarDados(dados: DadosLivro): DadosLivro {
    if (dados.quantidadeTotal < 1) {
      throw new EntradaInvalidaError("A quantidade total deve ser de pelo menos 1 exemplar.");
    }
    return {
      titulo: exigirTexto(dados.titulo, "Título"),
      isbn: normalizarDigitos(dados.isbn, "ISBN", [TAMANHO_ISBN]),
      anoPublicacao: validarAnoPublicacao(dados.anoPublicacao),
      autorId: dados.autorId,
      quantidadeTotal: dados.quantidadeTotal,
    };
  }

  private async obterLivro(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new RegistroNaoEncontradoError(`Livro com ID ${id} não encontrado.`);
    }
    return livro;
  }

  private async garantirAutorExistente(autorId: number): Promise<void> {
    const autor = await this.autorRepository.buscarPorId(autorId);
    if (!autor) {
      throw new RegistroNaoEncontradoError(`Autor com ID ${autorId} não encontrado.`);
    }
  }

  private async garantirIsbnDisponivel(isbn: string, idAtual?: number): Promise<void> {
    const livroExistente = await this.livroRepository.buscarPorIsbn(isbn);
    if (livroExistente && livroExistente.id !== idAtual) {
      throw new RegistroDuplicadoError(`Já existe um livro cadastrado com o ISBN ${isbn}.`);
    }
  }

  private async detalhar(livro: Livro): Promise<LivroDetalhado> {
    const autor = await this.autorRepository.buscarPorId(livro.autorId);
    return { livro, nomeAutor: autor?.nome ?? "Autor não encontrado" };
  }

  private async detalharTodos(livros: Livro[]): Promise<LivroDetalhado[]> {
    return Promise.all(livros.map((livro) => this.detalhar(livro)));
  }
}
