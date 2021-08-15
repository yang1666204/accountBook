import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SimpleBottomNavigation from '../components/bottom-navigation'
import { Backdrop } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useStyles } from './useStyles'
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditWindow from '../components/edit-window'
import { ListsContext } from '../../App'
import { getDate } from '../util';
import ProminentAppBar from './prominent-app-bar'
import { FolderList } from './folder-list';
import Pop from '../components/pop';
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
export const PopContext = React.createContext()
const AccountBook = () => {
    //列表数据
    // let [listsData, setListsData] = useState([])
    const classes = useStyles();
    const history = useHistory()
    let parm = history.location.search.slice(1)
    let accountData = defaultValue[0]
    //按钮透明度
    let [opacity, setOpacity] = useState('1')
    let topValue = 0, interval: any = null    //定时器
    var nowDate = getDate()
    const { isOpen, setIsOpen ,setIsBack,isBack} = useContext(ListsContext)
    //所有分类数据
    let [configData, setConfigData] = useState([])
    //判断是否弹出遮罩层
    const [open, setOpen] = useState(false)
    //增加单条标识符
    const singalFlag = true
    const [isPop, setIsPop] = useState(false)
    useEffect(() => {
        if (isPop) {
            setTimeout(() => {
                setIsPop(false)
            }, 1000)
        }
    }, [isPop])
    useEffect(() => {
        //判断一下是不是从详情页跳转过来的
        //这里可以自定义一个弹出框 提示删除成功
        if (parm == 'success') {
            setIsPop(true)
            setIsBack(!isBack)
        }
        accountData.date = nowDate
        axios.get('https://qcur9w.fn.thelarkcloud.com/getConfig').then((res) => {
            setConfigData(res.data.data)
        })
        
        //设置计时器 滚动距离不变说明没有滚动
        window.addEventListener('scroll', () => {
            setOpacity('0.5')
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
        <PopContext.Provider value={{ isPop, setIsPop }}>
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
            <Pop>已删除</Pop>
        </>
        </PopContext.Provider>
        // </ListsContext.Provider>
    )
}
export default AccountBook


