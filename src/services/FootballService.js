import axios from "axios";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_KEY = "f09e48498983410db7a10897acbabd22";
const BASE_URL = "https://api.football-data.org/v4";

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

  // Fetch data for the selected competition
  async fetchData(competitionCode) {
    try {
      const response = await axios.get(
        `${CORS_PROXY}${BASE_URL}/competitions/${competitionCode}/matches`,
        {
          headers: {
            "X-Auth-Token": API_KEY,
          },
        }
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

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
  }
}

export default FootballService;
