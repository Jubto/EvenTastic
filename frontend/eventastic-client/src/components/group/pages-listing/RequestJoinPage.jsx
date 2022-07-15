import { useState } from "react";
import GroupAPI from "../../../utils/GroupAPIHelper";
import InfoHeader from "../../account/styles/InfoHeader";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled"
import { Box, Button, Chip, TextField, Typography, styled } from "@mui/material"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const api = new GroupAPI()

const ImageHolder = styled('div')`
  margin-right: 1rem;
  width: 380px;
  height: 380px;
`

const Image = styled('img')`
  width: 100%;
  height: 100%;
`

const RequestJoinPage = ({ setPage, setGroupList, group, account }) => {
  const [formErrors, setFormErrors] = useState({
    error: false,
    joinRequest: false,
  })

  const handleSelect = () => {
    console.log('TODO remove tag')
  }

  const handleSubmit = async (event) => {
    console.log('FORM')
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const joinRequest = data.get('joinRequest')

    formErrors.error = false;
    if (!joinRequest) {
      setFormErrors(prevState => { return { ...prevState, joinRequest: true } })
      formErrors.error = true
    }

    if (!formErrors.error) {
      try {
        let request = {
          group_id: group.group_id,
          account_id: account.account_id,
          interest_tags: account.tags,
          join_desc: joinRequest,
          join_status: "Pending"
        }
        const requestRes = await api.postGroupMember(group.group_id, request)
        // const groupMembers = [...group.group_members, requestRes.data]
        console.log('group was:')
        console.log(group)
        const prevMembers = group.group_members
        group = {
          ...group,
          group_members: [...prevMembers, requestRes.data]
        }
        console.log('now')
        console.log(group)
        setGroupList(prevState => 
          { return [...prevState.filter((prevGroup) => prevGroup.group_id !== group.group_id), group] })
        setPage('listGroups')
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <ScrollContainer thin pr='1vw' height='97%'>
      <FlexBox>
        <Typography variant='subtitle1' sx={{ color: 'evenTastic.grey', fontWeight: 1000, mb: 2, mr: 1 }}>
          {group.group_name}
        </Typography>
        <Chip icon={<PeopleAltIcon />} label={group.group_members.length} />
      </FlexBox>
      <FlexBox wrap='true' sx={{ mb: 2 }}>
        <ImageHolder>
          <Image src={group.group_img} alt='group thumbnail' />
        </ImageHolder>
        <FlexBox direction='column' sx={{ maxWidth: '900px', width: { sm: '100%', md: '60vw' } }} >
          <InfoHeader title='Group description' />
          <Typography variant='body1'>
            {group.group_desc}
          </Typography>
        </FlexBox>
      </FlexBox>
      <InfoHeader title='Join Request Form' />
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          name="joinRequest"
          required
          fullWidth
          multiline
          rows={5}
          id="joinRequest"
          label="Join Request"
          placeholder='Introduce yourself, why do you want to join this group?'
          onChange={() => {
            formErrors.joinRequest && setFormErrors(prevState => { return { ...prevState, joinRequest: false } })
          }}
          error={formErrors.joinRequest}
          helperText={formErrors.joinRequest ? 'Cannot be empty.' : ''}
        />
        <Typography variant='subtitle1' sx={{ color: 'evenTastic.grey', fontWeight: 1000, mb: 2, mr: 1 }}>
          Your Interests
        </Typography>
        <ScrollContainer thin sx={{ height: '50px' }}>
          {account.tags.map((tag, idx) => (
            <Chip key={idx} clickable label={tag.name}
              onClick={handleSelect} sx={{ m: 0.5 }} />
          ))}
        </ScrollContainer>
        <Button variant='contained' color='success' type='submit' sx={{ mt: 2 }}>
          Submit Join Request
        </Button>
      </Box>

    </ScrollContainer>
  )
}

export default RequestJoinPage