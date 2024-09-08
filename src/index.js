import Evento from "./models/evento.js"
import eventoDAO from "./src/models/eventoDAO.js"

const evento1 = new Evento()

evento1.incluir().then(() => {
    console.log("evento cadastrado com sucesso")
}).catch((err) =>{
    console.log(err)
})