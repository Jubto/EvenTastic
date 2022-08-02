import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';

export const StyledEventCard = styled(Card)`
  width: 300px;
  height: 400px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
`;

const CardTitle = styled('h3')`
  margin-top: 4px;
  margin-bottom: -10px;
  margin-left: 1rem;
`

export const CardSummary = styled(Typography)`
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function formatDate(datetime) {
  let d = new Date(datetime);
  return d.toLocaleDateString("en-US", dateFormat)
}

const EventCard = ({ eventData }) => {
  const navigate = useNavigate()

  return (
    <Grid item xs={12} sm={4} md={4} lg={4}>
      <StyledEventCard  onClick={() => navigate(`/event/${eventData.event_id}`)}>
          <CardMedia
            component="img"
            height="140"
            image={eventData.event_img}
          />
          <CardTitle>
            {eventData.event_title}
          </CardTitle>
          <CardContent>
            <Typography gutterBottom variant="subtitle2" component="div">
              {formatDate(eventData.event_start_datetime)}
            </Typography>
            <CardSummary gutterBottom variant="h6" component="div" >
              {eventData.event_short_desc}
            </CardSummary> 
          </CardContent>
      </StyledEventCard>
    </Grid>
  )
}

export default EventCard