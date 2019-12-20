import React  from "react";

import { Flex } from "antd-mobile";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as filterActionCreators from "../../../../store/actionCreators/filterActionCreators";

import styles from "./index.module.scss";

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
        return (
          <Flex.Item key={item.type} onClick={()=>props.setOpenType(item.type)} >
            <span className={styles.dropdown}>
              <span>{item.title}</span>
              <i className="iconfont icon-arrow"></i>
            </span>
          </Flex.Item>
        );
      })}
    </Flex>
  );
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(filterActionCreators,dispatch);
};
export default connect(null, mapDispatchToProps)(FilterTitle);
// export default FilterTitle
