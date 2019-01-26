<template>
    <div>
        <home-header></home-header>

    </div>
</template>

<script>
    import HomeHeader from './components/Header'
    import axios from 'axios'
    export default {
        name: 'Home',
        data () {
            return {

            }
        },
        components: {
            HomeHeader,
        },
        methods: {
            getHomeInfo() {
                axios.get('/api/home.json').then(this.getHomeInfoSuccess)
            },
            getHomeInfoSuccess(result) {
                result = result.data
                if (result.ret && result.data) {
                    let data = result.data

                }
            }
        },
        mounted () {
            this.getHomeInfo()
        }
    }
</script>

<style>

</style>