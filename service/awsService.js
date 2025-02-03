import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { s3 } from "../config/awsConfig.js";
import { BASE_URL } from "../config/serverConfig.js";
import mime from "mime-types";

// (async () => {
//     const credentials = await s3.config.credentials();                    // tHIS is useful for debugging purpose
//     console.log("Access Key ID:", credentials.accessKeyId);
// })();
export const uploadCode = async (fileName, code, projectId) => {
    const decodedString = atob(code);
    let fileUrl = null;
    try {
        // Write file and upload to S3
        fs.writeFileSync(fileName, decodedString);
        const command = new PutObjectCommand({
            Bucket: "code-bucket",
            Key: `__outputs/${projectId}/${fileName}`,
            Body: fs.createReadStream(fileName),
            ContentType: mime.lookup(fileName),
        });
        await s3.send(command);
        fileUrl = `${BASE_URL}/__outputs/${projectId}/${fileName}`;
        console.log(`File uploaded successfully. URL: ${fileUrl}`);
    } finally {
        // Cleanup temporary file
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }


    }
    return fileUrl;
}
