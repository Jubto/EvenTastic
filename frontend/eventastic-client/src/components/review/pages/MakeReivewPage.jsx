import { ScrollContainer } from "../../styles/layouts.styled"
import { Box, Button, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ReviewAPI from "../../../utils/ReviewAPIHelper";


const review_api = new ReviewAPI();

const MainBox = styled('div')`
  width: 100%;
  margin-left: 50px;
`;
const ContentBox = styled('div')`
  width: 60%;
  height: 70%;
  min-height: 350px;
`;

const MakeReivewPage = ({ setPage, setReviews, eventDetails, account }) => {

  

const handleSubmit = (event) => {
  // setReviews(prevState => { return { ...prevState, newReview } })
  event.preventDefault();
  setPage('listReviews')

  var current_datetime = new Date().toISOString().slice(0, -5);
  var data = {
              "event_id":parseInt(eventDetails.event_id),"reviewer_account_id":parseInt(account.account_id),
              "upvote_count":"0","rating":parseInt(rating),"review_text":reviewText,
              "review_timestamp":current_datetime, "review_status":"Active","reply_text":""
            }
  console.log(data)


  review_api
        .postReview(data)
        .then((response) => {
          console.log(response)
          alert("Review has been posted successfully")})
        .then(()=>{
          window.location.href = '/';
        })
        .catch((err) => console.log(err));

}


const [rating, setRating] = React.useState(0);
const [reviewText, setReviewText] = React.useState('');

return (
    <ScrollContainer hide height='100%' sx={{ width: '100%' }}>
      <MainBox>
      <Box id='form' component="form" noValidate onSubmit={handleSubmit}>
        <ContentBox >
          <div style={{  marginBottom: '50px'}}>
            <h2>My Review:</h2>
          </div>
          <div>
          <b>How would you rate your experience on a scale of 1 - 5?</b>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component="legend"></Typography>
            <Rating
              name="user-rating"
              value={rating}
              size="large"
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
            />
          </Box>
          
          </div>
          <div>
          <br></br>
          <b>Please let us know the details about your experience!:</b>
          <TextField
            name="reviewText"
            required
            fullWidth
            inputProps={{ maxLength: 1000 }}
            id="reviewText"
            // label="Review Text"
            InputLabelProps={{ shrink: true }}
            multiline
            rows={10}
            value={reviewText}
              onChange={(event) => {
                setReviewText(event.target.value);
              }}
          />
          <br></br>
          <br></br>
          <br></br>
          </div>
          
            <Button variant='contained' type='submit'>
              Post Review
            </Button>
          

        </ContentBox>
        </Box>

    </MainBox>
  </ScrollContainer>
)
}

export default MakeReivewPage