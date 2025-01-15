import Output from "../schema/output.js"
export const add = async (projectId, status) => {
    const project = await Output.findOne({ projectId });

    if (project) {
        // Project exists, add status to the existing project
        return await Output.findOneAndUpdate(
            { projectId },
            { $push: { status: { status } } },
            { new: true }
        );
    } else {
        // Project doesn't exist, create a new project with the status
        return await Output.create({
            projectId,
            status: [{ status }]
        });
    }
};