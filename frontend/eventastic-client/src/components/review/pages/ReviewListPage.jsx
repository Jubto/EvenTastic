import { ScrollContainer } from "../../styles/layouts.styled"
import {Card,CardHeader,Avatar,CardContent,Typography,Rating, CardActions,
          Fab,Divider,Stack,Paper} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagSharpIcon from '@mui/icons-material/FlagSharp';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { red } from '@mui/material/colors';
import { useEffect,useState } from "react";
import AccountAPI from '../../../utils/AccountAPIHelper';
import ReviewAPI from '../../../utils/ReviewAPIHelper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const account_api = new AccountAPI();
const review_api = new ReviewAPI();

const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function formatDate(datetime) {
  let d = new Date(datetime);
  return d.toLocaleDateString("en-US", dateFormat)
}

const ReviewListPage = ({reviews, setReviews, account}) => {

  const [accDetails, setAccDetails] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    var acc_details = []
    //console.log(reviews)
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

  const handleUpvote = (review,index) => {
    //console.log(review)
    var upvote_count = review.upvotes;
    if(Object.keys(review.review_interaction).length === 0)
    {
      upvote_count = upvote_count + 1;
      const postBody = {"interaction_account_id":account.account_id, "review_flagged":false,"review_id":review.review_id,"review_upvoted":true}
      review_api
      .postReviewInteraction(postBody)
      .catch((err)=>console.log(err))
      reviews[index].review_interaction = postBody
    }else{
      if(review.review_interaction.review_upvoted===false)
      {
        upvote_count = upvote_count + 1;
      }else{
        upvote_count = upvote_count - 1;
      }
      review_api
      .putReviewInteraction(review.review_interaction.interaction_id,{"review_upvoted":!review.review_interaction.review_upvoted})
      .catch((err)=>console.log(err))
      reviews[index].review_interaction.review_upvoted = !review.review_interaction.review_upvoted
    }
    review_api
    .putReview(review.review_id,{"upvotes":upvote_count})
    .catch((err)=>console.log(err)) 
    reviews[index].upvotes = upvote_count;
    setReviews(reviews)
    setRefresh(!refresh)
  }

  const handleFlag = (review,index) => {
    var flag_count = review.flag_count;
    if(Object.keys(review.review_interaction).length === 0)
    {
      flag_count = flag_count + 1;
      const postBody = {"interaction_account_id":account.account_id, "review_flagged":true,"review_id":review.review_id,"review_upvoted":false}
      review_api
      .postReviewInteraction(postBody)
      .catch((err)=>console.log(err))
      reviews[index].review_interaction = postBody
    }else{
      if(review.review_interaction.review_flagged===false)
      {
        flag_count = flag_count + 1;
      }else{
        flag_count = flag_count - 1;
      }
      review_api
      .putReviewInteraction(review.review_interaction.interaction_id,{"review_flagged":!review.review_interaction.review_flagged})
      .catch((err)=>console.log(err))
      reviews[index].review_interaction.review_flagged = !review.review_interaction.review_flagged
    }
    review_api
    .putReview(review.review_id,{"flag_count":flag_count})
    .catch((err)=>console.log(err)) 
    reviews[index].flag_count = flag_count;
    setReviews(reviews)
    setRefresh(!refresh)
  }

  return (
    <ScrollContainer thin>
      {
        (refresh || !refresh) && accDetails.length===reviews.length && reviews.map((review,index)=>{
          return (
          <Card key={index} style={{margin:'20px'}} elevation={3}>
            <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {accDetails[index]['account_name'].toUpperCase()[0]}
                    </Avatar>

                  }
                  title={ 
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography>
                          {accDetails[index]['account_name']}
                      </Typography>   
                      
                      <Item>
                          {formatDate(review.review_timestamp)}
                      </Item> 
                    </Stack>
          }
                  subheader={<Rating name="read-only" value={review.rating} readOnly />}
                />
            <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {review.review_text}
                  </Typography>
                  <Divider style={{marginTop:'20px'}}/>
            </CardContent>
            <CardActions>
              <Typography>
                Upvotes:
              </Typography>
              <Fab color='secondary' style={{width:'55px',height:'25px',marginLeft:'5px'}} aria-label="like"
                onClick={()=>handleUpvote(review,index)}>
                { Object.keys(review.review_interaction).length === 0 || review.review_interaction.review_upvoted===false ? 
                    <FavoriteIcon style={{width:'20px',height:'20px'}} />
                    :
                    <DoneSharpIcon style={{width:'20px',height:'20px'}} />
                }
                <Typography style={{marginLeft:'5%'}}>
                  {review.upvotes}
                </Typography>
              </Fab>

              <Typography style={{marginLeft:'20px'}}>
                Flag Count:
              </Typography>
              <Fab color='warning' style={{width:'55px',height:'25px',marginLeft:'5px'}} aria-label="like"
                onClick={()=>handleFlag(review,index)}>
                { Object.keys(review.review_interaction).length === 0 || review.review_interaction.review_flagged===false? 
                    <FlagSharpIcon style={{width:'20px',height:'20px'}} />
                    :
                    <DoneSharpIcon style={{width:'20px',height:'20px'}} />
                }
                <Typography style={{marginLeft:'5%'}}>
                  {review.flag_count}
                </Typography>
              </Fab>
            </CardActions>
          </Card>
          )
        })
      }
    </ScrollContainer>
  )
}

export default ReviewListPage