import { useContext } from 'react';
import { StoreContext } from '../../utils/context';
import { FlexBox } from '../styles/layouts.styled';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InterestsIcon from '@mui/icons-material/Interests';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventIcon from '@mui/icons-material/Event';
import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled
} from '@mui/material';

const SideBar = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 3px solid #ad9fa3;
  margin-right: 1rem;
  margin-bottom: 1rem;
  max-width: 225px;
  min-width: 225px;
`;

const SideBarTitle = styled(Typography)`
  align-self: center;
  margin-top: 1rem;
`

const SideBarItem = ({ title, onClick, children }) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  )
}

const AccountSideBar = ({ changePage }) => {
  const context = useContext(StoreContext);
  const [hostDetails] = context.host;

  const handleChangePage = (change) => {
    console.log(`change: ${change}`)
    changePage(change);
  }

  return (
    <SideBar>
      <SideBarTitle variant='h6'>
        Account menu
      </SideBarTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <List component='nav'>
        <SideBarItem title='Account details' onClick={() => handleChangePage('account')}>
          <AccountBoxIcon />
        </SideBarItem>
        <SideBarItem title='My interests' onClick={() => handleChangePage('interests')}>
          <InterestsIcon />
        </SideBarItem>
        <SideBarItem title='My tickets' onClick={() => handleChangePage('tickets')}>
          <LocalActivityIcon />
        </SideBarItem>
        <SideBarItem title='My reward points' onClick={() => handleChangePage('points')}>
          <LoyaltyIcon />
        </SideBarItem>
        <SideBarItem title='My groups' onClick={() => handleChangePage('groups')}>
          <GroupsIcon />
        </SideBarItem>
      </List>
      {(() => {
        if (!hostDetails) {
          return (
            <FlexBox direction='column'>
              <Divider variant="middle" sx={{ mb: 2 }} />
              <Button
                variant='contained' color='success' size='large'
                sx={{ width: '80%', alignSelf: 'center' }}
                onClick={() => handleChangePage('host')}
              >
                Become a host
              </Button>
            </FlexBox>

          )
        }
        else if (hostDetails.host_status === 'Pending' || hostDetails.host_status === 'Declined') {
          return (
            <FlexBox direction='column'>
              <Divider variant="middle" />
              <SideBarTitle variant='h6'
                sx={{ color: hostDetails.host_status === 'Pending' ? 'warning.light' : 'error.main' }}>
                Host status {hostDetails.host_status === 'Pending' ? 'pending' : 'declined'}
              </SideBarTitle>
              <List component='nav'>
                <SideBarItem title='My host details' onClick={() => handleChangePage('host')}>
                  <AssignmentIndIcon />
                </SideBarItem>
              </List>
            </FlexBox>
          )
        }
        else if (hostDetails.host_status === 'Approved') {
          return (
            <FlexBox direction='column'>
              <SideBarTitle variant='h6'>
                Host menu
              </SideBarTitle>
              <Divider variant="middle" sx={{ mb: 2 }} />
              <List component='nav'>
                <SideBarItem title='My host details' onClick={() => handleChangePage('host')}>
                  <AssignmentIndIcon />
                </SideBarItem>
                <SideBarItem title='My events' onClick={() => handleChangePage('events')}>
                  <EventIcon />
                </SideBarItem>
              </List>
            </FlexBox>
          )
        }
      })()}
    </SideBar>
  )
}

export default AccountSideBar