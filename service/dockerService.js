import { exec } from "child_process";
import util from 'util';

// Promisify the exec function
const execPromise = util.promisify(exec);

export const startDockerContainer = async (url, project_id) => {
    try {
        // Construct the Docker command
        const dockerCommand = `docker run --rm -e R2_URL=${url} -e PROJECT_ID=${project_id} emzm17/next-pen:latest`;

        console.log(`Executing Docker command: ${dockerCommand}`);

        // Use execPromise to run the Docker command asynchronously
        const { stdout, stderr } = await execPromise(dockerCommand);

        if (stderr) {
            throw new Error(`Docker error: ${stderr}`);
        }

        console.log(`Docker container started successfully: ${stdout}`);
    } catch (error) {
        console.error(`Error starting Docker container: ${error.message}`);
    }
}




