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
`;

const SaveButtonBox = styled('div')`
  display: flex;
  justify-content: center;
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
    body["isVerified"] = true;
    const params = {
      'account_id': account_id,
      'body': body
    }
    api.putHostRequests(params);
    console.log("Acc ID:"+account_id);
    navigate("/admin/approveHosts");    
  }

  const DeclineHost = (account_id) => {
    let body = {};
    body["isVerified"] = false;
    const params = {
      'account_id': account_id,
      'body': body
    }
    api.putHostRequests(params);
    navigate("/admin/approveHosts");  
  }


  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
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