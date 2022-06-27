import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../utils/context';
import { FlexBox } from '../styles/layouts.styled';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  TextField,
  Typography,
  styled
} from '@mui/material';


const DialogTitle = styled(FlexBox)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  width: 80vw;
  max-width: 650px;
`

const LogInModal = () => {
  const context = useContext(StoreContext);
  const [open, setOpen] = context.logInModal;

  // TODO: API handling

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <DialogTitle justify='space-between'>
        <Typography variant='h5'>
          Log into EvenTastic!
        </Typography>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider variant="middle" sx={{mb:2}} />
      <FlexBox justify='space-around' align='center'>
        <FlexBox direction='column' sx={{width:'50%'}}>
          <TextField
              required
              label="Required"
              defaultValue="Account email"
              sx={{m: 2, width: '100%'}}
          />
          <TextField
              required
              label="Required"
              defaultValue="Password"
              sx={{m: 2, width: '100%'}}
          />
          <Button variant="contained" sx={{m:2, mb:4}}>
            Log in        
          </Button>
        </FlexBox>
        <FlexBox direction='column'>
          <Typography>
            No account?
          </Typography>
          <Button variant="contained" color="success" component={Link} to={'/register'} onClick={handleClose}>
            Sign up
          </Button>
        </FlexBox>

      </FlexBox>
    </Dialog>
  )
}

export default LogInModal