// GET Request to the weather info API
let baseURL = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "0eb4744f931606e24a4c0fa078000411";

const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; // Store month names in array
let d = new Date();
let currentDate = d.getDate()+'.'+ months[(d.getMonth() + 1)] +'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    // Select the actual value of an HTML input to include in POST, what the user enter themselfes
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    //API call
    getWeather(baseURL, zipCode, apiKey).then(function(data) {
        console.log(data)

        // Adds data to POST Request
        postData("/add", {
            date: currentDate,
            temp: data.main.temp,
            content: feelings
        })

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
    const request = await fetch("/all");

    try {
        const allData = await request.json();

        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById("content").innerHTML = `Fellings: ${allData.content}`;

    } catch(error) {
        console.log("error", error);
    }
}

// Trigger a Button Click on Enter
// Get the input field
var zipInput = document.getElementById("zip");

// Execute a function when the user releases a key on the keyboard
zipInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();

    performAction();
  }
});


// Trigger textarea on click Enter
var feelingsInput = document.getElementById("feelings");

feelingsInput.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {
    event.preventDefault();

    performAction();
  }
});