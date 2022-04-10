let longitude;
let latitude;
let button = document.getElementById("button");
let date = document.getElementById(`day`);
let country = document.getElementById(`country`)
let city = document.getElementById(`population`);
let temp = document.getElementById(`temp`);
let feel = document.getElementById(`feels`);
let cloud = document.getElementById(`clouds`);
let humidity = document.getElementById(`humidity`);
let visibility = document.getElementById(`visibility`);
let pressure = document.getElementById(`pressure`);
let cloudsPic = document.getElementById(`clouds-pic`);



//se corrobora que el navegador tenga geolocalización activada
function localidadAct(){
    // navigator.geolocation
    // if(!navigator.geolocation){
    // navigator.geolocation
    if(navigator.geolocation){
    document.getElementById("button").disabled = true;
    navigator.geolocation.getCurrentPosition(position =>{
        longitude = position.coords.longitude
        latitude = position.coords.latitude
        //llamamiento a la api
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b5e395aa3b70c696d7f21162de4fa7f3`
        console.log(url);
        
        async function getData(){

            const datos = await fetch(url);
            const data = await datos.json();
            console.log(data);

            //se determina la imagen segun la nubosidad
            let cloudsParameter = data.clouds.all;

            if(cloudsParameter >= 80){
                const image = document.createElement('img');
                image.src  = 'images/clouds_photo.png';
                image.height = 300;
                image.width = 300;
                document.querySelector('.container').appendChild(image)
            }
            if(cloudsParameter < 80 && cloudsParameter >= 30){
                const image = document.createElement('img');
                image.src  = 'images/sun_clouds_photo.png';
                image.height = 200;
                image.width = 250;
                document.querySelector('.container').appendChild(image)
            }
            if(cloudsParameter < 30){
                const image = document.createElement('img');
                image.src  = 'images/sun_photo.png';
                image.height = 300;
                image.width = 200;
                document.querySelector('.container').appendChild(image)
            }

            //El dia actual
            actualDate = new Date()

            //Aquí se pasa la temperatura de grados Kelvin a Celcius
            tempK = data.main.temp;
            tempC = tempK - 273.15;

            feelK = data.main.feels_like;
            feelC = feelK - 273.15;

            //Aqui se pasan los metros a kilometros
            meters = data.visibility;
            kilometres = meters / 1000;

            //Adicion de los datos a sus respectivos ids html
            date.textContent = `Fecha Actual: ${actualDate.toLocaleDateString()}`
            country.textContent = `País: ${data.sys.country}`;
            city.textContent = `Ciudad: ${data.name}`;
            if(tempC >= 0){
                temp.textContent = `Grados: +${Math.round(tempC)}°C`;
                }else{
                    temp.textContent = `Grados: ${Math.round(tempC)}°C`;
            }
            if(feelC >= 0){
                feel.textContent = `Sensación Térmica: +${Math.round(feelC)}°C`
                }else{
                    temp.textContent = `Sensación Térmica: ${Math.round(feelC)}°C`;
            }
            
            cloud.textContent = `Porcentaje de nubes: ${data.clouds.all} %`;
            humidity.textContent = `Humedad: ${data.main.humidity} %`;
            if(kilometres > 1){
                visibility.textContent = `Visibilidad: ${kilometres} Kilómetros`;
            }else{
                visibility.textContent = `Visibilidad: ${meters} Metros`;
            }

            pressure.textContent = `Presion: ${data.main.pressure} mb`;
            

        } 
        getData()
    })
}
}
// else if(navigator.geolocation = true){
    // return alert("ya hemos detectado tu ubicacion!")
// }
// }

window.addEventListener('load',()=>{
    const bodys = document.querySelector(`body`);
    // const marco = document.querySelector(`.container`);
    const titulo = document.querySelector(`h1`);
    // const img = document.querySelector(`img`);
    
    titulo.style.textAlign = "center";
    titulo.style.marginTop = 100; 
    
    bodys.style.width = window.innerWidth
    bodys.style.height = '500px'
    bodys.style.border = "4px solid white"
    bodys.style.background = "linear-gradient(to rigth,lightblue,blue)"
})

function actualizar(){location.reload(true);}

setInterval(() => {
    actualizar()
}, 900000);

