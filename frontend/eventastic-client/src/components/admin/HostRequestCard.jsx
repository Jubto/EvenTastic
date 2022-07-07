import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountAPI from "../../utils/AccountAPIHelper";

export const StyledHostCard = styled(Card)`
  border: 1px solid black;
  border-radius: 5px;
  margin: 1rem;
  height: 270px;
  width: 300px;
`;

const SaveButtonBox = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const api = new AccountAPI();

const HostRequestCard = ({ hostRequest, setRequests }) => {
  const ApproveHost = (account_id) => {
    let body = {
      is_verified: true,
      host_status: 'Approved'
    }
    api.putHost(account_id, body)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setRequests(prevState => prevState.filter((request) =>
      request.account_id !== account_id)
    )
  }

  const DeclineHost = (account_id) => {
    let body = {
      is_verified: false,
      host_status: 'Declined'
    }
    api.putHost(account_id, body);
    setRequests(prevState => prevState.filter((request) =>
      request.account_id !== account_id )
    )
  }

  return (
    <StyledHostCard>
      <CardHeader title={hostRequest.org_name} />
      <CardContent>
        <Typography variant="h6" component="div">
          <b>Title:</b> {hostRequest.job_title}
        </Typography>
        <Typography variant="h6" component="div">
          <b>Qualification:</b> {hostRequest.qualification}
        </Typography>
        <Typography variant="h6" component="div">
          <b>Contact No:</b> {hostRequest.host_contact_no}
        </Typography>
        <SaveButtonBox>
          <Button variant="contained" value={hostRequest.account_id} color="success" onClick={(e) => ApproveHost(e.target.value)} >
            Approve
          </Button>
          <Button variant="contained" value={hostRequest.account_id} color="error" onClick={(e) => DeclineHost(e.target.value)} >
            Decline
          </Button>
        </SaveButtonBox>
      </CardContent>
    </StyledHostCard>
  )
}

export default HostRequestCard