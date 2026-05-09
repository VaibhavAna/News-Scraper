require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const scrapeStories = require("./src/services/scraperService");
const Story = require("./src/models/Story");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    await connectDB();

    await scrapeStories();

    const count = await Story.countDocuments();

    console.log(`Stories in DB: ${count}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
