import React from 'react'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import PaymentIcon from '@material-ui/icons/Payment';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PetsIcon from '@material-ui/icons/Pets';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PublicIcon from '@material-ui/icons/Public';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BallotIcon from '@material-ui/icons/Ballot';
import MoneyIcon from '@material-ui/icons/Money';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

export const getConfig = function(){
   return config
}

const config = {
    "餐饮": function () { return <RestaurantMenuIcon /> },
    "交通": function () { return (<AirportShuttleIcon />) },
    "购物": function () { return <AddShoppingCartIcon /> },
    "服务": function () { return <RoomServiceIcon /> },
    "教育": function () { return <CastForEducationIcon /> },
    "娱乐": function () { return <SportsEsportsIcon /> },
    "运动": function () { return <SportsBasketballIcon /> },
    "生活缴费": function () { return <PaymentIcon /> },
    "旅行": function () { return <FlightTakeoffIcon /> },
    "宠物": function () { return <PetsIcon /> },
    "医疗": function () { return <LocalHospitalIcon /> },
    "公益": function () { return <PublicIcon /> },
    "转账": function () { return <CompareArrowsIcon /> },
    "生意": function () { return <BusinessCenterIcon /> },
    "工资": function () { return <BallotIcon /> },
    "奖金": function () { return <MoneyIcon /> },
    "收转帐": function () { return <MonetizationOnIcon /> },
    "其他人情": function () { return <AccountBalanceWalletIcon /> },
}

export const getDate = function(){
    let date = new Date
    var year = date.getFullYear().toString()
    var month = (date.getMonth()+1).toString()
    var day = date.getDate().toString()
    if(month.length === 1){
        month = '0'+month
    }
    if(day.length === 1){
        day = '0'+day
    }
    return year + '-' + month + '-' + day
}