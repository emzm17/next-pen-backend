import { startDockerContainer } from '../service/dockerService.js'
import { uploadCode } from '../service/awsService.js'
import { FILE_NAME, INPUT_FILE } from '../config/serverConfig.js';
export const handleQueueTask = async (task) => {
    const fileUrl = await uploadCode(FILE_NAME, task.content, task.submissionId);
    const testcase = await uploadCode(INPUT_FILE, task.input, task.submissionId);
    await startDockerContainer(fileUrl, testcase, task.submissionId);
};