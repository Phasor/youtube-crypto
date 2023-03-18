const { MongoClient } = require('mongodb');
require("dotenv").config({ path: "../.env.local" });

const channels = [
    { channel: "Bankless", id: "UCAl9Ld79qaZxp9JzEOwd3aA" },
    { channel: "EllioTrades", id: "UCMtJYS0PrtiUwlk6zjGDEMA" },
    { channel: "BitBoy", id: "UCjemQfjaXAzA-95RKoy9n_g" },
    { channel: "CoinBureau", id: "UCqK_GSMbpiV8spgD3ZGloSw" },
    { channel: "AltcoinDaily", id: "UCbLhGKVY-bJPcawebgtNfbw" },
    { channel: "Lark Davis", id: "UCl2oCaw8hdR_kbqyqd2klIA" },
    { channel: "CTO Larsen", id: "UCFU-BE5HRJoudqIz1VDKlhQ" },
    { channel: "Ben Cowan", id: "UCRvqjQPSeaWn-uEx-w0XOIg" },
    { channel: "Altcoin Buzz", id: "UCGyqEtcGQQtXyUwvcy7Gmyg" },
    { channel: "JNRY Crypto", id: "UC188KLMYLLGqVJZdYq7mYFw" },
    { channel: "CryptosRUs", id: "UCI7M65p3A-D3P4v5qW8POxQ" },
]

const connectionString = process.env.DB_STRING;

async function connectToDatabase() {
  try {
    const client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tlsAllowInvalidCertificates: true,
      });
      
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client;
  } catch (err) {
    console.error(err);
  }
}

async function insertChannels() {
  const client = await connectToDatabase();
  const db = await client.db('test');
  const collection = db.collection('Channel');

  try {
    for (let i = 0; i < channels.length; i++) {
      const document = {
        Name: channels[i].channel,
        YTID: channels[i].id,
      };
      await collection.insertOne(document);
    }
    console.log('Inserted channels successfully');
  } catch (err) {
    console.error(err);
  }
} 

async function main() {
    await connectToDatabase();
    await insertChannels();
}

main();


