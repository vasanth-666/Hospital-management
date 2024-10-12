const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const HospitalModel = require("./models/Hospital");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/GaneshHospitalDetails", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log("MongoDB connection error:", err));


app.post("/insert", async (req, res) => {
    const { Name, Fathername, Mobile, Location } = req.body;

    const hospital = new HospitalModel({
        Name,
        Fathername,
        Mobile,
        Location,
    });

    try {
        await hospital.save();
        res.status(201).json({ message: 'Hospital details saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving hospital details.' });
    }
});

app.get("/read", async (req, res) => {
    try {
        const result = await HospitalModel.find({});
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.put("/update", async (req, res) => {
    const { id, newname, newmobile, newlocation } = req.body;

    try {
        const updatedHospital = await HospitalModel.findByIdAndUpdate(
            id,
            { Name: newname, Mobile: newmobile, Location: newlocation },
            { new: true }
        );

        if (!updatedHospital) {
            return res.status(404).json({ error: 'Hospital details not found.' });
        }
        
        res.status(200).json({ message: 'Hospital details updated successfully!', updatedHospital });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating hospital details.' });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await HospitalModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Hospital details not found.' });
        }
        res.status(200).json({ message: 'Hospital details deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting hospital details.' });
    }
});


app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
