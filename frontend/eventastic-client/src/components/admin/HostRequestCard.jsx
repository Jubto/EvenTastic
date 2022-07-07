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

const HostRequestCard = ( {hostData} ) => {

  //let navigate = useNavigate();

  const ApproveHost = (account_id) => {
    let body = {};
    body["is_verified"] = true;
    body["host_status"] = 'Approved';
    api.putHost(account_id, body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    //navigate("/admin/approveHosts");     
    window.location.href =  "/admin/approveHosts"; 
  }

  const DeclineHost = (account_id) => {
    let body = {};
    body["is_verified"] = false;
    body["host_status"] = 'Declined';
    api.putHost(account_id, body);
    //navigate("/admin/approveHosts");     
    window.location.href =  "/admin/approveHosts";
  }


  return (
    // <Grid item>
      <StyledHostCard>
          <CardHeader title={hostData.org_name} />
          <CardContent>
            <Typography variant="h6" component="div">
              <b>Title:</b> {hostData.job_title}
            </Typography>
            <Typography variant="h6" component="div">
            <b>Qualification:</b> {hostData.qualification}
            </Typography>
            <Typography variant="h6" component="div">
            <b>Contact No:</b> {hostData.host_contact_no}
            </Typography>
              <SaveButtonBox>
                <Button variant="contained" value={hostData.account_id} color="success" onClick={(e) => ApproveHost(e.target.value) } >
                  Approve
                </Button>
                <Button variant="contained" value={hostData.account_id} color="error" onClick={(e) => DeclineHost(e.target.value) } >
                  Decline
                </Button>
              </SaveButtonBox>
          </CardContent>
      </StyledHostCard>
    // </Grid>
  )
}

export default HostRequestCard