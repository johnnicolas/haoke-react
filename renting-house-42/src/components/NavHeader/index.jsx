import React from 'react'
import {NavBar} from 'antd-mobile'
import Styles from './index.module.scss'
import {withRouter} from 'react-router-dom'
function NavHeader({children,history}){
    return <NavBar
    className={Styles.navBar}
    mode="light"
    icon={<i className='iconfont icon-back' /> }
    onLeftClick={() =>history.goBack() }
>{children}</NavBar>
}
export default withRouter(NavHeader)

