import Output from "../schema/Code.js"
export const add = async (projectId, status) => {
    try {
        await Output.findOneAndUpdate({ _id: projectId },
            { $push: { status: { status: status, date: new Date() } } },
            { new: true });
    } catch (error) {
        console.error('Error adding status:', error);

    }
};