import type { LivroService } from "../services/LivroService";
import { formatarLivro } from "../utils/formatadores";
import { exibirLista, exibirSucesso } from "../utils/mensagens";
import type { Terminal } from "../utils/Terminal";
import { converterIdentificador, converterInteiro } from "../utils/validacoes";

export class LivroController {
  constructor(
    private readonly livroService: LivroService,
    private readonly terminal: Terminal,
  ) {}

  public async cadastrar(): Promise<void> {
    const titulo = await this.terminal.perguntar("Título: ");
    const isbn = await this.terminal.perguntar("ISBN (13 dígitos): ");
    const anoPublicacao = await this.terminal.perguntarInteiro("Ano de publicação");
    const autorId = await this.terminal.perguntarIdentificador("ID do autor");
    const quantidadeTotal = await this.terminal.perguntarInteiro("Quantidade de exemplares");

    const detalhes = await this.livroService.cadastrar({ titulo, isbn, anoPublicacao, autorId, quantidadeTotal });
    exibirSucesso(`Livro cadastrado: ${formatarLivro(detalhes)}`);
  }

  public async listar(): Promise<void> {
    const livros = await this.livroService.listar();
    exibirLista(livros, "Nenhum livro cadastrado.", formatarLivro);
  }

  public async consultar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do livro");
    console.log(formatarLivro(await this.livroService.buscarPorId(id)));
  }

  public async buscarPorTitulo(): Promise<void> {
    const trecho = await this.terminal.perguntar("Título ou parte dele: ");
    const livros = await this.livroService.buscarPorTitulo(trecho);
    exibirLista(livros, `Nenhum livro encontrado com "${trecho.trim()}".`, formatarLivro);
  }

  public async atualizar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do livro");
    const { livro } = await this.livroService.buscarPorId(id);

    console.log("Pressione Enter para manter o valor atual.");
    const titulo = await this.terminal.perguntarComPadrao("Título", livro.titulo);
    const isbn = await this.terminal.perguntarComPadrao("ISBN", livro.isbn);
    const ano = await this.terminal.perguntarComPadrao("Ano de publicação", String(livro.anoPublicacao));
    const autorId = await this.terminal.perguntarComPadrao("ID do autor", String(livro.autorId));
    const quantidade = await this.terminal.perguntarComPadrao("Quantidade de exemplares", String(livro.quantidadeTotal));

    const detalhes = await this.livroService.atualizar(id, {
      titulo,
      isbn,
      anoPublicacao: converterInteiro(ano, "Ano de publicação"),
      autorId: converterIdentificador(autorId, "ID do autor"),
      quantidadeTotal: converterInteiro(quantidade, "Quantidade de exemplares"),
    });
    exibirSucesso(`Livro atualizado: ${formatarLivro(detalhes)}`);
  }

  public async remover(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do livro");
    await this.livroService.remover(id);
    exibirSucesso(`Livro com ID ${id} removido.`);
  }
}
