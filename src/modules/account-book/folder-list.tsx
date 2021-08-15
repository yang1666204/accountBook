import React,{useContext,useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Item from '../components/item';
import Pop from '../components/pop'
import List from '@material-ui/core/List';
import { useStyles } from './useStyles'
import { ListsContext } from '../../App';
import { getConfig } from '../util'
import { PopContext } from './index';

//分类配置
const config = getConfig()
function chooseIcon(type: string) {
    // 需要添加显式类型断言 type as keyof typeof config
    var type = type || '奖金'
    if (typeof (config[type as keyof typeof config]) == 'function') {
        return config[type as keyof typeof config]();
    }
}
//控制弹窗组件

var nMouseX: number, nStartX: number;
export function FolderList() {
    
    const _listsData = useContext(ListsContext).listsData.arr
    const setIsPop = useContext(PopContext).setIsPop
    const classes = useStyles();
    const history = useHistory()
    var [oDragging, setoDragging] = useState({})
    var [distance, setDistance] = useState(0)
    var [bMouseUp, setbMouseUp] = useState(true)
   
    let div:HTMLElement | null



    useEffect(() => {
        if (distance <= 0 && oDragging.div) {
            oDragging.div.style.left = "0px"
            setoDragging({ ...oDragging, isMove: false })
        } else if (distance > 0 && oDragging.div) {
            oDragging.div.style.left = "-140px"
            setoDragging({ ...oDragging, isMove: true })
        }
    }, [distance])


    function dragDown(uuid: string) {
        return function (e1:any) {
            //获取到具体的div
            setbMouseUp(false)
            // bMouseUp = false
            div = document.getElementById(uuid)
            setoDragging({ div, isMove: false })
            var touch = e1.targetTouches[0]
            nStartX = oDragging.div?.offsetLeft
            nMouseX = touch.clientX;
            return false
        }
    }
    function dragMove(e2: any) {
        if (bMouseUp) { return; }
        var touch = e2.targetTouches[0];
        setDistance(nMouseX - touch.clientX)
    }
    function dragUp() {
        setbMouseUp(true)
    }
    //跳转Detail
    function turnToDetail(uuid: string) {
        return function () {
            history.push(`/detail?${uuid}`)
        }
    }
 
   
    //数据是个二维数组，需要双重循环渲染
    return (
        <>
            <Pop>已删除</Pop>
            {

                //三元表达式判断 _listsData是否存在
                _listsData ?
                    _listsData.map((item: any, i: number) => {
                        return (
                            <List key={i} className={classes._root}>
                                <div className={classes.topContainer}>
                                    <div>
                                        <span>{item[0].date}</span>
                                        <span>{item[0].week}</span>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#F3F3F3', color: '#797979', margin: '0px 2px 0px 2px' }}>出</span>{item[0].dayOutmoney}
                                        &nbsp;&nbsp;
                                        <span style={{ backgroundColor: '#F3F3F3', color: '#797979', margin: '0px 2px 0px 2px' }}>入</span>{item[0].dayInmoney}
                                    </div>
                                </div>
                                <Item key={i} data={{ item, turnToDetail, dragDown, dragMove, dragUp, chooseIcon, setDistance, setIsPop }}></Item>
                            </List>
                        )
                    }) : null
            }
        </>
    )
}