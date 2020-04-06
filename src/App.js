import React from 'react';
import './App.css';




function App(props) {

  const [position, setPosition] = React.useState({});
  const [error, setError] = React.useState(null);

  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  React.useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    let watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);


  return (
      <div className="App">

        {position.latitude}
        {position.longitude}
        {error}

      </div>
  );
}

export default App;
