import React from 'react'
import { styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardMedia, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';

export const StyledEventCard = styled(Card)`
  border: 1px solid black;
  border-radius: 5px;
`;

const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function formatDate(datetime) {
  let d = new Date(datetime);
  return d.toLocaleDateString("en-US", dateFormat)
}

const EventCard = ({ eventName, eventDesc, eventImage, eventStart }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <StyledEventCard>
        <CardHeader title={eventName}/>
        <CardMedia
          component="img"
          height="140"
          image={process.env.PUBLIC_URL + '/img/event/' + eventImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {eventDesc}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {formatDate(eventStart)}
          </Typography>          
        </CardContent>
      </StyledEventCard>
    </Grid>
  )
}

export default EventCard