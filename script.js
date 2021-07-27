query('.busca').addEventListener('submit', (event) => {
    event.preventDefault();

    request();    
});

async function request(){
    let input = query('#searchInput').value;
    if (input !== '') {
        clearInfo();
        showWarning('Carregnedo...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid={SUA API key}&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
        console.log(json);
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                description: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Não encontramos essa localização!');
        }
    }else{
        clearInfo();
        showWarning('Informe uma localização!');
    }   
}

function showInfo(json){
    showWarning('');   

    query('.titulo').innerHTML = `${json.name}, ${json.country}`;
    query('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    query('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    query('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) ;
    query('.temp img').setAttribute('title', `${json.description}`) ;
    query('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    query('.resultado').style.display = 'block';
}

function clearInfo(){
    showWarning('');
    query('.resultado').style.display = 'none';
}

function showWarning(msg){
    query('.aviso').innerHTML = msg;
}


function query(query){
    return document.querySelector(query);
}