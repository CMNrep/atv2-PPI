import eventoDAO from "../DAO/eventoDAO.js"

export default class Evento{
    #nome
    #data
    #horario
    #local
    #preco
    #ingressosDispo
    #descricao

    constructor(nome, data, horario, local, preco, ingressosDispo, descricao) {
        this.nome = nome;
        this.data = data;
        this.horario = horario;
        this.local = local;
        this.preco = preco;
        this.#ingressosDispo = ingressosDispo;
        this.#descricao = descricao;
    }

    //getters
    get nome() {
        return this.#nome;
    }
    get data() {
        return this.#data;
    }
    get horario() {
        return this.#horario;
    }
    get local() {
        return this.#local;
    }
    get preco() {
        return this.#preco;
    }
    get ingressosDispo() {
        return this.#ingressosDispo;
    }
    get descricao() {
        return this.#descricao;
    }
    
    //setters
    set nome(nome) {
        this.#nome = nome;
    }
    set data(data) {
        this.#data = data;
    }
    set horario(horario) {
        this.#horario = horario;
    }
    set local(local) {
        this.#local = local;
    }
    set preco(preco) {
        this.#preco = preco;
    }
    set ingressosDispo(ingressosDispo) {
        this.ingressosDispo = ingressosDispo;
    }
    set descricao(descricao) {
        this.#descricao = descricao;
    }

    //methods
    toString() {
        return `${this.#nome} \n
data: ${this.#data}
horario: ${this.#horario}
local: ${this.#local}
preco: ${this.#preco}
ingressosDisponiveis: ${this.#ingressosDispo}
descricao: ${this.#descricao}`
    }

    async incluir() {
        const eveDAO = new eventoDAO();
        await eveDAO.gravar(this);
    }
    async alterar(altEvento) {
        const eveDAO = new eventoDAO();
        await eveDAO.alterar(altEvento);
    }
    async excluir() {
        const eveDAO = new eventoDAO();
        await eveDAO.excluir(this);
    }
    async consultar(parametroBusca) {
        const eveDAO = new eventoDAO;
        return await eveDAO.consultar(parametroBusca);
    }
    
}