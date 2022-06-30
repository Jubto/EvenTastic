import { useState } from 'react';
import { FlexBox } from '../styles/layouts.styled';
import AccountDetailsScreen from './page/AccountDetailsScreen';
import AccountInterestScreen from './page/AccountInterestScreen'
import AccountTicketsScreen from './page/AccountTicketsScreen'
import AccountPointsScreen from './page/AccountPointsScreen'
import AccountGroupScreen from './page/AccountGroupScreen'
import HostDetailsScreen from './page/HostDetailsScreen'
import HostEventsScreen from './page/HostEventsScreen'
import { Button, Divider, Typography, styled } from '@mui/material';

export const AccountContainer = styled('div')`
  flex-grow: 7;
  border: 3px solid #ad9fa3;
  margin-bottom: 1rem;
  padding: 1rem;
  overflow: hidden;
`;

const screenTitles = {
  'account': 'My account details',
  'interests': 'My interests',
  'tickets': 'My tickets',
  'points': 'My reward points',
  'groups': 'My groups',
  'host': 'Host details',
  'events': 'My hosted events'
}

const AccountMain = ({ accountScreen }) => {
  const [change, setChange] = useState(false);

  return (
    <AccountContainer>
      <FlexBox justify='space-between'>
        <Typography variant='h6'>{screenTitles[accountScreen]}</Typography>
        {accountScreen === 'account'
          ? <Button
            form='accountForm' type='submit' disabled={!change}
            variant="contained" sx={{bottom:'5px'}}>
            Save changes
          </Button>
          : ''}
      </FlexBox>
      <Divider variant="middle" sx={{ mb: 2 }} />
      {(() => {
        if (accountScreen === 'account') {
          return (
            <AccountDetailsScreen change={change} setChange={setChange} />
          )
        } else if (accountScreen === 'interests') {
          return (
            <AccountInterestScreen />
          )
        } else if (accountScreen === 'tickets') {
          return (
            <AccountTicketsScreen />
          )
        } else if (accountScreen === 'points') {
          return (
            <AccountPointsScreen />
          )
        } else if (accountScreen === 'groups') {
          return (
            <AccountGroupScreen />
          )
        } else if (accountScreen === 'host') {
          return (
            <HostDetailsScreen />
          )
        } else if (accountScreen === 'events') {
          return (
            <HostEventsScreen />
          )
        }
      })()}
    </AccountContainer>

  )
}

export default AccountMain