import { PageContainer } from '../components/styles/layouts.styled'
import AdminSideBar from '../components/admin/AdminSideBar'

import { useState, useEffect } from 'react';
import HostRequestCard from '../components/admin/HostRequestCard'
import { Grid } from '@mui/material'
import AccountAPI from "../utils/AccountAPIHelper";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const AdminContainer = styled('div')`
  display: flex;
  flex-direction: 'row';
  flex-grow: 7;
  border: 1px solid black;
  border-radius: 5px;
`;

const api = new AccountAPI();

const createCard = (host) => {
  return (
    <HostRequestCard
      key={host.account_id}
      hostData={host}
    />
  );
}

const ApproveHostPage = () => {
  const [hostRequestsList, setHostRequestsList] = useState([])

  useEffect(() => {
    let param = {
      host_status: 'Pending'
    }
    api
      .getHostRequests(param) 
      .then((response) => setHostRequestsList(response.data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <PageContainer maxWidth='false' direction='row'>
      <AdminSideBar></AdminSideBar>
      <AdminContainer>
        <div  style={{ margin: '15px'}}>
          <Grid container spacing={8}>
            {hostRequestsList.map(createCard)}
          </Grid>
        </div>
      </AdminContainer>
    </PageContainer>
  )

} 


export default ApproveHostPage