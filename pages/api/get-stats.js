import connectToDatabase from '../../utils/dbConnect';

export default async function handler(req, res) {
    try{
        // connect to db
        const client = await connectToDatabase('test');
        const collection = await client.db().collection('Channel');
        // get all channels
        const channels = await collection.find({}).toArray();
        res.status(200).json({ success: true, data: channels });

    } catch(err){
        console.log(err);
        res.status(400).json({ success: false });
    }
}