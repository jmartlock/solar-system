import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
    let apiKey = "JLAYe05VYuNeImF4CW5WT_RCNqLtyD9HF_cXMqOS-78";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);

    if (!response.ok) {
        return res.render("index", { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Hubble_ultra_deep_field.jpg/1280px-Hubble_ultra_deep_field.jpg" });
    }

    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index",{"image":randomImage})
});

app.listen(process.env.PORT || 3000, () => {
   console.log('server started');
});

app.get('/planet', (req, res) => {
 let planetName = req.query.planetName;
 let planetInfo = planets[`get${planetName}`]();
 res.render('planet', { planetInfo, planetName });
});

app.get('/nasa', async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const apiKey = '9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${today}`;

    const response = await fetch(url);
    const apod = await response.json();

    res.render('nasa', { apod });
});