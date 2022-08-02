import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../utils/context';
import { useLocation } from "react-router-dom";
import EventAPI from "../utils/EventAPIHelper";
import { PageContainer, ScrollContainer } from '../components/styles/layouts.styled'
import EventCard from '../components/event/EventCard'
import SearchBar from '../components/search/SearchBar';
import { Grid, Typography, styled } from '@mui/material'

const api = new EventAPI();


const MainScreenContainer = styled(PageContainer)`
  height: auto;
  overflow-y: initial;
  margin-bottom: 1rem;
`

const createCard = (event) => {
  if (event.event_status !== "Cancelled") {
    return (
      <EventCard
        key={event.event_id}
        eventData={event}
      />
    );
  }
}

const HomeScreen = () => {

  const context = useContext(StoreContext);
  const [account] = context.account;

  const [eventsList, setEventsList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchVisible, setSearchVisible] = useState(false)
  const [recommendationsList, setRecommendations] = useState([])

  const search = useLocation().search;
  // access the query params to see if search has been performed
  let event_title = new URLSearchParams(search).get('event_title');
  let event_desc = new URLSearchParams(search).get('event_desc');
  let event_category = new URLSearchParams(search).get('event_category');

  useEffect(() => {
    if (event_title !== null || event_desc !== null || event_category !== null) {
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

  useEffect(() => {
    if (account) {
      api
        .getRecommendations(account.account_id, { max_limit: 3 })
        .then((response) => setRecommendations(response.data))
        .catch((err) => console.log(err));
    }
    else {
      setRecommendations([])
    }
  }, [account])

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
    <MainScreenContainer maxWidth='lg'>
      <SearchBar />
      {searchVisible && getSearchResults()}
      {recommendationsList.length > 0
        ?
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" align='left' sx={{ mt: 5 }}>
              Recommended for you:
            </Typography>
          </Grid>
          {recommendationsList.map(createCard)}
        </Grid>
        :
        <div></div>
      }
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="div" align='left' sx={{ mt: 5 }}>
            Upcoming Events:
          </Typography>
        </Grid>
        {eventsList.map(createCard)}
      </Grid>
    </MainScreenContainer>
  )

}

export default HomeScreen