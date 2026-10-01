const mongoose = require("mongoose");
require("dotenv").config();

const CelestialObject = require("./models/CelestialObject");

const celestialObjects = [
  {
    name: "Mercury",
    type: "Planet",
    description:
      "The smallest planet in the Solar System and the closest planet to the Sun.",
    distance: "57.9 million km from Sun",
    image:
      "https://images-assets.nasa.gov/image/PIA15162/PIA15162~orig.jpg",
    facts: [
      "Smallest planet in the Solar System",
      "Has no moons",
      "A year lasts only 88 Earth days",
    ],
  },
  {
    name: "Venus",
    type: "Planet",
    description:
      "A rocky planet with a thick atmosphere and the hottest surface of any planet in the Solar System.",
    distance: "108.2 million km from Sun",
    image:
      "https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg",
    facts: [
      "Hottest planet in the Solar System",
      "Similar in size to Earth",
      "Rotates in the opposite direction to most planets",
    ],
  },
  {
    name: "Earth",
    type: "Planet",
    description:
      "Our home planet and the only known astronomical object confirmed to support life.",
    distance: "149.6 million km from Sun",
    image:
      "https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg",
    facts: [
      "About 71% of its surface is covered by water",
      "Has one natural satellite",
      "Supports a wide variety of life",
    ],
  },
  {
    name: "Mars",
    type: "Planet",
    description:
      "The fourth planet from the Sun, known for its reddish appearance and ancient geological features.",
    distance: "227.9 million km from Sun",
    image:
      "https://images-assets.nasa.gov/image/PIA00407/PIA00407~orig.jpg",
    facts: [
      "Known as the Red Planet",
      "Has two small moons",
      "Contains the largest volcano in the Solar System",
    ],
  },
  {
    name: "Jupiter",
    type: "Planet",
    description:
      "The largest planet in the Solar System and a gas giant with a powerful magnetic field.",
    distance: "778.5 million km from Sun",
    image:
      "https://images-assets.nasa.gov/image/PIA22946/PIA22946~orig.jpg",
    facts: [
      "Largest planet in the Solar System",
      "Has a famous Great Red Spot",
      "Has many known moons",
    ],
  },
  {
    name: "Saturn",
    type: "Planet",
    description:
      "A gas giant famous for its spectacular system of icy rings.",
    distance: "1.43 billion km from Sun",
    image:
      "https://images-assets.nasa.gov/image/PIA12567/PIA12567~orig.jpg",
    facts: [
      "Has a prominent ring system",
      "Second-largest planet",
      "Less dense than water",
    ],
  },
  {
    name: "Moon",
    type: "Moon",
    description:
      "Earth's natural satellite and the only celestial body beyond Earth where humans have walked.",
    distance: "384,400 km from Earth",
    image:
      "https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg",
    facts: [
      "Earth's only natural satellite",
      "Tides are strongly influenced by the Moon",
      "Humans first landed on the Moon in 1969",
    ],
  },
  {
    name: "Sirius",
    type: "Star",
    description:
      "The brightest star in Earth's night sky, located in the constellation Canis Major.",
    distance: "8.6 light-years",
    image:
      "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001998/GSFC_20171208_Archive_e001998~orig.jpg",
    facts: [
      "Brightest star seen from Earth at night",
      "Part of the Canis Major constellation",
      "A binary star system",
    ],
  },
  {
    name: "Proxima Centauri b",
    type: "Exoplanet",
    description:
      "An exoplanet candidate orbiting within the habitable zone of the nearby star Proxima Centauri.",
    distance: "About 4.24 light-years",
    image:
      "https://images-assets.nasa.gov/image/PIA23412/PIA23412~orig.jpg",
    facts: [
      "Located in the nearest known star system to the Sun",
      "Orbits Proxima Centauri",
      "Located relatively close to its star",
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      tls: true,
    });

    console.log("✅ MongoDB connected");

    await CelestialObject.deleteMany();

    await CelestialObject.insertMany(celestialObjects);

    console.log(
      `🚀 Successfully inserted ${celestialObjects.length} celestial objects`
    );

    await mongoose.connection.close();

    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Seed failed:");
    console.error(error.message);

    process.exit(1);
  }
};

seedDatabase();