<template>
    <div>
        <uploader-drop class="my-uploader-drop" id="my-uploader-drop"><slot></slot></uploader-drop>
    </div>
</template>

<script>
    export default {
        name: 'MyUploaderDrop',
    }
</script>

<style>
    #my-uploader-drop {
        position: relative;
        padding: 0;
        overflow: hidden;
        border: 1px #ccc;
        background-color: #f5f5f5;
    }
</style>
