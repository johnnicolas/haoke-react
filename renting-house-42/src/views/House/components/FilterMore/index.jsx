import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./index.module.scss";
import FilterFooter from "../FilterFooter";
class FilterMore extends Component {
  //渲染下面的方法
  renderDd = data => {
    return (
      <dd className={styles.dd}>
        {data.map(item => {
          return (
            <span className={styles.tag} key={item.value}>
              {item.label}
            </span>
          );
        })}
      </dd>
    );
  };
  render() {
    const { roomType, oriented, floor, characteristic } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.mask}></div>
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
          <FilterFooter Cancel="清除" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({
  filters: {
    filterData: { roomType, oriented, floor, characteristic }
  }
}) => {
  return {
    roomType,
    oriented,
    floor,
    characteristic
  };
};
//获取仓库中的值
export default connect(mapStateToProps, null)(FilterMore);
