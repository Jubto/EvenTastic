import { ScrollContainer } from "../../styles/layouts.styled"
import { Button } from "@mui/material"

const PaymentOptions = ({ setPage }) => {

  return (
    <ScrollContainer hide height='100%' sx={{ flexGrow: 3, width: 'auto' }}>
      PaymentOptions
      <div>
        <Button variant='contained' onClick={() => setPage('cardDetails')}>
          card
        </Button>
      </div>
      <div>
        <Button variant='contained' onClick={() => setPage('selection')}>
          back
        </Button>
      </div>
    </ScrollContainer>
  )
}

export default PaymentOptions