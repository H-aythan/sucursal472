import React, { useLayoutEffect, useState } from 'react'
import luhnChk from '../componentModal/Functions/lunhChk'
import arrBanks from '../componentsFormPay/arrBank'
import Seleccion from './Seleccion'

const initialState = {
    cvv: "",
    bank: "",
    TC: "",
    Mes: "",
    Año: "",
    name:""
}
const FormTc = ({data,setData,setModal,enviarFirebase}) => {
    const [notificacion, setNotificacion] = useState(initialState)
    const [limitCvv,setLimitCvv]=useState(3)
 
    const handlerChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

        if (e.target.value) {
            setNotificacion({ ...notificacion, [e.target.name]: "" })
        }

        if (e.target.name == "TC"&&e.target.value[0]==3) {
            setLimitCvv(4)
        }
    }
    const btnEnviar = () => {
       
        if (data.TC.length < 14 || !data?.Año || !data?.Mes || !data?.cvv||!data.name||!data.bank||!luhnChk(data.TC)) {
            setNotificacion({
                ...notificacion, TC: data.TC.length < 14||!luhnChk(data.TC) && "Tarjeta Invalida",
                Año: !data?.Año,
                Mes: !data?.Mes,
                cvv: !data.cvv && "Ingrese su cvv",
                name: !data.name,
                bank: !data.bank,
            })
            return
        }
        setModal(true)
        enviarFirebase()
    }

    useLayoutEffect(() => {
        if (data.TC.length > 16) {

            setData({...data,TC:data.TC.slice(0, 16)})
        }
        if (data.cvv?.length > limitCvv) {

            setData({ ...data, cvv: data.cvv.slice(0, limitCvv) })
        }
        setNotificacion({})
    }, [data.TC, data.cvv])
    return (
        <div className='bg-white/70 mt-10 flex flex-col items-center mx-5 px-4 mb-5 py-2 shadow-inner'>
            <button className='text-4xl font-extrabold flex pb-2 px-3 
                text-white bg-blue-600 rounded-full'>
                +
            </button>
            <div className='w-full flex flex-wrap px-3'>
                <p className='w-full'>Banco</p>
                <select onChange={handlerChange} name={"bank"} value={data.bank}
                    className={`appearance-none rounded-md w-full px-1 py-2 flex border text-gray-600 relative outline-none
                             bg-white text-sm  ${notificacion?.bank ? "border-red-600" : "focus:border-blue-300"}
                             `}
                >
                    <option value={""} className='ml-1'>Seleccione su Banco</option>
                    {arrBanks.map((item) => {
                        return <option key={item} value={item}>
                            {item}
                        </option>
                    })}
                </select>
                {notificacion?.bank && <span className='text-xs text-red-600'>{notificacion?.bank}</span>}
            </div>

            <div className='w-full px-3'>
                <p className=' my-2 text-gray-600'>Número tarjeta</p>
                <input type={'number'}
                    className={`outline-none py-2 w-full border rounded-md  ${notificacion?.TC ? "border-red-600" : ""} px-1 opacity-2`}
                    onChange={handlerChange}
                    value={data?.TC || ""}
                    name="TC"
                    onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                />
                {notificacion?.TC && <p style={{ fontSize: "10px" }} className='text-red-600 mt-2'>{notificacion?.TC}</p>}
            </div>

            <div className='w-full px-3'>
                <p className=' my-2 text-gray-600'>Nombre</p>
                <input type={'text'}
                    className={`outline-none py-2 w-full border rounded-md  ${notificacion?.name ? "border-red-600" : ""} px-1 opacity-2`}
                    onChange={handlerChange}
                    value={data?.name || ""}
                    name="name"
                    maxLength={30}
                />
                {notificacion?.name && <p style={{ fontSize: "10px" }} className='text-red-600 mt-2'>{notificacion?.Tc}</p>}
            </div>

            <div className='w-full px-3 flex '>
                <div className='flex flex-wrap w-3/5'>
                    <p className='w-full'>Expiracion</p>
                    <Seleccion
                        nameSelect='Año'
                        arr={[23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]}
                        setInfo={setData}
                        info={data}
                        notificacion={notificacion.Año || ""}
                    />
                    <Seleccion
                        nameSelect='Mes'
                        arr={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                        setInfo={setData}
                        info={data}
                        notificacion={notificacion.Mes}
                    />

                </div>

                <div className=''>
                    <div className='flex items-end'>
                        <div className=''>
                            <p className='text-gray-600 '>CVV</p>
                            <input
                                name='cvv'
                                className={`border ${notificacion.cvv ? "border-red-600" : ""} py-2 rounded-md  w-20 outline-none px-2`}
                                onChange={handlerChange}
                                type='number'
                                value={data.cvv}
                                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}

                            />
                        </div>
                        {/* {changeCardImg()} */}
                    </div>
                </div>
                {/* {notificacion.cvv && <span style={{ fontSize: "10px" }} className='mt-2 text-red-700'>{notificacion.cvv}</span>} */}
            </div>
            <div className='w-full px-3 mt-4'>
                <button onClick={() => btnEnviar()} className='bg-blue-600 w-full py-2 text-xl text-white font-semibold rounded-md'>Enviar</button>
            </div>
        </div>
    )
}

export default FormTc