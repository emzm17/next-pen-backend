import { REDIS_HOST } from "./serverConfig.js";
import { createClient } from "redis";


export const redisClient = createClient({
     url: REDIS_HOST
})

