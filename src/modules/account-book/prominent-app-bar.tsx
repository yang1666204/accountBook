import {useContext} from 'react'
import { useStyles } from './useStyles';
import { ListsContext } from '../../App';
import { AppBar, Backdrop } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
export default function ProminentAppBar() {
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
