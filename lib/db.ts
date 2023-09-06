import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

let isConnected = false;
export const connectToDb = async () => {
  if (isConnected) {
    console.log("Alredy connected to DB");
  }

  try {
    const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
    const db = drizzle(sql);
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
