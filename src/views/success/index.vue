<template>
  <div class="info-3">
    <div style="margin-top: 50px"><svg-icon icon-class="duihao" class="duihao" /></div>
    <p>发布成功</p>
    <el-button type="primary"  class="btm-botton" @click="returnCreate">继续发布</el-button>
    <el-button type="primary"  class="btm-botton" @click="returnList">返回列表</el-button>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                routerName:''
            };
        },
        created() {
            this.routerName = this.$route.query.router_name;
        },
        methods: {
            returnCreate() {
                this.$router.push({name:  this.routerName+'_create'});
            },
            returnList() {
                this.$router.push({name:this.routerName+'_index'});
            }
        }
    }
</script>

<style lang="scss" scoped>
  .info-3 {
    width: 800px;
    margin: 0 auto;
    padding-top: 80px;
    text-align: center;
    min-height: 400px;
  }
  .info-3 p {
    height: 50px;
    line-height: 50px;
    font-size: 40px;
    margin-bottom: 100px;
  }
  .duihao{
    width: 200px;
    height: 130px;
  }
  .btm-botton {
    width: 200px;
    background-color: #709fe1;
    color: #FFF;
  }

</style>
