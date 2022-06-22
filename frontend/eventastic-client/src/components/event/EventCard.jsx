import React from 'react'
import { styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardMedia, CardContent } from '@mui/material'

export const StyledEventCard = styled(Card)`
  border: 1px solid black;
  border-radius: 5px;
`;

const EventCard = ({ eventName }) => {
  return (
    <Grid item sm={12} md={6} lg={4}>
      <StyledEventCard>
        <CardHeader title="Card Header"/>
        <CardMedia>Card Image</CardMedia>
        <CardContent>Event Card ID: {eventName}</CardContent>
      </StyledEventCard>
    </Grid>
  )
}

export default EventCard