import React from 'react';
import './App.css';

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

  const hitBox={
    height:"100px",
    width:"100px",
    backgroundColor:color
  };

  return (
    <div className="App">
      <h1>{position.x+" "+position.y+""+position.accuracy}</h1>
      <p>{position.z===null?"No info to report": position.z}</p>
      {error}

      <div style={hitBox}></div>
    </div>
  );
}

export default App;
