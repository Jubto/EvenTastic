import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import eventTags from '../event_tags'
import { StoreContext } from '../utils/context';
import OutlinedInput from '@mui/material/OutlinedInput';
import VenueAPI from "../utils/VenueAPIHelper";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import NotHostErrorModal from "../components/event/modals/NotHostErrorModal";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl, FormHelperText, Chip,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

const steps = ['Basic Info', 'Details', 'Tickets','Preview/Submit'];
const Input = styled('input')({
    display:'none'
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const venue_api = new VenueAPI();

const CreateEventPage = () => {
  const [venueList, setVenueList] = React.useState([])
  const [tags,setTags] = React.useState([]) 
  const [locationImg,setLocationImg] = React.useState("") 
  const [activeStep, setActiveStep] = React.useState(0);
  const context = React.useContext(StoreContext);
  const [hostDetails] = context.host;
  const [datevalue, setDateValue] = React.useState(new Date());
  const [enddatevalue, setEndDateValue] = React.useState(new Date());
  const [uploadimg, setUploadImage] = React.useState({});
  const [uploadimgurl, setUploadImageUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [formDetails, setFormDetails] = React.useState({
    event_title: "",
    event_category: "",
    event_tags: [],
    event_location: "",
    venue_id: null,
    event_start_datetime: "",
    event_end_datetime: "",
    event_short_desc: "",
    event_desc: ""
  });
  
  
  const [formErrors, setformErrors] = React.useState({
    error: false,
    event_title: false,
    event_category: false,
    event_tags: false,
    event_location: false,
    event_short_desc: false,
    event_desc: false
  })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    console.log(formDetails)

    formErrors.error = false;
    if(activeStep === 0)
    {
      
      if (!/\S+/.test(formDetails.event_title)) {
        setformErrors(prevState => { return { ...prevState, event_title: true } })
        formErrors.error = true
      }
      
      if (formDetails.event_category === "") {
        setformErrors(prevState => { return { ...prevState, event_category: true } })
        formErrors.error = true
      }
      
      if (formDetails.event_tags.length === 0) {
        setformErrors(prevState => { return { ...prevState, event_tags: true } })
        formErrors.error = true
      }
      
      if (formDetails.event_location === "") {
        setformErrors(prevState => { return { ...prevState, event_location: true } })
        formErrors.error = true
      }
      
      if (formDetails.event_start_datetime === "") {
        setformErrors(prevState => { return { ...prevState, event_start_datetime: true } })
        formErrors.error = true
      }
    
    }
    else if(activeStep === 1)
    {
      if (!/\S+/.test(formDetails.event_desc)) {
        setformErrors(prevState => { return { ...prevState, event_desc: true } })
        formErrors.error = true
      }

      if (!/\S+/.test(formDetails.event_short_desc)) {
        setformErrors(prevState => { return { ...prevState, event_short_desc: true } })
        formErrors.error = true
      }
    }
    
    if(!formErrors.error)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleSubmit = () => {
    
  }

  React.useEffect(() => {
    if (!hostDetails || hostDetails.host_status !== 'Approved') {
      setOpen(true)
    }
    else{
      venue_api
      .getVenueList()
      .then((response) => setVenueList(response.data))
      .catch((err) => console.log(err));
    }
    
  }, [])

  return (
    <Box sx={{ flexGrow: 1, paddingLeft:'15%',paddingRight:'15%' }}>
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>
              {
                  activeStep === 0 ?
                      <Grid container direction='column'>
                        <Grid item sx={{width:'50%',margin:'25px',marginBottom:'1px'}}>
                          <TextField
                            name="event_title"
                            required
                            fullWidth
                            value={formDetails.event_title}
                            id="event_title"
                            label="Event Title"
                            autoFocus
                            onChange={(event) => {
                              setFormDetails(prevState => { return {...prevState, event_title: event.target.value}}) 
                              if(formErrors.event_title === true){
                                setformErrors(prevState => { return { ...prevState, event_title: false } })
                              }
                              
                            }}
                            error={formErrors.event_title}
                            helperText={formErrors.event_title ? 'Title can only have alphabets,spaces and apostrophes' : ''}
                          />
                        </Grid>
                        <Grid item sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <TextField
                            name="org_name"
                            fullWidth
                            id="org_name"
                            label="Organisation Name"
                            autoFocus
                            defaultValue={hostDetails.org_name}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={4}>
                            <FormControl fullWidth error={formErrors.event_category}>
                              <InputLabel id="Category-label">Category</InputLabel>
                              <Select
                                labelId="Category-label"
                                id="Category"
                                value={formDetails.event_category}
                                label="Category"
                                onChange={(event)=>{
                                  setFormDetails((prevState)=>{return {...prevState,event_category:event.target.value,event_tags:[]}})
                                  if(formErrors.event_category === true){
                                    setformErrors(prevState => { return { ...prevState, event_category: false } })
                                  }
                                  
                      
                                }}
                              >
                                {
                                  eventTags.eventCategories.map((category)=>{
                                    return <MenuItem value={category}>{category}</MenuItem>
                                  })
                                }
    
                              </Select> 
                              {formErrors.event_category && <FormHelperText>Please choose a Category</FormHelperText> }
                            </FormControl>
                          </Grid>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={6}>
                            {
                              formDetails.event_category && 
                            <FormControl fullWidth error={formErrors.event_tags}>
                              <InputLabel id="tags-label">Tags</InputLabel>
                              <Select
                                labelId="tags-label"
                                id="tags-chip"
                                multiple
                                value={formDetails.event_tags}
                                onChange={(event)=>{
                                  const {
                                    target: { value },
                                  } = event;
                                  setFormDetails((prevState)=>{return {...prevState,event_tags:typeof value === 'string' ? value.split(',') : value}})
                                  if(formErrors.event_tags === true){
                                    setformErrors(prevState => { return { ...prevState, event_tags: false } })
                                  }
                                  
                                }}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              >
                                {
                                  eventTags.eventTagsByCategory.filter((cat)=>cat.cat_name === formDetails.event_category)[0].tags.map((tag)=>{
                                    return <MenuItem value={tag.tag_name}>{tag.tag_name}</MenuItem>
                                  })
                                }
                                
                              </Select>
                              {formErrors.event_tags && <FormHelperText>Select atleast one tag</FormHelperText> }
                            </FormControl>
                            }
                          </Grid>
                        </Grid>

                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={3} style={{paddingTop:"10px"}}>
                            <Typography variant="subtitle1" gutterBottom component="div" >
                              Select Event Venue:
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <FormControl fullWidth error={formErrors.event_location}>
                              <InputLabel id="venue-label">Venues</InputLabel>
                              <Select
                                labelId="venue-label"
                                id="Venue"
                                value={formDetails.event_location}
                                label="Venue"
                                onChange={(event)=>{
                                  var val = event.target.value
                                  //console.log(val)
                                  var selected_venue = venueList.filter((venue)=>venue.venue_name === val)[0]
                                  //console.log(selected_venue)
                                  setFormDetails((prevState)=>{return {...prevState,event_location:selected_venue.venue_name,venue_id:selected_venue.venue_id}})
                                  if(formErrors.event_location === true){
                                    setformErrors(prevState => { return { ...prevState, event_location: false } })
                                  }
                                  setLocationImg(selected_venue.venue_img)
                                }}
                              >
                                {
                                  venueList.map((venue)=>{
                                    return <MenuItem value={venue.venue_name} key={venue.venue_id}>
                                      {venue.venue_name}
                                      </MenuItem>
                                  })
                                  
                                }
    
                              </Select> 
                              {formErrors.event_location && <FormHelperText>Please choose a Location</FormHelperText> }
                            </FormControl>
                          </Grid>
                        </Grid>

                        {
                          locationImg!=="" &&
                            <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                              <Grid item xs={3}></Grid>
                              <Grid item>
                                <img
                                  src={process.env.PUBLIC_URL + '/img/venues/' + locationImg}
                                  alt={"Venue Image Not Loaded"}
                                  loading="lazy"
                                  width='300px'
                                  height='250px'
                                />
                              </Grid>
                            </Grid>
                        }

                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={3} style={{paddingTop:"10px"}}>
                            <Typography variant="subtitle1" gutterBottom component="div" >
                              Select Start DateTime:
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DateTimePicker"
                                value={datevalue}
                                onChange={(newValue) => {
                                  var tzoffset = (new Date()).getTimezoneOffset() * 60000;
                                  var localISOTime = (new Date(newValue - tzoffset)).toISOString().slice(0, -5);
                                  setDateValue(newValue);
                                  setFormDetails((prevState)=>{return {...prevState,event_start_datetime: localISOTime+"+10:00"}})
                                  setEndDateValue(newValue)
                                }}
                              />
                            </LocalizationProvider>
                            
                          </Grid>
                        </Grid>
                        
                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={3} style={{paddingTop:"10px"}}>
                            <Typography variant="subtitle1" gutterBottom component="div" >
                              Select End DateTime:
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DateTimePicker"
                                value={enddatevalue}
                                onChange={(newValue) => {
                                  var tzoffset = (new Date()).getTimezoneOffset() * 60000;
                                  var localISOTime = (new Date(newValue - tzoffset)).toISOString().slice(0, -5);
                                  setEndDateValue(newValue);
                                  setFormDetails((prevState)=>{return {...prevState,event_end_datetime: localISOTime+"+10:00"}})
                                }}
                              />
                            </LocalizationProvider>
                            
                          </Grid>
                        </Grid>

                      </Grid> 
                :     
                activeStep === 1 ?
                      <Grid container direction='column'>
                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={3} style={{paddingTop:"10px"}}>
                            <Typography variant="subtitle1" gutterBottom component="div" >
                              Add Event Image:
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={4}>
                            <label htmlFor="contained-button-file">
                              <Input accept="image/*" id="contained-button-file" type="file" onChange={(e)=>{
                                setUploadImage(e.target.files[0])
                                console.log(URL.createObjectURL(e.target.files[0]))
                              }}/>
                              <Button variant="contained" component="span">
                                Upload Image
                              </Button>
                            </label>
                          </Grid>
                        </Grid>

                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <Grid item xs={3} style={{paddingTop:"10px"}}>
                            <Typography variant="subtitle1" gutterBottom component="div" >
                              Event Details:
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <TextField
                            name="event_short_desc"
                            required
                            fullWidth
                            value={formDetails.event_short_desc}
                            id="event_short_desc"
                            label="Event Summary"
                            autoFocus
                            onChange={(event) => {
                              setFormDetails(prevState => { return {...prevState, event_short_desc: event.target.value}}) 
                              if(formErrors.event_short_desc === true){
                                setformErrors(prevState => { return { ...prevState, event_short_desc: false } })
                              }
                              
                            }}
                            error={formErrors.event_short_desc}
                            helperText={formErrors.event_short_desc ? 'Summary field is required' : ''}
                          />
                        </Grid>

                        <Grid container direction='row' sx={{width:'100%',margin:'25px',marginBottom:'1px'}}>
                          <TextField
                            name="event_desc"
                            required
                            fullWidth
                            value={formDetails.event_desc}
                            id="event_desc"
                            label="Event Description"
                            autoFocus
                            multiline
                            rows={5}
                            onChange={(event) => {
                              setFormDetails(prevState => { return {...prevState, event_desc: event.target.value}}) 
                              if(formErrors.event_desc === true){
                                setformErrors(prevState => { return { ...prevState, event_desc: false } })
                              }
                              
                            }}
                            error={formErrors.event_desc}
                            helperText={formErrors.event_desc ? 'Description field is required' : ''}
                          />
                        </Grid>
                      </Grid>
                       
                  : 
                  activeStep === 2 ?
                      <Grid container direction='column'>
                        
                      </Grid>
                  :
                  
                  activeStep === 3 &&
                      <>
                      {console.log(activeStep)}
                      </>
                    
                   
                }
              
              
              <Grid container direction="row" spacing={2}>
                  <Grid item md={1}></Grid>
                  <Grid item md={5}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                  </Grid>
                  <Grid item md={5}></Grid>
                <Grid item md={1}>
                  {
                    
                      activeStep <= steps.length - 2
                      ?
                         (
                          <Button onClick={handleNext}>
                            Next
                          </Button>
                        )
                      :
                        (
                          <Button type='submit' >
                            Submit
                          </Button>
                        )
              
                  }
                </Grid>
              </Grid>
        </Grid>
        <NotHostErrorModal open={open} setOpen={setOpen}/>
    </Box>
  )
}

export default CreateEventPage