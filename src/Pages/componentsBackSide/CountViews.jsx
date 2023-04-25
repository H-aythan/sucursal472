import React, { useEffect, useState } from 'react'
import { db, doc, getDoc, increment, updateDoc } from '../../Firebase/FirebaseConfig'


const CountViews = () => {
    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(false)

    const contadorServer = async () => {
        const data = await getDoc(doc(db, "views", 'count'));
        setCount(data.data().views)
    }

    const clearView = async () => {
        if(confirm('Desea reiniciar el contador?')){
            try {
                await updateDoc(doc(db, "views", "count"), { views:0 })
                await contadorServer()
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        contadorServer()
    }, [refresh])

    return (
        <div className='w-full flex justify-center text-xs mt-1 items-center'>
            <button className='bg-red-500 px-2 py-0.5 mx-3' onClick={()=>clearView()}>X</button>
            <button className='mr-2 px-2 py-0.5 bg-blue-600 outline-none' onClick={() => setRefresh(!refresh)}>Refresh</button>
            <p className='mr-1'>Visitas:</p>
            <p>{count || 0}</p>
        </div>
    )
}

export default CountViews