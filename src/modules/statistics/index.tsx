// 统计页面
import React, { useState, useEffect, useContext,useLayoutEffect } from 'react'
import SimpleBottomNavigation from '../components/bottom-navigation'
import ButtonAppBar from '../components/app-bar'
import { useStyles } from './useStyles'
import Head from './head'
import Classify from './classify'
import Compare from './compare'
import axios from 'axios'

const defaultValue = {
    allInMoney: 0,
    allOutMoney: 0,
    inResult: [{ consumeType: "工资", allMoney: 0 }],
    outResult: [{ consumeType: '运动', allMoney: 0 }]
}
export const MoneyData = React.createContext(defaultValue)

function Statistics() {
    const classes = useStyles()
    let [data, setData] = useState(defaultValue)
    useLayoutEffect(() => {
        axios.get('https://qcur9w.fn.thelarkcloud.com/getMoney').then(res => {
            if (res.data.code === 200) {
                setData(res.data)
            }
        })
    }, [])
    return (
        <MoneyData.Provider value={data}>
            <div className={classes.Container}>
                <ButtonAppBar></ButtonAppBar>
                <SimpleBottomNavigation></SimpleBottomNavigation>
                <Head data={data} ></Head>
                <Classify></Classify>
                <Compare></Compare>
            </div>
        </MoneyData.Provider>
    )
}
export default Statistics