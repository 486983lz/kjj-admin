<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <p class="notice-title">发布指南</p>
            </el-col>
        </el-row>
        <el-form :model="createFrom" ref="createFrom" :rules="createFromRules" label-width="150px" >
            <el-row>
                <el-col :span="18" :offset=2>
                    <el-form-item label="标题:"  prop="title">
                        <el-input v-model="createFrom.title" size="small" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset=2>
                    <el-form-item label="姓名:" >
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
                    <el-form-item label="附件:" style="text-align: center">
                        <el-button size="small" class="upload-btn" @click="showUpload" >上传附件</el-button>
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
            <el-dialog title="上传附件" :visible.sync="dialogFormCreate" width='650px'>
                <el-upload
                    class="upload-file"
                    action=""
                    :http-request="doUpload"
                    :auto-upload="true"
                    drag
                    accept='.jpg,.jpeg,.pdf,.doc,.docx,.xlsx,.gif,.xls,.png'
                    :show-file-list="true"
                    :on-remove = 'removeFile'
                    :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/pdf/doc/docx/xlsx/gif/xlx/png<br>且不超过20MB</div>
                </el-upload>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreate = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormCreate = false">确 定</el-button>
                </div>
            </el-dialog>
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
            this.uploadForm = new FormData();
        },
        methods: {
            showUpload(){
                this.dialogFormCreate = true;
            },
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
                let that = this
                this.$refs.createFrom.validate(valid => {
                    if (valid) {
                        this.uploadForm.set("title", this.createFrom.title);
                        if(this.createFrom.name != undefined){
                            this.uploadForm.set("name", this.createFrom.name);
                        }
                        if(this.createFrom.source != undefined){
                            this.uploadForm.set("source", this.createFrom.source);
                        }
                        if(this.createFrom.content != undefined){
                            this.uploadForm.set("content", this.createFrom.content);
                        }
                        this.uploadForm.set("type", '3');
                        this.$store.dispatch('notice/postNoticeInfo',this.uploadForm)
                        .then((response) => {
                            if(response){
                                that.$router.push({name: 'success',query:{router_name:'guide'}});
                            }
                        })
                        .catch(() => {

                        });
                    } else {
                        return false;
                    }
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

</style>