import { exec } from "child_process";
import util from 'util';

// Promisify the exec function
const execPromise = util.promisify(exec);

export const startDockerContainer = async (url, input_url, project_id) => {
    console.log(input_url);
    try {
        // Construct the Docker command
        const dockerCommand = `docker run --rm -e R2_URL=${url} -e INPUT_URL=${input_url} -e PROJECT_ID=${project_id} next-pen:latest`;

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




