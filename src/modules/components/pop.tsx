import React, { useContext } from 'react'
import { PopContext } from '../account-book';


//弹窗组件
export default function Pop(props: any) {
    let { isPop, setIsPop } = useContext(PopContext)
    return (
        <>
            {
                isPop ?
                    <div style={{borderRadius:'5px', zIndex: 100,position:'absolute', top:'0px',bottom:'0px',left:'0px',right:'0px', width: '60px', height: '40px', margin: 'auto',color:'white', backgroundColor: 'black',opacity:'0.7',fontSize:'small',alignItems:'center',justifyContent:'center',display:'flex'}}>
                       {props.children}
                    </div>
                    :
                    null
            }
        </>

    )
}