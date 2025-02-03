import * as outputRepository from "../repository/outputRepository.js";


export const saveOutput = async (projectId, status, statusId) => {
    return await outputRepository.add(projectId, status, statusId);
}