import Code from "../schema/code.js"
export const add = async (projectId, status) => {
    try {
        await Code.findOneAndUpdate({ _id: projectId },
            { $push: { statuses: { status: status, date: new Date() } } },
            { new: true });
    } catch (error) {
        console.error('Error adding status:', error);

    }
};