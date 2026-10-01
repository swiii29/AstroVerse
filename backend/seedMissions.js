const mongoose = require("mongoose");
require("dotenv").config();

const Mission = require("./models/Mission");

const missions = [
  {
    name: "Artemis II",
    agency: "NASA",
    destination: "Moon",
    status: "Completed",
    progress: 100,
    launchDate: "November 2025",
    description:
      "A crewed lunar mission designed to test systems and prepare for future lunar exploration.",
    objective:
      "Test crewed deep-space operations and prepare for future lunar surface missions.",
  },
  {
    name: "Chandrayaan-4",
    agency: "ISRO",
    destination: "Moon",
    status: "Planned",
    progress: 35,
    launchDate: "2027",
    description:
      "An advanced Indian lunar exploration mission focused on lunar sample return capabilities.",
    objective:
      "Collect and return lunar samples to Earth for scientific analysis.",
  },
  {
    name: "Europa Clipper",
    agency: "NASA",
    destination: "Europa",
    status: "Active",
    progress: 65,
    launchDate: "October 2024",
    description:
      "A mission studying Jupiter's moon Europa and investigating whether it has conditions suitable for life.",
    objective:
      "Study Europa's ice shell, ocean, composition, and habitability.",
  },
  {
    name: "JUICE",
    agency: "ESA",
    destination: "Jupiter System",
    status: "Active",
    progress: 55,
    launchDate: "April 2023",
    description:
      "A European mission exploring Jupiter and its icy moons Ganymede, Callisto, and Europa.",
    objective:
      "Investigate Jupiter's system and the habitability of its icy moons.",
  },
];

const seedMissions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      tls: true,
    });

    console.log("✅ MongoDB connected");

    await Mission.deleteMany();

    await Mission.insertMany(missions);

    console.log(
      `🚀 Successfully inserted ${missions.length} missions`
    );

    await mongoose.connection.close();

    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Mission seed failed:");
    console.error(error.message);
    process.exit(1);
  }
};

seedMissions();