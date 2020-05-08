<template>
  <div>
    <el-container>
      <el-header>
        <div class="user">
          <h2>你好，{{user_name}} </h2>
          <h4 @click="passChangeVisible">修改密码</h4>
          <h4 @click="userChangeVisible">修改个人信息</h4>
          <h4 @click="subscriveChangeVisible">预约</h4>
          <h4 @click="logOut">退出</h4>
        </div>
      </el-header>
      <el-main>

        <template>
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="rbc" label="RBC"></el-table-column>
            <el-table-column prop="hct" label="HCT"></el-table-column>
            <el-table-column prop="height" label="身高"></el-table-column>
            <el-table-column prop="weight" label="体重"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>

          </el-table>
        </template>
      </el-main>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="请输入旧密码">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码">
          <el-input v-model="form.passnew" placeholder="请输入新密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="passChange">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="更改个人信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="请输入住址">
          <el-input v-model="form2.place" placeholder="请输入住址" type="text"></el-input>
        </el-form-item>
        <el-form-item label="请输入性别">
          <el-input v-model="form2.sex" placeholder="请输入性别" type="text"></el-input>
        </el-form-item>
        <el-form-item label="请输入手机号">
          <el-input v-model="form2.phonenumber" placeholder="请输入手机号" type="text"></el-input>
        </el-form-item>
        <el-form-item label="请输入年龄">
          <el-input v-model="form2.age" placeholder="请输入年龄" type="text"></el-input>
        </el-form-item>
        <el-form-item label="请输入工作地点">
          <el-input v-model="form2.workplace" placeholder="请输入工作地点" type="text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="预约" :visible.sync="dialogFormVisible3">
      <el-form :model="form3">
        <el-form-item label="活动时间">
          <el-col :span="9">
            <el-date-picker type="date" placeholder="选择日期" v-model="form3.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form3.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="subscribe">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user_name: "",
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        formLabelWidth: "120px",
        form: {
          password: "",
          passnew: ""
        },
        form2: {},
        form3: {},
        tableData: [1, 1],
        tableRowClassName: ''
      };
    },
    created() {
      this.getUsername();
      this.getHealthByUsername()
    },
    methods: {
      getUsername() {
        var username = window.localStorage.getItem("username");
        console.log(username);
        this.user_name = username;
      },
      passChangeVisible() {
        this.dialogFormVisible = true;
      },
      userChangeVisible() {
        this.dialogFormVisible2 = true;
        this.getUser()
      },
      subscriveChangeVisible() {
        this.dialogFormVisible3 = true;
      },
      logOut() {
        this.$router.push("/login");

      },
      passChange() {
        var username = window.localStorage.getItem("username");
        var password = this.form.password
        this.$axios
          .post("/api/login", {
            username: username,
            password: password
          })
          .then(response => {
            let res = response.data;
            // console.log(username,password);
            if (res.code !== 1) return this.$message.error("修改失败");
            this.$message.success("修改成功");

            this.dialogFormVisible = false;
            this.$axios.post("/api/updatePassword", {
                username: username,
                password: this.form.passnew
              })
              .then(response => {
                let res = response.data;
                console.log(res.msg);
              });
            this.form.password = "";
            this.form.passnew = "";
          });
      },
      getUser() {
        var username = window.localStorage.getItem("username");

        this.$axios
          .post("/api/userInfo", {
            username: username,
          }).then(res => {
            this.form2 = res.data.data
            console.log(this.form2);
          })
      },

      getHealthByUsername() {
        var username = window.localStorage.getItem("username");
        this.$axios.post('/api/userHealth', {
            username: username
          })
          .then(res => {
            let data = res.data
            this.tableData = data.data
            console.log(11);
          })
      },

      updateUser() {
        var username = window.localStorage.getItem("username");
        this.$axios.post('/api/updateUserInfo', {
          username: this.form2.username,
          place: this.form2.place,
          sex: this.form2.sex,
          phonenumber: this.form2.phonenumber,
          age: this.form2.age,
          workplace: this.form2.workplace
        }).then(response => {
          this.dialogFormVisible2 = false;
          let res = response.data;
          // console.log(username,password);
          if (res.code !== 1) return this.$message.error("修改失败");
          this.$message.success("修改成功");
        })
      },
      subscribe() {
        var username = window.localStorage.getItem("username");
        this.$axios.post('/api/subscribe', {
          username,
          date: this.form3.date1,
          time: this.form3.date2
        }).then(res => {
          console.log(res);
          this.dialogFormVisible3 = false;
          this.$message.success("预约成功");
        })
      }
    }
  };
</script>

<style>
  .user h2 {
    float: left;
    margin-left: 20px;
  }

  .user h4 {
    float: left;
    margin-left: 20px;
    margin-top: 27px;
    cursor: pointer;
  }

  .el-header {
    -moz-box-shadow: 2px 2px 4px #BABABA;
    -webkit-box-shadow: 2px 2px 4px #BABABA;
    box-shadow: 2px 2px 4px #BABABA;
  }
</style>