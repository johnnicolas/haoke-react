import axios from 'axios'
import {Component} from 'react'
import {BASEURL} from './url'
//设置基准路径
axios.defaults.baseURL = BASEURL
//将axios挂在到react实例
Component.prototype.$axios = axios