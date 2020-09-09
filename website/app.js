// GET Request to the weather info API
let baseURL = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "0eb4744f931606e24a4c0fa078000411";

let d = new Date();
let currentDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    // Select the actual value of an HTML input to include in POST, what the user enter themselfes
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    //API call
    getWeather(baseURL, zipCode, apiKey).then(function(data) {
        console.log(data)

        // Adds data to POST Request
        postData("http:localhost:8000/add", {date: currentDate, temp: data.main.temp, content:feelings})

        updateUI();
    })
};

// Function to GET Web API Data (Async GET)
const getWeather = async (baseURL, zip, api) => {

    const response = await fetch(baseURL + "?zip=" + zip + "&units=metric" + "&appid=" + api);

    try {
        const data = await response.json();
        return(data);

    } catch(error) {
        console.log("error", error);
    }
}

// POST Request client-side code(async POST)
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // the body allows the access to the data on the server side
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData

    } catch(error) {
        console.log("error", error);
    }
}

// Dynamic UI
const updateUI = async () => {
    const request = await fetch("http:localhost:8000/all");

    try {
        const allData = await request.json();
        
        document.getElementById("date").innerHTML = `Date: ${allData[0].date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${allData[0].temp}`;
        document.getElementById("content").innerHTML = `Fellings: ${allData[0].feelings}`;

    } catch(error) {
        console.log("error", error);
    }
}