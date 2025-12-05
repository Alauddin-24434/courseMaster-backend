
import dotenv from "dotenv";
import connectDb from "./app/config/db";
import app from ".";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function server() {
  try {
    await connectDb(); // await DB connection
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1); // exit process on DB failure
  }
}

server();
