<template>
  <div class="schedule">
    <div class="heading-box">
      <header class="heading">League Standings</header>
    </div>
    <div class="table-box">
      <div class="table-header">
        <div class="table-header-text-left">
          <div>Team Name</div>
        </div>
        <div class="table-header-text-right">
          <div>MP</div>
          <div>GF</div>
          <div>GA</div>
          <div>Points</div>
        </div>
      </div>
      <div
        class="table-body"
        v-for="team in paginatedLeaderboard"
        :key="team.teamName"
      >
        <div class="table-body-date">
          <div><img class="flag" :src="team.flagUrl" alt="" /></div>
          <div>{{ team.teamName }}</div>
        </div>
        <div class="table-body-info">
          <div>{{ team.matchesPlayed }}</div>
          <div>{{ team.goalsFor }}</div>
          <div>{{ team.goalsAgainst }}</div>
          <div>{{ team.points }}</div>
        </div>
      </div>
      <!-- Add empty rows to fill the remaining space -->
      <div
        v-for="n in emptyRows"
        :key="'empty' + n"
        class="table-body empty"
      ></div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import LeagueService from "../services/LeagueService.js";

export default {
  data() {
    return {
      leaderboard: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.leaderboard.length / this.itemsPerPage);
    },
    paginatedLeaderboard() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.leaderboard.slice(start, end);
    },
    emptyRows() {
      return this.itemsPerPage - this.paginatedLeaderboard.length;
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  async mounted() {
    const leagueService = new LeagueService();
    await leagueService.fetchData();
    this.leaderboard = leagueService.getLeaderboard();
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #4b5c68;
  min-height: auto;
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

/* Add this class to fill the remaining space if fewer items are displayed */
.table-body.empty {
  visibility: initial;
}

.table-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 70px;
  color: #4b5c68;
}

.table-body:nth-child(odd) {
  background-color: #f6f7f7;
}
.table-body:nth-child(even) {
  background-color: lightgreen;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #182c62;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-size: 16px;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
}
</style>
