import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [jsonData, setJsonData] = useState({});
    const [jsonArray, setJsonArray] = useState([]);
    console.log("ajay checking json in console right now:",jsonData)
    console.log("ajay checking array in console right now",jsonArray)
    // JSON data ko fetch karne ke liye useEffect ka use kare
    useEffect(() => {
        // Example JSON data
        const exampleJsonData = '{"name": "John", "age": 30, "city": "New York"}';
        // JSON ko parse kare
        const parsedJsonData = JSON.parse(exampleJsonData);
        // Set the parsed JSON data in state
        setJsonData(parsedJsonData);
    }, []);

    // JSON object ko array me convert karne ke liye useEffect ka use kare
    useEffect(() => {
        const newArray = [];
        // Loop through object keys and push them into array
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                newArray.push([key, jsonData[key]]);
            }
        }
        // Set the array in state
        setJsonArray(newArray);
    }, [jsonData]);

    return (
        <div>
          
        </div>
    );
}

export default MyComponent;
