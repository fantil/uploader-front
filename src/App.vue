<template>
    <div id="app">

        <my-uploader style="width: 100%">
            <my-uploader-drop>
                <my-downloader/>
            </my-uploader-drop>
        </my-uploader>

    </div>
</template>

<script>
import MyUploader from './components/MyUploader'
import MyDownloader from './components/MyDownloader'
import MyUploaderDrop from './components/uploader/MyUploaderDrop'

export default {
    name: 'App',
    components: {
        myUploader: MyUploader,
        myDownloader: MyDownloader,
        myUploaderDrop: MyUploaderDrop
    },
    data () {
        return {
          inputValue: '',
          list: []
        }
    },
    methods: {
        handleSubmit() {
            this.list.push(this.inputValue);
            this.inputValue = ''
        },
        handleDelete(index) {
            this.list.splice(index, 1)
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
