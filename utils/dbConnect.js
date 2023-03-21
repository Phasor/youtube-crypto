const { MongoClient } = require('mongodb');

const uri = process.env.DB_STRING;

if (!uri) {
  throw new Error(
    'Please define the DB_STRING environment variable inside .env.local',
  );
}

let cachedClient = null;

async function getDBClient() {
  if (cachedClient) {
    console.log('Using cached connection');
    return cachedClient;
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,
  });

  await client.connect();
  console.log(`New database connection established: ${client.s.url}`);

  cachedClient = client;
  return client;
}

export default getDBClient;
