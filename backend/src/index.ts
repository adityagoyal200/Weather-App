import express, { response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());
const API_KEY = process.env.REACT_APP_API_KEY;;


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/weather', async (req, res: any) => {
  try {
    const city = req.query.city as string;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    const response = await axios.get(weatherUrl);

    const weatherData = {
      city: response.data.location.name,
      temperature: `${response.data.current.temp_c}°C`,
      condition: response.data.current.condition.text,
      wind: `${response.data.current.wind_kph} m/s`,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(404).send(`Cant Fetch for this location or pincode`) 
  }
});

