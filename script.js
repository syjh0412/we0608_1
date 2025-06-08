const API_KEY = 'e9a2ba4e3b374f19ab821029250806';

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');
    const city = cityInput.value;

    if (!city) {
        alert('도시 이름을 입력해주세요.');
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ko`);
        const data = await response.json();

        if (data.error) {
            weatherInfo.innerHTML = '도시를 찾을 수 없습니다.';
            return;
        }

        const weather = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="${data.current.condition.icon}" alt="날씨 아이콘" class="weather-icon">
            <p class="temperature">${data.current.temp_c}°C</p>
            <p class="weather-condition">${data.current.condition.text}</p>
            <div class="weather-details">
                <p>체감 온도: ${data.current.feelslike_c}°C</p>
                <p>습도: ${data.current.humidity}%</p>
                <p>풍속: ${data.current.wind_kph} km/h</p>
                <p>강수량: ${data.current.precip_mm} mm</p>
            </div>
            <p class="last-update">마지막 업데이트: ${new Date(data.current.last_updated).toLocaleString()}</p>
        `;
        weatherInfo.innerHTML = weather;
    } catch (error) {
        weatherInfo.innerHTML = '날씨 정보를 가져오는데 실패했습니다.';
        console.error('Error:', error);
    }
}

// Enter 키로도 검색 가능하도록 설정
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
