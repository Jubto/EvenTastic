import React from 'react'
import { styled } from '@mui/material/styles';

export const SideBar = styled('div')`
  display: flex;
  flex-direction: 'column';
  flex-grow: 1;
  border: 1px solid black;
  border-radius: 5px;
`;

const AccountSideBar = () => {
  return (
    <SideBar>
        <div>AccountSideBar</div>
    </SideBar>
  )
}

export default AccountSideBar