const mongoose = require('mongoose');
const Campground = require('../models/campground')
const {descriptors, places} = require('./seedHelpers')
const cities = require('./cities')

mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongo connected!')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 100);
        const randomPrice = Math.floor(Math.random() * 500) + 500;
        const camp = new Campground({
            author: '61641b4865bd4a2f280585f3',
            location: `${cities[random1000].name}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure praesentium quosLorem ipsum dolor, sit amet consectetur adipisicing elit. Iure praesentium quos, assumenda, voluptas ullam est nesciunt qui magni perferendis deserunt ducimus quo adipisci nostrum accusamus odio laborum quisquam dolorem nisi",
            price: randomPrice
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});