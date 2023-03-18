const baseURL = "https://www.googleapis.com/youtube/v3";
const axios = require("axios");
const apiKey = process.env.YT_API_KEY;

// search?part=snippet&q=foo&type=video&key=[YOUR_API_KEY]

export default async function handler(req, res) {
  try {
    const response = await axios.get(`${baseURL}/search?key=${apiKey}&type=video&part=snippet&q=${req.query.search_query}`);
    res.status(200).json(response.data)
  } catch(err){
    console.log(err);
  }
}




