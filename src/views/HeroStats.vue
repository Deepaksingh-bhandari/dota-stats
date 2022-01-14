<template>
  <div class="container-fluid p-md-3">
    <!-- <h1> Hero Stats </h1>  -->
    <div class="p-md-3 p-xs-1 table-wrapper">
      <!-- <h2 class="d-inline">Hero Stats</h2> -->
      <span id="searchBar">
        <el-input v-model="search" size="small" placeholder="Search a Hero" />
      </span>
          <!-- :fixed="x == 'Hero Name' ? true : false" -->
      <el-table :data="pagedHeros" stripe border height="100%" width="100%">
        <el-table-column
          v-for="x in tableHeader"
          height="100%"
          :sortable="x != 'Hero Image' ? true : false"
          :key="x"
          :prop="x"
          :label="x"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        @update:current-page="setPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="herosData !== null ? herosData.length : 1"
      ></el-pagination>
    </div>
    <!-- <div class="block pb-md-3"> -->
    <!-- </div> -->
  </div>
</template>


<script>
export default {
  name: "HeroStas",
  props: {
    msg: String,
  },
  data() {
    return {
      heroStatsApi: "https://api.opendota.com/api/heroStats",
      herosData: null,
      herosSelectedData: null,
      tableHeader: null,
      search: null,
      currentPage: 1,
      pageSize: 5,
      totalPage: 5,
      // dataService:new StatsDataService(heros,null)
      // pagedHeros:null
      // filteredHeros:null,
    };
  },
  methods: {
    getHerosData() {
      this.$http
        .get(this.heroStatsApi)
        .then((response) => {
          this.herosData = response.data.map((elem) => {
            return {
              ID: elem["id"],
              "Hero Name": elem["localized_name"],
              "Hero Image": elem["img"],
              "Pro Pick Count": elem["pro_pick"],
              "Pro Win Rate": elem["pro_win"],
              "Pro Ban Count": elem["pro_ban"],
            };
          });
                  
          this.tableHeader = Object.keys(this.herosData[0]).filter((name) => {
            if (name !== "ID") return true;
          });
          console.log(this.tableHeader, this.herosData);
        })
        .catch(() => {
          this.herosData = {
            ID: "No data",
            "Hero Name": "No data",
            "Hero Image": "No data",
            "Pro Pick Count": "No data",
            "Pro Win Rate": "No data",
            "Pro Ban Count": "No data",
          };

          alert("Some error occured while fetching the Hero Stats");
        });
    },
    setPage(val) {
      console.log("Set Page called", val);
      this.currentPage = val;
    },
  },
  computed: {
    pagedHeros() {
      // console.log("Inside Computed",this.herosData.length)
      if (this.herosData) {
        return this.herosData
          .slice(
            this.pageSize * this.currentPage - this.pageSize,
            this.pageSize * this.currentPage
          )
          .filter((elem) => {
            if (this.search && this.search.length >= 2) {
              let element = elem["Hero Name"].toLowerCase();
              if (element.includes(this.search.toLowerCase())) return true;
            } else return true;
          });
      }
      return this.herosData;
    },
  },
  watch: {
    currentPage(val, oldval) {
      this.pagedHeros = this.herosData.slice(
        this.pageSize * val - this.pageSize,
        this.pageSize * val
      );
      console.log("old value", oldval);
    },
  },
  created() {
    // console.log("Created hook called",this.dataService);    
    this.getHerosData();
},
  mounted() {
    console.log("Mounted hook called");
    console.log(this.herosData);
    // this.filteredHeros;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
th {
  background: rgb(68 107 192);
  color: white;
}
.block {
  margin-top: 10px;
}
#searchBar {
  float: right;
  margin-bottom: 5px;
  clear: both;
}
.container-fluid {
  height: 100vh;
  background-image: url("../assets/dota-2-bakcground.jpg");
}
.table-wrapper {
  height: 100%;
}
.el-table--fit {
  max-height: 451px;
  height: 451px;
}
.el-table__body-wrapper {
  max-height: 451px;
  height: 451px;
}

.el-pagination{
  margin-top:15px;
}

</style>