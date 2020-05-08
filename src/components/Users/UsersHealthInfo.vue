<template>
  <el-table :data="usersTableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="rbc" label="RBC"></el-table-column>
    <el-table-column prop="hct" label="HCT"></el-table-column>
    <el-table-column prop="height" label="身高"></el-table-column>
    <el-table-column prop="weight" label="体重"></el-table-column>
    <el-table-column prop="date" label="时间"></el-table-column>

  </el-table>
</template>

<script>
  export default {
    created() {
      this.getUsersInfo();
    },
    data() {
      return {
        usersTableData: [1, 1]
      };
    },
    methods: {
      getUsersInfo() {
        this.$axios.get("/api/userHealth_get").then(response => {
          let res = response.data;
          console.log(res);
          this.usersTableData = res.data;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
</style>