<template>
  <div class="container-fluid">
    <header>
      <el-menu
        :default-active="this.$route.name"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleNavigation"
      >
        <img alt="Dota-2 Logo" src="../public/favicon.png" />
        <span class="title">Dota Stats</span>
        <!-- </el-menu-item> -->
        <el-menu-item index="PlayerStats"> Player Stats </el-menu-item>
        <el-menu-item index="HeroStats"> Hero Stats </el-menu-item>
      </el-menu>
    </header>
    <main>
      <router-view />
    </main>
    <footer class="py-3">
      <ul class="”footer-links”">
        <li>
          <a>About</a>
        </li>
        <li>
          <a>Privacy Policy</a>
        </li>
        <li>
          <a>Disclaimer</a>
        </li>
      </ul>
      <p class="text-center">Copyright &copy; 2021 DotaStats.com</p>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dota2imgUrl: "../assets/dota-2.png",
    };
  },
  methods: {
    handleNavigation(key) {
      switch (key) {
        case "HeroStats":
          this.$router.push({ name: "HeroStats" });
          break;
        case "PlayerStats":
          this.$router.push({ name: "PlayerStats" });
          break;
        default:
          this.$router.push({ name: "ErrorPage" });
      }
    },
  },
};
</script>
<style >
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: auto;
}

#app .container-fluid {
  padding: 0px;
}
.el-menu.el-menu--horizontal {
  padding-left: 10px;
}
.el-menu--horizontal > .el-menu-item {
  float: right !important;
  font-family: cursive;
  font-size: 1.1rem;
}
/* @media screen and (max-width: 576px) {
  .el-menu--horizontal > .el-menu-item {
    float: none !important;
    font-family: cursive;
    font-size: 1.1rem;
  }
  img[alt*="Dota-2"] {
    float: none;
    margin-top: 5px;
  }
  .title {
    float: left;
    margin-top: 15px;
    margin-left: 10px;
    color: red;
    font-size: 1.5rem;
    font-family: cursive;
  }
} */
img[alt*="Dota-2"] {
  float: left;
  margin-top: 5px;
}
.title {
  float: left;
  margin-top: 15px;
  margin-left: 10px;
  color: red;
  font-size: 1.5rem;
  font-family: cursive;
}
footer {
  background: rgb(84, 92, 100);
  color: white;
}
footer li {
  list-style: none;
  display: inline;
  margin: 10px;
}
footer li a {
  color: white;
}
</style>
