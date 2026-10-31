import { AutorController } from "./controllers/AutorController";
import { ClienteController } from "./controllers/ClienteController";
import { LivroController } from "./controllers/LivroController";
import { carregarDadosIniciais } from "./data/seed";
import { criarMenuPrincipal } from "./menus/criarMenuPrincipal";
import { EntradaEncerradaError } from "./models/erros";
import { AutorRepository } from "./repositories/AutorRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { AutorService } from "./services/AutorService";
import { ClienteService } from "./services/ClienteService";
import { LivroService } from "./services/LivroService";
import { descreverErro, exibirErro } from "./utils/mensagens";
import { Terminal } from "./utils/Terminal";

async function main(): Promise<void> {
  const terminal = new Terminal();

  try {
    const autorRepository = new AutorRepository();
    const livroRepository = new LivroRepository();
    const clienteRepository = new ClienteRepository();
    await carregarDadosIniciais({
      autores: autorRepository,
      livros: livroRepository,
      clientes: clienteRepository,
    });

    const autorService = new AutorService(autorRepository, livroRepository);
    const livroService = new LivroService(livroRepository, autorRepository);
    const clienteService = new ClienteService(clienteRepository);

    const menuPrincipal = criarMenuPrincipal(
      {
        autores: new AutorController(autorService, terminal),
        livros: new LivroController(livroService, terminal),
        clientes: new ClienteController(clienteService, terminal),
      },
      terminal,
    );
    await menuPrincipal.iniciar();
    console.log("\nAplicação encerrada. Até logo!");
  } catch (erro) {
    if (!(erro instanceof EntradaEncerradaError)) {
      exibirErro(descreverErro(erro));
      process.exitCode = 1;
    }
  } finally {
    terminal.fechar();
  }
}

void main();
