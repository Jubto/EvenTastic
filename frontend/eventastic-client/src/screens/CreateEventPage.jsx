import { useContext, useEffect, useState } from "react"
import { StoreContext } from '../utils/context';
import NotHostErrorModal from "../components/event/modals/NotHostErrorModal";
import CreateEventBreadCrumbs from "../components/event/CreateEventBreadCrumbs"
import CreateEventMain from "../components/event/CreateEventMain"
import { FlexBox, PageContainer } from "../components/styles/layouts.styled"
import { Typography } from "@mui/material"

const CreateEventPage = () => {
  const context = useContext(StoreContext);
  const [hostDetails] = context.host;
  const [createPage, setCreatePage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hostDetails || hostDetails.host_status !== 'Approved') {
      setOpen(true)
    }
  }, [])

  return (
    <PageContainer align='center' maxWidth='lg'>
      <FlexBox wrap='wrap' justify='center' sx={{width:'100%', mt:-1, mb:-1}}>
        <Typography variant='h4' sx={{color:'evenTastic.dull', mb:-1}}>
          Create new event
        </Typography>
        <CreateEventBreadCrumbs page={createPage} changePage={setCreatePage}/>
      </FlexBox>
      <CreateEventMain page={createPage} changePage={setCreatePage}/>
      <NotHostErrorModal open={open} setOpen={setOpen}/>
    </PageContainer>
  )
}

export default CreateEventPage