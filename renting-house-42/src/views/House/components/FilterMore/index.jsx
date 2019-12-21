import React, { Component } from "react";

import { connect } from "react-redux";

import styles from "./index.module.scss";

import FilterFooter from "../FilterFooter";

import classNames from "classnames";

import { bindActionCreators } from "redux";

import * as filterActionCreators from "../../../../store/actionCreators/filterActionCreators";

class FilterMore extends Component {
  //在构造器中写value值
  constructor(props) {
    super();
    this.state = {
      //从仓库中取出之前存到仓库里面的more的值
      value: props.more
      // value:[]
    };
  }
  //渲染下面的方法
  renderDd = data => {
    const { value } = this.state;
    return (
      <dd className={styles.dd}>
        {data.map(item => {
          return (
            <span
              className={classNames(styles.tag, {
                [styles.tagActive]: value.includes(item.value)
              })}
              key={item.value}
              onClick={() => this.toggleSelect(item.value)}
            >
              {item.label}
            </span>
          );
        })}
      </dd>
    );
  };
  //每一项添加点击事件的方法
  toggleSelect = val => {
    //  console.log(val)
    //深拷贝之前的数组,并且进行判断
    let oldValue = JSON.parse(JSON.stringify(this.state.value));
    if (oldValue.includes(val)) {
      oldValue = oldValue.filter(item => item !== val);
    } else {
      oldValue.push(val);
    }
    //赋值给value之后重新渲染
    this.setState({
      value: oldValue
    });
  };
  render() {
    const { roomType, oriented, floor, characteristic } = this.props;
    return (
      <div className={styles.root}>
        <div
          className={styles.mask}
          onClick={() => this.props.setOpenType('')}
        ></div>
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            {this.renderDd(roomType)}
            <dt className={styles.dt}>朝向</dt>
            {this.renderDd(oriented)}
            <dt className={styles.dt}>楼层</dt>
            {this.renderDd(floor)}
            <dt className={styles.dt}>房屋亮点</dt>
            {this.renderDd(characteristic)}
          </dl>
        </div>
        <div className={styles.footer}>
          <FilterFooter
            onCancel={() => this.setState({ value: [] })}
            onOk={() => this.props.setSelectValue({ more: this.state.value })}
            cancel="清除"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({
  filters: {
    filterData: { roomType, oriented, floor, characteristic },
    selectValue: { more }
  }
}) => {
  return {
    roomType,
    oriented,
    floor,
    characteristic,
    more
  };
};
//引入操作仓库的方法
const mapDispatchToProps = dispatch => {
  return bindActionCreators(filterActionCreators, dispatch);
};
//获取仓库中的值
export default connect(mapStateToProps, mapDispatchToProps)(FilterMore);
