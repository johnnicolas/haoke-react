import React, { Component } from 'react'
//导入样式
import styles from './index.module.scss'
//引入mobile组件
import {Flex} from 'antd-mobile'
//引入获取定位城市的方法
import {getlocationCity} from '../../untils/city'

//导入filter组件
import Filter from './components/Filter'

//导入搜索组件

import SearchHeader from '../../components/SearchHeader'
export default class House extends Component {
    constructor(){
        super()
        this.state = {
            cityName:''
        }
    }
   async componentDidMount(){
      const {label} = await getlocationCity()
      this.setState({
        cityName:label
      })
    }
    render() {
        return (
            <div className={styles.root}>
               <Flex className={styles.listHeader}>
                   <i onClick={()=>this.props.history.goBack()} className="iconfont icon-back"></i>
                   <SearchHeader cityName={this.state.cityName} className={styles.mySearchBar} />
               </Flex>
               <Filter />
            </div>
           
        )
    }
}