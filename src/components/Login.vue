<template>
  <div class="login_container">
    <div class="login_box">
      <el-form ref="loginFormRef" class="login_form" label-width="0" :model="form" :rules="loginFormRules">
        <h1>个人健康管理系统-登录</h1>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="toRegister">注册</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        // 验证
        loginFormRules: {
          username: [{
            required: true,
            message: "请输入账户",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      //重置
      resetLoginForm() {
        console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        this.$refs.loginFormRef.validate(valid => {
          if (!valid) return;
          var that = this;
          var username = that.form.username;
          var password = that.form.password;
          this.$axios
            .post("/api/login", {
              username: username,
              password: password
            })
            .then(response => {
              let res = response.data;
              console.log(res.data);
              if (res.code !== 1) return this.$message.error("登录失败");
              this.$message.success("登录成功");

              window.sessionStorage.setItem("token", res.data.token);
              if (res.data.isManager == 1) {
                this.$router.push("/home");
                console.log("是管理员");

              } else if (res.data.isManager == 0) {
                localStorage.setItem('username', res.data.username);
                this.$router.push("/user_home");
                console.log("不是管理员");

              }

            });

          console.log(valid);
        });
      },
      toRegister() {
        this.$router.push("/register");
      }
    }
  };
</script>
<style lang="less" scoped>
  .login_container {
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .login_form h1 {
    text-align: center;
  }
</style>