import type { AutorService } from "../services/AutorService";
import { formatarAutor } from "../utils/formatadores";
import { exibirLista, exibirSucesso } from "../utils/mensagens";
import type { Terminal } from "../utils/Terminal";

export class AutorController {
  constructor(
    private readonly autorService: AutorService,
    private readonly terminal: Terminal,
  ) {}

  public async cadastrar(): Promise<void> {
    const nome = await this.terminal.perguntar("Nome: ");
    const nacionalidade = await this.terminal.perguntar("Nacionalidade: ");

    const autor = await this.autorService.cadastrar({ nome, nacionalidade });
    exibirSucesso(`Autor cadastrado: ${formatarAutor(autor)}`);
  }

  public async listar(): Promise<void> {
    const autores = await this.autorService.listar();
    exibirLista(autores, "Nenhum autor cadastrado.", formatarAutor);
  }

  public async consultar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do autor");
    const autor = await this.autorService.buscarPorId(id);
    console.log(formatarAutor(autor));
  }

  public async atualizar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do autor");
    const autorAtual = await this.autorService.buscarPorId(id);

    console.log("Pressione Enter para manter o valor atual.");
    const nome = await this.terminal.perguntarComPadrao("Nome", autorAtual.nome);
    const nacionalidade = await this.terminal.perguntarComPadrao("Nacionalidade", autorAtual.nacionalidade);

    const autor = await this.autorService.atualizar(id, { nome, nacionalidade });
    exibirSucesso(`Autor atualizado: ${formatarAutor(autor)}`);
  }

  public async remover(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do autor");
    await this.autorService.remover(id);
    exibirSucesso(`Autor com ID ${id} removido.`);
  }
}
