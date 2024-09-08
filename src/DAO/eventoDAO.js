import dbconnect from "./dbconnector.js";
import Evento from "../models/evento.js";

export default class eventoDAO{
    constructor(){
        this.init();
    }
    
    async init() {
        try {
            const conexao = await dbconnect();
            const sql = `CREATE TABLE IF NOT EXISTS eventos (
            eve_nome VARCHAR(50) NOT NULL primary key, 
            eve_data DATETIME NOT NULL,
            eve_horario TIME NOT NULL,
            eve_local VARCHAR(50) NOT NULL,
            eve_preco DECIMAL(8,2) NOT NULL,
            eve_ingressosDispo INT NOT NULL,
            eve_descricao VARCHAR(200) NOT NULL
            )`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao)
            console.log("Banco de dados iniciado");
        } catch(err){
            console.log(err);
        }
    }
    
    async gravar(evento){
        if(evento instanceof Evento) {
            const conexao = await dbconnect();
            const sql = `insert into eventos(eve_nome, eve_data, eve_horario, eve_local, eve_preco, eve_ingressosDispo, eve_descricao)
            values (?, ?, ?, ?, ?, ?, ?);`
            const parametros = [
                evento.nome,
                evento.data,
                evento.horario,
                evento.local,
                evento.preco,
                evento.ingressosDispo,
                evento.descricao
            ]
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    async alterar(evento){
        if(evento instanceof Evento) {
            const conexao = await dbconnect();
            const sql = `UPDATE eventos SET 
            eve_data = ?, 
            eve_horario = ?, 
            eve_local = ?, 
            eve_preco = ?, 
            eve_ingressosDispo = ?, 
            eve_descricao = ?
            WHERE eve_nome = ?;
        `;
        const parametros = [
            evento.data,
            evento.horario,
            evento.local,
            evento.preco,
            evento.ingressosDispo,
            evento.descricao,
            evento.nome
        ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    async excluir(evento){
        if(evento instanceof Evento){
            const conexao = await dbconnect();
            const sql = `delete from eventos where eve_nome = ?;`
            const parametros =[
                evento.nome
            ]
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    async consultar(parametroBusca){
        let sql = ""
        let parametro = [];
        if(parametroBusca){
            sql = `SELECT * FROM eventos WHERE eve_nome = ?;`;
            parametro.push(parametroBusca);
        }
        else{
            sql=`select * from eventos order by eve_nome;`
        }
        

        const conexao = await dbconnect();
        const [registros] = await conexao.execute(sql, parametro)
        let listaEventos = [];
        if(registros.length > 0){
            for (const registro of registros){
                const evento = new Evento(
                    registro.eve_nome,
                    registro.eve_data,
                    registro.eve_horario,
                    registro.eve_local,
                    registro.eve_preco,
                    registro.eve_ingressosDispo,
                    registro.eve_descricao
                );
                listaEventos.push(evento);
            }
            await global.poolConexoes.releaseConnection(conexao);
            return listaEventos;
        }else {
           listaEventos.push("evento nao encontrado");
           return listaEventos 
        }
    }
}