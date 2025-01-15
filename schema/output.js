import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    status: String,
    date: { type: Date, default: Date.now }
});

const outputSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    status: [statusSchema]
})

const Output = mongoose.model("Output", outputSchema);

export default Output;