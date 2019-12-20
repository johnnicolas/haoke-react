import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
import classNames from 'classnames'
 function FilterFooter({cancel,right,onCancel,onOk})  {
        return (
        <Flex className={styles.root}>
            <span className={classNames(styles.btn,styles.cancel)}
            onClick={onCancel}
            >
               {cancel}
            </span>
            <span className={classNames(styles.btn,styles.ok)}
            onClick={onOk}
            >
              {right}
            </span>
        </Flex>
        )
}
FilterFooter.defaultProps = {
    cancel:'取消',
    right:'确定'
}

export default FilterFooter

