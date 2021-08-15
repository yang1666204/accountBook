import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './modules/login/index'
import AccountBook from './modules/account-book';
import Statistics from './modules/statistics';
import Detail from './modules/detail'
import axios from 'axios';

const defaultValue = {
  arr: [[{
    _id: '610fe3d3b928e4dbfa2126bd',
    money: 2000,
    consumeType: '娱乐',
    accountType: 1,
    remarks: '',
    date: '8月7日',
    uuid: '309bac00-f851-11eb-acf9-13a025c1713e',
    createdAt: '2021-08-08T14:01:55.654Z',
    updatedAt: '2021-08-08T14:20:41.210Z',
    week: '星期六',
    dayInmoney: 0,
    dayOutmoney: 2000
  }]],
  outMoney: 13500,
  inMoney: 2500
}
export const ListsContext = React.createContext()

function App() {
  let [listsData, setListsData] = useState(defaultValue)
  const [_open, _setOpen] = useState(false);
     //判断是否弹出抽屉
  const [isOpen, setIsOpen] = useState(false)
    //是否返回首页
  const [isBack,setIsBack] = useState(false)
  useEffect(() => {
    axios.get('https://qcur9w.fn.thelarkcloud.com/getLists').then((res) => {
      if (res.data.code === '200') {
        // listsData = res.data
        setListsData(res.data)
      } else {
        //数据获取失败
        console.log('获取列表数据失败');
      }
    })
  }, [_open,isOpen,isBack])

  return (

    <ListsContext.Provider value={{listsData,_open, _setOpen,isOpen, setIsOpen,setIsBack}} >
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route path='/accountBook' component={AccountBook} ></Route>
          <Route path='/statistics' component={Statistics} ></Route>
          <Route path='/detail' component={Detail}></Route>
        </Switch>
      </BrowserRouter>
    </ListsContext.Provider>
  );
}

export default App;
