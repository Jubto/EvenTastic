import { ScrollContainer } from "../../styles/layouts.styled"
import { Box, Button, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import * as React from 'react';

const RespondReviewPage = ({ setPage, setReviews }) => {
const ContentBox = styled('div')`
  width: 60%;
  height: 70%;
  min-height: 350px;
`;
const [replyText, setReplyText] = React.useState('');
  const handleSubmit = (event) => {
    // setReviews(prevState => { return { ...prevState, newReview } })
    event.preventDefault();
    setPage('listReviews')
    
  }

  return (
    <ScrollContainer thin>
      <Box id='form' component="form" noValidate onSubmit={handleSubmit}>
      <ContentBox >
          <div style={{  marginBottom: '50px'}}>
            <h2>My Response:</h2>
          </div>
          
          <div>
          <b>Please write a response to your customer below!:</b>
          <TextField
            name="replyText"
            required
            fullWidth
            inputProps={{ maxLength: 1000 }}
            id="replyText"
            multiline
            rows={10}
            value={replyText}
              onChange={(event) => {
                setReplyText(event.target.value);
              }}
            InputLabelProps={{ shrink: true }}
          
          />
          <br></br>
          <br></br>
          <br></br>
          
          </div>

        </ContentBox>
        <Button variant='contained' type='submit'>
          Post Reply
        </Button>
      </Box>
    </ScrollContainer>
  )
}

export default RespondReviewPage
