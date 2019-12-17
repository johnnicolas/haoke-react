import React, { Component } from "react";
import styles from "./index.module.scss";
import NavHeader from "../../components/NavHeader";
import { getlocationCity } from "../../untils/city";
//引入loading
import {Toast} from 'antd-mobile'

const BMap = window.BMap;
//圆形覆盖物的样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255,0,0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255,255,255)",
  textAlign: "center"
};
export default class Map extends Component {
  componentDidMount() {
    this.getmap();
  }
  //这个是判断是1级还是2级的方法
  getTypeAndZoom= ()=>{
    let type = 'circle' //圆形覆盖物适用 一二级
    let nextZoom = 11   //缩放等级
    //获取当前的缩放级别，参考类型里面的zoom
    const currenZoom = this.map.getZoom()
    //然后进行判断
    if (currenZoom > 10 && currenZoom<12) {
      type = 'circle'
      nextZoom = 13
    } else if (currenZoom > 12 && currenZoom<14){
      type = 'circle'
      nextZoom = 15
    }else if(currenZoom > 14){
     type = 'rect'
    }
    //将这两个参数返回
  return {
    type,
    nextZoom
  }
    
    
  }
  //创建一个方法获取map
  getmap = async () => {
    //声明一个常量记录获取到的定位城市 label是结构语法直接获取里面的label值
    const { label, value } = await getlocationCity();

    //地图实例
    this.map = new BMap.Map("container");
    // var point = new BMap.Point(116.404, 39.915);
    //point后面是 地图显示的级别 数值越小 显示的范围就越大 ，数值越大显示的范围就越小
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label, //这是定位的城市
      point => {
        if (point) {
          this.map.centerAndZoom(point, 11); //这是地图展示的大小
          // map.addOverlay(new BMap.Marker(point));这个是地图展示的坐标
          //渲染覆盖物
          this.renderOverlays(value);
        }
      },
      label
    );
    // map.centerAndZoom(point, 11);
    //然后将这个方法放到生命周期钩子函数里面然后就可以执行
  };
  //渲染覆盖物 然后将这个覆盖物渲染到上面
  renderOverlays = async (id) => {
    Toast.loading('正在拼命加载中',1)
    const res = await this.$axios.get(`/area/map?id=${id}`);
    console.log("这是获取城市的id", res);
    //等到渲染完毕之后移除toast
    Toast.hide()
    //申明一个常量利用解构的语法取出里面的上面获取缩放级别的方法
    const {type,nextZoom} = this.getTypeAndZoom()
    res.data.body.forEach(item => {
      if (type === 'circle') {
        //将二级覆盖物的方法传入item和nextzoom
        this.renderCircleOverlays(item,nextZoom)
      }else {
        this.renderRectOverlays(item)
      }
    });
  };
  //添加第一级和第二级覆盖物
  renderCircleOverlays=(item,nextZoom)=>{
 //根据item生成一个一个的覆盖物，并且创建好之后，添加到地图上,利用解构语法
      //前面一个一定要放经度
      const {
        coord: { longitude, latitude },
        count,
        label:name,
        value
      } = item;
      var point = new BMap.Point(longitude,latitude);
      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(30, -30) //设置文本偏移量
      };
      var label = new BMap.Label("", opts); // 创建文本标注对象
      label.setStyle(labelStyle);
      label.setContent(`<div class=${styles.bubble}>
      <p class=${styles.name}>${name}</p>
      <p class=${styles.name}>${count}</p>
      </div>`);
      this.map.addOverlay(label);
      //给每个覆盖物设置点击事件
      label.addEventListener('click',()=>{
        //清除之前的覆盖物，但是这里要使用的是异步方法，因为等同步都请求完之后，在执行异步的代码
        setTimeout(() => {
          //清除覆盖物的方法
          this.map.clearOverlays()
        }, 0);
        //在渲染新的视图,并且将缩放级别传入就是nextzoom
        this.map.centerAndZoom(point, nextZoom)
        //渲染地图
       //调用获取小区地址的方法将小区的value传
       this.renderOverlays(value)
      })
      this.map.addOverlay(label);
  }
  //添加第三级覆盖物
  renderRectOverlays=(item)=>{
    //解构出来
     const {
      coord: { longitude, latitude },
      count,
      label:name,
      value
     } = item
     var point = new BMap.Point(longitude,latitude);
      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(30, -30) //设置文本偏移量
      };
      var label = new BMap.Label("", opts); // 创建文本标注对象
      label.setStyle(labelStyle);
      label.setContent(`<div class=${styles.rect}>
      <span class=${styles.housename}>${name}</span>
      <span class=${styles.housenum}>${count}</span>
      <i class=${styles.arrow}></i>
      </div>`);
      //这里不需要在添加地图
      //给覆盖物添加点击事件
      label.addEventListener('click',e=>{
        //当我点击的时候会跳到屏幕的中心点
        if(e && e.changedTouches){
          //手机点击的位置
          const {clientX,clientY} = e.changedTouches[0]
         //计算应该移动的像素
         const moveX = window.innerWidth / 2 - clientX
         const moveY = (window.innerHeight -330 + 45) /2 - clientY
         //点击小区显示在可视区域中心
         this.map.panBy(moveX,moveY)
         //发送请求，获取小区下面的房源列表 // 房源列表的id就是value
        this.getHouseListId(value)
        }
      })
      //渲染地图
      this.map.addOverlay(label);
  }
  //获取小区房源的方法
  getHouseListId= async id=>{
    const result = await this.$axios.get(`/houses?cityId=${id}`)
    console.log('这是三级覆盖物的id',result)

  }
  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    );
  }
}
