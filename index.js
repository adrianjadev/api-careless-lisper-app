import express from 'express';
import axios from 'axios';
import morgan from 'morgan';

const app = express();
const PORT = 3003;
const API_URL = "https://secrets-api.appbrewery.com"

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/random`)
        res.render("index.ejs", { 
            secret: result.data.secret,
            user: result.data.username,
         });
    } catch (error) {
        res.render("index.ejs", { secret: JSON.stringify(error.message.data) });
    }
});

app.listen(PORT, () => {
    console.log(`The server is running in port ${PORT}`);
});