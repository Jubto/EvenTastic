import { useState } from 'react';
import ReviewListPage from './pages/ReviewListPage';
import MakeReivewPage from './pages/MakeReivewPage';
import RespondReviewPage from './pages/RespondReviewPage';
import { LargeModal, ModalBodyLarge, ModalTitle } from '../styles/modal/modal.styled';

const ReviewModal = ({ open, setOpen, event }) => {
  const [page, setPage] = useState('listReviews')

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Review modal" maxWidth='lg'>
      <ModalTitle title={`Reviews for ${event.event_title}`} close={handleClose} />
      <ModalBodyLarge>
        ${(() => {
          if (page === 'listReviews') {
            return (
              <ReviewListPage setPage={setPage} />
            )
          }
          else if (page === 'makeReivew') {
            return (
              <MakeReivewPage setPage={setPage} />
            )
          }
          else if (page === 'makeResponse') {
            return (
              <RespondReviewPage setPage={setPage}  />
            )
          }
        })()}
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default ReviewModal


