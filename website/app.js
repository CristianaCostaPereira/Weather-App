// GET Request to the weather info API
let baseURL = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=0eb4744f931606e24a4c0fa078000411";
const apiKey = "0eb4744f931606e24a4c0fa078000411";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    // Select the actual value of an HTML input to include in POST, what the user enter themselfes
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeather("/addWeather")
    .then(function(data) {
        console.log(data)
        // Add data to POST Request
        postData("/addWeather", {temperature: data.temperature, date: data.date, feelings:feelings});
    });
};

// Function to GET Web API Data
const getWeather = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL, zipCode, apiKey);

    try {
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log("error", error);
    }
}

// POST Request client-side code
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

// Call function and pass in the path created
// Final code for creating a POST route to save the data to our app