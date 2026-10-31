import { Autor } from "../models/Autor";
import type { DadosAutor } from "../models/Autor";
import { RegistroDuplicadoError, RegistroNaoEncontradoError, RegraDeNegocioError } from "../models/erros";
import type { IAutorRepository } from "../repositories/AutorRepository";
import type { ILivroRepository } from "../repositories/LivroRepository";
import { exigirTexto } from "../utils/validacoes";

export class AutorService {
  constructor(
    private readonly autorRepository: IAutorRepository,
    private readonly livroRepository: ILivroRepository,
  ) {}

  public async cadastrar(dados: DadosAutor): Promise<Autor> {
    const dadosValidos = this.validarDados(dados);
    await this.garantirNomeDisponivel(dadosValidos.nome);

    const id = await this.autorRepository.gerarProximoId();
    return this.autorRepository.inserir(new Autor(id, dadosValidos.nome, dadosValidos.nacionalidade));
  }

  public async listar(): Promise<Autor[]> {
    return this.autorRepository.listarTodos();
  }

  public async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);
    if (!autor) {
      throw new RegistroNaoEncontradoError(`Autor com ID ${id} não encontrado.`);
    }
    return autor;
  }

  public async atualizar(id: number, dados: DadosAutor): Promise<Autor> {
    await this.buscarPorId(id);
    const dadosValidos = this.validarDados(dados);
    await this.garantirNomeDisponivel(dadosValidos.nome, id);

    return this.autorRepository.atualizar(new Autor(id, dadosValidos.nome, dadosValidos.nacionalidade));
  }

  public async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    const livrosDoAutor = await this.livroRepository.listarPorAutor(id);
    if (livrosDoAutor.length > 0) {
      throw new RegraDeNegocioError(`O autor com ID ${id} possui ${livrosDoAutor.length} livro(s) cadastrado(s) e não pode ser removido.`);
    }

    await this.autorRepository.remover(id);
  }

  private validarDados(dados: DadosAutor): DadosAutor {
    return {
      nome: exigirTexto(dados.nome, "Nome"),
      nacionalidade: exigirTexto(dados.nacionalidade, "Nacionalidade"),
    };
  }

  private async garantirNomeDisponivel(nome: string, idAtual?: number): Promise<void> {
    const autorExistente = await this.autorRepository.buscarPorNome(nome);
    if (autorExistente && autorExistente.id !== idAtual) {
      throw new RegistroDuplicadoError(`Já existe um autor cadastrado com o nome "${nome}".`);
    }
  }
}
