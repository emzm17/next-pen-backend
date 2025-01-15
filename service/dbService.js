import * as outputRepository from "../repository/outputRepository.js";


export const saveOutput = async (projectId, status) => {
    return await outputRepository.add(projectId, status);
}