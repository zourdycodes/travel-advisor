import axios from 'axios';

export const getPlaceData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        method: 'GET',
        url: `${URL}`,
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key':
            '6d0a2dc270mshe9cc297632fb8cfp13a548jsn44fd6a2bd2a3',
        },
      }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
