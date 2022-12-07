//Funktsioon, et json-i timestampidega tegeleda
function minJatund(p1){
    const d = new Date(p1*1000);
    var hour1 = d.getHours();
    var minute1 = d.getMinutes();

    return hour1+':'+minute1;
}

//Deklareerin erinevate logode asukoha(source'i)
var dict = { 
  "Clouds" : 'logod/few_clouds.png' , 
  "Clear" : 'logod/clear.png' ,
  "Atmosphere" : 'logod/mist.png' ,
  "Snow" : 'logod/snow.png' ,
  "Rain" : 'logod/shower.png',
  "Drizzle" : 'logod/rain.png',
  "Thunderstorm" : 'logod/thunderstorm.png',
}; 

// Deklareerime erinevad muutujad html dokumendis
var nupp = document.querySelector('.kodu-nupp')
var sisendValue = document.querySelector('.sisendValue')

var linn = document.querySelector('.linn')
var temp = document.querySelector('.temperatuur')
var tuul = document.querySelector('.tuul')
var rohk = document.querySelector('.rohk')
var tunne = document.querySelector('.tunne')

var tous = document.querySelector('.tous')
var loojang = document.querySelector('.loojang')

var maks = document.querySelector('.kodu-text11')
var mini = document.querySelector('.kodu-text14')

// Fetchime ilma api-t kui toimub nupuvajutus
nupp.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+sisendValue.value+'&units=metric&appid=29716e7c7eb08f50d29ff5b0b9df994d')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var linnValue = data['name'];
            var tempValue = data['main']['temp'];
            var tuulValue = data['wind']['speed'];
            var rohkValue = data['main']['pressure'];
            var tunneValue = data['main']['feels_like'];

            var toushValue = data['sys']['sunrise'];
            var setValue = data['sys']['sunset'];

            var ikoonValue = data['weather']['0']['main'];

            var maksValue = data['main']['temp_max'];
            var minValue = data['main']['temp_min'];
            
            // Hakkame html elemente muutma vastavalt json-ist loetud väärtustele
            linn.innerHTML = linnValue;
            temp.innerHTML = Math.round(tempValue)+'°';
            tuul.innerHTML = tuulValue+' m/s';
            rohk.innerHTML = rohkValue+' hPa';
            tunne.innerHTML = tunneValue+'°';

            tous.innerHTML = minJatund(toushValue);
            loojang.innerHTML = minJatund(setValue);
            
            maks.innerHTML = 'Max: '+maksValue+'°';
            mini.innerHTML = 'Min: '+minValue+'°';

            var ilmValue = dict[ikoonValue];
            console.log(ilmValue);
            document.getElementById("peaikoon").src=ilmValue;


        })
.catch(err => alert('Vale linn'))
})

var input = document.getElementById("linn_sisend");

// Enteri vajutamiseks script blogist Geeks4Geeks
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("nupp").click();
  }
});
