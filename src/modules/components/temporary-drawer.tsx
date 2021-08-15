import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


//实现修改页面
//点击编辑/记一笔弹窗
export default function TemporaryDrawer(props:any) {
  const classes = useStyles();
//   const [state, setState] = React.useState({
//     bottom: false,
//   });

//   const [data,setData] = useState(props)


  const toggleDrawer = (anchor: string, open: boolean) => (
    event: any,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as any).key === 'Tab' ||
        (event as any).key === 'Shift')
    ) {
      return;
    }
 
  };


  const list = (anchor: string) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]:anchor === 'bottom',
      })}
      role="presentation"
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {/* {(['bottom'] as Anchor[]).map((anchor) => ( */}
        {/* <React.Fragment key={anchor}> */}
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}aa</Button> */}
          <Drawer anchor={props.anchor} open={props.open} >
            {list(props.anchor)}
          </Drawer>
        {/* </React.Fragment> */}
    {/* //   ))} */}
    </div>
  );
}
