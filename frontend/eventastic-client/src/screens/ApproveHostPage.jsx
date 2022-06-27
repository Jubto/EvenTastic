import { PageContainer } from '../components/styles/layouts.styled'
import AccountSideBar from '../components/account/AccountSideBar'
import AccountMain from '../components/account/AccountMain'

const ApproveHostPage = () => {
  return (
    <PageContainer maxWidth='false' direction='row'>
      <AccountSideBar>menu</AccountSideBar>
      <AccountMain>body</AccountMain>
    </PageContainer>
  )
}

export default ApproveHostPage