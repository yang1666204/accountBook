import { red } from '@material-ui/core/colors';
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootContainer: {
            background: '#EFEFEF',
            height: '100vh',
            width: '100vw'
        },
        root: {
            maxWidth: 345,
            margin: 'auto',
            position: 'relative',
            top: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        //收入背景
        iconBac: {
            backgroundColor: '#F0B73D',
            color: '#FFFFFF',
        },
        //支出背景
        _iconBac: {
            backgroundColor: '#3EB575',
            color: '#FFFFFF',
        },
        //灰色背景
        __iconBac: {
            backgroundColor: '#F7F7F7',
            color: '#C8C8C8',
        },
        moneyFont: {
            fontSize: 40,
            fontWeight: 500,

        },
        fontContainer: {
            textAlign: 'center',
            width: '100%'
        },
        fontContent: {
            display: 'flex',
            paddingLeft: '40px'
        },
        leftContent: {
            flex: 1,
            textAlign: 'left'
        },
        rightContent: {
            flex: 3,
            textAlign: 'left'
        },
        fontOne: {
            color: '#8F8F8F'
        },
        fontTwo: {},
        paperContainer: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    }),
);