import { PageContainer, FlexBox } from '../components/styles/layouts.styled'
import AccountSideBar from '../components/account/AccountSideBar'
import AccountMain from '../components/account/AccountMain'

const AccountPage = () => {
  return (
    <PageContainer maxWidth='false' direction='row'>
      <AccountSideBar>menu</AccountSideBar>
      <AccountMain>body</AccountMain>
    </PageContainer>
  )
}

export default AccountPage