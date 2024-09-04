// /api/fetchMatches.js
import axios from "axios";

const API_KEY = process.env.API_KEY; // Make sure this environment variable is set in Vercel
const BASE_URL = "https://api.football-data.org/v4/competitions";

export default async function handler(req, res) {
  const { competitionCode } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/${competitionCode}/matches`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
