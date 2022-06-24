import React from 'react'
import { PageContainer } from '../components/styles/layouts.styled'
import EventCard from '../components/event/EventCard'
import { Grid } from '@mui/material'
import eventsList from '../events'
import EventAPI from "../utils/EventAPIHelper";

/*
const api = new EventAPI();

const getEventList = () => {
  api
    .getEventList()
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

const eventsListA = getEventList()
*/

function createCard(event) {
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