import { startDockerContainer } from '../service/dockerService.js'
import { uploadCode } from '../service/awsService.js'
import { FILE_NAME, INPUT_FILE, PYTHON_FILE } from '../config/serverConfig.js';
export const handleQueueTask = async (task) => {
    const fileName = task.language.name === 'C++' ? FILE_NAME : PYTHON_FILE;
    const fileUrl = await uploadCode(fileName, task.content, task.submissionId);
    const testcase = await uploadCode(INPUT_FILE, task.input, task.submissionId);
    const language_script = task.language.name === 'C++' ? 'run.sh' : 'python.sh';
    const imageName = task.language.name === 'C++' ? 'next-pen:latest' : 'python:latest';
    await startDockerContainer(fileUrl, testcase, task.submissionId, language_script, imageName);
};