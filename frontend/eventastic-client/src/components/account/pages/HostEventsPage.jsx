import { useContext, useEffect, useState } from "react"
import { StoreContext } from '../../../utils/context';
import EventAPI from "../../../utils/EventAPIHelper"
import CancelEventModal from "../../event/modals/CancelEventModal";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled"

const api = new EventAPI()

const Event = ({ event, onClick }) => {
  return (
    <FlexBox id={event.event_id} onClick={onClick} sx={{border:'1px solid black', m:3, borderRadius:10}}>
      {event.event_id} + {event.event_short_desc}
    </FlexBox>
  )
}

const HostEventsPage = ({ toggle }) => {
  const context = useContext(StoreContext);
  const [hostDetails] = context.host;
  const [upComingEvents, setUpComingEvents] = useState([])
  const [PastEvents, setPastEvents] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [cancelEvent, setCancelEvent] = useState(false)
  const [toCancel, setToCancel] = useState(null)

  const getEvents = async () => {
    try {
      let param = {
        host_id: hostDetails.host_id,
        event_status: 'Upcoming'
      }
      const upcomingRes = await api.getEventList(param)
      setUpComingEvents(upcomingRes.data)
      param = {
        event_status: 'Cancelled',
        ...param
      }
      const completedRes = await api.getEventList(param)
      setPastEvents(completedRes.data)
    }
    catch (err) {
      console.error(err)
    }
  }

  const putEvent = (eventID) => {
    const body = {
      event_status: "Cancelled"
    }
    api.putEvent(eventID, body)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  const handleCancelEvent = (event) => {
    const eventID = event.currentTarget.id
    setToCancel(eventID)
    setOpenModal(true)
  }

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    setUpComingEvents(upComingEvents.filter((event) => event.event_id !== toCancel))
    putEvent(toCancel)
  }, [cancelEvent])

  return (
    <ScrollContainer hide sx={{ p: 1, mt: 7 }}>
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
            <Event key={idx} event={event} onClick={handleCancelEvent} />
          ))}
        </div>
      }
      <CancelEventModal
        open={openModal} setOpen={setOpenModal} setCancel={setCancelEvent} />
    </ScrollContainer>
  )
}

export default HostEventsPage