import { useState, useEffect } from 'react';
import AccountAPI from "../../../utils/AccountAPIHelper";
import HostRequestCard from '../HostRequestCard'
import { ScrollContainer } from '../../styles/layouts.styled';
import { Grid } from '@mui/material'

const api = new AccountAPI();

const createCard = (host) => {
  return (
    <HostRequestCard
      key={host.account_id}
      hostData={host}
    />
  );
}

const ApproveHostScreen = () => {
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
    <ScrollContainer hide flex='true' wrap='true' align='start'>
      {hostRequestsList.map(createCard)}
    </ScrollContainer>
  )

}


export default ApproveHostScreen