import { useContext, useState } from 'react';
import { StoreContext } from '../../../utils/context';
import { ScrollContainer, FlexBox } from "../../styles/layouts.styled"
import { Typography } from '@mui/material';

const AccountPointsPage = () => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  
  return (
    <ScrollContainer thin pr='1vw'>
      <Typography variant='subtitle1'>
        Accumulate reward points by purchasing tickets to events. Once you have enough points
        you can use them to purchase tickets instead of using money!
      </Typography>
      <FlexBox sx={{ mt:2 }}>
        <Typography variant='subtitle1' sx={{ color: 'evenTastic.grey', fontWeight: 1000, mr:2 }}>
          Your points:
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 1000 }}>
          {account.reward_points ? account.reward_points : 0}
        </Typography>
      </FlexBox>
    </ScrollContainer>
  )
}

export default AccountPointsPage