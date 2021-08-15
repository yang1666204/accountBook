import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import SimpleBottomNavigation from '../components/bottom-navigation'
import { AppBar, Backdrop } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GridOnIcon from '@material-ui/icons/GridOn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getConfig } from '../util'
import { useStyles } from './useStyles'
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditWindow from '../components/edit-window'
import { ListsContext } from '../../App'
import Item from '../components/item';
import { getDate } from '../util';
import Pop from '../components/pop'
// import Backdrop from '@material-ui/core/Backdrop';
//列表数据

//头部
function ProminentAppBar() {
    const classes = useStyles();
    const lists = useContext(ListsContext).listsData
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        记账本
                    </Typography>
                    <Typography
                        className={classes.text}>
                        <span style={{ marginRight: '15px' }}>总支出￥{lists.outMoney}</span>
                        <span>总收入￥{lists.inMoney}</span>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

//列表

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
export const PopContext = React.createContext()
var nMouseX: number, nStartX: number;
function FolderList() {
    const _listsData = useContext(ListsContext).listsData.arr
    const classes = useStyles();
    const history = useHistory()
    var [oDragging, setoDragging] = useState({})
    var [distance, setDistance] = useState(0)
    var [bMouseUp, setbMouseUp] = useState(true)
    const [isPop, setIsPop] = useState(false)
    //  onmousedown 鼠标按下事件
    //  onmousemove 鼠标拖动事件 
    // onmouseup 鼠标抬起事件
    let div:HTMLElement | null
    // if(div){
    //     div.ontouchmove = dragMove
    // }
    // document.onmouseup = dragUp;
  
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
    useEffect(() => {
        if (isPop) {
            setTimeout(() => {
                setIsPop(false)
            }, 1000)
        }
    }, [isPop])

    useEffect(() => {
        if (distance <= 0 && oDragging.div) {
            oDragging.div.style.left = "0px"
            setoDragging({ ...oDragging, isMove: false })
        } else if (distance > 0 && oDragging.div) {
            oDragging.div.style.left = "-140px"
            setoDragging({ ...oDragging, isMove: true })
        }
    }, [distance])
   
    //数据是个二维数组，需要双重循环渲染
    return (
        <PopContext.Provider value={{ isPop, setIsPop }}>
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
        </PopContext.Provider>
    )
}
//获取数据
const defaultValue = [{
    accountType: 1,
    consumeType: "餐饮",
    createdAt: "2021-07-30T15:24:42.248Z",
    date: "7月30日",
    money: 0,
    remarks: "",//备注
    updatedAt: "2021-07-30T15:24:42.248Z",
    uuid: "4335b800-f14a-11eb-8df7-db09f2434a36",
    _id: "610419ba1d861ee281bca110"

}]

//const MyContext = React.createContext(defaultValue);
// const ListsContext = React.createContext(defaultValue)
const AccountBook = () => {
    //列表数据
    // let [listsData, setListsData] = useState([])
    const classes = useStyles();
    const history = useHistory()
    let parm = history.location.search.slice(1)
    let accountData = defaultValue[0]
    //按钮透明度
    //  let opacity = "0.5";
    let [opacity, setOpacity] = useState('1')
    let topValue = 0, interval: any = null    //定时器
    var nowDate = getDate()
    const { isOpen, setIsOpen } = useContext(ListsContext)
    //所有分类数据
    let [configData, setConfigData] = useState([])
    //判断是否弹出遮罩层
    const [open, setOpen] = useState(false)
    // //判断是否弹出抽屉
    // const [isOpen, setIsOpen] = useState(false)
    //增加单条标识符
    const singalFlag = true
    useEffect(() => {
        //判断一下是不是从详情页跳转过来的
        //这里可以自定义一个弹出框 提示删除成功
        if (parm == 'success') {
            alert("删除成功")
        }
        accountData.date = nowDate
        axios.get('https://qcur9w.fn.thelarkcloud.com/getConfig').then((res) => {
            setConfigData(res.data.data)
        })
        //如何判断没有滚动
        //设置计时器 滚动距离不变说明没有滚动
        window.addEventListener('scroll', () => {
            setOpacity('0.5')
            //函数节流？
            if (interval == null) {
                interval = setInterval(checkDistence, 300)
            }
            topValue = document.documentElement.scrollTop
        })
        return () => {
            window.removeEventListener('scroll', () => {
                console.log("卸载监听");
            })
        }
        //这里有两个地方都要发请求获取 所有类型 考虑开屏发一次存缓存？
    }, [])

    const checkDistence = () => {
        if (document.documentElement.scrollTop == topValue) {
            setOpacity('1')
            clearInterval(interval)
            interval = null
        }
    }
    const handleOpen = () => {
        setOpen(true)
        setIsOpen(true)
    }
    const handleClose = () => {
        //遮罩层关闭后的回调函数
        setOpen(false)
    }
    return (
        // <ListsContext.Provider value={listsData} >
        <>
            <div className={classes.Container}>
                <ProminentAppBar></ProminentAppBar>
                <SimpleBottomNavigation></SimpleBottomNavigation>
                <FolderList ></FolderList>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AssignmentIcon />}
                    size="medium"
                    style={{ position: 'fixed', right: '20px', bottom: '100px', fontSize: 'small', opacity: opacity }}
                    onClick={handleOpen}
                >
                    记一笔
                </Button>
            </div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                {/* 这个组件发送的请求是编辑单条  需要增加一个参数去判断 是编辑还是增加单条 */}
                <EditWindow data={{ isOpen, setIsOpen, configData, accountData, singalFlag }} />
            </Backdrop>
        </>
        // </ListsContext.Provider>
    )
}
export default AccountBook


