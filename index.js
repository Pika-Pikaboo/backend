import app from "./server.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main() {
  dotenv.config();

  const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const port = process.env.PORT || 5000;

  try {
    await client.connect();
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Express server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
