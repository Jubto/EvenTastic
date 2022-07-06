import React from 'react'
import { StyledTitle } from './Modal.styled';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Typography} from '@mui/material';

const ModalTitle = ( {title, close} ) => {

  return (
    <>
    <StyledTitle justify='space-between'>
      <Typography variant='h5'>
        {title}
      </Typography>
      <IconButton aria-label="close" onClick={close}>
        <CloseIcon />
      </IconButton>
    </StyledTitle>
    <Divider variant="middle" sx={{mb:4}} />
    </>

  )
}

export default ModalTitle