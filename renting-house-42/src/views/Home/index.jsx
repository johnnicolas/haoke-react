import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import Styles from './index.module.scss'
//导入路由
import { BASEURL } from '../../untils/url'
export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      imgHeight: 212, //轮播图的固定高度
      swipers: null
    }
  }
  //定义实例属性

  //在挂载之前渲染数据
  componentDidMount() {
    //获取轮播图的数据
    this.getSwipersData()
  }
  //获取轮播图的方法
  getSwipersData = async () => {
    const result = await this.$axios.get('/home/swiper')
    console.log(result)
    this.setState({
      swipers: result.data.body
    })
  }
  //渲染轮播图
  renderSwipers=() => {
    return <div>
      <Carousel
        autoplay
        infinite
      >{this.state.swipers.map(item => (
        <a
          key={item.id}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
        >
          <img src={`${BASEURL}${item.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }} />
        </a>
      ))}
      </Carousel>
    </div>
  }
  render() {
    const { swipers } = this.state
    return <div className={Styles.root}>
      {swipers && this.renderSwipers()}
     </div>
  }
}
