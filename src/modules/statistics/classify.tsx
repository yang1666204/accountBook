import React, { useState, useMemo, useContext } from 'react'
import { useStyles } from './useStyles'
import { MoneyData } from './index';
import { Typography, Avatar } from '@material-ui/core';
import { getConfig } from '../util';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Headbtn from './headbtn';

const config = getConfig()
function chooseIcon(type: string) {
    var type = type || '奖金'
    if (typeof (config[type as keyof typeof config]) == 'function') {
        return config[type as keyof typeof config]()
    }
}


export default function Classify() {
    // const [data,setData] = useState(props)
    const moneyData = useContext(MoneyData)
    const classes = useStyles();
    const [selected, setSelected] = useState(true)
    
    return (
        <div className={classes.classifyContainer}>
            <Headbtn data={{selected,setSelected}} >分类构成</Headbtn>
            <ClassifyRender data={selected}></ClassifyRender>
        </div>
    )
}

function ClassifyRender(props: any) {
    //占的百分比就是要算的东西 可以使用useMemo moneyData没有变化 就不更新组件 就不再算一遍
    const moneyData = useContext(MoneyData)
    moneyData.outResult.sort((a:any,b:any)=>{
        return b.allMoney- a.allMoney
    })
    moneyData.inResult.sort((a:any,b:any)=>{
        return b.allMoney- a.allMoney
    })
    const classes = useStyles()
    let result: Array<any>, money: number, bacColor: string;
    //判断是否隐藏 默认隐藏
    const [isHidden, setIsHidden] = useState(true)
    // var { outResult } = moneyData
    if (props.data) {
        result = moneyData.outResult
        money = moneyData.allOutMoney
        bacColor = '#3EB575'
    } else {
        result = moneyData.inResult
        money = moneyData.allInMoney
        bacColor = '#F0B73D'
    }
    //计算百分比
    const calculation = (index: number) => {
        return (
            <span style={{ color: '#878787', fontSize: 'small' }}>
                {((result[index].allMoney / money) * 100).toFixed(2)}%
            </span>
        )
    }

    const hiddenStatusChange = () => {
        setIsHidden(!isHidden)
    }

    return (
        <>
            {
                // 超过五条隐藏 展开显示
                //应该有一个变量来判断展开或者收起
                result.map((item: any, index: number) => {
                    //隐藏
                    if (isHidden) {
                        if (index <= 4) {
                            return (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className={classes.leftContent} >
                                        <Avatar style={{ color: '#FFFFFF', backgroundColor: bacColor, width: '30px', height: '30px' }} > {chooseIcon(item.consumeType)}</Avatar>

                                        <span style={{ paddingLeft: '10px',fontSize:'small',textAlign:'center' }} >{item.consumeType}</span>
                                    </div>
                                    <div style={{ display: 'flex', width: '66%', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }} >
                                        {calculation(index)}
                                        <div style={ result[index]? { position: 'absolute', left: '70px', width: ((result[index].allMoney / money) * 110), height: '5px', borderRadius: '25px', backgroundColor: bacColor }:{}}></div>
                                        <span>￥{item.allMoney}</span>
                                    </div>
                                </div>
                            )
                        } else {
                            return null
                        }
                    } else {
                        return (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className={classes.leftContent} >
                                    <Avatar style={{ color: '#FFFFFF', backgroundColor: bacColor, width: '30px', height: '30px' }} > {chooseIcon(item.consumeType)}</Avatar>

                                    <span style={{ paddingLeft: '10px',fontSize:'small',textAlign:'center' }} >{item.consumeType}</span>
                                </div>
                                <div style={{ display: 'flex', width: '66%', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }} >
                                    {calculation(index)}
                                    <div style={result[index]? { position: 'absolute', left: '70px', width: ((result[index].allMoney / money) * 110), height: '5px', borderRadius: '25px', backgroundColor: bacColor }:{}}></div>
                                    <span>￥{item.allMoney}</span>
                                </div>
                            </div>
                        )
                    }
                })
            }
            {
                // 数组长度大于五才显示
                result.length > 5 ?
                    isHidden ? <p
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#808080' }}
                        onClick={hiddenStatusChange} >
                        展开更多<KeyboardArrowDownIcon /></p>
                        :
                        <p
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#808080' }}
                            onClick={hiddenStatusChange}>
                            收起 <KeyboardArrowUpIcon /></p>
                    : null
            }
        </>
    )
}