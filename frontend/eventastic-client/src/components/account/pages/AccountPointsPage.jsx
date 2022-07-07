import { useState } from "react"
import BroadcastModal from "../../event/modals/BroadcastModal"
import { Button } from "@mui/material"

const AccountPointsPage = () => {
  const [open, setOpen] = useState()

  return (
    <div>
      AccountPointsPage
      <Button onClick={() => setOpen(true)}>
        broadcast
      </Button>
      <BroadcastModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default AccountPointsPage