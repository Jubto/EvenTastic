import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FlexBox, Container } from '../styles/layouts.styled';
import AccountMenu from '../account/AccountMenu';
import SearchBar from '../search/SearchBar'
import AppBar from '@mui/material/AppBar';
import { Typography, styled } from '@mui/material';

const AppTitle = styled(Typography)`
  font-family: monospace;
  font-weight: 700;
  letter-spacing: .3rem;
  color: ${({ theme }) => theme.palette.evenTastic.title};

  padding-right: 1rem;
  padding-left: 1rem;

  ${({theme}) => theme.breakpoints.down("sm")} {
    padding-right: 0.25rem;
    padding-left: 0.25rem;
  }

  ${({ admin }) => {
    if (!admin) {
      return `
      cursor: pointer;

      &:hover {
        background-color: #e9d1d9;
      }

      `
    }
  }};
`

const EvenTasticAppBar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [hideSearch, setHideSearch] = useState(null);
  const [hide, setHide] = useState(null);

  const redirect = () => {
    if (!isAdmin()) {
      navigate('/')
    }
  }

  const isAdmin = () => {
    return location.pathname.includes('/admin', 0)
  }

  useEffect(() => {
    if (
      location.pathname === '/register') {
      setHide(true)
    }
    else if (
      location.pathname === '/create-event' ||
      location.pathname === '/booking' ||
      isAdmin()) {
      setHideSearch(true)
    }
    else {
      setHideSearch(false)
      setHide(false)
    }
  }, [location])

  return (
    <AppBar position="static" sx={{ backgroundColor: 'evenTastic.layout', mb:2, pl:0 }}>

        <FlexBox justify='space-between'>
          <FlexBox>
            <AppTitle variant="h4" onClick={redirect}
              admin={isAdmin()}
            >
              EvenTastic
            </AppTitle>
            {(hide || hideSearch) ? '' : <SearchBar/>}
          </FlexBox>
          {hide ? '' : <AccountMenu/>}
        </FlexBox>

    </AppBar>
  );
};

export default EvenTasticAppBar;