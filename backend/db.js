const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {                     // add database name to between / gpfoodmern?
    await mongoose.connect('mongodb+srv://maazmustafa032:21072003@cluster1.8aredms.mongodb.net/gofoodmern?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

  // Rest of your code here -----------------------------------------------------------------------------------------

  // agr fooditems ka data fetch hogya tbh foodcatogary ka data fetch krna hy 

  const fetch_data = await mongoose.connection.db.collection("fooditem");
try {
  const data = await fetch_data.find({}).toArray();
  // console.log(data);

 const foodCategory = await mongoose.connection.db.collection("foodcatogary");

 try {
  const catData = await foodCategory.find({}).toArray();
  // console.log(catData);


  global.food_items = data;
  global.food_catogary = catData;

  
 } catch (error) {
  console.log("Error in db.js file",error);
 }

} catch (error) {
  console.error("Error in db.js file",error);
}


 




    //---------------------------------------------------------------------------------------
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }

}



 
module.exports =connectToMongoDB; 
