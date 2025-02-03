import Code from "../schema/code.js";

export const add = async (projectId, status, statusId) => {
    try {
        // Update the existing status object if statusId exists
        const updatedDocument = await Code.findOneAndUpdate(
            { _id: projectId, "statuses.statusId": statusId },
            {
                $push: { "statuses.$.status": status }, // Append new status to the existing array
                $set: { "statuses.$.date": new Date() } // Update date to reflect latest change
            },
            { new: true }
        );

        // If statusId was not found, create a new status object
        if (!updatedDocument) {
            await Code.findOneAndUpdate(
                { _id: projectId },
                {
                    $push: {
                        statuses: {
                            statusId: statusId,
                            status: [status], // Initialize status as an array
                            date: new Date()
                        }
                    }
                },
                { new: true }
            );
            console.log('New status object added for statusId:', statusId);
        } else {
            console.log('Status appended for existing statusId:', statusId);
        }
    } catch (error) {
        console.error('Error adding/updating status:', error);
    }
};
