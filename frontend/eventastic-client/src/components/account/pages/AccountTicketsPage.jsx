import { useContext, useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import { StoreContext } from '../../../utils/context';
import EventAPI from "../../../utils/EventAPIHelper"
import CancelTicketModal from "../modals/CancelTicketModal";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const api = new EventAPI()

const SaveButtonBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// code to format the Date Time
const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function formatDate(datetime) {
  let d = new Date(datetime);
  return d.toLocaleDateString("en-US", dateFormat)
}

const Ticket = ({ booking, handleCancelBooking }) => {
  return (
    <FlexBox id={booking.booking_id} sx={{ border: '1px solid black', borderRadius: '3px', m: 3 }}>
      <Stack
        direction="row"
        spacing={2}
      >
        <img
          src={process.env.PUBLIC_URL + '/img/event/' + booking.event_img}
          width="20%"
          alt="Event thumbnail"
        >
        </img>
        <Typography variant="body1" component="div" width="50%">
          <b>{booking.event_title}</b><br></br>
          <b>Location:</b> {booking.event_location}<br></br>
          <b>DateTime:</b> {formatDate(booking.event_start_datetime)}<br></br>
          <b>Total Cost</b>: {booking.total_cost}<br></br>
        </Typography>
        <Typography variant="body1" component="div" width="10%">
        </Typography>
        <SaveButtonBox  width="20%">
          <Button sx={{ height: '50%' }} variant="contained">Send Tickets</Button>
          <Button sx={{ height: '50%' }} variant="contained" color="error" value={booking.booking_id} onClick={(e) => handleCancelBooking(e.target.value)} >Cancel Booking</Button>
        </SaveButtonBox>
      </Stack>
    </FlexBox>
  )
}

const pastTickets = ({ booking, handleCancelBooking }) => {
  return (
    <FlexBox id={booking.booking_id} sx={{ border: '1px solid black', borderRadius: '3px', m: 3 }}>
      <Stack
        direction="row"
        spacing={2}
      >
        <img
          src={process.env.PUBLIC_URL + '/img/event/' + booking.event_img}
          width="20%"
          alt="Event thumbnail"
        >
        </img>
        <Typography variant="body1" component="div" width="50%">
          <b>{booking.event_title}</b><br></br>
          <b>Location:</b> {booking.event_location}<br></br>
          <b>DateTime:</b> {formatDate(booking.event_start_datetime)}<br></br>
          <b>Total Cost</b>: {booking.total_cost}<br></br>
        </Typography>
      </Stack>
    </FlexBox>
  )
}

const AccountTicketsPage = ({ toggle }) => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [UpComingBookings, setUpComingBookings] = useState([])
  const [PastBookings, setPastBookings] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [cancelBooking, setCancelBooking] = useState(null)
  const [toCancel, setToCancel] = useState(null)

  const getBookings = async () => {
    try {
      // possible api calling  
      const booking_params = {
        account_id: account.account_id,
        booking_status: 'Booked'
      }
      const bookedRes = await api.getBookings(booking_params)

      //console.log(bookedRes.data)

      let bookedEventsRes = await Promise.all(bookedRes.data.map((booking, idx) => {
        return api.getEventDetails(booking.event_id).then((res) => res.data)
      }))

      //console.log('Events')
      //console.log(bookedEventsRes)
      
      const bookingMapping = bookedRes.data.map((booking, idx) => (
        {
          booking_id: booking.booking_id,
          booking_email: booking.booking_email,
          account_id: booking.account_id,
          event_id: booking.event_id,
          total_cost: booking.total_cost,
          seats: booking.ticket_details,
          event_title: bookedEventsRes[idx].event_title,
          event_img: bookedEventsRes[idx].event_img,
          event_location: bookedEventsRes[idx].event_location,
          event_start_datetime: bookedEventsRes[idx].event_start_datetime
        }
      ))

      console.log(bookingMapping)
      setUpComingBookings(bookingMapping)

      // get past bookings data

      const pastBookingParams = {
        account_id: account.account_id,
        booking_status: 'Completed'
      }
      const pastBookings = await api.getBookings(pastBookingParams)

      //console.log(pastBookings.data)

      let pastBookedEvents = await Promise.all(pastBookings.data.map((booking, idx) => {
        return api.getEventDetails(booking.event_id).then((res) => res.data)
      }))

      //console.log('Events')
      //console.log(pastBookedEvents)
      
      const pastBookingsMapping = pastBookings.data.map((booking, idx) => (
        {
          booking_id: booking.booking_id,
          booking_email: booking.booking_email,
          account_id: booking.account_id,
          event_id: booking.event_id,
          total_cost: booking.total_cost,
          event_title: pastBookedEvents[idx].event_title,
          event_img: pastBookedEvents[idx].event_img,
          event_location: pastBookedEvents[idx].event_location,
          event_start_datetime: pastBookedEvents[idx].event_start_datetime
        }
      ))
      setPastBookings(pastBookingsMapping)

    }
    catch (err) {
      console.error(err)
    }
  }

  const handleCancelBooking = (booking_id) => {
    setToCancel(booking_id)
    setOpenModal(true)
  }

  useEffect(() => {
    getBookings()
  }, [])

  useEffect(() => {
    setUpComingBookings(UpComingBookings.filter((booking) => booking.booking_id != toCancel))
  }, [cancelBooking])

  return (
    <ScrollContainer hide sx={{ p: 1, mt: 7 }}>
      {toggle
        ? <div>
        {UpComingBookings.map((booking, idx) => (
          <Ticket key={idx} booking={booking} handleCancelBooking={handleCancelBooking} />
        ))}
      </div>
        : 
        <div>
          {PastBookings.map((booking, idx) => (
            <pastTickets key={idx} booking={booking} />
          ))}
        </div>
      }
      <CancelTicketModal 
        open={openModal} setOpen={setOpenModal} toCancel={toCancel} setCancelBooking={setCancelBooking} />
    </ScrollContainer>
  )
}

export default AccountTicketsPage
