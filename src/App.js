import { CssBaseline, Grid } from '@material-ui/core';

import { Header, Map, List } from './components';

import { getPlaceData } from './api';
import { useEffect, useState } from 'react';

export const App = () => {
  const [places, setPlaces] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ ne: '', sw: '' });
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFiltered(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlaceData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(
            data.filter((place) => place.name && place.num_reviews > 0)
          );
          setFiltered([]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filtered.length ? filtered : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filtered.length ? filtered : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};
