/**
 * Created by ftk on 2018/8/27.
 */

import Vue from 'vue'
import VueResource from 'vue-resource';


Vue.use(VueResource);
// Http Global
Vue.http.options.root = '/edu';
Vue.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
Vue.http.options.emulateJSON = true;
const requestDebug = true;
let gotoLogin = debounce(()=>{
    let instance = getVueInstance()
    instance.$router.push({
        name: "login"
    })
    instance.$notify({
        message: "会话超时，请重新登录",
        type: "error"
    })
}, 1000)
// interceptors
Vue.http.interceptors.push(function(request, next) {
    next((response)=>{
        switch (response.status) {
            case 0:
                notify('error', '网络连接失败', this);
                break;
            case 200:
                if (response.body.hasOwnProperty('success')) {
                    if (response.body.success) {
                        response.body = response.body.data;
                    } else {
                        if (response.body.messageCode === '用户尚未登录') {
                            gotoLogin()
                        }
                        // 先行resolve
                        return Promise.resolve(response.body);
                    }
                }
                break;
            case 400:
                break;
            case 404:
                notify('error', '访问地址或服务不存在', this);
                break;
            case 500:
            case 501:
            case 502:
	        case 503:
                notify('error', '服务暂时不可用', this);
                break;
            default:
                notify('error', response.statusText, this);
        }
    });
});
function getVueInstance(){
    if (getVueInstance.instance) {
        return getVueInstance.instance;
    }
    // let instance = new Vue({router});
    // getVueInstance.instance = instance;
    // return instance
}
function notify(type, msg, instance){
    instance = instance || getVueInstance();
    requestDebug && instance.$notify({
        message: msg,
        type: type
    });
}
function debounce(fn, wait) {
    let timer
    return function(){
        let _this = this
        let args = arguments
        if (timer) {
            window.clearTimeout(timer)
        }
        timer = setTimeout(function(){
            fn.apply(_this, args)
        }, wait)
    }
}
