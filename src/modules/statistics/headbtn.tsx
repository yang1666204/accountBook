import React from 'react'
import { useStyles } from './useStyles'
import { Typography } from '@material-ui/core';
export default function Headbtn(props: any) {
    let {selected,setSelected} = props.data
    if(props.data.setColor && props.data.color){
        var {setColor,color} = props.data
    }
    const classes = useStyles()
    function changeColor() {
        setSelected(!selected)
        if(props.data.setColor && props.data.color){
            if(color === '#3EB575'){
                setColor('#F0B73D')
            }else{
                setColor('#3EB575')
            }
        }        
    }
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" gutterBottom>
                {props.children}
            </Typography>
            <div>
                <button type='button' onClick={changeColor} className={selected ? classes.selected : classes.unselected} >支出</button>
                <button type='button' onClick={changeColor} className={!selected ? classes._selected : classes._unselected}>入账</button>
            </div>
        </div>
    )
}