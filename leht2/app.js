//Loll funktsioon, et json-i timestampidega tegeleda
function minJatund(p1){
    const d = new Date(p1*1000);
    var hour1 = d.getHours();
    var minute1 = d.getMinutes();

    return hour1+':'+minute1+'0';
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

var tempYks = document.querySelector('.home-text')
var tempKaks = document.querySelector('.home-text2')
var tempKolm = document.querySelector('.home-text4')
var tempNeli = document.querySelector('.home-text6')

var kellYks = document.querySelector('.home-text1')
var kellKaks = document.querySelector('.home-text3')
var kellKolm = document.querySelector('.home-text5')
var kellNeli = document.querySelector('.home-text7')


// Fetchime ilma api-t kui toimub nupuvajutus
nupp.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+sisendValue.value+'&units=metric&appid=29716e7c7eb08f50d29ff5b0b9df994d')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //var linnValue = data['name'];
            esimeneTundValue = data['list'][0]['dt'];
            teineTundValue = data['list'][1]['dt'];
            kolmasTundValue = data['list'][2]['dt'];
            neljasTundValue = data['list'][3]['dt'];

            esimeneTempValue = data['list'][0]['main']['temp'];
            teineTempValue = data['list'][1]['main']['temp'];
            kolmasTempValue = data['list'][2]['main']['temp'];
            neljasTempValue = data['list'][3]['main']['temp'];
            // Hakkame html elemente muutma vastavalt json-ist loetud väärtustele
            //linn.innerHTML = linnValue;
            //temp.innerHTML = Math.round(tempValue)+'°';

            kellYks.innerHTML = minJatund(esimeneTundValue);
            kellKaks.innerHTML = minJatund(teineTundValue);
            kellKolm.innerHTML = minJatund(kolmasTundValue);
            kellNeli.innerHTML = minJatund(neljasTundValue);

            tempYks.innerHTML = Math.round(esimeneTempValue)+'°';
            tempKaks.innerHTML = Math.round(teineTempValue)+'°';
            tempKolm.innerHTML = Math.round(kolmasTempValue)+'°';
            tempNeli.innerHTML = Math.round(neljasTempValue)+'°';
            //var ilmValue = dict[ikoonValue];
            //console.log(ilmValue);
            //document.getElementById("peaikoon").src=ilmValue;


        })
.catch(err => alert('Vale linn'))
})

// Lisame funktsionaalsuse, et enterit vajutades saame ka otsingu luua
var input = document.getElementById("linn_sisend");

// Script blogist Geeks4Geeks
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("nupp").click();
  }
});
