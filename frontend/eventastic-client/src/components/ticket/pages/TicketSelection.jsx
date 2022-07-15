import { useState, useEffect } from 'react';
import { ScrollContainer } from "../../styles/layouts.styled"
import { Button, InputLabel, Select, MenuItem } from "@mui/material"
import { styled } from '@mui/material/styles';

const MainBox = styled('div')`
  width: 100%;
  margin-left: 50px;
`;

const ContentBox = styled('div')`
  width: 60%;
  height: 70%;
  min-height: 350px;
`;

const ButtonBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const SeatsBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const TicketSelection = ({ open, setPage, generalSeats, frontSeats, middleSeats, backSeats, 
  setGeneralSeats, setFrontSeats, setMiddleSeats, setBackSeats,
  maxGeneralSeats, maxFrontSeats, maxMiddleSeats, maxBackSeats,
  generalPrice, frontPrice, middlePrice, backPrice, setTotalCost }) => {

    const changeGeneralSelect = (e) => {
      setGeneralSeats(e.target.value)
      setTotalCost(((generalPrice*e.target.value + frontPrice*frontSeats + middlePrice*middleSeats + backPrice*backSeats) * 1.03).toFixed(2))
    }
    const changeFrontSelect = (e) => {
      setFrontSeats(e.target.value)
      setTotalCost(((generalPrice*generalSeats + frontPrice*e.target.value + middlePrice*middleSeats + backPrice*backSeats) * 1.03).toFixed(2))
    }
    const changeMiddleSelect = (e) => {
      setMiddleSeats(e.target.value)
      setTotalCost(((generalPrice*generalSeats + frontPrice*frontSeats + middlePrice*e.target.value + backPrice*backSeats) * 1.03).toFixed(2))
    }
    const changeBackSelect = (e) => {
      setBackSeats(e.target.value)
      setTotalCost(((generalPrice*generalSeats + frontPrice*frontSeats + middlePrice*middleSeats + backPrice*e.target.value) * 1.03).toFixed(2))
    }

  return (
    <ScrollContainer hide height='100%' sx={{ width: '60%' }}>   
      <MainBox>
        <ContentBox >
          <div style={{  marginBottom: '20px'}}>
            <b>Seat Selection:</b>
          </div>
          <div>
            <SeatsBox>
              <div>
                General Seats: 
                <br></br>
                A$ {generalPrice}
              </div>
              <div>
                <Select
                  labelId="seats-select-label"
                  id="seats-select"
                  value={generalSeats}
                  label="General Seats"
                  onChange={changeGeneralSelect}
                >
                <MenuItem value={0}>0</MenuItem>
                {maxGeneralSeats.map((idx) => <MenuItem key={idx} value={idx}>{idx}</MenuItem>)}
                </Select>
              </div>
            </SeatsBox>

            <SeatsBox>
              <div>
                Front Seats: 
                <br></br>
                A$ {frontPrice}
              </div>
              <div>
                <Select
                  labelId="front-seats-select-label"
                  id="front-seats-select"
                  value={frontSeats}
                  label="Front Seats"
                  onChange={changeFrontSelect}
                >
                <MenuItem value={0}>0</MenuItem>
                {maxFrontSeats.map((idx) => <MenuItem key={idx} value={idx}>{idx}</MenuItem>)}
                </Select>
              </div>
            </SeatsBox>

            <SeatsBox>
              <div>
                Middle Seats: 
                <br></br>
                A$ {middlePrice}
              </div>
              <div>
                <Select
                  labelId="middle-seats-select-label"
                  id="middle-seats-select"
                  value={middleSeats}
                  label="Middle Seats"
                  onChange={changeMiddleSelect}
                >
                <MenuItem value={0}>0</MenuItem>
                {maxMiddleSeats.map((idx) => <MenuItem key={idx} value={idx}>{idx}</MenuItem>)}
                </Select>
              </div>
            </SeatsBox>

            <SeatsBox>
              <div>
                Back Seats: 
                <br></br>
                A$ {backPrice}
              </div>
              <div>
                <Select
                  labelId="back-seats-select-label"
                  id="back-seats-select"
                  value={backSeats}
                  label="Back Seats"
                  onChange={changeBackSelect}
                >
                <MenuItem value={0}>0</MenuItem>
                {maxBackSeats.map((idx) => <MenuItem key={idx} value={idx}>{idx}</MenuItem>)}
                </Select>
              </div>
            </SeatsBox>

          </div>
          <br></br>
        </ContentBox>
        <ButtonBox>
          <Button variant='contained' onClick={() => setPage('paymentOptions')}>
            checkout
          </Button>
        </ButtonBox>
      </MainBox>   
    </ScrollContainer>
  )
}

export default TicketSelection
