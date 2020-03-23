<template>
    <div>
        <el-row>
            <el-col :span="18">
                <div class="app-container">
                    <el-row>
                        <el-col :span="24">
                            <p class="notice-title">{{createFrom.title}}</p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <p class="notice-title-small">发布时间:{{createFrom.created_at}}&nbsp;&nbsp;来源:{{createFrom.source}}&nbsp;&nbsp;作者:{{createFrom.name}}</p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <p class="" v-html="createFrom.content"></p>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="app-right">
                    <p class="app-right-title">附件</p>
                    <el-row v-for="item in fileList" class="app-right-list">
                        <el-link target="_blank" :href="item.url" download>
                            <el-col :span="12" style="text-align: left">
                                <span>{{item.name}}</span>
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                                <span>{{item.fileSize}}</span>
                            </el-col>
                        </el-link>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>

    import MarkdownEditor from '@/components/MarkdownEditor'
    import Tinymce from '@/components/Tinymce'
    export default {
        name: 'notice_create',
        components: { MarkdownEditor ,Tinymce},
        data() {
            return {
                user: {},
                activeTab: 'activity',
                createFrom:{
                    id:''
                },
                form:{},
                createFromRules:{
                    title: [
                        { required: true, message: '请填写标题', trigger: 'blur' }
                    ],
                },
                fileList:[],
                dialogFormCreate:false,

            }
        },
        computed: {

        },
        created() {
            this.createFrom.id = this.$route.query.id
            this.getNoticeInfo()
            this.uploadForm = new FormData();
        },
        methods: {
            getFileSize(fileByte) {
                let fileSizeByte = fileByte;
                let fileSizeMsg = "";
                if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
                else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
                else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
                return fileSizeMsg;
            },

            getNoticeInfo(){
                this.$store.dispatch('notice/getNoticeInfo',{id:this.createFrom.id})
                    .then((response) => {
                        this.createFrom = response.list
                        for(let i = 0 ; i<response.fileList.length;i++){
                            this.fileList.push({name:response.fileList[i].file_name,url:response.fileList[i].puth,id:response.fileList[i].id,fileSize:this.getFileSize(response.fileList[i].file_size)});
                        }
                    })
                    .catch(() => {

                    });
            },

        }
    }
</script>
<style scoped>
    .app-right {
        border-radius: 0px;
        height: calc(100vh - 155px);
        overflow-y:auto;
        margin: 20px;
        text-align: center;
    }
    .app-right-title {
        width: 100%;
        line-height: 50px;
        border-bottom: 1px solid #72a0df;
    }
    .app-right-list {
        text-align: left;
        margin: 10px 20px;
    }
    .app-right-list a{
        width: 100%;
    }
   .notice-title {
       text-align: center;
       height: 50px;
       line-height: 50px;
       font-size: 22px;
   }
   .notice-title-small {
       text-align: center;
       height: 40px;
       line-height: 40px;
       font-size: 16px;
   }
    .upload-btn {
        text-align: center;
        width: 250px;
        height: 45px;
        background-color: #f4f7fa;
        color: #606266;
        border: #dcdfe6;
        font-size: 18px;
    }
    .upload-file {
        text-align: center;
    }
    .file-list {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
    }
    .sub-btn {
        text-align: center;
        font-size: 18px;
        width: 250px;
        height: 45px;
        background-color: #709fe1;
        color: #FFF;
    }
    .upload-file  >>> .el-upload-list {
        width: 360px;
        margin: 0 auto;
    }
   .upload-file  >>> .el-upload-list .el-upload-list__item {
        text-align: left;
    }
    .app-right-list  >>> .el-link--inner {
        width: 100%;
    }

</style>