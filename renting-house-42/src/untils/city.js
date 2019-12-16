//引入axios
import axios from 'axios'

//申明一个常量记录 保存的setitem里面的值
const Key = 'hkzf-key'

//保存城市到本地
const setcity = city => {
    window.localStorage.setItem(Key, JSON.stringify(city))
}
//从本地取出保存的本地数据
const getcity = () => {
  return  window.localStorage.getItem(Key)
}

//获取定位城市，这个方法要返回paromise对象

const BMap = window.BMap

export const getlocationCity = () => {
    //声明一个变量 等于 获取get的方法
    const city = getcity()
    //判断本地有没有这个缓存 ，如果没有就返回 那么就返回promise对象
    if (!city) {
        //返回promise对象
        return new Promise((resolve, reject) => {
            //发送请求到百度地图，获取当前的定位城市
            var myCity = new BMap.LocalCity()
            //再次发送请求给自家的服务器，获取完整的城市信息
            myCity.get(async result => {
                //把获取到的完整的城市信息，保存在本地
                const res = await axios.get(`/area/info?name=${result.name}`)
                console.log(res)
                setcity(res.data.body)
                //    resolve把结果传递给调用者
                resolve(result.data.body)
            })

        })


    } else {
        return Promise.resolve(JSON.parse(city))
    }
}