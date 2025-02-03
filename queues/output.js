
import { saveOutput } from "../service/dbService.js";

export const handleOutputTask = async (task) => {
    const output = {
        projectId: task.projectId,
        status: task.status,
        statusId: task.statusId
    };
    saveOutput(output.projectId, output.status, output.statusId);
};