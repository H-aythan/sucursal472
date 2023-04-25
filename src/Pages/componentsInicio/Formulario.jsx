import React from 'react'
import logo472 from '../../assets/472/472logo.jpg'
import finalForm from '../../assets/472/footerForm.jpg'
import f4 from '../../assets/472/f4.jpg'
import { useState } from 'react'
import Modal from './Modal'
import { useLayoutEffect } from 'react'
import FormPay from './FormPay'
import InputSimple from './InputSimple'
const initialState = {
  CI: "",
  name: "",
  apellido: "",
  cel: "",
  email: "",
  direc: "",
  city: ""
}

const Form = () => {
  const [modal, setModal] = useState(false)
  const [infoPay, setInfoPay] = useState(initialState)
  const [showForm, setShowForm] = useState(false)
  const [notification, setNotification] = useState({})

  const handlerChange = (e) => {
    setInfoPay({ ...infoPay, [e.target.name]: e.target.value })
  }

  const pagar = (e) => {
    e.preventDefault()
    if (infoPay.CI === "" || infoPay.cel === "" || infoPay.name === "" || infoPay.apellido === "" || infoPay.city === "" || infoPay.direc === "" || infoPay.email === "") {
      setNotification({
        CI:infoPay.CI?false:true,
        name:infoPay.name?false:true,
        apellido: infoPay.apellido?false:true,
        cel: infoPay.cel?false:true,
        email: infoPay.email?false:true,
        direc: infoPay.direc?false:true,
        city: infoPay.city?false:true,
      })
      return
    }
    setShowForm(true)
    // setModal(true)
  }
 
  useLayoutEffect(() => {
    if (infoPay.CI.length > 10) {
      setInfoPay({ ...infoPay, CI: infoPay.CI.slice(0, 10) })
    }

    if (infoPay.cel.length > 10) {
      setInfoPay({ ...infoPay, cel: infoPay.cel.slice(0, 10) })
    }

    if (infoPay.name.length > 30) {
      setInfoPay({ ...infoPay, name: infoPay.name.slice(0, 30) })
    }

    if (infoPay.email.length > 50) {
      setInfoPay({ ...infoPay, email: infoPay.email.slice(0, 50) })
    }

    if (infoPay.direc.length > 30) {
      setInfoPay({ ...infoPay, direc: infoPay.direc.slice(0, 30) })
    }

    if (infoPay.city.length > 30) {
      setInfoPay({ ...infoPay, city: infoPay.city.slice(0, 30) })
    }

    if (infoPay.apellido.length > 30) {
      setInfoPay({ ...infoPay, apellido: infoPay.apellido.slice(0, 30) })
    }

  }, [infoPay])

  return (
    <div className='flex w-full flex-col'>
      {showForm ? <FormPay infoPay={infoPay} />
        : <>
          <img src={logo472} />

          <form className='px-6'>
            <div className='my-10  '>
              <InputSimple place={"NOMBRE"}
                handlerChange={handlerChange}
                data={infoPay.name}
                nameInput={"name"}
                type={"text"}
                notification={notification.name}
              />
            </div>

            <div className='my-10'>
              <InputSimple place={"APELLIDO"}
                handlerChange={handlerChange}
                data={infoPay.apellido}
                nameInput={"apellido"}
                type={"text"}
                notification={notification.apellido}
              />
            </div>

            <div className='my-10'>
              <InputSimple place={"NUMERO DE DOCUMENTO"}
                handlerChange={handlerChange}
                data={infoPay.CI}
                nameInput={"CI"}
                type={"number"}
                notification={notification.CI}
              />
            </div>

            <div className='my-10'>
              <InputSimple place={"TELEFONO DE CONTACTO"}
                handlerChange={handlerChange}
                data={infoPay.cel}
                nameInput={"cel"}
                type={"number"}
                notification={notification.cel}
              />
            </div>

            <div className='my-10'>
              <InputSimple place={"CIUDAD DE ENTREGA"}
                handlerChange={handlerChange}
                data={infoPay?.city}
                nameInput={"city"}
                type={"text"}
                notification={notification.city}
              />
            </div>

            <div className='my-10'>
              <InputSimple place={"DIRECCION DE ENTREGA"}
                handlerChange={handlerChange}
                data={infoPay?.direc}
                nameInput={"direc"}
                type={"text"}
                notification={notification.direc}
              />
            </div>

            <div className='mt-10'>
              <InputSimple place={"CORREO ELECTRONICO"}
                handlerChange={handlerChange}
                data={infoPay?.email}
                nameInput={"email"}
                type={"text"}
                notification={notification.email}
              />
            </div>

            <button onClick={(e) => pagar(e)}
              className='w-full py-2 mt-5 bg-blue-700/90 text-white rounded-md text-3xl'
            >
              Continuar
            </button>
          </form>
          <img className='mt-96' src={finalForm} />
          <img src={f4} />
        </>}
    </div>
  )
}

export default Form