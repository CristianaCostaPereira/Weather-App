// GET Request to the weather info API
let baseURL = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=0eb4744f931606e24a4c0fa078000411";
const apiKey = "0eb4744f931606e24a4c0fa078000411";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    // Select the actual value of an HTML input to include in POST, what the user enter themselfes
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    const content = document.getElementById("content").value

    getWeather("/weatherData")
    .then(function(data) {
        console.log(data)
        // Adds data to POST Request
        postData("/addWeather", {zipCode:zip, feelings:feelings, date: data.date, temperature: data.temperature, content:content});
    })
    .then(
        updateUI()
    )
}


// Function to GET Web API Data (Async GET)
const getWeather = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL, zipCode, apiKey);
    
    try {
        const allData = await response.json();
        console.log(allData);
    } catch(error) {
        console.log("error", error);
    }
}

// POST Request client-side code(async POST)
const postData = async (baseURL = "", data = {}) => {
    const response = await fetch(baseURL, {
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
    const request = await fetch("/all");

    try {
        const allData = await request.json();
        document.getElementById("zip").innerHTML = allData[0].zipCode;
        document.getElementById("feelings").innerHTML = allData[0].feelings;
        document.getElementById("date").innerHTML = allData[0].date;
        document.getElementById("temp").innerHTML = allData[0].temperature;
        document.getElementById("content").innerHTML = allData[0].content;

    } catch(error) {
        console.log("error", error);
    }
}
// Chain async functions to post the zip code then GET the resulting data
function postGET() {
    postData ("/addWeather", {feelings:"Not so good with this heat"})
        .then(function (data) {
              retrieveData ("/all")
              })
}

//Call function and pass in the path created
postGET();

// Final code for creating a POST route to save the data to our app