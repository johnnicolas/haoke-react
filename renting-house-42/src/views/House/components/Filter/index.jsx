import React, { Component } from "react";

import styles from "./index.module.scss";

// 引入子组件
import FilterMore from "../FilterMore";
import FilterPicker from "../FilterPicker";
import FilterTitle from "../FilerTitle";

import * as filterActionCreators from "../../../../store/actionCreators/filterActionCreators";
//引入react-redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class Filter extends Component {
  //渲染遮照层的方法
  renderMack = () => {
    //从props中解构出opentype
    const { openType } = this.props;
    // 进行判断
    if (openType === "" || openType === "more") return null;
    return <div className={styles.mask} onClick={()=>this.props.setOpenType('')}></div>;
  };
  //在生命周期钩子函数中获取到需要的值
  componentDidMount() {
    this.props.asyncSetFilterData();
  }
  render() {
    //这是从仓库中拿到的值
    const { openType } = this.props;
    return (
      <div className={styles.root}>
        {this.renderMack()}
        <div className={styles.content}>
          <FilterTitle />
          {(openType === "area" || openType === "mode" || openType === "price") && <FilterPicker />}
          {openType === "more" && <FilterMore />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ filters: { openType } }) => {
  return {
    openType
  };
};
//需要用到异步的方法来操作值
const mapDispatchToProps = dispatch => {
  return bindActionCreators(filterActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
// export default Filter
