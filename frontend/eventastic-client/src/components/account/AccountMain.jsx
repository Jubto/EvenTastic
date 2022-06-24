import { styled } from '@mui/material/styles';

export const AccountContainer = styled('div')`
  display: flex;
  flex-direction: 'row';
  flex-grow: 7;
  border: 1px solid black;
  border-radius: 5px;
`;

const AccountMain = () => {
  return (
    <AccountContainer>
        <div>AccountMain</div>
    </AccountContainer>

  )
}

export default AccountMain