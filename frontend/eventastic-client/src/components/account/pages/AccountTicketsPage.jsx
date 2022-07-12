import { useContext, useEffect, useRef, useState } from "react"
import { StoreContext } from '../../../utils/context';
import EventAPI from "../../../utils/EventAPIHelper"
import CancelTicketModal from "../modals/CancelTicketModal";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled"

const api = new EventAPI()

const Ticket = ({ booking, onClick }) => {
  return (
    <FlexBox id={booking.bookingID} onClick={onClick} sx={{ border: '1px solid black', m: 3 }}>
      Event descr: {booking.event.event_short_desc} qrcode: {booking.tickets[0].QR_code}
    </FlexBox>
  )
}

const AccountTicketsPage = ({ toggle }) => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const isMounted = useRef(false);
  const [UpComingBookings, setUpComingBookings] = useState([])
  const [PastBookings, setPastBookings] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [cancelBooking, setCancelBooking] = useState(false)
  const [toCancel, setToCancel] = useState(null)

  const getBooking = async () => {
    try {
      // possible api calling
      const bookedRes = await api.getBooking(account.account_id, 'Booked')
      const bookedEventsRes = await Promise.all(bookedRes.data.map((booking) => {
        api.getEventDetails(booking.event_id)
      }))
      const bookedTicketsRes = await Promise.all(bookedRes.data.map((booking) => {
        const param = {
          event_id: booking.event_id,
          booking_id: booking.booking_id
        }
        api.getTickets(param)
      }))
      const bookingMapping = bookedRes.data.map((booking, idx) => (
        {
          bookingID: booking.booking_id,
          booking: bookedRes.data[idx],
          event: bookedEventsRes.data[idx],
          tickets: bookedTicketsRes.data[idx]
        }
      ))
      setUpComingBookings(bookingMapping)

      // todo, repeat of above
      const completedRes = await api.getBooking(account.account_id, 'Completed')
      setPastBookings(completedRes.data)
    }
    catch (err) {
      console.error(err)
    }
  }

  const patchBookings = (bookingID) => {
    const body = {
      booking_status: "Cancelled"
    }
    api.patchBookings(bookingID, body)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  const handleCancelBooking = (event) => {
    const eventID = event.currentTarget.id
    setToCancel(eventID)
    setOpenModal(true)
  }

  useEffect(() => {
    getBooking()
  }, [])

  useEffect(() => {
    // This allows CancelTicketModal to commit the cancel
    if (isMounted.current) {
      setUpComingBookings(UpComingBookings.filter((booking) => booking.bookingID !== toCancel))
      patchBookings(toCancel)
    }
    else {
      isMounted.current = false
    }
  }, [cancelBooking])

  return (
    <ScrollContainer thin pr='1vw' sx={{ p: 1, mt: 7 }}>
      {toggle
        ? <div>
          Past
          {PastBookings.map((booking, idx) => (
            <Ticket key={idx} booking={booking} />
          ))}
        </div>
        : <div>
          UpComing
          {UpComingBookings.map((booking, idx) => (
            <Ticket key={idx} booking={booking} onClick={handleCancelBooking} />
          ))}
        </div>
      }
      <CancelTicketModal 
        open={openModal} setOpen={setOpenModal} setCancel={setCancelBooking} />
    </ScrollContainer>
  )
}

export default AccountTicketsPage