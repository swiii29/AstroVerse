const mongoose = require("mongoose");
require("dotenv").config();

const collections = [
  "celestialobjects",
  "lunarbases",
  "missions",
  "observations",
  "users",
];

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      tls: true,
    });

    console.log("Connected to MongoDB");

    const sourceDB = mongoose.connection.useDb("test");
    const targetDB = mongoose.connection.useDb("AstroVerse");

    for (const collectionName of collections) {
      const sourceCollection = sourceDB.collection(collectionName);
      const targetCollection = targetDB.collection(collectionName);

      const documents = await sourceCollection.find({}).toArray();
      const existingDocuments = await targetCollection.countDocuments();

      console.log(
        `${collectionName}: ${documents.length} source documents, ${existingDocuments} target documents`
      );

      if (documents.length === 0) {
        console.log(`Skipping ${collectionName}: no source data`);
        continue;
      }

      if (existingDocuments > 0) {
        console.log(`Skipping ${collectionName}: target already has data`);
        continue;
      }

      await targetCollection.insertMany(documents);

      console.log(`Copied ${documents.length} documents → ${collectionName}`);
    }

    console.log("\n✅ Migration completed successfully");
  } catch (error) {
    console.error("\n❌ Migration failed:");
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
  }
};

migrateData();