import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStyles } from './useStyles'
import Headbtn from './headbtn'
import * as echarts from 'echarts';
import { ListsContext } from '../../App';
import Item from '../components/item';
import { getConfig } from '../util';
import List from '@material-ui/core/List';
export default function Compare(props: any) {
    let listsData = useContext(ListsContext).listsData.arr
    let dateArr: Array<string> = [], inMoneyArr: Array<string> = [], outMoneyArr: Array<string> = []
    let _dateArr: Array<string> = []
    const [color,setColor] = useState('#3EB575')
    var num = -6;
    //排行数据
    //
    let rankData: Array<any> = [], inrankData: Array<any> = [], outrankData: Array<any> = [];
    // 自调用匿名函数
    (() => {
        //扁平 二维化一维
        for (let i = 0, k = 0; i < listsData.length; i++) {
            for (let j = 0; j < listsData[i].length; j++) {
                rankData[k] = listsData[i][j]
                k++
            }
        }
        //按照支出和入账分类
        let index = 0, _index = 0
        rankData.forEach((element) => {
            if (element.accountType) {
                outrankData[index] = element
                index++
            } else {
                inrankData[_index] = element
                _index++
            }
        });
        for (let i = 0; i < 7; i++) {
            dateArr[i] = getDay(num)[0]
            _dateArr[i] = getDay(num)[1]
            num++
        }
        for (let j = 0; j < dateArr.length; j++) {
            for (let k = 0; k < listsData.length; k++) {
                if (listsData[k][0].date === dateArr[j]) {
                    inMoneyArr[j] = listsData[k][0].dayInmoney.toString()
                    outMoneyArr[j] = listsData[k][0].dayOutmoney.toString()
                }
            }
            if (!inMoneyArr[j]) {
                inMoneyArr[j] = '0'
            }
            if (!outMoneyArr[j]) {
                outMoneyArr[j] = '0'
            }
        }
    })()

    useEffect(() => {
        let moneyData
        if(color === '#3EB575'){
            moneyData = outMoneyArr
        }else{
            moneyData = inMoneyArr
        }
        var chartDom = document.getElementById('main');
        if (chartDom) {
            var myChart = echarts.init(chartDom);

            var option;

            option = {
                color:[color],
                xAxis: {
                    type: 'category',
                    data: _dateArr,
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: moneyData,
                    type: 'bar'
                }]
            };

            option && myChart.setOption(option);
        }
    }, [color])

    //获取时间数据
    function getDay(day: number) {
        var today = new Date();
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth += 1;
        // tMonth = doHandleMonth(tMonth + 1);
        // tDate = doHandleMonth(tDate);
        return [tMonth + "月" + tDate + '日', tMonth + '.' + tDate];
    }
    const [selected, setSelected] = useState(true)
    
    return (
        <div style={{ backgroundColor: '#FFFFFF',padding:'25px 10px 20px 10px' }}>
            <Headbtn data={{ selected, setSelected,setColor,color }}>每日对比(一周)</Headbtn>
            <div id="main" style={{ width: '100vw', height: '45vh' }}></div>
            {/* 支出排行 */}
            <Rank data={{ outrankData, inrankData, selected }} ></Rank>
        </div>
    )
}

//分类配置
const config = getConfig()

function chooseIcon(type: string) {
    // 需要添加显式类型断言 type as keyof typeof config
    var type = type || '奖金'
    if (typeof (config[type as keyof typeof config]) == 'function') {
        return config[type as keyof typeof config]();
    }

}



function Rank(props: any) {
    const history = useHistory()
    let { inrankData, selected, outrankData } = props.data
    const classes = useStyles()
    outrankData.sort((a: any, b: any) => {
        return b.money - a.money
    })
    inrankData.sort((a: any, b: any) => {
        return b.money - a.money
    })
    //跳转Detail
    function turnToDetail(uuid: string) {
        return function () {
            history.push(`/detail?${uuid}`)
        }
    }


    // let listsData = useContext(ListsContext).arr
    return (
        <div >
            {selected ?
                <>
                    <p style={{fontSize:'small'}}>支出排行</p>
                    <List className={classes._root}>
                        <Item data={{ outrankData, turnToDetail, chooseIcon }}></Item>
                    </List>
                </>
                :
                <>
                    <p style={{fontSize:'small'}}>入账排行</p>
                    <List className={classes._root}>
                        <Item data={{ inrankData, turnToDetail, chooseIcon }}></Item>
                    </List>
                </>
            }
        </div>
    )
}