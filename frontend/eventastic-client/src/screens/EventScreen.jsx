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
import GroupJoinedModal from '../components/group/modals/GroupJoinedModal';
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
  const [accountGroups, setAccountGroups] = context.groups;
  const [eventDetails, setEventDetails] = useState([])
  const [groupList, setGroupList] = useState([])
  const [groupDetails, setGroupDetails] = useState(false)
  const [apiGetGroup, setApiGetGroup] = useState(false)
  const [hasLeftGroup, setHasLeftGroup] = useState(false)

  // modals
  const [openTicketModal, setTicketModal] = useState(false)
  const [openReviewModal, setReviewModal] = useState(false)
  const [openGroupListModal, setGroupListModal] = useState(false)
  const [openGroupMainModal, setGroupMainModal] = useState(false)
  const [openGroupCreatedModal, setGroupCreatedModal] = useState(false)
  const [openGroupJoinedModal, setGroupJoinedModal] = useState(false)


  const apiGroupsFilterBy = (eventID, accountID = false) => {
    let params = {}
    if (eventID && !accountID) {
      params = {
        event_id: eventDetails.event_id
      }
    }
    else if (eventID && accountID) {
      params = {
        event_id: eventDetails.event_id,
        account_id: account.account_id
      }
    }
    return new Promise((resolve, reject) => {
      groupApi.getGroupList(params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => reject(err))
    })
  }

  const initApiCalls = async () => {
    try {
      const eventRes = await eventApi.getEventDetails(id)
      setEventDetails(eventRes.data)
      if (account && accountGroups[eventRes.data.event_id]) {
        // user is logged in + already member of group
        setGroupDetails(accountGroups[eventRes.data.event_id])
      }
      else {
        // get list of groups filtered by eventID
        const groups = await apiGroupsFilterBy(eventRes.data.event_id)
        setGroupList(groups)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // this is called in main group modal when you click leave group
    if (hasLeftGroup) {
      setGroupDetails(false)
      const temp = accountGroups
      delete temp[eventDetails.event_id]
      setAccountGroups(temp) // update global account groups
      apiGroupsFilterBy(eventDetails.event_id)
      .then((groupsRes) => {
        setGroupList(groupsRes)
      })
      .catch((err) => console.error(err))
    }
  }, [hasLeftGroup])

  useEffect(() => {
    // This is called when:
    // logging in while in listing modal when you're already part of group
    // When creating a new group in listing modal
    // When accepting to join a new group in the listing modal
    if (apiGetGroup) {
      if (accountGroups[eventDetails.event_id]){
        setGroupDetails(accountGroups[eventDetails.event_id])
      }
      else {
        apiGroupsFilterBy(eventDetails.event_id, account.account_id)
        .then((groupRes) => {
          const group = groupRes[0]
          setGroupDetails(group)
          const temp = accountGroups
          temp[eventDetails.event_id] = group
          setAccountGroups(temp) // update global account groups
        })
        .catch((err) => console.error(err))
      }
      setGroupListModal(false) // close group listing modal
      setApiGetGroup(false)
    }
    // TODO potentially spawn modal if it improves ux, not sure yet
  }, [apiGetGroup])

  useEffect(() => {
    initApiCalls()
  }, [])

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
              {groupDetails
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
        accountGroups={accountGroups}
        groupList={groupList}
        setGroupList={setGroupList}
        setApiGetGroup={setApiGetGroup}
        setGroupCreatedModal={setGroupCreatedModal}
        setGroupJoinedModal={setGroupJoinedModal}
      />
      <GroupMainModal
        open={openGroupMainModal}
        setOpen={setGroupMainModal}
        eventDetails={eventDetails}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        setHasLeftGroup={setHasLeftGroup}
      />
      <GroupCreatedModal
        open={openGroupCreatedModal}
        setOpen={setGroupCreatedModal}
      />
      <GroupJoinedModal
        open={openGroupJoinedModal}
        setOpen={setGroupJoinedModal}
      />

    </PageContainer>
  )
}

export default EventScreen