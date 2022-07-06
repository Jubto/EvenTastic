import { ScrollContainer } from "../../styles/layouts.styled"
import { Button } from "@mui/material"

const CardDetails = ({ setPage }) => {

  return (
    <ScrollContainer hide height='100%' sx={{ flexGrow: 3, width:'auto' }}>
      CardDetails
      <div>
        <Button variant='contained' onClick={() => setPage('paymentOptions')}>
          back
        </Button>
      </div>
    </ScrollContainer>
  )
}

export default CardDetails