<template>
    <div class="wscn-http-container">
        <div class="navbar">
            <home-page id="home-page" :is-active="false" class="hamburger-container"/>
        </div>
        <el-row>
            <el-col :span="24">
                <div  class="grid-content bg-purple">
                    <div class="notice_title">
                        <span class="notice">企事业申报指南</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="grid-content bg-purple" style="padding-left: 280px;">
                    <div style="height: 400px;padding-left: 215px;">
                        <el-steps direction="vertical" :active="1">
                            <div class="step" style="color: #1890ff;">可选择申报方合适的企事业性质进行<span style="text-decoration: underline;cursor: pointer;">创建</span>。</div>
                            <div class="step" style="color: #666666;top: 60%;">按照申报创建流程逐步填写申报项目内的项目介绍、阶段目标、指标等信息，并上传所需的对应附件。</div>
                            <div class="step" style="color: #AEAEAE;bottom: 0;">将申报项目和相应附件一同提交申报，对应审核单位及专家将在第一时间对申报项目进行批注审核。</div>
                            <el-step title="创建申报单位账号"></el-step>
                            <el-step title="填写创建项目申报"></el-step>
                            <el-step title="提交申报"></el-step>
                        </el-steps>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <div class="declare" @click="home_page">
                        <span>回到首页</span>
                    </div>
                    <div class="declare">
                        <span>了解更多公告</span>
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
    methods: {
      //回到首页
        home_page(){
            this.$router.push({name: 'home_page'});
        },
        admin_login(){
            this.$router.push({name: 'admin_login'});
        },

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
        position: fixed;
        bottom: 0;
    }

    .wscn-http-container{
        transform: translate(-50%, 0%);
        position: absolute;
        left: 50%;
        width: 100%;
        height: 100%;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        padding: 40px 30px 25px 0;

        .step{
            position: absolute;
            left: 40%;
            font-size: 13px;
            width: 250px;
            z-index: 10;
        }

        .notice_title{
            text-align: center;
            font-size: 28px;
            color: #555555;
            margin-bottom: 10px;
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
            text-align: center;
            background-color: rgba(112, 159, 225, 1);
            color: #FFFFFF;
            width: 300px;
            height: 60px;
            line-height: 60px;
            border-radius: 5px;
            font-size: 18px;
            margin-bottom: 35px;
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
