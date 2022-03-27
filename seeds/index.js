const mongoose = require('mongoose');
const Campground = require('../models/campground')
const { descriptors, places } = require('./seedHelpers')
const cities = require('./cities')

mongoose.connect('mongodb://localhost/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo connected!')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 100);
    const randomPrice = Math.floor(Math.random() * 500) + 500;
    const camp = new Campground({
      author: '621bb06e21bbcf0a34d37cc6',
      location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure praesentium quosLorem ipsum dolor, sit amet consectetur adipisicing elit. Iure praesentium quos, assumenda, voluptas ullam est nesciunt qui magni perferendis deserunt ducimus quo adipisci nostrum accusamus odio laborum quisquam dolorem nisi",
      price: randomPrice,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].lng,
          cities[random1000].lat
        ]

      },
      images: [
        {

          url: 'https://res.cloudinary.com/dw6s94zzf/image/upload/v1643363881/CampingCafe/test-img_btrzy2.jpg',
          filename: 'CampingCafe/wlfkgbxaedb0zqb57adn'
        },
        {

          url: 'https://res.cloudinary.com/dw6s94zzf/image/upload/v1640854024/CampingCafe/bxpvtumegutyexbca4hm.jpg',
          filename: 'CampingCafe/bxpvtumegutyexbca4hm'
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
});