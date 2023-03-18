const axios = require("axios");
const baseURL = 'https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id='
const apiKey = process.env.YT_API_KEY;
//  { channel: "me", id: "UCgSDn4N3Ncg1-kfJTYPgwHA" }
// search for channelId
// want: subscriberCount, viewCount, videoCount

const channelIDs= [
    { channel: "Bankless", id: "UCAl9Ld79qaZxp9JzEOwd3aA" },
    { channel: "ElioTrades", id: "UCMtJYS0PrtiUwlk6zjGDEMA" },
    { channel: "BitBoy", id: "UCjemQfjaXAzA-95RKoy9n_g" },
    { channel: "Coin Bureau", id: "UCqK_GSMbpiV8spgD3ZGloSw" },
    { channel: "Altcoin Daily", id: "UCbLhGKVY-bJPcawebgtNfbw" },
    { channel: "Lark Davis", id: "UCl2oCaw8hdR_kbqyqd2klIA" },
    { channel: "CTO Larsen", id: "UCFU-BE5HRJoudqIz1VDKlhQ" },
    { channel: "Benjamin Cowen", id: "UCRvqjQPSeaWn-uEx-w0XOIg" },
    { channel: "Altcoin Buzz", id: "UCGyqEtcGQQtXyUwvcy7Gmyg" },
    { channel: "JNRY Crypto", id: "UC188KLMYLLGqVJZdYq7mYFw" },
    { channel: "CryptosRUs", id: "UCI7M65p3A-D3P4v5qW8POxQ" },
]

export default async function handler (req, res) {
    try {
        const response = await axios.get(`${baseURL}${req.query.channelId}&key=${apiKey}`);
        res.status(200).json(response.data)
    } catch(err) {
        console.log(err);
    }
}