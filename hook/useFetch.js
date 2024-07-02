import { useState, useEffect } from "react";
import axios from "axios"; //axios is a promise based HTTP client for the browser. it is used to make HTTP requests from node.js
 
const useFetch = (endpoint, query) => { //useFetch function with endpoint and query as parameters end point is the url and query is the search query
  const [data, setData] = useState([]);//data is the state and setData is the function to update the state with empty array
  
  const [isLoading, setIsLoading] = useState(false); //isLoading is the state and setIsLoading is the function to update the state with false. false is used because initially the data is not loaded
  const [error, setError] = useState(null); //error is the state and setError is the function to update the state with null value also it is used to catch the error

  const options = { 
    method: "GET", // method is GET to get the http request from the server 
    url: `https://jsearch.p.rapidapi.com/${endpoint}`, //endpoint in used to get the url from the server 
    headers: { 
      'x-rapidapi-key': 'd671d6cd41mshd16fc524c118e56p1fd095jsnf564b5ba1adb', //x-rapidapi-key is the key to get the data from the server
      'x-rapidapi-host': 'jsearch.p.rapidapi.com' // x-rapidapi-host is the host to get the data from the server
    },
    params: { ...query }, //params is used to get the query from the server. query is the search query
  };

  const fetchData = async () => { //fetchData function is used to get the data from the server asynchronously means it will not block the code and will run in the background
    setIsLoading(true); //setIsLoading is set to true to show the loading spinner. so it means the data is loading now

    try {
      const response = await axios.request(options); //response is used to get the data from the server using axios request

      setData(response.data.data); //data is set to response.data.data to get the data from the server. first data is the state and second data is the data from the server. for example if the data is in the form of array then it will be set to the array
      setIsLoading(false); //setIsLoading is set to false to hide the loading spinner. so it means the data is loaded now
    } catch (error) { //catch block is used to catch the error if there is any error in the code
      setError(error); //error is set to error to catch the error
      console.log(error) //error is logged to the console
    } finally { //finally block is used to run the code after the try and catch block
      setIsLoading(false); //setIsLoading is set to false to hide the loading spinner. so it means the data is loaded now
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

/*

fetchData Function:

Yeh function async hai aur data fetch karta hai.
setIsLoading(true) ki waja se loading hlti hai.
Axios request send karta hai aur response aane par data state ko update karta hai.
Error aane par error state ko set karta hai aur console mein log karta hai.
finally block mein setIsLoading(false) ke sath loading state ko false set karta hai.

useEffect Hook:

Jab component load hota hai tab yeh hook fetchData function ko call karta hai.
Empty dependency array ([]) ensure karti hai ke yeh hook sirf ek baar chalega jab component mount hota hai.

refetch Function:

Manual data fetching ke liye function jo fetchData ko dobara call karta hai aur isLoading state ko true set karta hai. */