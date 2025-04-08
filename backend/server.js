const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


mongoose.connect("mongodb+srv://albinshiju285:pov2tBzbVG3yoNA8@cluster0.j5cuo.mongodb.net/hospital")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));


const User = require("./models/User")
const Contact = require("./models/Contact")


app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/contacts/:userId', async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.userId });
    res.status(200).send(contacts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
