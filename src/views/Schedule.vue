<template>
  <div class="schedule">
    <div class="heading-box">
      <header class="heading">League Schedules</header>
    </div>
    <div class="table-box">
      <div class="table-header">
        <div class="table-header-text-left">
          <div>Date/Time</div>
          <div>Stadium</div>
        </div>
        <div class="table-header-text-right">
          <div>Home Team</div>
          <div>Score</div>
          <div>Away Team</div>
        </div>
      </div>
      <div class="table-body" v-for="match in matches" :key="match.matchDate">
        <div class="table-body-date">
          <div>{{ match.formattedMatchDate }}</div>
          <div>{{ match.stadium }}</div>
        </div>
        <div class="table-body-info">
          <div>
            {{ match.homeTeam }}
            <img class="flag" :src="match.homeFlag" />
          </div>
          <div>{{ match.homeTeamScore }} : {{ match.awayTeamScore }}</div>
          <div>
            <img class="flag" :src="match.awayFlag" />{{ match.awayTeam }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- sample response after my modifications
    "matchDate": 1651744228685,
    "stadium": "Maracanã",
    "homeTeam": "Brazil",
    "awayTeam": "Serbia",
    "matchPlayed": true,
    "homeTeamScore": 1,
    "awayTeamScore": 0,
    "homeFlag": "https://flagsapi.codeaid.io/countries/BR/flag",
    "awayFlag": "https://flagsapi.codeaid.io/countries/RS/flag",
    "formattedMatchDate": "05.05.2022 11:17"
-->
<script>
import LeagueService from "../services/LeagueService.js";

export default {
  data() {
    return {
      matches: [],
      leaderboard: [],
    };
  },
  async mounted() {
    const leagueService = new LeagueService();
    await leagueService.fetchData();
    this.matches = leagueService.getMatches();
  },
};
</script>

<style>
.flag {
  height: 33px;
  width: 53px;
}

.schedule {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: lightseagreen;
}

.heading-box {
  color: #182c62;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.table-box {
  width: 90%;
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #4b5c68;
}

.table-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 40px;
  border: #e4edf2;
  width: 100%;
  background-color: #e4edf2;
  font-size: 12px;
}

.table-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 70px;
  width: 100%;
  color: #4b5c68;
}

.table-body:nth-child(odd) {
  background-color: #f6f7f7;
}

.table-body-date {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 50%;
}

.table-body-info {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 50%;
}

.table-header-text-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: #4b5c68;
  font-size: 12px;
  background-color: lightpink;
  height: 100%;
  width: 100%;
}

.table-header-text-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: #4b5c68;
  font-size: 12px;
  background-color: lightblue;
  height: 100%;
  width: 100%;
}
</style>
