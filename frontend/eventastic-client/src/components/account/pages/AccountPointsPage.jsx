import { useEffect, useContext, useState } from 'react';
import EventAPI from '../../../utils/EventAPIHelper';
import { StoreContext } from '../../../utils/context';
import { ScrollContainer, FlexBox } from "../../styles/layouts.styled"
import { Typography } from '@mui/material';

const api = new EventAPI();

const Points = ({ points }) => {
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    api.getEventDetails(points.event_id)
      .then((res) => setEventDetails(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <Typography variant='subtitle1' sx={{ ml: 1 }}>
      <b>+{points.reward_points_amount}</b> from
      <Typography component='span' sx={{ color: 'success.main' }}>
        <b> {eventDetails.event_title}</b>
      </Typography>
    </Typography>
  )
}

const AccountPointsPage = () => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const params = {
      account_id: account.account_id,
      reward_points_status: 'Approved'
    }
    api.getRewardPoints(params)
      .then((res) => {
        setHistory(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <ScrollContainer thin pr='1vw'>
      <Typography variant='subtitle1'>
        Accumulate reward points by purchasing tickets to events. Once you have enough points
        you can use them to purchase tickets instead of using money!
      </Typography>
      <FlexBox sx={{ mt: 2 }}>
        <Typography variant='subtitle1' sx={{ color: 'evenTastic.grey', fontWeight: 1000, mr: 2 }}>
          Your points:
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 1000 }}>
          {account.reward_points ? account.reward_points : 0}
        </Typography>
      </FlexBox>
      <Typography variant='subtitle1' sx={{ color: 'evenTastic.grey', fontWeight: 1000, mr: 2, mt: 3 }}>
        Point history:
      </Typography>
      <ScrollContainer thin sx={{ maxHeight: '50vh' }}>
        {!history.length && 'None so far'}
        {history.map((points, idx) => <Points key={idx} points={points} />)}
      </ScrollContainer>
    </ScrollContainer>
  )
}

export default AccountPointsPage