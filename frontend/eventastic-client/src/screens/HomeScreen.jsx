import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
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

const HomeScreen = () => {

  const [eventsList, setEventsList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchVisible, setSearchVisible] = useState(false)

  const search = useLocation().search;
  // access the query params to see if search has been performed
  let event_title = new URLSearchParams(search).get('event_title');
  let event_desc = new URLSearchParams(search).get('event_desc');
  let event_category = new URLSearchParams(search).get('event_category');

  useEffect(() => {
    if (event_title != null || event_desc != null || event_category != null) {
      api
        .getEventList({
          event_title: event_title,
          event_category: event_category,
          event_desc: event_desc
        })
        .then((response) => {
          setSearchResults(response.data)
          setSearchVisible(true)
        })
        .catch((err) => console.log(err));
    } else {
      setSearchVisible(false)
    }
    api
      .getEventList()
      .then((response) => setEventsList(response.data))
      .catch((err) => console.log(err));
  }, [])

  const getSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" align='left'>
              Search Results: No Results found
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" align='left'>
              Search Results:
            </Typography>
          </Grid>
          {searchResults.map(createCard)}
        </Grid>
      );
    }
  }

  return (
    <PageContainer maxWidth='lg' align='center'>
      {searchVisible && getSearchResults()}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" align='left'>
            Upcoming Events:
          </Typography>
        </Grid>
        {eventsList.map(createCard)}
      </Grid>
    </PageContainer>
  )

}

export default HomeScreen