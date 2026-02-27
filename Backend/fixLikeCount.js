const mongoose = require('mongoose');

async function fixLikeCount() {
  await mongoose.connect('mongodb://localhost:27017/YOUR_DB_NAME'); // Replace YOUR_DB_NAME
  const food = mongoose.connection.collection('food');
  const result = await food.updateMany(
    { likeCount: { $type: 'array' } },
    { $set: { likeCount: 0 } }
  );
  console.log('Documents updated:', result.modifiedCount);
  await mongoose.disconnect();
}

fixLikeCount().catch(console.error);