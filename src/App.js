import React, {useState,useEffect} from 'react'
import InfiniteCalendar from "./InfiniteCalendar.js"
import Tiles from "./Tiles.js"
import "./App.css"
export default function App() {
  const [posts, setposts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);   
  const url = 'http://devapi.quinn.care/graph'; 
  
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const data =  {
      "requestobjects": [
        {
          "posts": {
            "operationtype": "read",        
            "id": {
              "return": true
            },
            "userid": {
              "searchvalues" : ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
              "return": true
            },
            "iscalendarentry": {
              "searchvalues" : ["true"],
              "return": true
            },        
            "media": {
              "return": true //contains image url
            },
            "rating": {
              "return": true
            },
            "text": {
              "return": true
            },
            "privacy": {
              "searchvalues": [
                18
              ],
              "return": true
            },
            "typeofday": {
              "return": true
            },
            
            // Don't change anything above ^^	
            //editable variables start below //
            
            "calendardatetime": { // Date Time of a particular post
              "return": true  , // please note: there can be multiple posts on a single day
              "sort" : "descending" // you can sort fetched dates by ascending/descending.
            },
            "maxitemcount": "20",   //you can ask between 1 to 50 posts (max) at a time.
            "continuationtoken": null //replace with the continuation token from response to get the next set
          }
        }
      ]
    } 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(url,requestOptions)
    .then(response => response.json())
    .then(data=>{
      console.log("HEY! THERE");
      console.log(data);
      setIsLoaded(true);
      setposts(data?.responseobjects[0]?.posts);
    },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);
  if(error){
    return (<div>ERROR:{error.message}</div>);
  }
  else if(!isLoaded){
    return(
      <div class="loader"></div>
);
  }
  else {
    return (
        <>
        <InfiniteCalendar
          posts= {posts}
        />
      </>
    )
  }
}