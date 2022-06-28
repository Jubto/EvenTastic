import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

const eventCategories = ["Music", "Business", "Food & Drink", "Community", "Arts", "Film & Media",
  "Sports & Fitness", "Health", "Science & Tech", "Travel & Outdoor", "Charity & Causes",
  "Spirituality", "Family & Education", "Seasonal", "Government", "Fashion", "Home & Lifestyle",
  "Auto, Boat & Air", "Hobbies", "School Activities"]

const SearchBar = () => {
  const [formValues, setFormValues] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    // do nothing
  };
  
  const createMenu = (item) => {
    return (
      <MenuItem
        key={item}
        value={item}
      >{item}
      </MenuItem>
    );
  }

  return (
    <div>
      <Accordion sx={{ width: '200%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SearchIcon/>
          <Typography>Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  id="event-title"
                  name="event_title"
                  label="Event Title"
                  type="text"
                  sx={{ width: '100%' }}
                  value={formValues.event_title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="event-desc"
                  name="event_desc"
                  label="Event Description"
                  type="text"
                  sx={{ width: '100%' }}
                  value={formValues.event_desc}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="event-type-label">Event Type</InputLabel>
                  <Select
                    labelId="event-type-select-label"
                    name="event_category"
                    id="event-type-select"
                    value={formValues.event_category}
                    label="Event Type"
                    onChange={handleInputChange}
                  >
                    {eventCategories.map(createMenu)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SearchBar