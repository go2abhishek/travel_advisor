import React, {useState, useEffect} from 'react';
import {CssBaseline, Grid} from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import {getPlacesData, getWeatherData} from './api';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [coordinates, setCoordinates] = useState({lat:28.7041, lng:77.1025}); // Delhi
    const [bounds, setBounds] = useState(null);
    const [childClicked, setChildClicked] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setfilteredPlaces] = useState([]);

    // console.log('Loading default coordinates, bounds' );
    // console.log(coordinates, bounds);

    useEffect(() => {
        console.log('setting current location from browser')
        navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) => {
            setCoordinates({lat:latitude, lng:longitude});
        })
        console.log('current location coordinates, bounds' );
        console.log(coordinates, bounds);
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setfilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() => {
        // console.log(coordinates, bounds);
        // console.log('Calling getPlacesData()');
        if(bounds && bounds.sw && bounds.ne && !apiCalled) {
            console.log('Calling getPlacesData()');
            setApiCalled(true);
            setIsLoading(true);
            console.log('setApiCalled true');

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setIsLoading(false);
                    console.log('Logging places at', new Date());
                    setPlaces(data);
                    setfilteredPlaces([]);
            })
            setTimeout(() =>
                {   
                    setApiCalled(false);
                    console.log('setApiCalled false');
                }
            , 5*1000);
        } else {
            console.log('bounds', bounds, 'apiCalled', apiCalled);
            console.log('Ignoring API call, too frequent.')
        }
    }, [type, bounds]);

    return(
        <>
            <CssBaseline/>
            <Header setCoordinates = {setCoordinates}/>
            <Grid container spacing={3} style={{ width: '100%'}}>
                <Grid item xs={12} md={4} style={{float:'left', width:'30%', height:'100%'}}>
                    <List 
                        places={filteredPlaces.length >0 ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{float:'left', width:'70%', height:'100%'}}>
                    <Map
                       setCoordinates={setCoordinates}
                       setBounds={setBounds}
                       coordinates={coordinates}
                       places={filteredPlaces.length >0 ? filteredPlaces : places}
                       setChildClicked={setChildClicked}
                       weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;