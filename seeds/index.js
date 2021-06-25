const mongoose = require("mongoose");
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers'); // destructor

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Databse Connected!');
});

const sample = (array) => array[Math.floor(Math.random() * array.length+1)]; // if something goes wrong check this +1 logic
// arrow function return value by default hence we haven't used return keyword to return the value
// only condition is arrow fuction should have only one statement

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1001);
        const price      = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60d06c35553b96253c6f23ed',     // USERNAME= BOSS, PASSWORD= BOSS
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore obcaecati nostrum commodi incidunt voluptas error eos, a maxime omnis eveniet. Qui deserunt necessitatibus esse earum!',
            price,
            geometry : {
              type : "Point",
              coordinates : [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
              {
                      "url" : "https://res.cloudinary.com/dg04hsxaa/image/upload/v1624535426/YelpCamp/lkmdoxrkhzz6yujdysto.jpg",
                      "filename" : "YelpCamp/lkmdoxrkhzz6yujdysto"
              },
              {
                      "url" : "https://res.cloudinary.com/dg04hsxaa/image/upload/v1624535430/YelpCamp/aworaaecyr8cy8njnbxv.jpg",
                      "filename" : "YelpCamp/aworaaecyr8cy8njnbxv"
              }
            ]   
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
// since we need this file to only seed some data 
// so after seeding some date we don't need this file anymore 
// hence we close the connection of this index.js file with mongoose