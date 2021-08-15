# 记账本

accountBook是一个基于react✨+material-ui⛄实现的H5记账本

预览地址：https://yangon.web.cloudendpoint.cn/

## 快速开始

克隆后执行`npm install`会自动加载依赖包

加载完成后`npm run start`或者`yarn start`

## 项目介绍

#### 技术选型：

`react typescript node.js material-ui echarts axios rematch(弃用)`

#### 快速上线

轻服务，一个能够让开发人员把注意力集中在业务代码上的可视化轻服务平台❤️  

传送门：https://qingfuwu.cn/

#### 项目规范

1. class组件不再用，全面拥抱hooks,统一使用函数组件
2. 组件细粒度拆分，大大提高代码复用性和可维护性
3. 变量名，函数名均采用小驼峰的方式，组件名采用大驼峰
4. 组件最前面对props解构赋值
5. 返回JSX的函数，统一聚集在函数最后面
6. modules下每个文件夹入口文件均命名为index.tsx（components除外）

#### 弃用rematch原因

在搭建项目的时候，本打算用rematch作为状态管理方案，因考虑到项目复杂度不高而弃用，使用Context作为代替方案，不过还有一点代码是用的rematch还没来得及重写。



