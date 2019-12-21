import React from "react";

import { Flex } from "antd-mobile";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as filterActionCreators from "../../../../store/actionCreators/filterActionCreators";

import styles from "./index.module.scss";

import classNames from 'classnames'
const types = [
  { title: "区域", type: "area" },
  { title: "方式", type: "mode" },
  { title: "租金", type: "price" },
  { title: "筛选", type: "more" }
];
function FilterTitle(props) {
  return (
    <Flex className={styles.root}>
      {types.map(item => {
        const isSelect = props.selecTitleValue[item.type];
        return (
          <Flex.Item
            key={item.type}
            onClick={() => {
              //触发更改opentype的值
              props.setOpenType(item.type);
              //触发更改selectitlevalue中的值
              props.selectTitleValue({ [item.type]: true });
            }}
          >
            <span className={classNames(styles.dropdown,{[styles.selected]:isSelect})}>
              <span>{item.title}</span>
              <i className="iconfont icon-arrow"></i>
            </span>
          </Flex.Item>
        );
      })}
    </Flex>
  );
}
//获取仓库中的值
const mapStateToProps = ({ filters: selecTitleValue }) => {
  return {
    selecTitleValue
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(filterActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterTitle);
// export default FilterTitle
