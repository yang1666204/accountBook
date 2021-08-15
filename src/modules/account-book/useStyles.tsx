import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        Container: {
            // height: '100vh',
            // backgroundColor: '#EDEDED',
            paddingBottom: '5vh'
        },
        root: {
            width: '100vw',
            // height:'100vh'
        },
        _root: {
            margin: '10px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '10px',
            overflow: 'hidden',
            // position:'relative'
        },
        toolbar: {
            minHeight: 100,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            position: 'relative',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        title: {
            flexGrow: 1,
            // alignSelf: 'flex-start',
            textAlign: 'center',
        },
        menuButton: {
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            fontSize: 'small'
        },
        text: {
            position: 'absolute',
            left: '20px',
            bottom: '10px',
            fontSize: 'small'
        },
        icon: {
            fontSize: 'small'
        },
        itemContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        topContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#FBFBFB'
        },
        moneyFont: {
            color: '#F0B73D'
        },
        iconBac: {
            backgroundColor: '#F0B73D',
            color: '#FFFFFF',
        },
        _iconBac: {
            backgroundColor: '#3EB575',
            color: '#FFFFFF',
        },
        listsContainer: {
            width: '140%',
            overflowBlock: 'hidden',
            position: 'relative',
            transition: ' all 0.3s',
            top: 0,
            left: 0,
        },
        btnChange: {
            height: '100%',
            width: '25%',
            background: 'black'
        },
        btnDelete: {
            height: '100%',
            width: '15%',
            background: 'red'
        },
        button: {
            margin: theme.spacing(1),
            width: '50px'
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);
