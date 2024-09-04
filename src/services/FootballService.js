import axios from "axios";

class FootballService {
  constructor() {
    this.matches = [];
    this.flags = {};
  }

  setMatches(matches) {
    this.matches = matches.map((match) => {
      const homeScore =
        match.score.fullTime.home !== null ? match.score.fullTime.home : "?";
      const awayScore =
        match.score.fullTime.away !== null ? match.score.fullTime.away : "?";

      return {
        dateTime: this.getFormattedDate(match.utcDate),
        stadium: match.venue || "Unknown",
        homeTeam: match.homeTeam.name,
        score: `${homeScore} - ${awayScore}`,
        awayTeam: match.awayTeam.name,
        homeFlag: this.flags[match.homeTeam.name] || null,
        awayFlag: this.flags[match.awayTeam.name] || null,
      };
    });
  }

  getMatches() {
    return this.matches;
  }

  async fetchData(competitionCode) {
    try {
      const response = await axios.get(
        `/api/fetchMatches?competitionCode=${competitionCode}`
      );
      const matches = response.data.matches;

      if (matches) {
        this.flags = {};
        matches.forEach((match) => {
          if (match.homeTeam && match.homeTeam.crest) {
            this.flags[match.homeTeam.name] = match.homeTeam.crest;
          }
          if (match.awayTeam && match.awayTeam.crest) {
            this.flags[match.awayTeam.name] = match.awayTeam.crest;
          }
        });

        this.setMatches(matches);
      } else {
        console.error("Failed to fetch matches:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getFormattedDate(utcDate) {
    const date = new Date(utcDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}

export default FootballService;
