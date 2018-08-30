<template>
    <div>
        <uploader ref="uploader"
                  :options="options"
                  @file-added="handleFileAdded"
                  @file-success="handleFileSuccess"
                  class="uploader-example">
        </uploader>
    </div>
</template>


<script>
    import md5 from 'js-md5';
    import {store, DispatchActions} from '~/store';
    export default {
        name: 'MyUploader',
        data () {
            return {
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
                uploadTarget: 'http://localhost:8090/uploader-web/upload/upload',
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
                if(file.chunks.length == 1) {
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
    .uploader-example {
        width: 880px;
        padding: 15px;
        margin: 40px auto 0;
        font-size: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }
    .uploader-example .uploader-btn {
        margin-right: 4px;
    }
    .uploader-example .uploader-list {
        max-height: 440px;
        overflow: auto;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
