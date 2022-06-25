import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActionArea } from '@mui/material'
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

const EventCard = ( {eventData} ) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <StyledEventCard>
        <CardActionArea 
          component={Link} 
          to={"/event/" + eventData.event_id}
        >
          <CardHeader title={eventData.event_title} />
          <CardMedia
            component="img"
            height="140"
            image={process.env.PUBLIC_URL + '/img/event/' + eventData.event_img}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {eventData.event_short_desc}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {formatDate(eventData.event_start_datetime)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </StyledEventCard>
    </Grid>
  )
}

export default EventCard