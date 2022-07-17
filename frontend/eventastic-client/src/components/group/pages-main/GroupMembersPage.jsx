import { useEffect, useContext, useState } from "react"
import { StoreContext } from "../../../utils/context"
import AccountAPI from "../../../utils/AccountAPIHelper";
import GroupAPI from "../../../utils/GroupAPIHelper";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled";
import { Button, Card, CardMedia, Chip, Typography } from "@mui/material";

const accountApi = new AccountAPI()
const groupApi = new GroupAPI()

const MemberCard = ({ groupDetails, member, setHasLeftGroup }) => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [memberAccount, setMemberAccount] = useState(false)
  const [leaveButton, setLeaveButton] = useState(false)
  const [groupAdmin, setGroupAdmin] = useState(false)

  const processRequest = async (status) => {
    try {
      const body = {
        op: "replace",
        path: "/join_status",
        value: status
      }
      console.log(body)
      const patchRes = await groupApi.patchGroupMember(
        groupDetails.group_id, member.group_membership_id, body
      )
      setHasLeftGroup(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (account.account_id === member.account_id && account.account_id !== groupDetails.group_host_id) {
      setLeaveButton(true)
    }
    member.account_id === groupDetails.group_host_id && setGroupAdmin(true)
    accountApi.getAccount(member.account_id)
      .then((res) => {
        setMemberAccount(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <Card sx={{
      display: 'flex', borderRadius: '10px', height: '20vh',
      bgcolor: '#fff7ec', m: 3, p: 1
    }}
    >
      <CardMedia component="img" image={memberAccount.profile_pic}
        alt="User profile picture"
        sx={{ width: '15%', height: '100%', borderRadius: '100px', mr: 2 }}
      />
      <FlexBox direction='column' width="85%" >
        <FlexBox>
          <FlexBox direction='column' sx={{ minWidth: '15%'  }}>
            <Typography variant="subtitle1" color="text.secondary">
              Name
            </Typography>
            <Typography>
              {memberAccount.first_name} {memberAccount.last_name}
            </Typography>
          </FlexBox>
          <FlexBox direction='column' sx={{ width: '65%' }}>
            <Typography variant="subtitle1" color="text.secondary">
              Interests
            </Typography>
            <ScrollContainer thin horizontal='true' sx={{ pb: 0.25 }}>
              {member.interest_tags.map((tag, idx) => (
                <Chip key={idx} color='success' label={tag.name} sx={{ ml: 0.5, mr: 0.5 }} />
              ))}
            </ScrollContainer>
          </FlexBox>
          {leaveButton
            ? <Button variant='contained' color='error'
              onClick={() => processRequest('Rejected')} sx={{ width: '15%', height: '3vh', ml:2 }}
            >
              Leave Group
            </Button>
            : ''
          }
          {groupAdmin
            ? <FlexBox direction='column' sx={{ width: '12%', ml:4 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Position
              </Typography>
              <Typography variant='h6' >
                Group Admin
              </Typography>
            </FlexBox>
            : ''
          }
        </FlexBox>
        <ScrollContainer thin pr='1vw' sx={{ width: '97%' }} >
          <FlexBox direction='column' sx={{ mr: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              My bio
            </Typography>
            <Typography>
              {memberAccount.user_desc}
            </Typography>
          </FlexBox>
        </ScrollContainer>
      </FlexBox>
    </Card>
  )
}


const GroupMembersPage = ({ groupDetails, setGroupDetails, setHasLeftGroup }) => {

  useEffect(() => {
    groupApi.getGroup(groupDetails.group_id)
      .then((res) => {
        setGroupDetails(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <ScrollContainer thin pr='1vw'>
      {groupDetails.group_members &&
      groupDetails.group_members.filter((member) => member.join_status === 'Accepted').map((member, idx) => (
        <MemberCard
          key={idx}
          groupDetails={groupDetails}
          member={member}
          setHasLeftGroup={setHasLeftGroup}
        />
      ))}
    </ScrollContainer>
  )
}

export default GroupMembersPage