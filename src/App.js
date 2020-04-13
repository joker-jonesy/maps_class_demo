import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Circle from "./components/Circle";

function App() {

  const [position, setPosition] = React.useState({});
  const [error, setError]  =React.useState(null);
  const [color, setColor]=React.useState("red");

  const onChange = ({coords})=>{
    setPosition({
      x:coords.latitude,
      y:coords.longitude,
      z:coords.altitude,
      accuracy: coords.accuracy
    })
  };

  const onError = (error)=>{
    setError(error.message);
  };

  React.useEffect(()=>{
    const geo = navigator.geolocation;
    if(!geo){
      setError("Hey this isnt working");
      return;
    }

    let watcher = geo.watchPosition(onChange, onError);
    return ()=> geo.clearWatch(watcher);
  },[]);


  return (
    <div className="App">
      <h1>{position.x+" "+position.y+""+position.accuracy}</h1>
      <p>{position.z===null?"No info to report": position.z}</p>
      {error}

      <div style={{height:"600px", width:"600px"}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyAroi5UF-gCX8V1vi44aApurvJEiBKJEos"}}
          defaultCenter={[29,31]}
          defaultZoom={20}
        >

          <Circle lat={29.9792} lng={31.1342}/>

        </GoogleMapReact>
      </div>

    </div>
  );
}

export default App;
