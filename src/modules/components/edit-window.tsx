import React, { useState, useRef, useMemo, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import { getConfig } from '../util'
import { ListsContext } from '../../App'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({

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
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '20px',
            marginTop: '50px',
            height: '68vh'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        drawerHead: {
            display: 'flex',
            // border:'1px solid black'
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
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            width: "12%",
            fontSize: 'small',
            margin: '10px'
        },
        paperContainer: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    }),
);
//编辑弹窗
//分类配置
const config = getConfig()

function chooseIcon(type: string) {
    // 需要添加显式类型断言 type as keyof typeof config
    var type = type || '奖金'
    if (typeof (config[type as keyof typeof config]) == 'function') {
        return config[type as keyof typeof config]();
    }
}

export default function EditWindow(props: any) {

    //该组件可自己维护状态
    // const props.data = useContext(Ctx)
    const history = useHistory()
    const classes = useStyles();
    const [selected, setSelected] = useState(true)
    let [typeName, setname] = useState(props.data.accountData.consumeType)
    const {
        register,
        handleSubmit,
        formState: { errors },
        unregister
    } = useForm();
    const handleClose = () => {
        props.data.setIsOpen(false)
    }

    function changeColor() {
        setSelected(!selected)
    }
    const onSubmit = (data: any) => {
        let obj: any = {}

        obj.consumeType = typeName
        if (!data.money) {
            obj.money = props.data.accountData.money
        } else {
            obj.money = data.money
        }
        if (!data.date) {
            obj.date = props.data.accountData.date
        } else {
            obj.date = data.date
        }
        if (data.remarks) {
            obj.remarks = data.remarks
        } else {
            obj.remarks = ''
        }
        if (data.money == 0) {
            alert("金额不能为0！")
            return
        }
        if (selected) {
            //选中的支出
            obj.accountType = 1
        } else {
            //选中的收入
            obj.accountType = 0
        }
        unregister('money')
        unregister('date')
        unregister('remarks')
        if (props.data.singalFlag) {
            axios.post('https://qcur9w.fn.thelarkcloud.com/addSingleAccount', obj).then((res) => {
                if (res.status == 200) {
                    props.data.setIsOpen(false)
                }
            })
        } else {
            obj.uuid = props.data.uuid
            axios.post('https://qcur9w.fn.thelarkcloud.com/changeType', obj).then((res) => {
                if (res.data.code === 200) {
                    props.data.setIsOpen(false)
                }
            })
        }

    }
    const getTypeName = (type: string) => () => {
        setname(type)
    }

    return (
        <Drawer anchor='bottom' open={props.data.isOpen} onClose={handleClose}>
            <form id="form" className={classes.container} onSubmit={handleSubmit(onSubmit)} noValidate>
                <CloseIcon onClick={handleClose} style={{ position: 'relative', top: '-50px', left: '0px' }} />
                <div className={classes.drawerHead}>
                    {/* selected为true支出按钮被选中，反之入账按钮被选中 */}
                    {/*!!!! form标签里的button type默认是submit 如果要用作普通按钮需要把type设置为'button' */}
                    <button type='button' onClick={changeColor} className={selected ? classes.selected : classes.unselected} >支出</button>
                    <button type='button' onClick={changeColor} className={!selected ? classes._selected : classes._unselected}>入账</button>
                    <TextField
                        id="date"
                        // label="Birthday"
                        {...register("date")}
                        type="date"
                        defaultValue={props.data.accountData.date}
                        className={classes.textField}


                    />
                </div>
                {/* https://qcur9w.fn.thelarkcloud.com/getConfig */}
                <div style={{ marginBottom: '20px' }}>
                    <Input style={{ width: '100%', marginBottom: '10px' }} defaultValue={props.data.accountData.money}
                        {...register("money")}
                        startAdornment={
                            <InputAdornment position="start">
                                <MonetizationOnIcon />
                            </InputAdornment>
                        }
                        inputProps={{ 'aria-label': 'description' }} />
                    <Input placeholder="备注" {...register("remarks")} style={{ width: '100%' }} inputProps={{ 'aria-label': 'description' }} />
                </div>
                {/* <NestedGrid /> */}
                <div className={classes.paperContainer}>
                    {
                        props.data.configData.map((item: any, index: number) => {
                            //根据按钮被选中类型分类
                            if (selected && item.accountType === 1) {
                                //支出
                                return (
                                    <Paper key={index} onClick={getTypeName(item.typeName)} className={classes.paper}>
                                        <Avatar className={item.typeName == typeName ? classes._iconBac : classes.__iconBac}>
                                            {chooseIcon(item.typeName)}
                                        </Avatar>
                                        {item.typeName}
                                    </Paper>
                                )
                            } else if (!selected && item.accountType === 0) {
                                //入账
                                return (
                                    <Paper key={index} onClick={getTypeName(item.typeName)} className={classes.paper}>
                                        <Avatar className={item.typeName == typeName ? classes.iconBac : classes.__iconBac}>
                                            {chooseIcon(item.typeName)}
                                        </Avatar>
                                        {item.typeName}
                                    </Paper>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                <Button type='submit' style={selected ? { background: '#3EB575', margin: 'auto', color: '#ffffff' } : { background: '#F0B73D', margin: 'auto', color: '#ffffff' }} variant="contained" >
                    确定
                </Button>
            </form>

        </Drawer>
    )
}

