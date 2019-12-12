import React, { Component } from 'react'

export default class Citylist extends Component {
    constructor(){
        super()
        this.state={
            cityListObj:null, //左边渲染列表所需要的数据
            cityIndex:null  //左边渲染列表所需要的数据
        }
    }
    //在挂载前获取数据都是在生命周期钩子函数里面获取到
    componentDidMount(){

    }
    getCityListData= async()=>{
      const result = await this.$axios.get('area/city?level=1')

    }
    //处理渲染所需要的数据
    dealWithCityData = list =>{
        const tempObj = {}
        list.forEach(item=>{
            const firstLetter = item.short.substr(0,1)
            //然后进行判断
            if(tempObj[firstLetter]){
                tempObj[firstLetter].push(item)
            }else {
                tempObj[firstLetter] = [item]
            }
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
