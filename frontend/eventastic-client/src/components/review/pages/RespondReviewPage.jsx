import { ScrollContainer } from "../../styles/layouts.styled"
import { Box, Button } from "@mui/material"

const RespondReviewPage = ({ setPage, setReviews }) => {

  const handleSubmit = (event) => {
    // setReviews(prevState => { return { ...prevState, newReview } })
    setPage('listReviews')
  }

  return (
    <ScrollContainer thin>
      <Box id='form' component="form" noValidate onSubmit={handleSubmit}>
        RespondReviewPage
        <Button variant='contained' type='submit'>
          Post Reply
        </Button>
      </Box>
    </ScrollContainer>
  )
}

export default RespondReviewPage
