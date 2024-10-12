const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Fathername: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
});

const HospitalModel = mongoose.model("Hospital", HospitalSchema);
module.exports = HospitalModel;
