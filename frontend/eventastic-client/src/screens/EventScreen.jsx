import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../utils/context';
import { useParams } from 'react-router-dom';
import EventAPI from "../utils/EventAPIHelper";
import GroupAPI from '../utils/GroupAPIHelper';
import ReviewModal from '../components/review/ReviewModal'
import TicketPurchaseModal from '../components/ticket/TicketPurchaseModal';
import GroupListModal from '../components/group/GroupListModal';
import GroupMainModal from '../components/group/GroupMainModal';
import GroupCreatedModal from '../components/group/modals/GroupCreatedModal';
import { PageContainer } from '../components/styles/layouts.styled'
import { Button, Chip, Grid, Paper, Typography, Stack, styled } from '@mui/material';

const eventApi = new EventAPI();
const groupApi = new GroupAPI()

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
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [eventDetails, setEventDetails] = useState([])
  const [groupList, setGroupList] = useState([])
  const [hasGroup, setHasGroup] = useState(0)
  const [openTicketModal, setTicketModal] = useState(false)
  const [openReviewModal, setReviewModal] = useState(false)
  const [openGroupListModal, setGroupListModal] = useState(false)
  const [openGroupMainModal, setGroupMainModal] = useState(false)
  const [openGroupCreatedModal, setGroupCreatedModal] = useState(false)

  useEffect(() => {
    eventApi
      .getEventDetails(id)
      .then((response) => setEventDetails(response.data))
      .catch((err) => console.log(err));

    groupApi
      .getGroupList({ event_id: eventDetails.event_id })
      .then((response) => {
        const groups = response.data
        setGroupList(groups)
      })
      .catch((err) => console.error(err));
  }, [])

  useEffect(() => {
    setHasGroup(groupList.filter((group) => group.group_host_id === account.account_id).length)
  }, [groupList, account])

  return (
    <PageContainer maxWidth='lg'>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <div>
            <img
              src={process.env.PUBLIC_URL + '/img/event/' + eventDetails.event_img}
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
              <Button
                variant="contained"
                href="#contained-buttons"
                color="error" onClick={() => setTicketModal(true)}
              >
                Tickets
              </Button>
              <Button
                variant="contained"
                href="#contained-buttons"
                color="warning" onClick={() => setReviewModal(true)}
              >
                Reviews
              </Button>
              {hasGroup
                ? <Button
                  variant="contained"
                  href="#contained-buttons"
                  onClick={() => setGroupMainModal(true)}
                  sx={{ bgcolor: 'evenTastic.purple', '&:hover': { backgroundColor: 'evenTastic.dark_purple' } }}
                >
                  View Your Group
                </Button>
                : <Button
                  variant="contained"
                  href="#contained-buttons"
                  onClick={() => setGroupListModal(true)}
                  sx={{ bgcolor: 'evenTastic.purple', '&:hover': { backgroundColor: 'evenTastic.dark_purple' } }}
                >
                  Find Groups
                </Button>
              }

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
      <TicketPurchaseModal
        open={openTicketModal}
        setOpen={setTicketModal}
        eventDetails={eventDetails}
      />
      <ReviewModal
        open={openReviewModal}
        setOpen={setReviewModal}
        eventDetails={eventDetails}
      />
      <GroupListModal
        open={openGroupListModal}
        setOpen={setGroupListModal}
        eventDetails={eventDetails}
        groupList={groupList}
        setGroupList={setGroupList}
        setGroupCreatedModal={setGroupCreatedModal}
      />
      <GroupMainModal
        open={openGroupMainModal}
        setOpen={setGroupMainModal}
        eventDetails={eventDetails}
      />
      <GroupCreatedModal 
        open={openGroupCreatedModal}
        setOpen={setGroupCreatedModal}
      />
    </PageContainer>
  )
}

export default EventScreen