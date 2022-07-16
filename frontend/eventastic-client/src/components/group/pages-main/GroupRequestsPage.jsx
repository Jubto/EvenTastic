import { useEffect, useContext } from "react"
import { StoreContext } from "../../../utils/context"
import GroupAPI from "../../../utils/GroupAPIHelper";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled";

const api = new GroupAPI()

const GroupRequestsPage = ({ groupDetails, setGroupDetails, eventID }) => {
  const context = useContext(StoreContext);
  const [accountGroups, setAccountGroups] = context.groups;


  useEffect(() => {
    api.getGroup(groupDetails.group_id)
    .then((res) => {
      
    })
  }, [])

  return (
    <ScrollContainer>
      GroupRequestsPage
    </ScrollContainer>
  )
}

export default GroupRequestsPage