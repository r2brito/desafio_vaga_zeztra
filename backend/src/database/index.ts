import mongoose, { ConnectOptions } from "mongoose";

const models = [];

class Database {
  private mongoConnection: typeof mongoose | null = null;

  constructor() {
    this.mongo();
  }

  async mongo() {
    const url = String(process.env.MONGO_URL)

    try {
      this.mongoConnection = await mongoose.connect(url, {
        dbName: "desafio"
      } as ConnectOptions);

      console.log(`✅ Connected to database`);
    } catch (error) {
      console.error("❌ Failed to connect to database:", error);
      process.exit(1);
    }
  }
}

export default new Database();