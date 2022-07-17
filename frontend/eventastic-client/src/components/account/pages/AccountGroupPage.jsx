import { useEffect, useContext, useState } from "react"
import { StoreContext } from "../../../utils/context"
import { useNavigate } from 'react-router-dom';
import EventAPI from "../../../utils/EventAPIHelper"
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled"
import { Button, Card, CardMedia, Typography } from "@mui/material"

const api = new EventAPI()

const Group = ({ groupDetails, account }) => {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const redirect = () => {
    navigate(`/event/${groupDetails.event_id}`, { state: { redirect: 'groups' } })
  }

  useEffect(() => {
    account.account_id === groupDetails.group_host_id && setIsAdmin(true)
    api.getEventDetails(groupDetails.event_id)
      .then((res) => {
        setEventDetails(res.data)
      })
  }, [])

  return (
    <FlexBox direction='column'>
      <FlexBox sx={{ ml: 3, mb: -2 }}>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.25 }}>
          Event:
        </Typography>
        <Typography variant='h5' sx={{ ml: 1 }}>
          {eventDetails.event_title}
        </Typography>
      </FlexBox>
      <Card sx={{
        display: 'flex', borderRadius: '10px', height: '20vh',
        bgcolor: '#fff7ec', m: 3, p: 1
      }}
      >
        <CardMedia component="img" image={groupDetails.group_img}
          alt="User profile picture"
          sx={{ width: '15%', height: '100%', borderRadius: '100px', mr: 2 }}
        />
        <FlexBox direction='column' width="85%" >
          <FlexBox justify='space-between'>
            <FlexBox direction='column' >
              <Typography variant="subtitle1" color="text.secondary">
                Group Name
              </Typography>
              <Typography>
                {groupDetails.group_name}
              </Typography>
            </FlexBox>
            {isAdmin
              ? <Button variant='contained' color='success' sx={{ mr: 1 }} onClick={redirect} >
                Manage My Group
              </Button>
              : <Button variant='contained' sx={{ mr: 1 }} onClick={redirect} >
                Go To Group
              </Button>
            }
          </FlexBox>
          <FlexBox direction='column' sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Event Date
            </Typography>
            <Typography>
              {eventDetails.event_start_datetime}
            </Typography>
          </FlexBox>
          <FlexBox direction='column' >
            <Typography variant="subtitle1" color="text.secondary">
              Event Location
            </Typography>
            <Typography>
              {eventDetails.event_location}
            </Typography>
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

const AccountGroupPage = () => {
  const context = useContext(StoreContext);
  const [accountGroups] = context.groups;
  const [account] = context.account;

  return (
    <ScrollContainer thin pr='1vw'>
      {Object.entries(accountGroups).map((group, idx) => (
        <Group key={idx} groupDetails={group[1]} account={account} />
      ))}
    </ScrollContainer>
  )
}

export default AccountGroupPage