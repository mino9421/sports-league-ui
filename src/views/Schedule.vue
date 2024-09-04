<template>
  <div class="schedule">
    <div class="heading-box">
      <header class="heading">League Schedules</header>
    </div>

    <!-- Competition Selection Dropdown -->
    <div class="competition-selector">
      <label for="competition">Select Competition:</label>
      <select v-model="selectedCompetition" @change="fetchMatches">
        <option v-for="(name, code) in competitions" :key="code" :value="code">
          {{ name }}
        </option>
      </select>
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
      <div
        class="table-body"
        v-for="match in paginatedMatches"
        :key="match.dateTime"
      >
        <div class="table-body-date">
          <div>{{ match.dateTime }}</div>
          <div>{{ match.stadium }}</div>
        </div>
        <div class="table-body-info">
          <div>
            {{ match.homeTeam }}
            <img class="flag" :src="match.homeFlag" />
          </div>
          <div>{{ match.score }}</div>
          <div>
            <img class="flag" :src="match.awayFlag" />{{ match.awayTeam }}
          </div>
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
import FootballService from "../services/FootballService.js";

export default {
  data() {
    return {
      matches: [],
      currentPage: 1,
      itemsPerPage: 10,
      selectedCompetition: "WC", // Default to World Cup
      competitions: {
        WC: "World Cup",
        PL: "Premier League",
        CL: "Champions League",
        EC: "Euro Championship",
        FL1: "Ligue 1",
        BL1: "Bundesliga",
        SA: "Serie A",
        DED: "Eredivisie",
        PPL: "Primeira Liga",
        CLI: "Copa Libertadores",
        PD: "La Liga",
        BSA: "Brasileirão",
      },
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.matches.length / this.itemsPerPage);
    },
    paginatedMatches() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.matches.slice(start, end);
    },
    emptyRows() {
      return this.itemsPerPage - this.paginatedMatches.length;
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
    async fetchMatches() {
      const footballService = new FootballService();
      this.currentPage = 1; // Reset to the first page after fetching new data
      await footballService.fetchData(this.selectedCompetition); // Pass the selected competition code
      this.matches = footballService.getMatches();
    },
  },
  async mounted() {
    this.fetchMatches();
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

.table-body.empty {
  visibility: inherit;
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
