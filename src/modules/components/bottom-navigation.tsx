import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    zIndex:1
  },
});

function BottomNav(props: any) {
  const classes = useStyles();
  const history = useHistory();
  var { JumpValue } = props.JumpValue
  var { JumpValueDispatch } = props
  useEffect(() => {
    if (JumpValue === 0) {
      history.push('/accountBook')
    }
    if (JumpValue === 1) {
      history.push('/statistics')
    }
  }, [JumpValue])

  return (
    <BottomNavigation
      value={JumpValue}
      onChange={(event, newValue) => {
        JumpValueDispatch.setJumpValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="明细" icon={<RestoreIcon />} />
      <BottomNavigationAction label="统计" icon={<FavoriteIcon />} />
      {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
    </BottomNavigation>
  );
}

const mapState = (state: any) => ({
  JumpValue: state.BottomNav
})

const mapDispatch = (dispatch: any) => ({
  JumpValueDispatch: dispatch.BottomNav
})

const SimpleBottomNavigation = connect(mapState, mapDispatch)(BottomNav)
export default SimpleBottomNavigation
// export default function SimpleBottomNavigation() {

// }
