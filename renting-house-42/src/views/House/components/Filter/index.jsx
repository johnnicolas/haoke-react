import React, { Component } from 'react'

import styles from './index.module.scss'

// 引入子组件
import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'
import FilterTitle from '../FilerTitle'

//引入react-redux
import connect from 'react-redux'
 class Filter extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
const mapStateToProps = state =>{
    
}
export default connect(mapStateToProps,null)(Filter)
