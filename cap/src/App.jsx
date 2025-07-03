import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';
const ACCESS_KEY = import.meta.env.VITE_APP_APIFLASH_ACCESS_KEY;


function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  })
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [quota, setQuota] = useState(null);


  const submitForm = () => {
    let defaultValues = {
    format: "jpeg",
    no_ads: "true",
    no_cookie_banners: "true",
    width: "1920",
    height: "1080",
    };
    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!")
    }
    else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          inputs[key] = defaultValues[key]
        }
      }
      makeQuery();
    }
  }

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    // we put query here because it uses all these parameters LOL
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    // response: JS will wait for the promise of fetch retrieving the response to resolve
    const response = await fetch(query);
    // json: wait for promise of converting response to json
    const json = await response.json();
    if (json.url == null) {
      // if no url returned no image was returned
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      // we set the correct image and reset the query parameters
      setCurrentImage(json.url);
      // append new image to prevImages array
      setPrevImages((images) => [...images, json.url])
      reset();
      getQuota();
    }
  }

  const reset = () => {
    setInputs({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
    })
  }
  // Stretch feature
  //endpoint: is like a door into a different part of the system, like the quota endpoint lets us get info about api call quota etc.
  // endpoint is kinda like a menu item
  // if the endpoint is /menu/pepperoni-pizza then we can obtain through the GET call response things like this

//   {
//   "name": "Pepperoni Pizza",
//   "ingredients": ["pepperoni", "cheese", "tomato sauce", "dough"],
//   "size": "large",
//   "price": 14.99,
//   "calories": 1200
// }
  const getQuota = async () => {
    const response = await fetch("https://api.apiflash.com/v1/urltoimage/quota?access_key=" + ACCESS_KEY);
    const result = response.json();
    setQuote(result);
  }


  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
       <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      {currentImage ? (
        <img
         className="screenshot"
         src={currentImage}
         alt="Screenshot returned"
        />
      ) : (<div> </div>)}
      <br></br>
    <div className="container">
      <h3> Current Query Status: </h3>
      <p>
        https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
        <br></br>
        &url={inputs.url} <br></br>
        &format={inputs.format} <br></br>
        &width={inputs.width}
        <br></br>
        &height={inputs.height}
        <br></br>
        &no_cookie_banners={inputs.no_cookie_banners}
        <br></br>
        &no_ads={inputs.no_ads}
        <br></br>
      </p>
      <div className="container">
        <Gallery images={prevImages} />
      </div>
    </div>
    <br></br>
    {quota ? (
      <p className="quota">
        {" "}
        Remaining API calls: {quota.remaining} out of {quota.limit}
      </p>
    ) : (
      <p></p>
    )}
    </div>
  )
}

export default App
