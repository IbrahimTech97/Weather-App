const translations = {
    en: {
        title: "Weather App",
        placeholder: "Enter city",
        submit: "Get Weather",
        temp: "Temperature",
        weather: "Weather",
        humidity: "Humidity",
        wind: "Wind Speed",
        error: "Error fetching weather data"
    },
    ar: {
        title: "تطبيق الطقس",
        placeholder: "أدخل المدينة",
        submit: "تحقق من الطقس",
        temp: "درجة الحرارة",
        weather: "الطقس",
        humidity: "الرطوبة",
        wind: "سرعة الرياح",
        error: "خطأ في جلب بيانات الطقس"
    }
};

const weatherDescriptions = {
    en: {
        "clear sky": "clear sky",
        "few clouds": "few clouds",
        "scattered clouds": "scattered clouds",
        "broken clouds": "broken clouds",
        "shower rain": "shower rain",
        "rain": "rain",
        "thunderstorm": "thunderstorm",
        "snow": "snow",
        "mist": "mist"
    },
    ar: {
        "clear sky": "سماء صافية",
        "few clouds": "غيوم قليلة",
        "scattered clouds": "غيوم متناثرة",
        "broken clouds": "غيوم متقطعة",
        "shower rain": "أمطار متفرقة",
        "rain": "مطر",
        "thunderstorm": "عاصفة رعدية",
        "snow": "ثلج",
        "mist": "ضباب"
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('city').placeholder = translations[lang].placeholder;
    document.getElementById('submit-btn').textContent = translations[lang].submit;
    currentLang = lang;
}

document.getElementById('en-btn').addEventListener('click', () => setLanguage('en'));
document.getElementById('ar-btn').addEventListener('click', () => setLanguage('ar'));

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const apiKey = '0611d88b9a1dc7cb94365ea29fab2638'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            if (data.cod === 200) {
                const weatherDescription = weatherDescriptions[currentLang][data.weather[0].description] || data.weather[0].description;
                weatherResult.innerHTML = `
                    <p><strong>${data.name}, ${data.sys.country}</strong></p>
                    <p>${translations[currentLang].temp}: ${data.main.temp} °C</p>
                    <p>${translations[currentLang].weather}: ${weatherDescription}</p>
                    <p>${translations[currentLang].humidity}: ${data.main.humidity}%</p>
                    <p>${translations[currentLang].wind}: ${data.wind.speed} m/s</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

// Initialize default language
let currentLang = 'en';
setLanguage(currentLang);
