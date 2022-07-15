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
    // api call: 
    // Get /bookings setReviews()
    // Determine all account_id review interactions
    // setMadeReivew() // Determine if account_id has made a reivew or not
  }, [])

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Review modal" maxWidth='lg'>
      <StyledTitle direction='column'>
        <FlexBox justify='center'>
          <Typography variant='h5' sx={{ml:'auto'}}>
            Reivews for {eventDetails.event_title}
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} sx={{ml:'auto'}}>
            <CloseIcon />
          </IconButton>
        </FlexBox>
        {page !== 'listReviews'
          ? ''
          : <FlexBox justify='space-between' sx={{mt:2, mb:2}}>
            <Button 
              variant='contained' color='success' disabled={madeReivew ? true : false}
              onClick={() => setPage('makeReivew')}  
            >
              Write a reivew
            </Button>
            <Button variant="contained" endIcon={<FilterAltIcon />}>
              Filter by
            </Button>
          </FlexBox>
        }
      </StyledTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <ModalBodyLarge>
        {(() => {
          if (page === 'listReviews') {
            return (
              <ReviewListPage />
            )
          }
          else if (page === 'makeReivew') {
            return (
              <MakeReivewPage setPage={setPage} setReviews={setReviews} />
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


