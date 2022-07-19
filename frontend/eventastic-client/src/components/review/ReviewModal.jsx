import { useEffect, useContext, useState } from 'react';
import { StoreContext } from '../../utils/context';
import ReviewListPage from './pages/ReviewListPage';
import MakeReivewPage from './pages/MakeReivewPage';
import RespondReviewPage from './pages/RespondReviewPage';
import { FlexBox } from '../styles/layouts.styled';
import { StyledTitle, LargeModal, ModalBodyLarge } from '../styles/modal/modal.styled';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReviewAPI from '../../utils/ReviewAPIHelper';

const review_api = new ReviewAPI();

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const ReviewModal = ({ open, setOpen, eventDetails }) => {
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [hostDetails, setHostDetails] = context.host;
  const [page, setPage] = useState('listReviews')
  const [madeReivew, setMadeReivew] = useState(false)
  const [reviews, setReviews] = useState([])

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setPage('listReviews'), 200);
  }

  useEffect(() => {
    if(eventDetails.length !== 0)
    {
      console.log({event_id:parseInt(eventDetails.event_id),interaction_acount_id:account.account_id})
      review_api
      .getReviewList({event_id:parseInt(eventDetails.event_id),interaction_acount_id:account.account_id})
      .then((response)=>setReviews(response.data))
      .catch((err)=>console.log(err));
    }
    // api call: 
    // Get /bookings setReviews()
    // Determine all account_id review interactions
    // setMadeReivew() // Determine if account_id has made a reivew or not
  }, [eventDetails])


  //Reply button should be under each review and should be visible only to hosts
  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Review modal" maxWidth='lg'>
      <StyledTitle direction='column'>
        <FlexBox justify='center'>
          <Typography variant='h5' sx={{ml:'auto'}}>
            Reviews for {eventDetails.event_title}
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} sx={{ml:'auto'}}>
            <CloseIcon />
          </IconButton>
        </FlexBox>
        {page !== 'listReviews'
          ? ''
          : <FlexBox justify='space-between' sx={{mt:2, mb:2}}>
            <Button 
              variant='contained' color='success' disabled={parseInt(eventDetails.account_id) === parseInt(account.account_id)}
              onClick={() => setPage('makeReivew')}  
            >
              Write a review
            </Button>
            <Button variant="contained" endIcon={<FilterAltIcon />} 
            >
              Filter by
            </Button>
            <Button variant="contained" color='success'
             onClick={() => setPage('makeResponse')}  
            >
              Reply 
            </Button>
          </FlexBox>
        }
      </StyledTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <ModalBodyLarge>
        {(() => {
          if (page === 'listReviews') {
            return ( 
                 <ReviewListPage reviews={reviews} setReviews={setReviews} account={account} />
            )
          }
          else if (page === 'makeReivew') {
            return (
              <MakeReivewPage setPage={setPage} setReviews={setReviews} eventDetails={eventDetails} account={account}/>
            )
          }
          else if (page === 'makeResponse') {
            return (
              <RespondReviewPage setPage={setPage} setReviews={setReviews} />
            )
          }
        })()}
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default ReviewModal


