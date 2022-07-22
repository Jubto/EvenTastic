import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CreateEventBreadCrumbs = ({ page, changePage }) => {

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{mt:{xs:0, sm:1.5}, ml:{xs:0, sm:'10vw'}, mr:{xs:0, sm:'auto'}, mb:{xs:-1, sm:0}}}>
      <Link underline="hover" color="inherit" onClick={() => changePage(1)}>
        <Typography color='success'sx={{fontWeight:page === 1 ? 1000 : 0}}>
          Basic info
        </Typography>
      </Link>
      <Link underline="hover" color="inherit" onClick={() => changePage(2)}>
        <Typography color='success' sx={{fontWeight:page === 2 ? 1000 : 0}}>
          Details
        </Typography>
      </Link>
      <Link underline="hover" color="inherit" onClick={() => changePage(3)}>
        <Typography color='success' sx={{fontWeight:page === 3 ? 1000 : 0}}>
          Tickets
        </Typography>
      </Link>
      <Link underline="hover" color="inherit" onClick={() => changePage(4)}>
        <Typography color='success' sx={{fontWeight:page === 4 ? 1000 : 0}}>
          Preview
        </Typography>
      </Link>
    </Breadcrumbs>
  )
}

export default CreateEventBreadCrumbs