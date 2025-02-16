import { startDockerContainer } from '../service/dockerService.js'
import { uploadCode } from '../service/awsService.js'
import { FILE_NAME, INPUT_FILE } from '../config/serverConfig.js';
export const handleQueueTask = async (task) => {
    const fileUrl = await uploadCode(FILE_NAME, task.content, task.projectId);
    const testcase = await uploadCode(INPUT_FILE, task.input, task.projectId);
    await startDockerContainer(fileUrl, testcase, task.projectId);
};