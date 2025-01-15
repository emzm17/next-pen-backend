
import { saveOutput } from "../service/dbService.js";

export const handleOutputTask = async (task) => {
    const output = {
        projectId: task.projectId,
        status: task.status
    };
    saveOutput(output.projectId, output.status);
};