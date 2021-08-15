import React, { useContext } from 'react'
import { useStyles } from '../account-book/useStyles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ListsContext } from '../../App';

export default function Item(props: any) {
    const classes = useStyles()
    let { turnToDetail, chooseIcon } = props.data
    let { _open, _setOpen } = useContext(ListsContext)

    let item = props.data.item || props.data.outrankData || props.data.inrankData
    // dragDown,
    if (props.data.dragDown) {
        var { dragDown, dragUp, dragMove } = props.data

    }
    if (props.data.setIsPop) {
        var { setIsPop } = props.data
    }

    const handleDel = (uuid: string) => (event: any) => {
        axios.delete('https://qcur9w.fn.thelarkcloud.com/delSingelAccount', {
            data: { uuid: uuid }
        }).then(res => {
            console.log(res);
            if (res.data.code === 200) {
                _setOpen(!_open);
                setIsPop(true)
                props.data.setDistance(0)
            }
        })
        event.stopPropagation();
    }
    return (
        <>
            {
                Array.from(item).map((_item: any, index: number) => {
                    return (
                        <div key={index} style={{ position: 'relative' }}>
                            <div onClick={turnToDetail(_item.uuid)} id={_item.uuid} className={classes.listsContainer} >
                                <ListItem onTouchEnd={props.data.dragUp ? dragUp : null} onTouchMove={props.data.dragMove ? dragMove : null} onTouchStart={props.data.dragDown ? dragDown(_item.uuid) : null} >
                                    {!props.data.dragDown ? <p style={{ color: '#808080', position: 'absolute', left: '0px' }} >{index + 1}</p> : null}
                                    <ListItemAvatar >
                                        {/* 类型不同，icon背景颜色不同 */}
                                        <Avatar className={_item.accountType ? classes._iconBac : classes.iconBac}>
                                            {chooseIcon(_item.consumeType)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={_item.consumeType} secondary={_item.remarks} />
                                    <ListItemText primary={_item.accountType ? <span>-{_item.money}</span> : <span className={classes.moneyFont} >+{_item.money}</span>} />
                                    <Button
                                        key={_item.uuid}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        // startIcon={<DeleteIcon />}
                                        size="small"
                                        onClick={handleDel(_item.uuid)}
                                        style={{ position: 'absolute', right: '0px', top: '0px' }}
                                    >
                                        删除
                                    </Button>
                                </ListItem>
                                {/* 如果是最后一项 就没有Divider */}
                                {item[item.length - 1] == item[index] ? null : <Divider />}
                            </div>

                        </div>
                    )
                })
            }

        </>
    )
}