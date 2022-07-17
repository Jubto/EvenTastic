import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../components/styles/layouts.styled'
import ReviewModal from '../components/review/ReviewModal'
import TicketPurchaseModal from '../components/ticket/TicketPurchaseModal';
import GroupListModal from '../components/group/GroupListModal';
import GroupMainModal  from '../components/group/GroupMainModal';
import PurchaseSuccessModal from '../components/ticket/PurchaseSuccessModal'
import EventAPI from "../utils/EventAPIHelper";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const api = new EventAPI();

// formating for the Grid Items 
export const GridItem = styled(Paper)`
  border: 1px solid black;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;  
`;

// code to format the Date Time
const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function formatDate(datetime) {
  let d = new Date(datetime);
  return d.toLocaleDateString("en-US", dateFormat)
}

const EventScreen = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState([])
  const [openTicketModal, setOpenTicketModal] = useState(false)
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const [openGroupListModal, setOpenGroupListModal] = useState(false)
  const [openGroupMainModal, setOpenGroupMainModal] = useState(false)
  const [purchaseSuccessModal, setPurchaseSuccessModal] = useState(false)

  useEffect(() => {
    api
      .getEventDetails(id)
      .then((response) => setEventDetails(response.data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <PageContainer maxWidth='lg'>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <div>
            <img
              src={eventDetails.event_img}
              width="100%"
              alt="A visulaisation of the Event"
            >
            </img>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <GridItem>
            <Typography gutterBottom variant="h4" component="div">
              {eventDetails.event_title}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <b>Where is it?</b> {eventDetails.event_location}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <b>When does it start?</b> {formatDate(eventDetails.event_start_datetime)}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <b>When does it end?</b> {formatDate(eventDetails.event_end_datetime)}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <b>What is the price range?</b> $20-$30
            </Typography>
            <Stack spacing={3}>
              <Button variant="contained" href="#contained-buttons" color="error" onClick={() => setOpenTicketModal(true)}>
                Tickets
              </Button>
              <Button variant="contained" href="#contained-buttons" color="warning" onClick={() => setOpenReviewModal(true)}>
                Reviews
              </Button>
              <Button variant="contained" href="#contained-buttons" color="info" onClick={() => setOpenGroupListModal(true)}>
                Find Groups
              </Button>
            </Stack>
          </GridItem>
        </Grid>
        <Grid item xs={12} md={12}>
          <GridItem>
            <Typography gutterBottom variant="h4" component="div">
              Overview:
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {eventDetails.event_desc}
            </Typography>
          </GridItem>
        </Grid>
        <Grid item xs={12} md={12}>
          <GridItem>
            <Typography gutterBottom variant="h4" component="div">
              Tags:
            </Typography>
            <Stack direction="row" spacing={2}>
              {eventDetails.tags?.map(function (tag, i) {
                return (
                  <Chip
                    key={i}
                    label={tag.name}
                  />
                );
              })}
            </Stack>
          </GridItem>
        </Grid>
      </Grid>
      <TicketPurchaseModal open={openTicketModal} setOpen={setOpenTicketModal} eventDetails={eventDetails} setSuccessModal={setPurchaseSuccessModal} />
      <PurchaseSuccessModal open={purchaseSuccessModal} setOpen={setPurchaseSuccessModal} />
      <ReviewModal open={openReviewModal} setOpen={setOpenReviewModal} eventDetails={eventDetails}/>
      <GroupListModal open={openGroupListModal} setOpen={setOpenGroupListModal} eventDetails={eventDetails} />
      <GroupMainModal open={openGroupMainModal} setOpen={setOpenGroupMainModal} eventDetails={eventDetails} />
    </PageContainer>
  )
}

export default EventScreen