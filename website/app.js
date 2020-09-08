// GET Request to the weather info API
const apiKey = "0eb4744f931606e24a4c0fa078000411";
let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=&appid=${apiKey}`;

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    // Select the actual value of an HTML input to include in POST, what the user enter themselfes
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    
    //API call
    getWeather(baseURL, zipCode, apiKey).then(function(data) {
        console.log(data)
        // Adds data to POST Request
        
        postData("/add", {date: data.date, temperature: data.temperature, content:feelings})
        
        updateUI();
    })
};

// Function to GET Web API Data (Async GET)
const getWeather = async (url, zip, api) => {
    
    const response = await fetch(url+zip+api);
    
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

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const updateUI = async () => {
    const request = await fetch("/all");
    
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date: ${allData[0].date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${allData[0].temperature}`;
        document.getElementById("content").innerHTML = `Fellings: ${allData[0].feelings}`;

    } catch(error) {
        console.log("error", error);
    }
}
// Chain async functions to post the zip code then GET the resulting data
function postGET() {
    debugger
    postData ("http://localhost:8000/add", {feelings:"Not so good with this heat"})
        .then(function (data) {
              retrieveData ("/all")
              })
}

//Call function and pass in the path created
postGET();

// Final code for creating a POST route to save the data to our app