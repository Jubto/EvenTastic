import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../utils/context';
import { useNavigate, useLocation } from 'react-router';
import { PageContainer } from '../components/styles/layouts.styled'
import AccountSideBar from '../components/account/AccountSideBar'
import AccountMain from '../components/account/AccountMain'
import AccountWelcomeModal from '../components/account/modal/AccountWelcomeModal';

const AccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [hostDetails, setHostDetails] = context.host;
  const [openWelcome, setOpenWelcome] = useState(null);
  const [accountScreen, setAccountScreen] = useState('account');

  useEffect(() => {
    if (!account) {
      navigate('/') // if someone typed /account in url without login
    }
    if (location.state && location.state.from === '/register') {
      setOpenWelcome(true)
    }
  }, [])

  return (
    <PageContainer direction='row' maxWidth='lg'>
      <AccountSideBar changeScreen={setAccountScreen}/>
      <AccountMain accountScreen={accountScreen}/>
      <AccountWelcomeModal open={openWelcome} setOpen={setOpenWelcome}/>
    </PageContainer>
  )
}

export default AccountPage