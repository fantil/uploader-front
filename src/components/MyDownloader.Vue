<template>
    <div style="position: relative;">
        <el-table
                :data="fileList"
                style="width: 100%">
            <el-table-column
                    label="文件名"
                    align="center"
                    style="width: 30%">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" style="" style="width: 30%">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        @click="handleDownload(scope.$index, scope.row)"><a :href="scope.row.href">下载</a></el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
    import {store, DispatchActions} from '~/store';
    export default {
        name: 'Download',
        data () {
            return {
                fileList: [],
                baseDownloadHref: "/uploader-web/download/file?fileName="
            }
        },
        methods: {
            handleListFiles() {
                store.dispatch(DispatchActions.LIST_FILES, {

                }).then(result => {
                        console.log(result.data);
                        if (result.data != null && result.data !== "") {
                            this.fileList = result.data
                            for (let i = 0; i < this.fileList.length; i++) {
                                let file = this.fileList[i];
                                file.href = this.baseDownloadHref + file.name;
                            }
                        } else {
                            this.fileList = []
                        }
                    },
                    response => {
                        this.$alert(response.message)
                    });
            },
            handleDownload(index, data) {
                console.log("index:" + index);
                console.log(data);
            },
            handleDelete(index, data) {
                console.log("index:" + index);
                console.log(data)
            }
        },
        mounted: function () {
            this.handleListFiles()
        }
    }
</script>

<style>
    a {text-decoration:none;}
    a:link {text-decoration:none;}
    a:active {text-decoration:none;}
    a:visited {text-decoration:none;}
    a:hover {text-decoration:none;}
</style>
