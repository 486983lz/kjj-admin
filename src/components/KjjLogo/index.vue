<template>
    <div class="nav_left_part" style="padding: 0 15px;" @click="toggleClick">
        <img class="nav_logo" src="../../assets/nav_logo/u5.png" alt="">
        <span class="logo-btn">管理端</span>
        <span class="logo-text">包头市科技局科技创新项目管理信息平台</span>

    </div>
</template>

<script>
    export default {
        name: 'KjjLogo',
        props: {
            isActive: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                img:'../../assets/nav_logo/u5.png',
                logoText:''
            }
        },
        mounted() {
            // this.getOnelogo();
            // this.getOneText();
        },
        methods: {
            toggleClick() {
                this.$emit('toggleClick')
            },
            getOnelogo(){
                let that = this;
                this.$store.dispatch('logo/getOnelogo',{is_top:1})
                    .then((response) => {
                        this.img =  process.env.VUE_APP_BASE_API + '/../../' + response.img;
                    })
                    .catch(() => {

                    });
            },
            getOneText(){
                let that = this;
                this.$store.dispatch('logo/getLogoText',{id:1})
                    .then((response) => {
                        this.logoText = response[0]
                    })
                    .catch(() => {

                    });
            }
        }
    }
</script>

<style scoped>
    .nav_left_part {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        float: left;
        color: #fff;
        /*margin-left: 200px;*/
    }
    .nav_logo {
        display: inline-block;
        width: 180px;
        height: 80px;
        position: relative;
        top: 10px;
        margin-right: 15px;
    }
    .hamburger {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
    }

    .hamburger.is-active {
        transform: rotate(180deg);
    }
    .nav_left_part .logo-text{
        display: inline-block;
        height: 80px;
        line-height: 80px;
        text-align: center;
        float: right;
    }
    .logo-btn{
        display: inline-block;
        width: 80px;
        height: 20px !important;
        line-height: 20px;
        text-align: center;
        float: right;
        margin-top: 30px;
        font-size: 14px;
        color: #72A0DF;
        background-color: #FFF;
        border-radius:50px;
        margin-left: 15px;
    }
</style>
