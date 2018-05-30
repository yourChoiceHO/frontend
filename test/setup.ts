import dotenv from "dotenv";
import { resolve } from "path";
import { cwd } from "process";

dotenv.config({ path: resolve(cwd(), ".env.test") });
