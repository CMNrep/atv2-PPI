import Evento from "./models/evento.js"

const evento = new Evento("test-gravacao2", "2024/12/11", "12:12", "PP", 10.00, 10, "nada nada nada, aqui nao tem nada")

// await evento.incluir().then(() => {
//     console.log("evento cadastrado com sucesso")

// }).catch((err) =>{
//     console.log(err)
// })

// const evento1 = new Evento("test-gravacao", "2024/12/11", "12:12", "PP", 10.00, 10, "aqui nada tem")

// await evento.alterar(evento1).then(() => {
//     console.log("alterado com sucesso")
// }).catch((err) =>{
//     console.log(err)
// })

// await evento.excluir("test-gravacao2").then(()=>{
//     console.log("evento excluido")
// }).catch((err) =>{
//     console.log(err)
// })

evento.consultar("hdaiwu").then((listaEventos) => {
    for(const evento of listaEventos) {
        console.log(evento.toString())
    }
}).catch((err) =>{
    console.log(err)
})
