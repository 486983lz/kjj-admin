<template>
    <div class="login-container">
        <div class="wscn-http-container">
            <div class="navbar">
                <home-page id="home-page" :is-active="false" class="hamburger-container"/>
            </div>
            <div class="login_input">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="left" label-width="80px">
                    <el-form-item prop="account">
                    <span class="svg-container"><svg-icon icon-class="user"/></span><el-input  ref="account" v-model="loginForm.account" placeholder="请输入手机号" name="account" type="text" tabindex="1"  autocomplete="on"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                    <span class="svg-container"><svg-icon icon-class="password"/></span><el-input  ref="password" v-model="loginForm.password" placeholder="请输入密码" name="password" type="text" tabindex="1"  autocomplete="on"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">立即登录</el-button>
                    </el-form-item>

                    <el-form-item>
                        <div class="tishi">
                            <span style="color: rgb(170, 170, 170);">回到</span><span class="tishi_1" @click="home_page">首页</span>
                            <span class="tishi_2" >忘记密码?</span>
                        </div>
                    </el-form-item>
                </el-form>

            </div>



            <!--<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
                <el-form-item prop="account">
                    <span class="svg-container">
                      <svg-icon icon-class="user"/>
                    </span>
                    <el-input
                            ref="account"
                            v-model="loginForm.account"
                            placeholder="Username"
                            name="account"
                            type="text"
                            tabindex="1"
                            autocomplete="on"/>
                </el-form-item>

                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="password">
                        <span class="svg-container">
                          <svg-icon icon-class="password"/>
                        </span>
                        <el-input
                                :key="passwordType"
                                ref="password"
                                v-model="loginForm.password"
                                :type="passwordType"
                                placeholder="Password"
                                name="password"
                                tabindex="2"
                                autocomplete="on"
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                                @keyup.enter.native="handleLogin"/>
                        <span class="show-pwd" @click="showPwd">
                            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                        </span>
                    </el-form-item>
                </el-tooltip>

                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">立即登录</el-button>
            </el-form>-->

            <div class="navbar-bottom">
                <home-bottom id="home-bottom" :is-active="false" class="hamburger-container"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {validUsername, validSignInUsername} from '@/utils/validate'
    import SocialSign from './components/SocialSignin'
    import HomePage from '@/components/HomePage'
    import HomeBottom from '@/components/HomeBottom'

    export default {
        name: 'admin_login',
        components: {
            SocialSign,
            HomePage,
            HomeBottom,
        },
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6 || value.length > 32) {
                    callback(new Error('密码长度在6～32位之间'))
                } else {
                    callback()
                }
            };
            const validatedSignInUsername = (rule, value, callback) => {
                if (!validSignInUsername(value)) {
                    callback(new Error('禁止用户名使用特殊字符'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    account: 'example@example.com',
                    password: 'sysmaster109'
                },
                loginRules: {
                    //username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    account: [
                        {required: true, trigger: 'change', validator: validatedSignInUsername},
                    ],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query;
                    if (query) {
                        this.redirect = query.redirect;
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        created() {
            // window.addEventListener('storage', this.afterQRScan)
        },
        mounted() {
            if (this.loginForm.account === '') {
                this.$refs.account.focus()
            } else if (this.loginForm.password === '') {
                this.$refs.password.focus()
            }
        },
        destroyed() {
            // window.removeEventListener('storage', this.afterQRScan)
        },
        methods: {
            checkCapslock({shiftKey, key} = {}) {
                if (key && key.length === 1) {
                    if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                        this.capsTooltip = true
                    } else {
                        this.capsTooltip = false
                    }
                }
                if (key === 'CapsLock' && this.capsTooltip === true) {
                    this.capsTooltip = false
                }
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('user/signin', this.loginForm)
                            .then((response) => {
                                this.$router.push({path: this.redirect || '/', query: this.otherQuery});
                                this.loading = false;
                            })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            },
            home_page(){
                this.$router.push({name: 'home_page'});
            },
        }
    }
</script>

<style lang="scss">
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
    .login_input{
        width: 50%;
        transform: translate(-50%, 0%);
        position: relative;
        left: 47%;
        text-align: center;
        padding: 80px 0 285px;

        .el-form-item{
            margin-bottom: 10px;
        }
        .el-input{
            width: 247px;

            .el-input__inner{
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
                height: 40px;
            }
        }
        
        .svg-icon{
            width: 1.5em;
            height: 1.5em;
            color: #fff;
            vertical-align: -0.55em;
        }

        .el-button{
            width:33%;
            height:40px;
            margin-top:30px;
            background-color: rgba(112, 159, 225, 1);
            font-size: 16px;
        }
        .el-button:hover{
            opacity: 0.7;
        }

        .tishi{

            .tishi_1{
                margin-right: 170px;
                cursor: pointer;
                color: rgb(112, 159, 225);
            }
            .tishi_2{
                cursor: pointer;
                color: rgb(170, 170, 170);
            }
            .tishi_2:hover{
                opacity: 0.7;
            }
        }
    }

</style>

<style lang="scss" scoped>
    .login-container {
        min-height: 100%;
        width: 100%;
        /*background-color: $bg;*/
        overflow: hidden;

        .svg-container {
            vertical-align: top;
            width: 40px;
            height: 40px;
            background-color: rgba(112, 159, 225, 1);
            display: inline-block;
            border-bottom-left-radius: 4px;
            border-top-left-radius: 4px;
        }
    }
</style>
