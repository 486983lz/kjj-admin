<template>
  <el-row class="proportion">
    <el-col :span="4" >
      <p>项目申报推荐比例</p>
      <el-progress class="res_circle" type="circle" :width="150" :percentage="percentage" :color="color"></el-progress>
      <el-row class="proportion-bottom"  type="flex" justify="center">
        <el-col :span="10">总申报</el-col>
        <el-col class="proportion-bottom-num" :span="4">455</el-col>
      </el-row>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">二级单位推荐</el-col>
        <el-col class="proportion-bottom-num" :span="4">303</el-col>
      </el-row>
    </el-col>
    <el-col :offset="1" :span="4">
      <p>项目评审通过比例</p>
      <el-progress class="res_circle" type="circle" :width="150" :percentage="percentage1" :color="color"></el-progress>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">初审通过总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">229</el-col>
      </el-row>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">评审通过总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">27</el-col>
      </el-row>
    </el-col>
    <el-col :offset="1" :span="4">
      <p>项目储备立项比例</p>
      <el-progress class="res_circle" type="circle" :width="150" :percentage="percentage2" :color="color"></el-progress>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">储备项目总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">27</el-col>
      </el-row>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">立项项目总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">12</el-col>
      </el-row>
    </el-col>
    <el-col :offset="1" :span="4">
      <p>项目实施结题比例</p>
      <el-progress class="res_circle" type="circle" :width="150" :percentage="percentage3" :color="color"></el-progress>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">项目实施总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">88</el-col>
      </el-row>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">档案库总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">95</el-col>
      </el-row>
    </el-col>
    <el-col :offset="1" :span="4">
      <p>项目实施终止比例</p>
      <el-progress class="res_circle" type="circle" :width="150" :percentage="percentage4" :color="color"></el-progress>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">项目实施总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">7</el-col>
      </el-row>
      <el-row class="proportion-bottom" type="flex" justify="center">
        <el-col :span="10">档案库总量</el-col>
        <el-col class="proportion-bottom-num" :span="4">95</el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            percentage: 20,
            percentage1: 60,
            percentage2: 80,
            percentage3: 90,
            percentage4: 20,
        }
    },
    mounted() {

    },
    methods: {
        color(percentage) {
            if (percentage < 60) {
                return '#eb5359';
            } else if (percentage < 80) {
                return '#f75400';
            } else if (percentage < 90) {
                return '#f8a400';
            }else {
                return '#67c23a';
            }
        },
    },
    computed:{

    }
}
</script>

<style lang="scss" scoped>
  .proportion {
    text-align: center;
  }
  .res_circle {
    margin-top: 20px;
  }
  .proportion .proportion-bottom {
    text-align: left;
    margin-top: 20px;
  }
  .proportion .proportion-bottom .proportion-bottom-num{
    text-align: right;
  }
</style>
