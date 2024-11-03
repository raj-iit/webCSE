document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '2a432779dc1dec20fe5058ec20f88c7e';

    document.getElementById('searchButton').addEventListener('click', function(event) {
        event.preventDefault();
        const city = document.getElementById('cityInput').value;
        document.getElementById('city1').innerHTML = city;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`City not found: ${response.statusText}`);
                }
                return response.json();
            })
            .then(response => {
                // Ensure the response has the expected structure
                if (!response || !response.city || !response.list) {
                    throw new Error('Invalid response structure');
                }

                // Update weather data for today
                document.getElementById('cityInput').innerHTML = response.city.name;

                const today = response.list[0].main;
                if (today) {
                    document.getElementById('temp_today').innerHTML = today.temp;
                    document.getElementById('humidity_today').innerHTML = today.humidity;
                    document.getElementById('pressure_today').innerHTML = today.pressure;
                    document.getElementById('windSpeed_today').innerHTML = response.list[0].wind.speed;
                    document.getElementById('condition_today').innerHTML = response.list[0].weather[0].main;
                    document.getElementById('description_today').innerHTML = response.list[0].weather[0].description;
                    
                }

                // Update weather data for the next 5 days
                for (let i = 1; i <= 5; i++) {
                    const dayData = response.list[(i * 8)-1];
                    if (dayData) {
                        const day = dayData.main;
                        if (day) {
                            document.getElementById(`temp_day${i}`).innerHTML = day.temp;
                            document.getElementById(`humidity_day${i}`).innerHTML = day.humidity;
                            document.getElementById(`pressure_day${i}`).innerHTML = day.pressure;
                            document.getElementById(`windSpeed_day${i}`).innerHTML = dayData.wind.speed;
                            document.getElementById(`condition_day${i}`).innerHTML = dayData.weather[0].main;
                            document.getElementById(`description_day${i}`).innerHTML = dayData.weather[0].description;
                        }

                    }
                }

                



            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('weatherData').innerHTML = `<p>Error: ${error.message}</p>`;
            });
    });
});
