import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import EventAPI from "../../../utils/EventAPIHelper"
import { ScrollContainer, FlexBox } from "../../styles/layouts.styled"
import Button from '@mui/material/Button';

const api = new EventAPI()

const ItemBox = styled('div')`
  width: 90%;
  margin-top: 10px;
  margin-left: 30px;
`;

const FlaggedByBox = styled('div')`
  width: 90%;
  margin-top: 10px;
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ButtonBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CheckReviewBox = ({ review, setToRemove }) => {

  const approveReview = async (e) => {
    try {
      let review_params = {
        flag_count: 0,
        review_status: 'Active'
      }
      api.putReviews(e.target.value, review_params)
      setToRemove(e.target.value)
    }
    catch (err) {
      console.error(err)
    }
  }

  const deleteReview = async (e) => {
    try {
      let review_params = {
        flag_count: 0,
        review_status: 'Removed'
      }
      api.putReviews(e.target.value, review_params)
    setToRemove(e.target.value)
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <FlexBox id={review.review_id} sx={{ border: '1px solid black', borderRadius: '3px', m: 3 }}>
      <div style={{ width: '100%' }}>
        <ItemBox>
          <b>Event:</b> {review.event_title}<br></br>
        </ItemBox>
        <ItemBox>
          <b>Review:</b> {review.review_text}<br></br>
        </ItemBox>
        <FlaggedByBox>
          <div>
            <b>Flagged by:</b> {review.flag_count} users
          </div>
          <div>
            <b>Rating:</b> {review.rating}
          </div>
          <div>
            <b>Upvotes:</b> {review.upvotes}<br></br>
          </div>
        </FlaggedByBox>
        <ButtonBox>
          <Button variant='contained' value={review.review_id} color="success" onClick={approveReview}>
            Approve
          </Button>
          <Button variant='contained' value={review.review_id} color="error"  onClick={deleteReview}>
            Delete
          </Button>
        </ButtonBox>
      </div> 
    </FlexBox>
  )
}

const AdminReviewsPage = () => {  
  const [reviews, setReviews] = useState([])
  const [toRemove, setToRemove] = useState(-1)

  const getFlaggedReviews = async () => {
    try {
    const getReviews = await api.getReviews()

    let bookedEventsRes = await Promise.all(getReviews.data.map((review, idx) => {
      return api.getEventDetails(review.event_id).then((res) => res.data)
    }))
    
    const flaggedReviews = getReviews.data.map((review, idx) => (
      {
        review_id: review.review_id,
        flag_count: review.flag_count,
        rating: review.rating,
        upvotes: review.upvotes,
        review_text: review.review_text,

        event_title: bookedEventsRes[idx].event_title,
      }
    ))

    setReviews(flaggedReviews)

    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFlaggedReviews()
  }, [])

  useEffect(() => {
    setReviews(reviews.filter((review) => review.review_id != toRemove))
  }, [toRemove])

  return (
    <ScrollContainer>
      <div>
        {reviews.map((review, idx) => (
            <CheckReviewBox key={idx} review={review} setToRemove={setToRemove} />
          ))}
      </div>
    </ScrollContainer>
  )
}

export default AdminReviewsPage