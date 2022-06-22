import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { FlexBox, Container } from '../styles/layouts.styled';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const EvenTasticAppBar = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: 'lavenderblush', mb:2 }}>
      <Container maxWidth='false'>
        <FlexBox justify='space-between'>
          <Typography variant="h4" component={Link} to={'/'}
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'lightsalmon',
              textDecoration: 'none',
              }}
          >
            EvenTastic
          </Typography>
          <IconButton component={Link} to={'/account'} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        </FlexBox>
      </Container>
    </AppBar>
  );
};

export default EvenTasticAppBar;