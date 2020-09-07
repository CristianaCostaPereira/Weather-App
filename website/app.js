// Post request client-side code
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
postData("/addWeather", {weather:"sunny", temperature: 34});