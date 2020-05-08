<template>
  <div>
    <el-table :data="usersTableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="username" label="用户名" width="100"></el-table-column>

      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="phonenumber" label="手机号码" width="150"></el-table-column>
      <el-table-column prop="place" label="住址" width="150"></el-table-column>
      <el-table-column prop="workplace" label="工作地点"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="handlerDelete(scope.$index,scope.row.username)">删除</el-button>
          <el-button type="primary" @click="handlerVisible(scope.$index,scope.row.username,scope.row.name)">添加
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加健康信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <h3>姓名 {{this.form.name}}</h3>

        <el-form-item label="请输入RBC值（g/L）">
          <el-input v-model="form.rbc" placeholder="请输入RBC值（g/L）" type="rbc"></el-input>
        </el-form-item>
        <el-form-item label="请输入HCT值（%）">
          <el-input v-model="form.hct" placeholder="请输入HCT值（%）" type="hct"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="test()">取 消</el-button>
        <el-button @click="handlerInsert()">添 加</el-button>
        <!-- <el-button type="primary" @click="test()">添 加</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created() {
      this.getUsersInfo();
    },
    data() {
      return {
        usersTableData: [1, 1],
        dialogFormVisible: false,
        formLabelWidth: "120px",
        form: {
          password: "",
          passnew: "",
          username: "",
          name: "",
          rbc: "",
          hct: ""
        }
      };
    },

    methods: {
      getUsersInfo() {
        this.$axios.get("/api/users_get").then(response => {
          let res = response.data;
          console.log(res);
          this.usersTableData = res.data;
        });
      },
      handlerDelete(index, username) {
        this.$axios
          .post("/api/deleteUser", {
            username: username
          })
          .then(response => {
            console.log("删除成功");
          });
        console.log(username);
        this.getUsersInfo();
      },
      handlerVisible(index, username, name) {
        this.form.username = username;
        this.form.name = name;
        this.dialogFormVisible = true;

        console.log(name);
      },
      handlerInsert() {
        this.dialogFormVisible = false;
        console.log("good");
        this.$axios
          .post("/api/insertHealth", {
            username: this.form.username,
            name: this.form.name,
            rbc: this.form.rbc + "g/L",
            hct: this.form.hct
          })
          .then(response => {
            let res = response.data;
            if (res.code == 1) {
              this.$notify.error({
                title: '提示',
                message: '插入失败',
                showClose: false
              });
            }
            this.$notify.success({
              title: '提示',
              message: '插入成功',
              showClose: false
            });

            console.log(res.msg);
          });
      },
      test() {
        this.dialogFormVisible = false;
      }
    }
  };
</script>

<style lang="less" scoped>
</style>