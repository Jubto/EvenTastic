import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

export const SideBar = styled('div')`
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  align-items: center;
`;

export const SideBarButton = styled('button')`
  width: 200px;
  height: 30px;
  margin-top: 20px;
`;

const AccountSideBar = () => {
  const navigate = useNavigate();
  return (
    <SideBar>
        <div><b>Admin Menu</b></div>
        <SideBarButton onClick={() => navigate("/admin/approveHosts")} >Host Requests</SideBarButton>
        <SideBarButton onClick={() => navigate("/admin/createVenues")} >Create Venues</SideBarButton>
    </SideBar>
  )
}

export default AccountSideBar