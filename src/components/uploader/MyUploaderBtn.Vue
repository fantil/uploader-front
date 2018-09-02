<template>
    <div>
        <uploader-btn class="my-uploader-btn" id="my-uploader-btn"><slot></slot></uploader-btn>
    </div>
</template>

<script>
    export default {
        name: 'MyUploaderBtn',
    }
</script>

<style>
    #my-uploader-btn {
        display: inline-block;
        position: relative;
        width: 100%;
        padding: 0;
        font-size: 100%;
        line-height: 1.4;
        color: #666;
        border: 0;
        cursor: pointer;
        border-radius: 0;
        background: none;
        outline: none;
    }
    #my-uploader-btn:hover {
        background-color: rgba(236, 245, 255, 1);
    }
</style>
