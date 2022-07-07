import { ScrollContainer } from '../../styles/layouts.styled';
import { Button } from '@mui/material';

const ManageEventDetailsPage = ({ eventDetails, changePage }) => {
    return (
      <ScrollContainer thin>
        {eventDetails.event_desc}
        <Button variant='contained' onClick={() => changePage('events')}>
          Return
        </Button>
      </ScrollContainer>
    )
  }
  
  export default ManageEventDetailsPage