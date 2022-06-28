import { PageContainer } from '../components/styles/layouts.styled'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import VenueAPI from "../utils/VenueAPIHelper";
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DialogActions from '@mui/material/DialogActions';
import OutlinedInput from '@mui/material/OutlinedInput';

const Input = styled('input')({
  display:'none'
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const api = new VenueAPI();

const AdminVenuePage = () => {
  const [venueList, setVenueList] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [image, setImage] = React.useState('');
  const [Front_seats,setFrontSeats] = React.useState('');
  const [Middle_seats,setMiddleSeats] = React.useState('');
  const [Back_seats,setBackSeats] = React.useState('');

  const handleCreate = () => {
    const data = {'seating':[{'seating_type':'Front','seating_number':parseInt(Front_seats)},{'seating_type':'Middle','seating_number':parseInt(Middle_seats)},{'seating_type':'Back','seating_number':parseInt(Back_seats)}], 
                    'venue_name':name, 'venue_desc':desc, 'venue_address':address, 'venue_img':'url'}
    console.log(data)
    api
      .addVenue(data)
      .then((response) => alert("Successfully done"))
      .then(() => {
        setName(''); setDesc(''); setAddress(''); setImage(''); setFrontSeats('');
        setMiddleSeats(''); setBackSeats('');
        setVenueList([...venueList,data]);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  }

  const onFileChange = (event) => {
    
      // Update the state
      //console.log(event.target.files)
      setImage(event.target.files[0]);
      //console.log(image)
    };

  const handleChangeFront = (event) => {
    setFrontSeats(event.target.value);
  };

  const handleChangeMiddle = (event) => {
    setMiddleSeats(event.target.value);
  };

  const handleChangeBack = (event) => {
    setBackSeats(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api
      .getVenueList()
      .then((response) => setVenueList(response.data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <PageContainer maxWidth='false' direction='row'>

      <Box sx={{ flexGrow: 1 }}>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Typography variant="h6" component="span" gutterBottom>
                All Venues
          </Typography>
          <Button variant="contained" size="small" color="success" onClick={handleClickOpen}>
              Create Venue
          </Button>
        </Stack>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Fill Venue Details</DialogTitle>
            <DialogContent>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <FormControl>
                      <InputLabel htmlFor="component-outlined">Name</InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        value={name}
                        onChange={handleChangeName}
                        label="Name"
                      />
                    </FormControl>
                    <FormControl style={{marginLeft:'10px', width:'300px'}}>
                      <InputLabel htmlFor="component-outlined">Address</InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        value={address}
                        onChange={handleChangeAddress}
                        label="Address"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Description"
                      multiline
                      rows={3}
                      value={desc}
                      onChange={handleChangeDesc}
                      fullWidth
                    />
                  </div>
                  <div>
                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" type="file" onChange={onFileChange}/>
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                    <Typography variant="caption"  style={{marginLeft:'10px'}}gutterBottom>
                      {image && image.name}
                    </Typography>
                  </div>
                  <div style ={{'marginTop':'20px'}}>
                    <Typography variant="h6"  style={{marginTop:'10px'}}gutterBottom>
                      Venue Seatings
                    </Typography>
                  </div>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    style ={{'marginTop':'10px'}}
                  >
                      <FormControl>
                        <InputLabel htmlFor="component-outlined">Front Seats</InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          value={Front_seats}
                          onChange={handleChangeFront}
                          label="Front Seats"
                        />
                      </FormControl>
                    
                      <FormControl>
                        <InputLabel htmlFor="component-outlined">Middle Seats</InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          value={Middle_seats}
                          onChange={handleChangeMiddle}
                          label="Middle Seats"
                        />
                      </FormControl>
                    
                      <FormControl>
                        <InputLabel htmlFor="component-outlined">Back Seats</InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          value={Back_seats}
                          onChange={handleChangeBack}
                          label="Back Seats"
                        />
                      </FormControl>
                    
                  </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
        {
          venueList.map((venue) => {
            return (
              <Card key={venue.venue_id} sx={{ maxWidth: 345 }} style={{margin:'20px'}}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {venue.venue_name.toUpperCase().charAt(0)}
                    </Avatar>
                  }
                  title={venue.venue_name}
                  subheader={venue.venue_address}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={process.env.PUBLIC_URL + '/img/venues/' + venue.venue_img}
                  alt="Venue_img"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {venue.venue_desc}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Typography pvariant="body2" color="text.secondary">
                    Venue Seatings
                  </Typography>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      {
                        venue.seating.map((seating) => {
                          return <Item> {seating.seating_type.toUpperCase()} : {seating.seating_number}</Item>
                        })
                      }
                    </Stack>
                  </CardContent>
                </Collapse>
              </Card>
            )
          })
        }
        
      </Box>
    </PageContainer>
  )
}

export default AdminVenuePage