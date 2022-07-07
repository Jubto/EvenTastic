import { useContext, useEffect, useState } from "react"
import { StoreContext } from '../../../utils/context';
import EventAPI from "../../../utils/EventAPIHelper"
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const api = new EventAPI()

// code to format the Date Time
const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function formatDate(datetime) {
  let d = new Date(datetime);
  return d.toLocaleDateString("en-US", dateFormat)
}

const Event = ({ event, onClick }) => {
  return (
    <FlexBox id={event.event_id} onClick={onClick} sx={{ border: '1px solid black', m: 3 }}>
      <Stack
        direction="row"
        spacing={2}
      >
        <img
          src={process.env.PUBLIC_URL + '/img/event/' + event.event_img}
          width="15%"
          alt="A visulaisation of the Event"
        >
        </img>
        <Typography variant="body1" component="div" width="30%">
          <b>Event Title:</b><br></br>{event.event_title}
        </Typography>
        <Typography variant="body1" component="div" width="40%">
          <b>Start Date:</b><br></br>{formatDate(event.event_start_datetime)}<br></br>
          <b>End Date:</b><br></br>{formatDate(event.event_end_datetime)}
        </Typography>
        <Link href={'/event/' + event.event_id} width="10%">
          <button>Manage Event</button>
        </Link>
      </Stack>
    </FlexBox>
  )
}

const HostEventsPage = ({ toggle }) => {
  const context = useContext(StoreContext);
  const [hostDetails] = context.host;
  const [upComingEvents, setUpComingEvents] = useState([])
  const [PastEvents, setPastEvents] = useState([])

  const getEvents = async () => {
    try {
      let param = {
        host_id: hostDetails.host_id,
        event_status: 'Upcoming'
      }
      const upcomingRes = await api.getEventList(param)
      setUpComingEvents(upcomingRes.data)
      param = {
        event_status: 'Completed',
        ...param
      }
      const completedRes = await api.getEventList(param)
      setPastEvents(completedRes.data)
    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <ScrollContainer thin sx={{ p: 1, mt: 7 }}>
      {toggle
        ? <div>
          Past
          {PastEvents.map((event, idx) => (
            <Event key={idx} event={event} />
          ))}
        </div>
        : <div>
          UpComing
          {upComingEvents.map((event, idx) => (
            <Event key={idx} event={event} />
          ))}
        </div>
      }

    </ScrollContainer>
  )
}

export default HostEventsPage