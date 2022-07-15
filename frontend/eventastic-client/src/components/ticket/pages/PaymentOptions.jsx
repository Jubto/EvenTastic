import { ScrollContainer } from "../../styles/layouts.styled"
import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

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

const PaymentOptions = ({ setPage }) => {

  const [paymentOption, setPaymentOption] = useState("Card")

  const changePaymentOption = (e) => {
    setPaymentOption(e.target.value)
  }

  return (
    <ScrollContainer hide height='100%' sx={{ width: '60%' }}>
      <MainBox>
        <ContentBox >
          <div style={{  marginBottom: '20px'}}>
            <b>Payment Options:</b>
          </div>
          <div style={{ marginLeft:'30%', marginTop: '10%' }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="payment-options-radio-buttons-group"
                name="payment-options-radio-buttons"
                value={paymentOption}
                onChange={changePaymentOption}
              >
                <FormControlLabel value="Card" control={<Radio />} label="Card" />
                {/*<FormControlLabel value="Rewards" control={<Radio />} label="Rewards" />*/}
              </RadioGroup>
            </FormControl>
          </div>

        </ContentBox>
        <ButtonBox>
          <Button variant='contained' onClick={() => setPage('cardDetails')}>
            next
          </Button>
          <Button variant='contained' onClick={() => setPage('selection')}>
            back
          </Button>
        </ButtonBox>
      </MainBox>
    </ScrollContainer>
  )
}

export default PaymentOptions