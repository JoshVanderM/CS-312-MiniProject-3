import express from 'express'; // Runs server
import axios from 'axios'; // used for API calls

const app = express();
const port = 3000;

// get it so the static objects can use css
app.use(express.static("public"));

// used to get the view and data to send correctly
app.use(express.urlencoded({ extended: true }));

// help to get ejs to view correctly with the CSS
app.set('view engine', 'ejs');

// render the main page of the website
app.get("/", (req, res) => {
    res.render("index", {city: null, weather: null, error: null});
});

// use async so we can use the await call for axios
app.post("/", async (req, res) => {
    const city = req.body.city;
    const unit = req.body.unit;
    const apiKey = "d3109b4af2a15a8743efc2672e2fa8d1";

    // try to get the data from the api
    try{
        // get the lat and long of the city inputed 
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoResponse = await axios.get(geoUrl);

        // Check if geoResponse.data has any results
        if (!geoResponse.data || geoResponse.data.length === 0) {
            return res.render("index", { city: null, weather: null, error: "Could not find location. Please try another city." });
        }
        
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;
    
        // use above lat and lon to get data for city
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
        const response = await axios.get(weatherUrl);
        const data = response.data;

        // format weather data
        const weather = {
            temp: data.main.temp,
            condition: data.weather[0].description,
            unit: unit,
        };
        // render website with the new data
        res.render("index", {city, weather, error: null});
    } catch(err) {
        // console log any errors
        console.error(err);

        // rerender blank site
        res.render("index", {city: null, weather: null,  error: "Could not retrieve weather data. Please try again."});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});
