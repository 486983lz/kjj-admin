<template>
    <div class="nav_left_part">
        <div class="nav_font">
            <span class="nav_font_title">包头市科技局</span>
            <span>科技创新项目管理信息系统</span>
        </div>
        <img class="nav_logo" src="../../assets/nav_logo/u5.png" alt="">
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        props: {
            isActive: {
                type: Boolean,
                default: false
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .nav_left_part {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }
    .nav_font {
        text-align: center;
        float: right;
        margin-right: 42%;
        margin-top: 6%;
    }
    .nav_font_title{
        display: block;
        margin-bottom: 5px;
    }
    .nav_logo{
        width: 500px;
        height: 225px;
        left: 20%;
        position: absolute;
    }
</style>
