<template>
    <div class="flow-node-form">
        <div class="flow-node-form-header">编辑</div>
        <div class="flow-node-form-body">
            <el-form :model="node" ref="dataForm" label-width="120px">
                <el-form-item label="节点id">
                    <el-input v-model="node.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="node.name"></el-input>
                </el-form-item>
                <el-form-item label="接收附加值">
                    <el-input v-model="node.receiveVal" placeholder="没有则为空"></el-input>
                </el-form-item>
                <el-form-item label="进度节点状态" >
                    <el-select v-model="node.status_id" clearable placeholder="所属节点">
                        <el-option
                        v-for="item in statusList"
                        :key="item.id"
                        :label="item.status_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="审核部门" >
                    <el-select v-model="node.department" multiple placeholder="请选择">
                        <el-option
                                v-for="item in departmentList"
                                :key="item.id"
                                :label="item.department_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="审核类型">
                    <el-radio-group v-model="node.shType">
                        <el-radio label="0">单线审批</el-radio>
                        <el-radio label="1">联合审批</el-radio>
                    </el-radio-group>
                </el-form-item>


                <el-form-item label="是否可以驳回">
                    <el-tooltip content="是否可以驳回" placement="top">
                        <el-switch
                                v-model="node.isBack"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </el-tooltip>
                </el-form-item>
                <el-form-item v-if="node.isBack == 1" label="驳回至节点">
                    <el-input v-model="node.reBack"></el-input>
                </el-form-item>
                <el-form-item v-if="node.isBack == 1" label="驳回附加值">
                    <el-input v-model="node.backVal"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="reset" icon="el-icon-close">重置</el-button>
                    <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { cloneDeep } from 'lodash'

    export default {
        props: ['statusList','departmentList'],
        data() {
            return {
                node: {
                },
                data: {}
            }
        },
        methods: {
            /**
             * 表单修改，这里可以根据传入的ID进行业务信息获取
             * @param data
             * @param id
             */
            init(data, id) {
                this.data = data
                data.nodeList.filter((node) => {
                    if (node.id === id) {
                        this.node = cloneDeep(node)
                    }
                })
            },
            reset() {
                this.data.nodeList.filter((node) => {
                    if (node.id === this.node.id) {
                        this.node = cloneDeep(node)
                    }
                })
            },
            save() {
                this.data.nodeList.filter((node) => {
                    if (node.id === this.node.id) {
                        node.name = this.node.name == undefined ?'': this.node.name
                        node.backVal = this.node.backVal == undefined ?'': this.node.backVal
                        node.reBack = this.node.reBack == undefined ?'': this.node.reBack
                        node.isBack = this.node.isBack == undefined ?0: this.node.isBack
                        node.receiveVal = this.node.receiveVal == undefined ?'': this.node.receiveVal
                        node.shType = this.node.shType == undefined ?0: this.node.shType
                        node.status_id = this.node.status_id == undefined ?'': this.node.status_id
                        node.department = this.node.department == undefined ?'': this.node.department
                    }
                })
                console.log(this.data.nodeList)
            }
        }
    }
</script>

<style>
    .flow-node-form {
        background-color: #f7f9fb;
        /*margin-left: 5px;*/
    }

    .flow-node-form-header {
        height: 32px;
        border-top: 1px solid #dce3e8;
        border-bottom: 1px solid #dce3e8;
        background: #ebeef2;
        color: #000;
        line-height: 32px;
        padding-left: 12px;
        font-size: 14px;
    }

    .flow-node-form-body {
        margin-top: 10px;
        padding-right: 10px;
        padding-bottom: 20px;
    }
</style>
