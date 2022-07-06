import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FlexBox } from "../styles/layouts.styled"
import BasicInfoPage from './pages/BasicInfoPage'
import DetailsPage from './pages/DetailsPage'
import TicketsPage from './pages/TicketsPage'
import PreviewSubmitPage from './pages/PreviewSubmitPage'
import { Button, styled } from '@mui/material'

export const CreateEventContainer = styled('div')`
  flex-grow: 1;
  width: 95%;
  border: 3px solid #ad9fa3;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  overflow: hidden;
`;

const CreateEventMain = ({ page, changePage }) => {
  const navigate = useNavigate()
  const [createEvent, setCreateEvent] = useState({
    eventID: 1,
    eventparam1: '',
    eventparam2: '',
    eventparam3: ''
  })

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      if (page !== 4) {
        changePage(page + 1)
      }
      else {
        navigate(`/event/${createEvent.eventID}`)
      }
    } 
    else {
      if (page !== 1) {
        changePage(page - 1)
      }
      else {
        // api.post new event
        navigate('/account', { state: {from: '/create-events'} })
      }
    }
  }

  return (
    <CreateEventContainer>
      {(() => {
        if (page === 1) {
          return (
            <BasicInfoPage setCreateEvent={setCreateEvent} />
          )
        } else if (page === 2) {
          return (
            <DetailsPage setCreateEvent={setCreateEvent} />
          )
        } else if (page === 3) {
          return (
            <TicketsPage setCreateEvent={setCreateEvent} />
          )
        } else if (page === 4) {
          return (
            <PreviewSubmitPage setCreateEvent={setCreateEvent} createdEvent={createEvent} />
          )
        }
      })()}
      <FlexBox justify='space-between' sx={{position:'relative', bottom:'25px'}} >
        <Button variant='contained' onClick={() => handlePageChange('back')}>
          {page === 1 ? 'cancel' : 'back'}
        </Button>
        <Button variant='contained'  onClick={() => handlePageChange('next')}>
          {page === 4 ? 'submit' : 'next'}
        </Button>
      </FlexBox>
    </CreateEventContainer>
  )
}

export default CreateEventMain