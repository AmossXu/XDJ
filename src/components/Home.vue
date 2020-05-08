<template>
  <el-container class="home_container">
    <!-- 头部布局 -->
    <el-header>个人健康信息管理系统</el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边 -->
      <el-aside width='200px'>
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b" :collapse="false" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>个人信 息</span>
            </template>
            <el-menu-item-group>
              <template slot="title">信息</template>
              <el-menu-item index="usersInfo">账户信息</el-menu-item>
              <el-menu-item index="usersHealthInfo">健康信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!-- router -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        randl: "<<"
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse == true) {
          // console.log("ss");
          this.randl = ">>";
        } else {
          this.randl = "<<";
        }
      }
    }
  };
</script>

<style scoped>
  .el-header {
    background-color: #545c64;
    display: flex;
    align-items: center;
    color: aliceblue;
    font-size: 30px;
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-menu-vertical-demo {
    border-right: none;
  }

  .home_container {
    height: 100%;
  }

  .toggle-button {
    background-color: #545c64;
    font-size: 10px;
    line-height: 24px;
    color: azure;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>