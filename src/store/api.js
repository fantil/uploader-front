/**
 * Created by ftk on 2018/8/27.
 * 所有的请求地址
 */
import Vue from 'vue'
import './http'
var fetchApis = {};
const APIS = {
    UPLOAD_MERGE: "/uploader-web/chunkMerge",//合并分片
};
const postPrefix = ['post', 'save', 'delete'];
function isPostAction(key) {
    key = key.toLowerCase();
    return postPrefix.some(function (action) {
        return key.indexOf(action) == 0;
    });
}
const vueInstance = new Vue;
for (let action in APIS) {
    let isPost = isPostAction(action);
    let defaultQuery = {
        body: {},
        params: {}
    };
    fetchApis[action] = function (store, queryData = defaultQuery) {
        // get请求{params: {}} post请求{body:{}}
        let copy4PostQuery = Object.assign({}, queryData);
        copy4PostQuery.params = {};
        var args = [].concat(isPost ? [queryData.params, copy4PostQuery] : queryData);
        var promise = vueInstance.$http[isPost ? 'post' : 'get'](APIS[action], ...args);
        return promise;
    }
}
export default fetchApis;
