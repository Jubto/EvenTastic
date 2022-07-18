import { ScrollContainer } from "../../styles/layouts.styled"
import {Card,CardHeader,Avatar,CardContent,Typography,Rating} from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect,useState } from "react";
import AccountAPI from '../../../utils/AccountAPIHelper';

const account_api = new AccountAPI();

const ReviewListPage = ({reviews}) => {

  const [accDetails, setAccDetails] = useState([])

  useEffect(()=>{
    var acc_details = []
    reviews.map((review,index)=>{
      const id = review.reviewer_account_id
      account_api.
      getAccount(id)
      .then((response)=>{
        const data = response.data;
        acc_details = [...acc_details,{account_name:data.first_name+" "+data.last_name}]
        setAccDetails(acc_details)
      })
      .catch((err)=>console.log(err))
    })
  },[reviews])

  useEffect(()=>{
    console.log(accDetails)
  },[accDetails])

  return (
    <ScrollContainer thin>
      {
        accDetails.length===reviews.length && reviews.map((review,index)=>{
          return (
          <Card key={index} style={{margin:'20px'}} elevation={3}>
            <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {accDetails[index]['account_name'].toUpperCase()[0]}
                    </Avatar>

                  }
                  title={accDetails[index]['account_name']}
                  subheader={<Rating name="read-only" value={review.rating} readOnly />}
                />
            <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {review.review_text}
                  </Typography>
            </CardContent>
          </Card>
          )
        })
      }
    </ScrollContainer>
  )
}

export default ReviewListPage