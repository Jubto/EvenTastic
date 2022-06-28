import { styled } from '@mui/material/styles';
import AccountDetailsScreen from './page/AccountDetailsScreen';
import AccountInterestScreen from './page/AccountInterestScreen'
import AccountTicketsScreen from './page/AccountTicketsScreen'
import AccountPointsScreen from './page/AccountPointsScreen'
import AccountGroupScreen from './page/AccountGroupScreen'
import HostDetailsScreen from './page/HostDetailsScreen'
import HostEventsScreen from './page/HostEventsScreen'

export const AccountContainer = styled('div')`
  flex-grow: 7;
  border: 3px solid #ad9fa3;
  margin-bottom: 1rem;
  padding: 1rem;
`;

const AccountMain = ({ accountScreen }) => {

  return (
    <AccountContainer>
      {(() => {
        if (accountScreen === 'account') {
          return (
            <AccountDetailsScreen/>
          )
        } else if (accountScreen === 'interests') {
          return (
            <AccountInterestScreen/>
          )
        } else if (accountScreen === 'tickets') {
          return (
            <AccountTicketsScreen/>
          )
        } else if (accountScreen === 'points') {
          return (
            <AccountPointsScreen/>
          )
        } else if (accountScreen === 'groups') {
          return (
            <AccountGroupScreen/>
          )
        } else if (accountScreen === 'host') {
          return (
            <HostDetailsScreen/>
          )
        } else if (accountScreen === 'events') {
          return (
            <HostEventsScreen/>
          )
        }
      })()}
    </AccountContainer>

  )
}

export default AccountMain