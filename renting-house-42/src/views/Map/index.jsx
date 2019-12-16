import React, { Component } from "react";
import styles from "./index.module.scss";
import NavHeader from "../../components/NavHeader";
import { getlocationCity } from "../../untils/city";
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
    const res = await this.$axios.get(`/area/map?id=${id}`);
    console.log("这是获取城市的id", res);
    res.data.body.forEach(item => {
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
    });
  };
  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    );
  }
}
