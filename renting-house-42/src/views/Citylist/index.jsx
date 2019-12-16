import React, { Component } from "react";
import NavHeader from "../../components/NavHeader";
import Styles from "./index.module.scss";
import {getlocationCity} from '../../untils/city'
//引入react-virtualized 
import {AutoSizer,List} from 'react-virtualized'
//引入react-virtualized 样式
import 'react-virtualized/styles.css'
//申明变量记录 每一行标题的高度和每一行中城市的高度
const TITLE_HEIGHT = 36
const ROW_HEIGHT = 50
export default class Citylist extends Component {
  constructor() {
    super();
    this.state = {
      cityListObj: null, //左边渲染列表所需要的数据
      cityIndex: null, //右边渲染列表所需要的数据
      activeIndex:0
    };
  }
   //创建ref 
   listRef = React.createRef()
  //在挂载前获取数据都是在生命周期钩子函数里面获取到
  componentDidMount() {
    this.getCityListData();
  }
  getCityListData = async () => {
    const result = await this.$axios.get("area/city?level=1");
    console.log(result);
    this.dealWithCityData(result.data.body)
  };
  //处理渲染所需要的数据
  dealWithCityData = async list => {
    const tempObj = {};
    list.forEach(item => {
      const firstLetter = item.short.substr(0, 1);
      //然后进行判断

      if (tempObj[firstLetter]) {
        tempObj[firstLetter].push(item);
      } else {
        tempObj[firstLetter] = [item];
      }
    });
    //处理右边数据所要的索引
    //将数据进行顺序排序
    const tempIndex = Object.keys(tempObj).sort();
    const result = await this.$axios.get("/area/hot");
    tempIndex.unshift("hot");
    tempObj["hot"] = result.data.body;
    console.log(tempObj);
    console.log("----------");
    console.log(tempIndex);
    //这里是获取到了 定位城市
    const locationCity = await getlocationCity()
    // console.log("locationCity",locationCity)
    //然后在右边最上面添加#
    tempIndex.unshift("#")
    //将热门城市添加到tempindex中
    tempObj["#"] = [locationCity]
    //将数据赋值给state里面
    this.setState({
      cityIndex:tempIndex,
      cityListObj:tempObj
    })
  };
 
  //格式化字母
  formatLetter = letter =>{
    switch (letter) {
      case 'hot':
        return '热门城市'
        case "#":
        return '定位城市'    
      default:
        //toUpperCase 将字母全部变为大写
        return letter.toUpperCase() 
    }
  }
  //渲染左边列表的每一行
  rowRenderer = ({key,index,style})=>{
    //取出右边索引的每一个字母
    const letter = this.state.cityIndex[index]
    //去除每一个字母下面的城市列表数组
    const list = this.state.cityListObj[letter]
    return(
      <div className={Styles.city} key={key} style={style}>
        <div className={Styles.title}>
          {this.formatLetter(letter)}
        </div>
        {
          list.map(item=>{
            return <div key={item.value} className={Styles.name}>
             {item.label}
            </div>
          })
        }
      </div>
    )
  }
  //计算每一行的高度
  calcRowHeight = ({index})=>{
    const cityindexs = this.state.cityIndex[index]
    //拿到cityindex对应的数据
    const list = this.state.cityListObj[cityindexs]
    return TITLE_HEIGHT + list.length * ROW_HEIGHT
  }
  //渲染右边的索引列表
  renderCityIndexList = () =>{
    const {cityIndex,activeIndex} =this.state 
    return(
      <div className={Styles.cityIndex}>
        {
         cityIndex.map((item,index)=>{
           return <div key={item}
                 className={Styles.cityIndexItem}
           >
             <span className={index === activeIndex ?Styles.indexActive :''}>
                {item ==='hot' ? '热' : item.toUpperCase()}
             </span>
           </div>
         })
        }
      </div>
    )
  }
  //滚动左边长列表触发的方法
  onRowsRendered = ({startIndex}) =>{
   if(this.state.activeIndex !== startIndex){
   this.setState({
     activeIndex:startIndex
   })
   }
  }
   //点击右边的索引
   clickIndex = index =>{
     this.listRef.current.scrollToRow(index)
   }
  render() {
    const {cityListObj,cityIndex}  = this.state
    return (
      <div className={Styles.citylist}>
        <NavHeader>城市列表</NavHeader>
        {/* 渲染左边的长列表 */}
        {cityListObj && (
          <AutoSizer>
            {({height,width})=>(
              <List 
              ref={this.listRef}
              height={height}
              width = {width}
              rowCount={cityIndex.length}
              rowHeight = {this.calcRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrolltoAlignment='start'
              />
            )}
            </AutoSizer>
        )}
        {cityIndex && this.renderCityIndexList()}
      </div>
    );
  }
}
