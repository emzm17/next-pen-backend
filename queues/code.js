import { startDockerContainer } from '../service/dockerService.js'
import { uploadCode } from '../service/awsService.js'
import { FILE_NAME } from '../config/serverConfig.js';
export const handleQueueTask = async (task) => {
    const fileUrl = await uploadCode(FILE_NAME, task.code, task.projectId);
    await startDockerContainer(fileUrl, task.projectId);
};