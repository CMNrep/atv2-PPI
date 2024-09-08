import Evento from "./models/evento.js"

const evento = new Evento("test-gravacao", "2024/12/11", "12:12", "PP", 10.00, 10, "nada nada nada, aqui nao tem nada")

// evento.incluir().then(() => {
//     console.log("evento cadastrado com sucesso")

// }).catch((err) =>{
//     console.log(err)
// })

// evento.excluir("test1").then(()=>{
//     console.log("evento excluido")
// }).catch((err) =>{
//     console.log(err)
// })

// const evento1 = new Evento("test1", "2024/12/11", "12:12", "PP", 10.00, 10, "aqui nada tem")

// evento.alterar(evento1).then(() => {
//     console.log("alterado com sucesso")
// }).catch((err) =>{
//     console.log(err)
// })


evento.consultar("").then((listaEventos) => {
    for(const evento of listaEventos) {
        console.log(evento.toString())
    }
}).catch((err) =>{
    console.log(err)
})