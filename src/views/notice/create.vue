<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <p class="notice-title">发布公告</p>
            </el-col>
        </el-row>
        <el-form :model="createFrom" ref="createFrom" :rules="createFromRules" label-width="150px" >
            <el-row>
                <el-col :span="18" :offset=2>
                    <el-form-item label="标题:" prop="notice_name">
                        <el-input v-model="createFrom.title" size="small" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset=2>
                    <el-form-item label="姓名:"  prop="notice_name">
                        <el-input v-model="createFrom.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="9">
                    <el-form-item label="来源部门:">
                        <el-input v-model="createFrom.source"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18" :offset=2>
                    <el-form-item label="主要内容:">
                        <tinymce v-model="createFrom.content" :height="300" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18" :offset=2>
                    <el-form-item label="附件:">
                        <el-upload
                            class="upload-file"
                            action=""
                            :http-request="doUpload"
                            :auto-upload="true"
                            multiple
                            accept='.jpg,.jpeg,.pdf,.doc,.docx,.xlsx,.gif,.xlx,.png'
                            :show-file-list="false"
                            :file-list="fileList">
                            <el-button size="small" class="upload-btn" >上  传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="file-list" v-for="(domain, index) in fileList">
                <el-col :span="6" :offset="8" >
                    <span>{{domain.name}}</span>
                </el-col>
                <el-col class="upload-file" :span="3" >
                    <el-button @click.prevent="removeFile(domain)">删除</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18" :offset=2 >
                    <el-form-item label="" >
                        <div style="text-align: center">
                            <el-button size="small" class="sub-btn" @click="subNotice" >发  布</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
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
                createFrom:{},
                form:{},
                createFromRules:{

                },
                fileList:[],

            }
        },
        computed: {

        },
        created() {
            this.uploadForm = new FormData();
        },
        methods: {
            doUpload(params){
                let _file = params.file;
                this.fileList.push({
                    name:params.file.name
                })
                this.uploadForm.append("file[]", _file);
            },
            removeFile(item) {
                var index = this.fileList.indexOf(item)
                if (index !== -1) {
                    this.fileList.splice(index, 1)
                }
                let list = this.uploadForm.getAll("file[]")
                this.uploadForm.delete("file[]")
                for(let i=0;i<list.length; i++){
                    if(item.name !== list[i].name){
                        this.uploadForm.append("file[]", list[i]);
                    }
                }
            },
            subNotice(){

                this.uploadForm.set("title", this.createFrom.title);
                this.uploadForm.set("name", this.createFrom.name);
                this.uploadForm.set("source", this.createFrom.source);
                this.uploadForm.set("content", this.createFrom.content);
                this.$store.dispatch('notice/postNoticeInfo',this.uploadForm)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(() => {

                    });

            }
        }
    }
</script>
<style scoped>
   .notice-title {
       text-align: center;
       height: 50px;
       line-height: 50px;
       font-size: 22px;
   }
    .upload-btn {
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
</style>