import { ScrollContainer } from "../../styles/layouts.styled"
import { Box, Button } from "@mui/material"

const MakeReivewPage = ({ setPage, setReviews }) => {

  const handleSubmit = (event) => {
    // setReviews(prevState => { return { ...prevState, newReview } })
    setPage('listReviews')
  }

  return (
    <ScrollContainer thin>
      <Box id='form' component="form" noValidate onSubmit={handleSubmit}>
        MakeReivewPage
        <Button variant='contained' type='submit'>
          Post Review
        </Button>
      </Box>
    </ScrollContainer>
  )
}

export default MakeReivewPage