import React, { Component } from "react";

//使用 pickerView ant-mobile 中的组件
import { PickerView } from "antd-mobile";
import { connect } from "react-redux";
import FilterFooter from '../FilterFooter'
class FilterPicker extends Component {
  render() {
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
        <PickerView data={data} cols={cols} />
        <FilterFooter />
      </div>
    );
  }
}
//用这个方法来操作值
const mapStateToProps = ({
  filters: {
    openType,
    filterData: { area, subway, rentType, price }
  }
}) => {
  return {
    openType,
    area,
    subway,
    price,
    rentType
  };
};

//首先引入的是mapstate的方法
export default connect(mapStateToProps, null)(FilterPicker);
