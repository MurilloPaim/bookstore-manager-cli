import type { ClienteService } from "../services/ClienteService";
import { formatarCliente } from "../utils/formatadores";
import { exibirLista, exibirSucesso } from "../utils/mensagens";
import type { Terminal } from "../utils/Terminal";

export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly terminal: Terminal,
  ) {}

  public async cadastrar(): Promise<void> {
    const nome = await this.terminal.perguntar("Nome: ");
    const cpf = await this.terminal.perguntar("CPF (11 dígitos): ");
    const email = await this.terminal.perguntar("E-mail: ");
    const telefone = await this.terminal.perguntar("Telefone com DDD: ");

    const cliente = await this.clienteService.cadastrar({ nome, cpf, email, telefone });
    exibirSucesso(`Cliente cadastrado: ${formatarCliente(cliente)}`);
  }

  public async listar(): Promise<void> {
    const clientes = await this.clienteService.listar();
    exibirLista(clientes, "Nenhum cliente cadastrado.", formatarCliente);
  }

  public async consultar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do cliente");
    const cliente = await this.clienteService.buscarPorId(id);
    console.log(formatarCliente(cliente));
  }

  public async atualizar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do cliente");
    const clienteAtual = await this.clienteService.buscarPorId(id);

    console.log("Pressione Enter para manter o valor atual.");
    const nome = await this.terminal.perguntarComPadrao("Nome", clienteAtual.nome);
    const cpf = await this.terminal.perguntarComPadrao("CPF", clienteAtual.cpf);
    const email = await this.terminal.perguntarComPadrao("E-mail", clienteAtual.email);
    const telefone = await this.terminal.perguntarComPadrao("Telefone", clienteAtual.telefone);

    const cliente = await this.clienteService.atualizar(id, { nome, cpf, email, telefone });
    exibirSucesso(`Cliente atualizado: ${formatarCliente(cliente)}`);
  }

  public async remover(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do cliente");
    await this.clienteService.remover(id);
    exibirSucesso(`Cliente com ID ${id} removido.`);
  }
}
