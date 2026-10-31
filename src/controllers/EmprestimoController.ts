import type { EmprestimoService } from "../services/EmprestimoService";
import { formatarEmprestimo } from "../utils/formatadores";
import { exibirLista, exibirSucesso } from "../utils/mensagens";
import type { Terminal } from "../utils/Terminal";

export class EmprestimoController {
  constructor(
    private readonly emprestimoService: EmprestimoService,
    private readonly terminal: Terminal,
  ) {}

  public async realizar(): Promise<void> {
    const livroId = await this.terminal.perguntarIdentificador("ID do livro");
    const clienteId = await this.terminal.perguntarIdentificador("ID do cliente");

    const detalhes = await this.emprestimoService.realizar(livroId, clienteId);
    exibirSucesso(`Empréstimo registrado: ${formatarEmprestimo(detalhes)}`);
  }

  public async registrarDevolucao(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do empréstimo");
    const detalhes = await this.emprestimoService.registrarDevolucao(id);
    exibirSucesso(`Devolução registrada: ${formatarEmprestimo(detalhes)}`);
  }

  public async listar(): Promise<void> {
    const emprestimos = await this.emprestimoService.listar();
    exibirLista(emprestimos, "Nenhum empréstimo cadastrado.", formatarEmprestimo);
  }

  public async listarAtivos(): Promise<void> {
    const emprestimos = await this.emprestimoService.listarAtivos();
    exibirLista(emprestimos, "Nenhum empréstimo ativo.", formatarEmprestimo);
  }

  public async consultar(): Promise<void> {
    const id = await this.terminal.perguntarIdentificador("ID do empréstimo");
    console.log(formatarEmprestimo(await this.emprestimoService.buscarPorId(id)));
  }
}
