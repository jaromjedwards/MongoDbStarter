const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://jaromjedwards:Queenghost5@cluster0.erilltf.mongodb.net/";

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const result = await findOneListingByName(client, "Infinite Views");

        console.log(`${result.insertedCount} new listings created with the following id(s): `);
        console.log(result.insertedIds);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
    } else {
        console.log(`No listings with the name '${nameOfListing}' :(`);
    }    
}

async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    return result;
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    return result; // Return the result to access it in the main function
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}
