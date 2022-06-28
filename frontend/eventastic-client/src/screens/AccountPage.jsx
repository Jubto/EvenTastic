import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../utils/context';
import { useLocation } from 'react-router';
import { PageContainer, FlexBox } from '../components/styles/layouts.styled'
import AccountSideBar from '../components/account/AccountSideBar'
import AccountMain from '../components/account/AccountMain'
import AccountWelcomeModal from '../components/account/modal/AccountWelcomeModal';

const AccountPage = () => {
  const location = useLocation();
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [hostDetails, setHostDetails] = context.host;
  const [openWelcome, setOpenWelcome] = useState(null);
  const [accountScreen, setAccountScreen] = useState(null);

  useEffect(() => {
    if (location.state && location.state.from === '/register') {
      setOpenWelcome(true)
    }
  }, [])

  return (
    <PageContainer maxWidth='false' direction='row'>
      <AccountSideBar changeScreen={setAccountScreen}/>
      <AccountMain accountScreen={accountScreen}/>
      <AccountWelcomeModal open={openWelcome} setOpen={setOpenWelcome}/>
    </PageContainer>
  )
}

export default AccountPage