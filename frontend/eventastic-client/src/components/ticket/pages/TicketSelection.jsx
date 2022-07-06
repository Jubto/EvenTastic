
import { ScrollContainer } from "../../styles/layouts.styled"
import { Button } from "@mui/material"

const TicketSelection = ({ setPage, setTicket }) => {
  return (
    <ScrollContainer hide height='100%' sx={{ flexGrow: 3, width: 'auto' }}>
      TicketSelection
      <div>
        <Button variant='contained' onClick={() => setPage('paymentOptions')}>
          checkout
        </Button>
      </div>

    </ScrollContainer>
  )
}

export default TicketSelection