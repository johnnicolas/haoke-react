import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'
import House from '../House'
import Info from '../Info'
import My from '../My'
import NotFound from '../NotFound'

import { TabBar } from 'antd-mobile';

import styles from './index.module.scss'

export default class Layout extends Component {
   constructor(props){
       super()
       this.state = {
        selectedTab:props.location.pathname
       }
   }
    TABS = [
        {
            title: '首页',
            icon: 'icon-index',
            path: '/layout/home'
        },
        {
            title: '找房',
            icon: 'icon-findHouse',
            path: '/layout/house'
        },
        {
            title: '资讯',
            icon: 'icon-info',
            path: '/layout/info'
        },
        {
            title: '我的',
            icon: 'icon-my',
            path: '/layout/my'
        }
    ]

    renderTobBar = () => {
        return (
            <TabBar tintColor="#33A3F4" noRenderContent>
                {this.TABS.map(item => {
                    return <TabBar.Item
                        title={item.title}
                        key={item.path}
                        icon={<i className={`iconfont ${item.icon}`} />}
                         selectedIcon={<i className={`iconfont ${item.icon}`} />}
                         selected={this.state.selectedTab === item.path}
                         onPress={() => {
                            this.setState({
                              selectedTab: item.path,
                            });
                            if(this.state.selectedTab !== item.path){
                                this.props.history.push(item.path)
                            }
                          }}
                    />


                })}
            </TabBar>
        )
    }



    render() {
        return (
            <div className={styles.layout}>
                <div>
                    <Switch>
                        <Route path='/layout/home' component={Home} />
                        <Route path='/layout/house' component={House} />
                        <Route path='/layout/info' component={Info} />
                        <Route path='/layout/my' component={My} />
                        <Redirect exact from='/layout' to='/layout/Home' />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <div className={styles.tabbar}>{this.renderTobBar()}</div>
            </div>
        )
    }
}
