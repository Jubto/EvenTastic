import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Grid, Card, CardHeader, CardActionArea, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import AccountAPI from "../../utils/AccountAPIHelper";

export const StyledHostCard = styled(Card)`
  border: 1px solid black;
  border-radius: 5px;
  height: 270px;
  width: 300px;
`;

const SaveButtonBox = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const ApproveButton = styled(Button)`
  margin-bottom: 2px;
`;

const DeclineButton = styled(Button)`
  margin-bottom: 2px;
`;

const api = new AccountAPI();

const HostRequestCard = ( {hostData} ) => {

  let navigate = useNavigate();

  const ApproveHost = (account_id) => {
    let body = {};
    body["is_verified"] = true;
    body["host_status"] = 'Approved';
    const params = {
      'account_id': account_id,
      'body': body
    }
    api.putHostRequests(account_id, params);
    //navigate("/admin/approveHosts");     
    window.location.href =  "/admin/approveHosts";
  }

  const DeclineHost = (account_id) => {
    let body = {};
    body["is_verified"] = false;
    body["host_status"] = 'Declined';
    const params = {
      'account_id': account_id,
      'body': body
    }
    api.putHostRequests(account_id, params);
    //navigate("/admin/approveHosts");     
    window.location.href =  "/admin/approveHosts";
  }


  return (
    <Grid item>
      <StyledHostCard>
          <CardHeader title={hostData.org_name} />
          <CardContent>
            <Typography variant="h6" component="div">
              Title: {hostData.job_title}
            </Typography>
            <Typography variant="h6" component="div">
              Qualification: {hostData.qualification}
            </Typography>
            <Typography variant="h6" component="div">
              Contact No: {hostData.host_contact_no}
            </Typography>
              <div>
                <Button variant="contained" value={hostData.account_id} color="success" onClick={(e) => ApproveHost(e.target.value) } >
                  Approve
                </Button>
                <Button variant="contained" value={hostData.account_id} color="error" onClick={(e) => DeclineHost(e.target.value) } >
                  Decline
                </Button>
              </div>
          </CardContent>
      </StyledHostCard>
    </Grid>
  )
}

export default HostRequestCard