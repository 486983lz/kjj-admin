<template>
    <div class="wscn-http-container">
        <div class="navbar">
            <home-page id="home-page" :is-active="false" class="hamburger-container"/>
        </div>
        <el-row>
            <el-col :span="17">
                <div class="grid-content bg-purple">
                    <div class="notice_title">
                        <svg-icon icon-class="dot" class="dot" /><span class="notice">公告窗</span>
                        <span class="more">了解更多</span>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于转发《关于征集2020年度国家科学技术奖提名项目的通知》的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于转发自治区科技厅《关于开展2019年度国家众创空间备案工作的通知》的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于转发《自治区科技厅 教育厅关于转发<科技部办公厅 教育部办公厅关于开展认定第十一批</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于转发自治区科技厅《关于举办2019年度科技企业孵化器从业人员专业培训班（第三期）的</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于对2019年包头市科技计划拟立项支持项目进行公示的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于报送科技特派员工作总结和评选优秀科技特派员的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于转发《关于征集内蒙古自治区社会发展领域科技创新需求的函》的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于组织申报2019年度自治区高新技术特色产业基地的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                    <div class="news_list">
                        <div class="news_title"> <svg-icon icon-class="dot2" class="dot2" />关于对2019年自治区成果转化项目进行公示的通知</div>
                        <div class="news_time">[ 2019-12-06 ]</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple" style="padding-left: 170px;">
                    <div class="declare" @click="declare_guide">
                        <img src="../../assets/nav_logo/u52.png" alt="">
                        <span>了解申报指南</span>
                    </div>
                    <div class="declare" @click="register">
                        <img src="../../assets/nav_logo/u61.png" alt="" style="width: 40px;height: 40px;">
                        <span>申报单位注册</span>
                    </div>
                    <div class="declare">
                        <img src="../../assets/nav_logo/u58.png" alt="" style="width: 40px;height: 40px;">
                        <span>申报单位登录</span>
                    </div>
                    <div class="declare">
                        <img src="../../assets/nav_logo/u55.png" alt="" style="width: 46px;height: 46px;">
                        <span>推荐部门登录</span>
                    </div>
                    <div class="declare" @click="admin_login">
                        <img src="../../assets/nav_logo/u66.png" alt=""style="width: 36px;height: 36px;">
                        <span>管理部门登录</span>
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
        admin_login(){
            this.$router.push({name: 'admin_login'});
        },
        declare_guide(){
            this.$router.push({name: 'declare_guide'});
        },
        register(){
            this.$router.push({name: 'register'});
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
        padding: 45px 30px 25px 230px;

        .notice_title{
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
        .more:hover{
            opacity: 0.7;
        }
        .dot{
            width: 21px;
            height: 21px;
            vertical-align: middle;
            margin-right: 15px;
        }
        .notice{
            color: #555555;
            font-size: 15px;
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
            height: 50px;
            line-height: 50px;
            font-size: 14px;
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
            width: 300px;
            height: 60px;
            line-height: 60px;
            background-color: #709fe1;
            border-radius: 5px;
            font-size: 18px;
            color: #FFFFFF;
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
            margin-left: 40px;
        }
        .declare span{
            vertical-align: middle;
        }
    }
</style>
