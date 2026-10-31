import { Cliente } from "../models/Cliente";
import type { DadosCliente } from "../models/Cliente";
import { RegistroDuplicadoError, RegistroNaoEncontradoError } from "../models/erros";
import type { IClienteRepository } from "../repositories/ClienteRepository";
import { exigirTexto, normalizarDigitos, normalizarEmail } from "../utils/validacoes";

const TAMANHO_CPF = 11;
const TAMANHOS_TELEFONE = [10, 11];

export class ClienteService {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  public async cadastrar(dados: DadosCliente): Promise<Cliente> {
    const dadosValidos = this.validarDados(dados);
    await this.garantirDadosUnicos(dadosValidos);

    const id = await this.clienteRepository.gerarProximoId();
    return this.clienteRepository.inserir(this.criarCliente(id, dadosValidos));
  }

  public async listar(): Promise<Cliente[]> {
    return this.clienteRepository.listarTodos();
  }

  public async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new RegistroNaoEncontradoError(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  public async atualizar(id: number, dados: DadosCliente): Promise<Cliente> {
    await this.buscarPorId(id);
    const dadosValidos = this.validarDados(dados);
    await this.garantirDadosUnicos(dadosValidos, id);

    return this.clienteRepository.atualizar(this.criarCliente(id, dadosValidos));
  }

  public async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    await this.clienteRepository.remover(id);
  }

  private criarCliente(id: number, dados: DadosCliente): Cliente {
    return new Cliente(id, dados.nome, dados.cpf, dados.email, dados.telefone);
  }

  private validarDados(dados: DadosCliente): DadosCliente {
    return {
      nome: exigirTexto(dados.nome, "Nome"),
      cpf: normalizarDigitos(dados.cpf, "CPF", [TAMANHO_CPF]),
      email: normalizarEmail(dados.email),
      telefone: normalizarDigitos(dados.telefone, "Telefone", TAMANHOS_TELEFONE),
    };
  }

  private async garantirDadosUnicos(dados: DadosCliente, idAtual?: number): Promise<void> {
    const clienteComCpf = await this.clienteRepository.buscarPorCpf(dados.cpf);
    if (clienteComCpf && clienteComCpf.id !== idAtual) {
      throw new RegistroDuplicadoError(`Já existe um cliente cadastrado com o CPF ${dados.cpf}.`);
    }

    const clienteComEmail = await this.clienteRepository.buscarPorEmail(dados.email);
    if (clienteComEmail && clienteComEmail.id !== idAtual) {
      throw new RegistroDuplicadoError(`Já existe um cliente cadastrado com o e-mail ${dados.email}.`);
    }
  }
}
