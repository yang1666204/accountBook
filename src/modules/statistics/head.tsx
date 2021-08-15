import { classes } from 'istanbul-lib-coverage'
import React from 'react'
import { useStyles } from './useStyles'
import Typography from '@material-ui/core/Typography';
interface Obj{
    data:{
        allInMoney:string,
        allOutMoney:string
    }
}
export default function Head(props: Obj) {
    const classes = useStyles()
    
    return (
        <div className={classes.headContainer}>
            <Typography style={{color:'#7FC9A6'}} variant="subtitle1" gutterBottom>
                共支出
            </Typography>
            <Typography style={{color:'#3DA674'}} variant="h4" gutterBottom>
                ￥{props.data.allOutMoney}
            </Typography>
            <Typography style={{color:'#808080'}} variant="subtitle2" gutterBottom>
                共入账￥{props.data.allInMoney}
            </Typography>
        </div>
    )
}