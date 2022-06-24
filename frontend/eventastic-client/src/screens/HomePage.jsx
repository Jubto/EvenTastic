import { useState, useEffect } from 'react';
import { PageContainer } from '../components/styles/layouts.styled'
import EventCard from '../components/event/EventCard'
import { Grid } from '@mui/material'
import EventAPI from "../utils/EventAPIHelper";

const api = new EventAPI();

const createCard = (event) => {
  return (
    <EventCard
      key={event.event_id}
      eventName={event.event_title}
      eventDesc={event.event_short_desc}
      eventImage={event.event_img}
      eventStart={event.event_start_datetime}
    />
  );
}

const HomePage = () => {
  const [eventsList, setEventsList] = useState([])

  useEffect(() => {
    api
    .getEventList()
    .then((response) => setEventsList(response.data))
    .catch((err) => console.log(err));
  }, [])

  return (
    <PageContainer maxWidth='lg' align='center'>
      <h1>Upcoming Events:</h1>
      <Grid container spacing={2}>
        {eventsList.map(createCard)}
      </Grid>
    </PageContainer>
  )
}

export default HomePage