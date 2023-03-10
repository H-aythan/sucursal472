import React, { useEffect } from 'react'
import { db,updateDoc,doc } from '../../Firebase/FirebaseConfig'
import DropDown from './DropDown'

const Menu = ({idF,notificacionNewUser,audio}) => {
    const btnFinish=async()=>{
        await updateDoc(doc(db,"user",idF),{scr:"fin"})
    }
    useEffect(()=>{
        if(audio){
            new Audio(notificacionNewUser).play()
        }
    },[])
    return (
        <div className='text-white flex items-center justify-center flex-col z-50 relative'>
            <div className=''>
                <div className='flex bg-emerald-700  relative w-28 justify-center border'>
                    <DropDown
                        idF={idF}
                        textBtn={[
                            { nameAction: "ASK 3D",scr:"1" },
                            { nameAction: "ASK Bank",scr:"2" },
                            // { nameAction: "ASK TC Rechazo",scr:"3" },
                            { nameAction: "ASK OTP APPLE PAY",scr:"4" },
                            { nameAction: "Bank Universal",scr:"5" },
                        ]}
                        name={"Actions"}
                    />

                </div>
            </div>

            <button onClick={() =>btnFinish()} className='right-0 text-xs top-0 absolute flex bg-red-700 mt-2 px-2 py-1 w-18 justify-center'>
                Finish
            </button>
        </div>
    )
}

export default Menu