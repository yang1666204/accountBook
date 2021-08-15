import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      // textAlign:'center',
      // alignSelf: 'flex-start',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    // toolbar: {
    //   minHeight: 128,
    //   alignItems: 'flex-start',
    //   paddingTop: theme.spacing(1),
    //   paddingBottom: theme.spacing(2),
    // },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            记账本
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
