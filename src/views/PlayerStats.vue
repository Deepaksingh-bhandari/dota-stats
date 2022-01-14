<template >
  <div class="main">
    <div class="container-fluid px-md-5">
      <h1>Top 10 Player Stats</h1>
        <div class="row">
         <el-table
        :data="playersData"
        stripe
        border>
        <el-table-column key="1" prop="Player_Name" label="Name">
          <template #default="scope">
            <img class="Avatar-Image" :src="scope.row.Player_Avatar" />
            <span class="mx-sm-2">
              {{ scope.row.Player_Name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          key="2"
          prop="Win_Rate"
          label="Game Results (last 20 games)"
          ><template #default="scope">
            <span class="mx-sm-2 d-inline-block text-lg-center">
              Win: {{ scope.row.Win_Rate.win }} &nbsp; Lose:
              {{ scope.row.Win_Rate.lose }}
              <canvas
                :id="'playerChart' + scope.$index"
                class="WinRateChart"
                width="300"
                height="300"
              ></canvas>
            </span>
          </template>
        </el-table-column>
      </el-table>
        </div>
    
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
// import { Pie } from 'vue-chartjs'

export default {
  name: "PlayerStats",
  data() {
    return {
      playersApi: "https://api.opendota.com/api/rankings?hero_id=2", //hero_id can be changed
      tableHeader: null,
      chartList: null,
      mychart: null,
      playersData: null,
    };
  },
  methods: {
    getTopTenPlayers() {
      this.$http
        .get(this.playersApi)
        .then((response) => {
          this.playersData = response.data.rankings
            .filter((el, i) => (i < 10 ? true : false))
            .map((elem) => {
              return {
                Player_Account_ID: elem["account_id"],
                Player_Name: elem["personaname"],
                Player_Avatar: elem["avatar"],
                Win_Rate: { win: null, lose: null },
              };
            });
          return this.playersData;
        })
        .then(() => {
          console.log("Inside then", this.playersData);
          this.getPlayersStats();
          return this.playersData;
        })
        .catch(() => {
          this.playersData = {
            Player_Account_ID: "No Data",
            Player_Name: "No Data",
            Player_Avatar: "No Data",
            // Win_Rate: { win: null, lose: null },
          };
          alert("Some error occured while fetching the Player Stats");
        });
      setTimeout(() => {
        this.createPieChart();
      }, 2000);
    },
    getPlayersStats() {
      console.log("Get Players Stats is called");
      this.playersData.map((elem, ind) => {
        let playerStatsApi =
          "https://api.opendota.com/api/players/" +
          elem.Player_Account_ID +
          "/recentMatches";

        this.$http
          .get(playerStatsApi)
          .then((response) => {
            // console.log("each response",response)
            let winRate = response.data.filter((el) => {
              return el.radiant_win;
            });
            let winCount = winRate.length;
            let loseCount = 20 - winRate.length;
            this.playersData[ind]["Win_Rate"] = {
              win: winCount,
              lose: loseCount,
            };
            console.log("updated playerStatsApi");
          })
          // .then(()=>console.log("after updating players data",this.playersData))
          .catch((err) => {
            console.log(err);
            //  alert("Some error occured while fetching the Player Stats");
          });
      });
    },
    createPieChart() {
      let chartList = document.getElementsByClassName("WinRateChart");
      console.log(chartList, chartList.length);

      for (let elem of chartList) {
        let id = elem.id;
        let i = elem.id.slice(-1);
        console.log("Inside chartlist loop", id, i);
        // To fetch Player Stats using different API
        const ctx = document.getElementById(id).getContext("2d");
        // console.log("ctx ",ctx)
        let winPer = this.playersData[i].Win_Rate.win * 5;
        let losePer = this.playersData[i].Win_Rate.lose * 5;
        const data1 = {
          labels: ["Win Rate", "Lose Rate"],
          datasets: [
            {
              data: [winPer, losePer],
              backgroundColor: ["green", "orange"],
            },
          ],
        };
        console.log(
          "Piechart funciton is called",
          this.playersData[i].Win_Rate,
          id,
          "data"
        );

        // this.mychart[i].push(
        new Chart(ctx, {
          type: "pie",
          data: data1,
          // [this.playersData[i].Win_Rate.win*5,this.playersData[i].Win_Rate.lose*5],
          labels: ["Win Rate", "Lose Rate"],
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                // text: "Win Rate Chart",
              },
            },
          },
        });
        // );
      }
    },
    // updatePieChart() {
    //   console.log("This is update Pie chart");
    //   for (let [i, charts] of this.mychart) {
    //     let playerWinRate = this.playersData[i].Win_Rate.win * 5;
    //     let playerLoseRate = this.playersData[i].Win_Rate.lose * 5;
    //     charts.data[0].datasets.data = [playerWinRate, playerLoseRate];
    //     charts.update();
    //   }
    // },
  },
  created() {
    this.getTopTenPlayers();
    console.log("inside Created", this.playersData);
  },
  mounted() {
    // this.getPlayersStats(this.playersData);
  },
  updated() {},
};
</script>

<style scoped>
.Avatar-Image {
  border-radius: 50%;
}
.container-fluid{
  align-items: center;
  justify-content: center;
}
.main{
  background-image: url("../assets/dota-2-background2.jpg");
}
h1{
  color: white;
}
.el-table--border, .el-table--group {
    max-width: 700px;
    max-height: 500px;
    overflow: scroll;
}
.row{
  justify-content: center;
  align-items: center;
}
</style>