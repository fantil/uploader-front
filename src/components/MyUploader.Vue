<template>
    <div>
        <uploader ref="uploader"
                  :options="options"
                  @file-added="handleFileAdded"
                  class="uploader-example">
        </uploader>
    </div>
</template>


<script>
    import md5 from 'js-md5';

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
                    generateUniqueIdentifier: this.generateIdentifier
                },
                attrs: {
                    accept: 'image/*'
                },
                uploadTarget: 'http://localhost:8090/uploader-web/upload',
                chunkCheckTarget: 'http://localhost:8090/uploader-web/chunkCheck',
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


            generateIdentifier(file) {
                file.uniqueIdentifier = md5(file.name + file.size)
                console.log(file.uniqueIdentifier)
                console.log(file)
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