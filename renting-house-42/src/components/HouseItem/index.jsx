import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { BASEURL } from "../../untils/url";
function HouseItem({ houseCode, desc, houseImg, price, tags, title }) {
  //括号里面拿到传过来的参数，利用解构的语法
  return (
    <div className={styles.house}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={`${BASEURL}${houseImg}`} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div>
          {/* 遍历tags里面的数据 */}
          {tags.map((item,index) => {
            const tagName = `tag${(index % 3) + 1}`
            return (
              <span
                key={item}
                className={classNames(styles.tag,styles[tagName])}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{price}</span>
          元/月
        </div>
      </div>
    </div>
  );
}
export default HouseItem;
