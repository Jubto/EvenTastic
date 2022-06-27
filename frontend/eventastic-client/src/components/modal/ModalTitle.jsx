import React from 'react'
import { FlexBox } from '../styles/layouts.styled';
import CloseIcon from '@mui/icons-material/Close';
import {
  Divider,
  IconButton,
  Typography,
  styled
} from '@mui/material';

export const StyledTitle = styled(FlexBox)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  width: 80vw;
  max-width: 650px;
`

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
    <Divider variant="middle" sx={{mb:2}} />
    </>

  )
}

export default ModalTitle