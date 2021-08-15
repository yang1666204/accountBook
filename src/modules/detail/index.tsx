import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Divider, Backdrop, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditWindow from '../components/edit-window';
import { useStyles } from './useStyles'
import { getConfig } from '../util'
import { ListsContext } from '../../App';

//分类配置
const config = getConfig()
const Ctx = React.createContext()
const defaultValue = {
    accountType: 1,
    consumeType: "奖金",
    createdAt: "2021-07-30T15:24:42.248Z",
    date: "7月30日",
    money: 2000,
    remarks: "",//备注
    updatedAt: "2021-07-30T15:24:42.248Z",
    uuid: "4335b800-f14a-11eb-8df7-db09f2434a36",
    _id: "610419ba1d861ee281bca110"

}
function chooseIcon(type: string) {
    // 需要添加显式类型断言 type as keyof typeof config
    var type = type || '奖金'
    if (typeof (config[type as keyof typeof config]) == 'function') {
        return config[type as keyof typeof config]();
    }
}

//删除弹窗组件
interface uuid{
    data:string
}
function DelWindow(parms: uuid) {
    const history = useHistory()
    function handleDel() {
        axios.delete('https://qcur9w.fn.thelarkcloud.com/delSingelAccount', {
            method: 'DELETE',
            data: { uuid: parms.data }
        }).then((res) => {
            if (res.data.code === 200) {
                history.push(`/accountBook?success`)
            }
        })
    }
    return (
        <div style={{ position: 'relative', backgroundColor: '#FFFFFF', borderRadius: '10px', width: '80vw', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', color: '#010101', paddingBottom: '15px' }}>
                <span>删除后无法恢复，是否删除？</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', position: 'absolute', bottom: '0px' }}>
                {/* <button style={{flex:1,textAlign:'center'}}>取消</button> */}
                <Button style={{ flex: 1, textAlign: 'center' }}>取消</Button>
                <Divider orientation="vertical" flexItem />
                <Button onClick={handleDel} style={{ flex: 1, textAlign: 'center' }} color="secondary">删除</Button>
                {/* <button style={{color:'#EFA7A9',flex:1,textAlign:'center'}}>删除</button> */}
            </div>
        </div>
    )
}



export default function Detail() {

    const history = useHistory();
    const classes = useStyles();
    const {isBack,setIsBack} = useContext(ListsContext)
    let [accountData, setAccountData] = useState(defaultValue)
    let [configData, setConfigData] = useState([])
    const [open, setOpen] = useState(false);
    const [uuid, setUuid] = useState(null);
    const singalFlag = false
    //判断是删除弹窗还是编辑弹窗 默认删除
    const [openType, setOpenType] = useState('del')
    //判断是否弹出抽屉
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (value: string) => () => {
        //点击编辑后 让抽屉组件出来
        setOpenType(value)
        setOpen(!open);
        if (value === 'edit') {
            setIsOpen(true)
        }
    };
    // ?4335b800-f14a-11eb-8df7-db09f2434a36 需要去掉问号
    useEffect(() => {
        var parm = history.location.search.slice(1)
        setUuid(parm)
        axios.get(`https://qcur9w.fn.thelarkcloud.com/getSingleAccount?uuid=${parm}`).then((res) => {
            setAccountData({ ...res.data.result })
        })
        axios.get('https://qcur9w.fn.thelarkcloud.com/getConfig').then((res) => {
            setConfigData(res.data.data)
        })
    }, [isOpen])
    const handleBack = () => {
        setIsBack(!isBack)
        history.goBack()
    }
    //用context进行组件通信
    return (
        <Ctx.Provider value={{ isOpen, setIsOpen, configData, accountData ,singalFlag}}>
            <div className={classes.rootContainer}>
                <ArrowBackIosIcon style={{ position: 'absolute', top: '10px', left: '10px' }} onClick={handleBack} />
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={accountData.accountType ? classes._iconBac : classes.iconBac}>
                                {chooseIcon(accountData.consumeType)}
                            </Avatar>
                        }
                        title={accountData.consumeType}
                    />
                    <CardContent className={classes.fontContainer}>
                        {/* 金额 */}
                        {accountData.accountType ? <span className={classes.moneyFont}>-{accountData.money}.00</span> : <span className={classes.moneyFont}>+{accountData.money}.00</span>}
                        <div className={classes.fontContent}>
                            <div className={classes.leftContent}>
                                <p className={classes.fontOne}>记录时间</p>
                                <p className={classes.fontOne}>备注</p>
                            </div>
                            <div className={classes.rightContent} >
                                <p className={classes.fontTwo}>{accountData.date}</p>
                                <p className={classes.fontTwo}>{accountData.remarks ? accountData.remarks : '无'}</p>
                            </div>
                        </div>
                        <Divider variant="middle" />
                    </CardContent>

                    <CardActions disableSpacing>

                        <IconButton color="secondary" onClick={handleToggle('del')} style={{ right: '40px', position: 'relative', fontSize: '15px' }} aria-label="add to favorites">
                            <DeleteForeverIcon />删除
                            {/* 点击过后可以考虑用背景板组件Backdrop */}
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton onClick={handleToggle('edit')} style={{ left: '40px', position: 'relative', fontSize: '15px', color: '#010101' }} aria-label="share">
                            <EditIcon />编辑
                        </IconButton>
                    </CardActions>

                </Card>

                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    {openType === 'del' ? <DelWindow data={uuid} /> : <EditWindow data={{ isOpen, setIsOpen, configData, accountData,uuid }} />}
                </Backdrop>
            </div>
        </Ctx.Provider>
    );
}
