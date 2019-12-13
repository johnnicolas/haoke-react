import React, { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import Styles from "./index.module.scss";
//导入 跳转的标签
import { Link } from "react-router-dom";
//导入路由
import { BASEURL } from "../../untils/url";
//导入图片
import image1 from "../../assets/images/nav-1.png";
import image2 from "../../assets/images/nav-2.png";
import image3 from "../../assets/images/nav-3.png";
import image4 from "../../assets/images/nav-4.png";
//导入搜索栏
import SearchHeader from '../../components/SearchHeader'
export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      imgHeight: 212, //轮播图的固定高度
      swipers: null,
      grounps: null,
      news: null
    };
  }
  //定义实例属性
  navs = [
    { icon: image1, text: "整租", path: "/layout/house" },
    { icon: image2, text: "合租", path: "/layout/house" },
    { icon: image3, text: "地图找房", path: "/map" },
    { icon: image4, text: "去出租", path: "/rent/add" }
  ];
  //在挂载之前渲染数据
  componentDidMount() {
    //获取轮播图的数据
    this.getSwipersData();
    //获取租房小组的数据
    this.getGrounpsData();
    //获取最新资讯的数据
    this.getNewsData();
  }
  //获取轮播图的方法
  getSwipersData = async () => {
    const result = await this.$axios.get("/home/swiper");
    // console.log(result)
    this.setState({
      swipers: result.data.body
    });
  };
  //获取租房小组的方法
  getGrounpsData = async () => {
    const result = await this.$axios.get(
      "/home/groups?area=AREA%7C88cff55c-aaa4-e2e0"
    );
    // console.log(result);
    this.setState({
      grounps: result.data.body
    });
  };
  //获取最新资讯的方法
  getNewsData = async () => {
    const result = await this.$axios.get(
      "/home/news?area=AREA%7C88cff55c-aaa4-e2e0"
    );
    console.log(result);
    this.setState({
      news: result.data.body
    });
  };
  //渲染轮播图
  renderSwipers = () => {
    return (
      <div>
        <Carousel autoplay infinite>
          {this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={`${BASEURL}${item.imgSrc}`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  };
  //渲染导航菜单
  renderNav = () => {
    return (
      <div className={Styles.nav}>
        <Flex>
          {this.navs.map(item => {
            return (
              <Flex.Item key={item.text}>
                <Link to={item.path}>
                  <img src={item.icon} alt="" />
                  <p>{item.text}</p>
                </Link>
              </Flex.Item>
            );
          })}
        </Flex>
      </div>
    );
  };
  //租房小组的渲染
  renderGrouns = () => {
    return (
      <div className={Styles.groups}>
        <Flex>
          <Flex.Item className={Styles.title}>租房小组</Flex.Item>
          <Flex.Item align="end">更多</Flex.Item>
        </Flex>
        <Grid
          data={this.state.grounps}
          square={false}
          columnNum={2}
          hasLine={false}
          renderItem={dataItem => {
            return (
              <div key={dataItem.id} className={Styles.navItem}>
                <div className={Styles.left}>
                  <p>{dataItem.title}</p>
                  <p>{dataItem.desc}</p>
                </div>
                <div className={Styles.right}>
                  <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  };
  //最新资讯的渲染
  renderNews = () => {
    return (
      <div className={Styles.news}>
        <h3 className={Styles.groupTitle}>最新资讯</h3>
        {this.state.news.map(item => {
          return (
            <WingBlank key={item.id} size="sm">
              <div className={Styles.newsItem}>
                <div className={Styles.imgWrap}>
                  <img src={`${BASEURL}${item.imgSrc}`} alt="" />
                </div>
                <Flex
                  direction="column"
                  justify="between"
                  className={Styles.content}
                >
                  <h3 className={Styles.title}>{item.title}</h3>
                  <Flex
                    direction="row"
                    justify="between"
                    className={Styles.info}
                  >
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </Flex>
                </Flex>
              </div>
            </WingBlank>
          );
        })}
      </div>
    );
  };
  render() {
    const { swipers, grounps, news } = this.state;
    return (
      <div className={Styles.root}>
        {/* 渲染搜索栏 */}
        <SearchHeader cityName='深圳'></SearchHeader>
        {/* 渲染轮播图 */}
        {swipers && this.renderSwipers()}
        {/* 渲染导航菜单 */}
        {this.renderNav()}
        {/* 渲染租房小组 */}
        {grounps && this.renderGrouns()}
        {/* 渲染最新资讯 */}
        {news && this.renderNews()}
      </div>
    );
  }
}
