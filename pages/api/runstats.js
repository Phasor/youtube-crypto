const axios = require("axios");
const baseURL = 'https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id='
const apiKey = process.env.YT_API_KEY;
import connectToDatabase from '../../utils/dbConnect';
import { ObjectId } from 'mongodb';

// search for channelId
// want: subscriberCount, viewCount, videoCount

const channelIDs= [
    { _id: "64155c273ffb0bf796e63aad", channel: "Bankless", id: "UCAl9Ld79qaZxp9JzEOwd3aA" },
    { _id: "64155c273ffb0bf796e63aae", channel: "EllioTrades", id: "UCMtJYS0PrtiUwlk6zjGDEMA" },
    { _id: "64155c273ffb0bf796e63aaf", channel: "BitBoy", id: "UCjemQfjaXAzA-95RKoy9n_g" },
    { _id: "64155c283ffb0bf796e63ab0", channel: "CoinBureau", id: "UCqK_GSMbpiV8spgD3ZGloSw" },
    { _id: "64155c283ffb0bf796e63ab1", channel: "AltcoinDaily", id: "UCbLhGKVY-bJPcawebgtNfbw" },
    { _id: "64155c283ffb0bf796e63ab2", channel: "Lark Davis", id: "UCl2oCaw8hdR_kbqyqd2klIA" },
    { _id: "64155c283ffb0bf796e63ab3", channel: "CTO Larsen", id: "UCFU-BE5HRJoudqIz1VDKlhQ" },
    { _id: "64155c283ffb0bf796e63ab4", channel: "Ben Cowan", id: "UCRvqjQPSeaWn-uEx-w0XOIg" },
    { _id: "64155c283ffb0bf796e63ab5", channel: "Altcoin Buzz", id: "UCGyqEtcGQQtXyUwvcy7Gmyg" },
    { _id: "64155c283ffb0bf796e63ab6", channel: "JNRY Crypto", id: "UC188KLMYLLGqVJZdYq7mYFw" },
    { _id: "64155c283ffb0bf796e63ab7",channel: "CryptosRUs", id: "UCI7M65p3A-D3P4v5qW8POxQ" },
]

// limit to 1 call per hour
let lastCall;

export default async function handler (req, res) {
    if (lastCall > Date.now() - 5 * 60 * 1000) { // 5 minutes
        return res.status(429).json({ success: false, message: "Rate limit exceeded" });
      } else {
          lastCall = Date.now();
      }

    try {
        for(let i = 0; i < channelIDs.length; i++) {
            try{
                // call YT api
                let response = await axios.get(`${baseURL}${channelIDs[i].id}&key=${apiKey}`);
                let viewCount = response.data.items[0].statistics.viewCount;
                let subscriberCount = response.data.items[0].statistics.subscriberCount;
                let videoCount = response.data.items[0].statistics.videoCount;

                // response example {"kind":"youtube#channelListResponse","etag":"yuQiDbgQx9xvsGzJgeyfn_ugsIY","pageInfo":{"totalResults":1,"resultsPerPage":5},"items":[{"kind":"youtube#channel","etag":"ZtQgfnR45Fz3WIT7MQZF4P20T7k","id":"UCjemQfjaXAzA-95RKoy9n_g","statistics":{"viewCount":"244110355","subscriberCount":"1450000","hiddenSubscriberCount":false,"videoCount":"4179"}}]}

                // add data to the collection
                await collection.updateOne(
                    { _id: new ObjectId(channelIDs[i]._id) },
                    {
                    $push: {
                        subscribers: { date: new Date(), count: subscriberCount },
                        views: { date: new Date(), count: viewCount },
                        videos: { date: new Date(), count: videoCount },
                    },
                    }
                );

            } catch(err) {
                console.log(err);
                res.status(400).json({ success: false });
            }
        }
        res.status(200).json({ success: true });
    } catch(err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
}