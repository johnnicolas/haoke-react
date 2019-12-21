import React, { Component } from "react";
//使用 pickerView ant-mobile 中的组件
import { PickerView } from "antd-mobile";

import { connect } from "react-redux";

import FilterFooter from "../FilterFooter";

import * as filterActionCreators from "../../../../store/actionCreators/filterActionCreators";

import { bindActionCreators } from "redux";

//将filteractioncreators和bind就可以拿到poprs
class FilterPicker extends Component {
  constructor(props) {
    super();
    this.state = {
      //根据opentype,将相对应的值赋值给selectvalue
      value: props.selectValue[props.openType],
      openType: props.openType
    };
  }
  static getDerivedStateFromProps(props, state) {
    //这个生命周期会有两个参数,一个是新的一个是旧的
    //然后进行判断如果当前的值不等于之前的值的话那么就将旧的值覆盖
    if (props.openType !== state.openType) {
      return {
        ...state, //将旧的值覆盖
        value: props.selectValue[props.openType],
        openType: props.openType
      };
    } else {
      return state;
    }
  }
  //选中的值的方法
  select = val => {
    this.setState({
      value: val //然后将val设置给value 然后用操作仓库中的方法将 获取到的值传送到仓库
    });
  };
  render() {
    //这里是上面的value
    const { value } = this.state;
    const { openType, area, subway, price, rentType } = this.props;
    let data = null;
    let cols = 3;
    switch (openType) {
      case "area":
        data = [area, subway];
        break;
      case "mode":
        data = rentType;
        cols = 1;
        break;
      case "price":
        data = price;
        cols = 1;
        break;
      default:
        break;
    }
    return (
      <div>
        <PickerView
          data={data}
          cols={cols}
          value={value}
          onChange={this.select}
        />
        <FilterFooter
          onOk={() => this.props.setSelectValue({ [openType]: value })}
          onCancel={() => this.props.setOpenType("")}
        />
      </div>
    );
  }
}
//用这个方法来操作值
const mapStateToProps = ({
  filters: {
    openType,
    filterData: { area, subway, rentType, price },
    selectValue
  }
}) => {
  return {
    openType,
    area,
    subway,
    price,
    rentType,
    selectValue
  };
};
//这个是操作值的方法将获取到的值传入到仓库中那么就要使用到mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return bindActionCreators(filterActionCreators, dispatch);
};
//首先引入的是mapstate的方法
export default connect(mapStateToProps, mapDispatchToProps)(FilterPicker);
