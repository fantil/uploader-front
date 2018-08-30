<template>
    <div>

    </div>
</template>


<script>
    import md5 from 'js-md5';
    import {store, DispatchActions} from '~/store';
    export default {
        name: 'Download',
        data () {
            return {

            }
        },
        methods: {
            handleListFiles() {
                store.dispatch(DispatchActions.LIST_FILES, {

                }).then(result => {
                        console.log(result.data)
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
        },
        mounted: {

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
