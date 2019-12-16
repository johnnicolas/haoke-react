import React, { Component } from "react";
import styles from "./index.module.scss";
import NavHeader from "../../components/NavHeader";
import { getlocationCity } from "../../untils/city";
const BMap = window.BMap;
export default class Map extends Component {
  componentDidMount() {
    this.getmap();
  }
  //创建一个方法获取map
  getmap = async () => {
    //声明一个常量记录获取到的定位城市 label是结构语法直接获取里面的label值
    const { label } = await getlocationCity();

    //地图实例
    var map = new BMap.Map("container");
    // var point = new BMap.Point(116.404, 39.915);
    //point后面是 地图显示的级别 数值越小 显示的范围就越大 ，数值越大显示的范围就越小
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label, //这是定位的城市
      point=> {
        if (point) {
          map.centerAndZoom(point, 11);//这是地图展示的大小
          // map.addOverlay(new BMap.Marker(point));这个是地图展示的坐标
        }
      },
      label
    );
    // map.centerAndZoom(point, 11);
    //然后将这个方法放到生命周期钩子函数里面然后就可以执行
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
