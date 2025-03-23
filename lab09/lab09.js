const endpoint = "https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&current=temperature_2m,precipitation,cloud_cover&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";

// STEP #4: Use the data
function reportResults(response){
    console.log(response);
    let browserData = "";
    if(response != "error"){
        const myData = JSON.parse(response); 
        console.log(myData);
        browserData = {
            precip: myData.current.precipitation + "''",
            temp: myData.current.temperature_2m + myData.current_units.temperature_2m,
            cloud_cover: myData.current.cloud_cover
        };
    }else if(response == "error"){
        console.log("Could not get data");
    }
    document.getElementById("precip").innerHTML = browserData.precip;
    document.getElementById("temp").innerHTML = browserData.temp;
    if(browserData.cloud_cover > 50){
        document.getElementById("emoji").innerHTML = "☁️";
    }else if(browserData.cloud_cover <= 50){
        document.getElementById("emoji").innerHTML = "☀️";
    }
}

// STEP #1: make a request object
const request = new XMLHttpRequest(); 

// STEP #2: Check status of request (EventListener)
request.addEventListener("readystatechange", () => { 
    if(request.readyState === 4 && request.status === 200){ 
        reportResults(request.responseText);
    }else if(request.readyState === 4){ 
        reportResults("error");
    }
});

// STEP #3: Open end point & send request
request.open("GET", endpoint); 
request.send(); 