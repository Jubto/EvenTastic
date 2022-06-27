import { Link } from 'react-router-dom';
import { FlexBox, Container } from '../styles/layouts.styled';
import AccountMenu from '../account/AccountMenu';
import SearchBar from './SearchBar';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';

const EvenTasticAppBar = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: 'evenTastic.layout', mb:2 }}>
      <Container maxWidth='false'>
        <FlexBox justify='space-between'>
          <FlexBox>
            <Typography variant="h4" component={Link} to={'/'}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'evenTastic.title',
                textDecoration: 'none',
                }}
            >
              EvenTastic
            </Typography>
            <SearchBar/>
          </FlexBox>
          <AccountMenu/>
        </FlexBox>
      </Container>
    </AppBar>
  );
};

export default EvenTasticAppBar;