import React from "react";
import { Flex } from "antd-mobile";
import Styles from "./index.module.scss";
import { Link ,withRouter} from "react-router-dom";
import propTypes from "prop-types";

function SearchHeader({ cityName ,history}) {
  return (
    <Flex className={Styles.root}>
      <Flex className={Styles.searchLeft}>
        <div onClick={()=>history.push('/citylist')}>
          <span>{cityName}</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        <div>
          <i className="iconfont icon-search"></i>
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <Link to="/map">
        <i className="iconfont icon-map"></i>
      </Link>
    </Flex>
  );
}
SearchHeader.propTypes = {
  cityName: propTypes.string.isRequired
};
export default withRouter(SearchHeader);
