import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    statusId: { type: Number, required: true },
    status: { type: [String], default: [] },
    date: { type: Date, default: Date.now }
});

const outputSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    language: { type: String, required: true },
    content: { type: String, required: true },
    statuses: [statusSchema]
})

const Code = mongoose.model("Code", outputSchema);

export default Code;