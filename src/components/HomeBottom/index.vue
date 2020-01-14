<template>
    <div class="nav_left_part">
        <div class="nav_font">
            <span class="nav_font_title">包头市科技局科技创新项目管理信息系统</span>
            <span class="nav_font_title1">包头市科学技术局主办</span>
            <span>技术支持: 内蒙古神灯网络科技有限公司</span>
        </div>
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
        position: relative;
        text-align: center;
    }
    .nav_font_title{
        display: block;
        padding-top: 15px;
        margin-bottom: 15px;
    }
    .nav_font_title1{
        display: block;
        margin-bottom: 2px;
    }
    .nav_logo{
        width: 400px;
        height: 90px;
        left: 14%;
        position: absolute;
    }
</style>
