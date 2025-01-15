import dotenv from 'dotenv';

dotenv.config();

export const REDIS_HOST = process.env.redis;
export const AWS_REGION = process.env.REGION;
export const AWS_ACCESSKEYID = process.env.accessKeyId;
export const AWS_SECRETACCESSKEY = process.env.secretAccessKey;
export const AWS_ENDPOINT = process.env.ENDPOINT;
export const BASE_URL = process.env.BASE_URL;
export const FILE_NAME = process.env.fileName;
export const DB_URL = process.env.DB_URL;


