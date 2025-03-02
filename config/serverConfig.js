import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}


export const REDIS_HOST = process.env.redis;
export const AWS_REGION = process.env.REGION;
export const AWS_ACCESSKEYID = process.env.accessKeyId;
export const AWS_SECRETACCESSKEY = process.env.secretAccessKey;
export const AWS_ENDPOINT = process.env.ENDPOINT;
export const BASE_URL = process.env.BASE_URL;
export const FILE_NAME = process.env.fileName;
export const DB_URL = process.env.DB_URL;
export const INPUT_FILE = process.env.input;
export const PYTHON_FILE = process.env.python;
export const TOPIC_NAME = process.env.TOPIC_NAME;

