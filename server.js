const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/login');
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    username: String,
    quries: String,
})

const User = mongoose.model('User', userSchema);

app.post('/post', async (req, res) => {
    const { username, quries } = req.body;
    const user = new User({
        username,
        quries,
    });
    await user.save();
    res.send('Data saved successfully');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
