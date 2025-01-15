import { S3Client } from "@aws-sdk/client-s3";

import { AWS_ACCESSKEYID, AWS_REGION, AWS_SECRETACCESSKEY, AWS_ENDPOINT } from "./serverConfig.js";



export const s3 = new S3Client({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT,
  credentials: {
    accessKeyId: AWS_ACCESSKEYID,
    secretAccessKey: AWS_SECRETACCESSKEY,
  },
});

