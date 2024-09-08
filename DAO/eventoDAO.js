import dbconnect from "./dbconnector.js";
import Evento from "./models/Evento.js";

export default class eventoDAO{
    constructor() {
        this.init();
    }
    
    async init() {
        try {
            const connection = new dbconnect();
            const sql = `CREATE TABLE IF NOT EXISTS eventos (
            eve_nome VARCHAR(50) NOT NULL primary key, 
            eve_data DATETIME NOT NULL,
            eve_horario TIME NOT NULL,
            eve_local VARCHAR(50) NOT NULL,
            eve_preco DECIMAL(8,2) NOT NULL,
            eve_ingressosDispo INT NOT NULL,
            eve_descricao VARCHAR(200) NOT NULL
            )`;
            await connection.execute(sql);
            await global.poolConnections.release(connection)
            console.log("Banco de dados iniciado");
        } catch(err){
            console.log(err);
        }
    }
    
    async gravar(evento){
        if(evento instanceof Evento) {
            const connection = await dbconnect();
            const sql = `insert into eventos
            (eve_nome, eve_data, eve_horario, eve_local, eve_preco, eve_ingressosDispo, eve_descricao)
            values (? ? ? ? ? ? ? ?);`
            const parametros = [
                evento.nome,
                evento.data,
                evento.horario,
                evento.local,
                evento.preco,
                evento.ingressosDispo,
                evento.descricao
            ]
            await connection.execute(sql, parametros);
            await global.poolConnections.release(connection);
        }
    }
    async alterar(evento){
        if(evento instanceof Evento) {
            const connection = await dbconnect();
            const sql = `update eventos set 
            eve_data = ?, 
            eve_horario = ?, 
            eve_local = ?, 
            eve_preco = ?, 
            eve_ingressosDispo = ?, 
            eve_descricao = ?
            where eve_nome = ?;
           `;
            const parametros = [
                evento.data,
                evento.horario,
                evento.local,
                evento.preco,
                evento.ingressosDispo,
                evento.descricao,
                evento.nome,
            ]
            await connection.execute(sql, parametros);
            await global.poolConnections.release(connection);
        }
    }
    async excluir(evento){
        if(evento instanceof Evento){
            const connection = await dbconnect();
            const sql = `delete from evento where eve_nome = ?;`
            const parametros =[
                evento.nome
            ]
            await connection.execute(sql, parametros);
            await global.poolConnections.release(connection);
        }
    }
    async consultar(parametroBusca){
        const sql = ""
        let parametros = [];
        if(parametroBusca){
            sql = `select * from evento where eve_nome = ? order by eve_data;`
            parametros.push(parametroBusca);
        }
        else{
            sql = `select * from eventos order by eve_nome;`
        }
        
        const connection = await dbconnect();
        const [registros] = await connection.execute(sql)
        let listaEventos = [];
        for (const reg of registros){
            const evento = new Evento(
                reg.nome,
                reg.data,
                reg.horario,
                reg.local,
                reg.preco,
                reg.ingressosDispo,
                reg.descricao
            );
            listaEventos.push(evento);
        }
        await global.poolConnections.release(connection);
        return listaEventos;
    }
}