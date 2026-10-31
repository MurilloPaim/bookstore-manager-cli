import { AutorController } from "./controllers/AutorController";
import { carregarDadosIniciais } from "./data/seed";
import { criarMenuPrincipal } from "./menus/criarMenuPrincipal";
import { EntradaEncerradaError } from "./models/erros";
import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { descreverErro, exibirErro } from "./utils/mensagens";
import { Terminal } from "./utils/Terminal";

async function main(): Promise<void> {
  const terminal = new Terminal();

  try {
    const autorRepository = new AutorRepository();
    await carregarDadosIniciais({ autores: autorRepository });

    const autorService = new AutorService(autorRepository);

    const menuPrincipal = criarMenuPrincipal({ autores: new AutorController(autorService, terminal) }, terminal);
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
