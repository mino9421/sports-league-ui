import axios from "axios";
/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
  constructor() {
    this.matches = [];
    this.flags = {};
  }
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches.map((match) => ({
      ...match,
      homeFlag: this.flags[match.homeTeam] || null,
      awayFlag: this.flags[match.awayTeam] || null,
      formattedMatchDate: this.getFormattedDate(match.matchDate),
    }));
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const teams = {};

    this.matches.forEach((match) => {
      const { homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore } =
        match;

      if (!teams[homeTeam]) {
        teams[homeTeam] = {
          teamName: homeTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
          flagUrl: this.flags[homeTeam] || "",
        };
      }
      if (!teams[awayTeam]) {
        teams[awayTeam] = {
          teamName: awayTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
          flagUrl: this.flags[awayTeam] || "",
        };
      }

      if (matchPlayed) {
        teams[homeTeam].matchesPlayed += 1;
        teams[awayTeam].matchesPlayed += 1;

        teams[homeTeam].goalsFor += homeTeamScore;
        teams[awayTeam].goalsFor += awayTeamScore;

        teams[homeTeam].goalsAgainst += awayTeamScore;
        teams[awayTeam].goalsAgainst += homeTeamScore;

        if (homeTeamScore > awayTeamScore) {
          teams[homeTeam].points += 3;
        } else if (homeTeamScore < awayTeamScore) {
          teams[awayTeam].points += 3;
        } else {
          teams[homeTeam].points += 1;
          teams[awayTeam].points += 1;
        }
      }
    });

    // Convert teams object to an array
    let teamsArray = Object.values(teams);

    // Function to calculate head-to-head points
    const getHeadToHeadPoints = (teamA, teamB) => {
      let teamA_points = 0;
      let teamB_points = 0;

      this.matches.forEach((match) => {
        if (
          (match.homeTeam === teamA && match.awayTeam === teamB) ||
          (match.homeTeam === teamB && match.awayTeam === teamA)
        ) {
          if (match.matchPlayed) {
            if (match.homeTeam === teamA) {
              if (match.homeTeamScore > match.awayTeamScore) teamA_points += 3;
              else if (match.homeTeamScore < match.awayTeamScore)
                teamB_points += 3;
              else {
                teamA_points += 1;
                teamB_points += 1;
              }
            } else {
              if (match.homeTeamScore < match.awayTeamScore) teamA_points += 3;
              else if (match.homeTeamScore > match.awayTeamScore)
                teamB_points += 3;
              else {
                teamA_points += 1;
                teamB_points += 1;
              }
            }
          }
        }
      });

      return teamA_points - teamB_points;
    };

    // Sort teams by points, then by head-to-head points, goal difference, goals scored, and name
    teamsArray.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      const headToHeadPoints = getHeadToHeadPoints(a.teamName, b.teamName);
      if (headToHeadPoints !== 0) return headToHeadPoints;
      const goalDifferenceA = a.goalsFor - a.goalsAgainst;
      const goalDifferenceB = b.goalsFor - b.goalsAgainst;
      if (goalDifferenceA !== goalDifferenceB)
        return goalDifferenceB - goalDifferenceA;
      if (a.goalsFor !== b.goalsFor) return b.goalsFor - a.goalsFor;
      return a.teamName.localeCompare(b.teamName);
    });

    return teamsArray;
  }

  /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */
  async fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/getAllMatches",
        {
          headers: {
            Authorization: "Bearer YuHBdSlDXY000xa8IlCm7Qgq4_s",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.success) {
        await this.fetchFlags(); // Ensure flags are fetched before setting matches

        this.setMatches(data.matches);
      } else {
        console.error("Failed to fetch matches:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getFormattedDate(timestamp) {
    const date = new Date(timestamp);
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

  async fetchFlags() {
    try {
      // Define a list of country for flags - hardcoded solution to avoid cors complications
      const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua And Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire",
        "Bosnia And Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Virgin Islands",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Colombia",
        "Congo",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte D'ivoire",
        "Democratic Republic Of Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "England",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "European Union",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-bissau",
        "Guyana",
        "Haiti",
        "Heard Island And Mcdonald Islands",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle Of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Ireland",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic Of North Macedonia",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena",
        "Saint Kitts And Nevis",
        "Saint Lucia",
        "Saint Martin",
        "Saint Pierre And Miquelon",
        "Saint Vincent And The Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome And Principe",
        "Saudi Arabia",
        "Scotland",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia And The South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard And Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Thailand",
        "The Bahamas",
        "The British Indian Ocean Territory",
        "The Cayman Islands",
        "The Central African Republic",
        "The Cocos Islands",
        "The Comoros",
        "The Cook Islands",
        "The Democratic People's Republic Of Korea",
        "The Falkland Islands",
        "The Faroe Islands",
        "The Federated States Of Micronesia",
        "The French Southern Territories",
        "The Holy See",
        "The Lao People's Democratic Republic",
        "The Marshall Islands",
        "The Northern Mariana Islands",
        "The Republic Of Korea",
        "The Republic Of Moldova",
        "The Turks And Caicos Islands",
        "The United Kingdom Of Great Britain And Northern Ireland",
        "The United States Minor Outlying Islands",
        "The United States Of America",
        "Timor-leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad And Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Republic Of Tanzania",
        "Uruguay",
        "Us Virgin Islands",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Wales",
        "Wallis And Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ];
      // Generate flag URLs for the list of countries
      this.flags = countries.reduce((acc, country) => {
        const formattedCountry = encodeURIComponent(country);
        acc[country] = `https://flagsapi.codeaid.io/${formattedCountry}.png`; // Construct flag URL
        return acc;
      }, {});
    } catch (error) {
      console.error("Error fetching flags:", error);
    }
  }
}

export default LeagueService;
