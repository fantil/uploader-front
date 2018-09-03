<template>
    <div>
        <uploader ref="uploader"
                  :options="options"
                  @file-added="handleFileAdded"
                  @file-success="handleFileSuccess"
                  class="my-uploader">
            <el-dropdown placement="bottom">
                <el-button  class="el-dropdown-link">
                    上传 <i class="el-icon-arrow-down el-icon-right"></i>
                </el-button>
                <el-dropdown-menu  slot="dropdown">
                    <el-dropdown-item>
                        <my-uploader-btn class="my-uploader-btn">上传文件</my-uploader-btn>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <my-uploader-btn class="my-uploader-btn" :directory="true">上传文件夹</my-uploader-btn>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" round @mouseover.native="showFileList" @mouseout.native="hideFileList">上传列表</el-button>

            <uploader-list v-show="fileListDisplay"></uploader-list>

            <slot></slot>
        </uploader>
    </div>
</template>


<script>
    import md5 from 'js-md5';
    import {store, DispatchActions} from '~/store';
    import MyUploaderBtn from './uploader/MyUploaderBtn';
    import UploadList from "element-ui/packages/upload/src/upload-list";
    export default {
        name: 'MyUploader',
        components: {
            UploadList,
            myUploaderBtn: MyUploaderBtn,
        },
        data () {
            return {
                fileListDisplay: false,
                options: {
                    // target: 'http://localhost:8090/uploader-web/upload',
                    target: this.switchTarget,
                    // testMethod: this.chunkCheck,
                    // uploadMethod: this.handleUpload,
                    testChunks: true,
                    chunkSize: 5*1024*1024,
                    forceChunkSize: true,
                    simultaneousUploads: 5,
                    generateUniqueIdentifier: this.generateIdentifier
                },
                attrs: {
                    accept: 'image/*'
                },
                uploadTarget: 'http://localhost:8090/uploader-web/upload/file',
                chunkCheckTarget: 'http://localhost:8090/uploader-web/upload/chunkCheck',
            }
        },
        methods: {
            chunkCheck(file, chunk) {
                console.log("chunkCheck")
                console.log("file:" + file)
                console.log("chunk:" + chunk)
                // result = {
                //     message: "success",
                //     success: true
                // }
                // return result
            },
            switchTarget(file, chunk, isTest) {
                console.log("uploadTarget")
                console.log(isTest)
                if (isTest) {
                    return this.chunkCheckTarget
                } else {
                    return this.uploadTarget
                }
            },
            handleUpload(file, chunk) {
                console.log("handleUpload")
                console.log("file:" + file)
                console.log("chunk:" + chunk)
            },
            handleFileAdded(file) {
                console.log("handleFileAdded")
                // file.identifier = md5(file.name + file.size)
                // console.log("current task handleFileAdded, file:" + file, + "event:" + event)
            },
            handleFileSuccess(rootFile, file, message, chunk) {
                console.log(rootFile)
                console.log(file)
                console.log(chunk)
                if(file.chunks.length === 1) {
                    console.log("chunk length == 1, return")
                    return
                }
                store.dispatch(DispatchActions.UPLOAD_MERGE, {
                    params: {
                        filename: file.name,
                        identifier: file.uniqueIdentifier,
                        // totalChunks: file.totalChunks
                        totalChunks: file.chunks.length
                    }
                }).then(() => {
                        console.log("chunks merged")
                    },
                    response => {
                        this.$alert(response.message)
                    });
            },

            showFileList() {
                this.fileListDisplay = true
            },
            hideFileList() {
                this.fileListDisplay = false
            },
            generateIdentifier(file) {
                console.log(file)
                if(file != null) {
                    return md5(file.name + file.size)
                }
                return "undefined"
            }
        }
    }
</script>

<style>
    .my-uploader {
        /*width: 880px;*/
        /*padding: 15px;*/
        /*margin: 40px auto 0;*/
        /*font-size: 12px;*/
        /*box-shadow: 0 0 10px rgba(0, 0, 0, .4);*/
    }
    .my-uploader-btn {
        display: inline;
        padding: 0;
        border: none;
        font-size: small;
        line-height: 1;
        border-radius: 0;
        margin: 0;
    }
    .my-uploader-btn:hover {
        background-color: rgba(236, 245, 255, 1);
    }
</style>
