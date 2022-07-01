import { useNavigate } from 'react-router-dom';
import { ScrollContainer } from '../../styles/layouts.styled';
import { Button } from '@mui/material';

const AccountInterestScreen = () => {
  const navigate = useNavigate()

  return (
    <ScrollContainer>
      <Button variant='contained' onClick={() => navigate('/tags')}>
        Update tags
      </Button>
    </ScrollContainer>
  )
}

export default AccountInterestScreen