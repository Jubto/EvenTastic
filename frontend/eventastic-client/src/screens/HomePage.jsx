import { useState, useEffect } from 'react';
import { PageContainer } from '../components/styles/layouts.styled'
import EventCard from '../components/event/EventCard'
import { Grid } from '@mui/material'
import EventAPI from "../utils/EventAPIHelper";
import Typography from '@mui/material/Typography';

const api = new EventAPI();

const createCard = (event) => {
  return (
    <EventCard
      key={event.event_id}
      eventData={event}
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
      <Typography gutterBottom variant="h2" component="div">
        Upcoming Events
      </Typography>
      <Grid container spacing={2}>
        {eventsList.map(createCard)}
      </Grid>
    </PageContainer>
  )
}

export default HomePage