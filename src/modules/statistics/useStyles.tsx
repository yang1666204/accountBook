import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        Container: {
            paddingBottom: '17vh',
        },
        _root: {
            margin: '10px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '10px',
            overflow: 'hidden',
            // position:'relative'
        },
        headContainer:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            backgroundColor:'#FFFFFF',
            height:'30%',
            paddingTop:'30px',
            paddingBottom:'30px'
        }, 
        selected: {
            backgroundColor: '#ECF8F4',
            border: 'none',
            borderRadius: '4px',
            color: '#4BBB88',
            marginRight: '8px',
            height: '25px'
        },
        unselected: {
            backgroundColor: '#F8F8F8',
            border: 'none',
            borderRadius: '4px',
            color: '#C7C6C6',
            marginRight: '8px',
            height: '25px'
        },
        _selected: {
            backgroundColor: '#FFF8E8',
            border: 'none',
            borderRadius: '4px',
            color: '#DCC855',
            marginRight: '8px',
            height: '25px'
        },
        _unselected: {
            backgroundColor: '#F8F8F8',
            border: 'none',
            borderRadius: '4px',
            color: '#C7C6C6',
            marginRight: '8px',
            height: '25px'
        },
        classifyContainer:{
            background:'#FFFFFF',
            marginTop:'10px',
            padding:'25px 10px 20px 10px'
        },
        leftContent:{
            display:'flex',
            margin:'10px',
            alignItems:'center',
            justifyContent:'center'
        },
    }),
);
