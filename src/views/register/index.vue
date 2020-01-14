<template>
    <div class="wscn-http-container">
        <div class="navbar">
            <home-page id="home-page" :is-active="false" class="hamburger-container"/>
        </div>
        <el-row>
            <el-col :span="24">
                <div  class="grid-content bg-purple">
                    <div class="notice_title">
                        <div class="notice">
                            <span >返回<span style="color: #1890ff;" @click="admin_login">登录</span></span>
                        </div>
                        <div class="register_input">
                            <el-steps :active="active" :space="200">
                                <el-step title="步骤 1"></el-step>
                                <el-step title="步骤 2"></el-step>
                                <el-step title="步骤 3"></el-step>
                            </el-steps>
                            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="navbar-bottom">
            <home-bottom id="home-bottom" :is-active="false" class="hamburger-container"/>
        </div>
    </div>
</template>

<script>
  import HomePage from '@/components/HomePage'
  import HomeBottom from '@/components/HomeBottom'

export default {
  name: 'Page404',
  components: {
    HomePage,
    HomeBottom,
  },

    data() {
        return {
            active: 0
        };
    },

    methods: {
      //回到首页
        home_page(){
            this.$router.push({name: 'home_page'});
        },
        admin_login(){
            this.$router.push({name: 'admin_login'});
        },

        //步骤条方法
        next() {
            if (this.active++ > 2) this.active = 0;
        }

    }

}
</script>

<style lang="scss" scoped>
    .navbar {
        height: 225px;
        width: 100%;
        background-color: rgba(112, 159, 225, 1);
        font-size: 26px;
        color: #fff;
    }

    .navbar-bottom{
        height: 90px;
        width: 100%;
        background-color: rgba(242, 242, 242, 1);
        font-size: 12px;
        color: #555555;
        opacity: 0.7;
    }

    .wscn-http-container{
        transform: translate(-50%, 0%);
        position: absolute;
        left: 50%;
        width: 100%;
        height: 100%;
    }
    .grid-content {
        /*border-radius: 4px;*/
        /*min-height: 36px;*/
        /*padding: 60px 30px 25px 0;*/

        .step{
            position: absolute;
            left: 35%;
            font-size: 13px;
            width: 250px;
        }

        .notice_title{
            text-align: center;
            font-size: 14px;
            margin-bottom: 40px;

            .register_input{
                width: 35%;
                height: 644px;
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.349019607843137);
                position: relative;
                left: 31%;
            }
        }
        .more{
            float: right;
            color: #7F7F7F;
            text-decoration: underline;
            font-size: 13px;
            margin-right: 40px;
            cursor: pointer;
        }
        .dot{
            width: 21px;
            height: 21px;
            vertical-align: middle;
            margin-right: 15px;
        }
        .notice{
            color: #555555;
            margin: 3% 0 1% 29%;
        }
        .notice:hover{
            opacity: 0.7;
        }
        .dot2{
            width: 13px;
            height: 13px;
            vertical-align: middle;
            margin-left: 3px;
            margin-right: 20px;
        }
        .news_list{
            border-bottom: 1px dashed #eee;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
           /* background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
            background-size: 15px 1px;
            background-repeat: repeat-x;*/

            .news_title{
                display: inline-block;
                width: 80%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;
                color: #555555;
            }
            .news_title:hover{
                opacity: 0.7;
            }
            .news_time{
                float: right;
                margin-right: 25px;
            }
        }

        .declare{
            width: 277px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: rgba(112, 159, 225, 1);
            border-radius: 4px;
            font-size: 16px;
            color: #FFFFFF;
            margin-bottom: 20px;
            cursor: pointer;
        }
        .declare:hover{
            opacity: 0.7;
        }
        .declare img{
            width: 54px;
            height: 54px;
            vertical-align: middle;
            margin-left: 20px;
        }
        .declare span{
            vertical-align: middle;
        }
    }
</style>
