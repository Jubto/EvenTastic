import React from 'react'
import { Typography, styled } from '@mui/material';

const StyledBody = styled('div')`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  width: 80vw;
  max-width: 650px;
`

const ModalBody = ({ children }) => {
  return (
    <StyledBody>
      <Typography variant='body1'>
        {children}
      </Typography>
    </StyledBody>
  )
}

export default ModalBody