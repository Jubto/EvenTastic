import React from 'react'
import { PageContainer } from '../components/styles/layouts.styled'
import EventCard from '../components/event/EventCard'
import { Grid } from '@mui/material'

const HomePage = () => {

  const cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <PageContainer maxWidth='lg' align='center'>
      <Grid container spacing={2}>
        {cardList.map((cardID, i) => <EventCard key={cardID} eventName={i} />)}
      </Grid>
    </PageContainer>
  )
}

export default HomePage