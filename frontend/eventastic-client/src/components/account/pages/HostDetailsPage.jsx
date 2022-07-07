import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../utils/context';
import AccountAPI from '../../../utils/AccountAPIHelper';
import HostRegisterModal2 from '../modals/HostRegisterModal2';
import { FlexBox, ScrollContainer } from '../../styles/layouts.styled';
import InfoHeader from '../styles/InfoHeader';
import {
  Button,
  Grid,
  TextField,
  Typography,
  styled
} from '@mui/material';

const api = new AccountAPI();

const StatusBox = styled(FlexBox)`
  border: 1px solid darkgrey;
  border-radius: 10px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  width: 35%;
  background-color: aliceblue;
`

const HostDetailsPage = ({ change, setChange }) => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [hostDetails, setHostDetails] = context.host;
  const [OpenModal, setOpenModal] = useState(false);
  const [hostStatus, setHostStatus] = useState(false);
  const [changeOrgName, setChangeOrgName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [formErrors, setFormErrors] = useState({
    error: false,
    orgName: null,
    orgEmail: null,
    orgJobTitle: null,
    qualification: null,
    hostMobile: null
  })

  const resetHost = () => {
    setHostStatus(false)
    setChange('register')
    setHostDetails(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const orgName = data.get('orgName')
    const orgDesc = data.get('orgDesc')
    const orgEmail = data.get('orgEmail')
    const orgJobTitle = data.get('orgJobTitle')
    const qualification = data.get('qualification')
    const hostMobile = data.get('hostMobile')
    formErrors.error = false;

    if (!/\S+/.test(orgName) && !hostDetails) {
      setFormErrors(prevState => { return { ...prevState, orgName: true } })
      formErrors.error = true
    }
    if (!/\S+@\S+\.\S+/.test(orgEmail) && !hostDetails) {
      setFormErrors(prevState => { return { ...prevState, orgEmail: true } })
      formErrors.error = true
    }
    if (!/\S+/.test(orgJobTitle)) {
      setFormErrors(prevState => { return { ...prevState, orgJobTitle: true } })
      formErrors.error = true
    }
    if (!/\S+/.test(qualification)) {
      setFormErrors(prevState => { return { ...prevState, qualification: true } })
      formErrors.error = true
    }
    if (!/\d+/.test(hostMobile) || hostMobile.length < 9) {
      setFormErrors(prevState => { return { ...prevState, hostMobile: true } })
      formErrors.error = true
    }

    if (!formErrors.error) {
      let body = {
        host_contact_no: hostMobile,
        host_status: hostDetails ? hostDetails.host_status : 'Pending',
        isVerified: hostDetails ? hostDetails.host_status : false,
        job_title: orgJobTitle,
        org_desc: orgDesc,
        org_name: orgName ? orgName : hostDetails.org_name,
        org_email: orgEmail ? orgEmail : hostDetails.org_email,
        qualification: qualification
      }
      if (changeOrgName || changeEmail) {
        body = { ...body, host_status: 'Pending', isVerified: false }
      }
      console.log('body is:', body)
      try {
        const hostRes = await api.putHost(account.account_id, body)
        setHostDetails(hostRes.data)
        setChangeOrgName(false)
        setChangeEmail(false)
        setChange('')
        setOpenModal(true)
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    console.log(hostDetails)
    if (!hostDetails) {
      setChange('register')
      setHostStatus(false)
    }
    else if (hostDetails.host_status === 'Pending') {
      setHostStatus('Pending')
    }
    else if (hostDetails.host_status === 'Declined') {
      setHostStatus('Declined')
    }
    else {
      setHostStatus('Approved')
    }
  }, [hostDetails])

  return (
    <ScrollContainer hide>
      <StatusBox justify='space-between'>
        <Typography variant='subtitle1'
          sx={{ color: 'evenTastic.grey', fontWeight: 1000, mb: 2 }}>Host status:
        </Typography>
        {(() => {
          if (hostStatus === 'Pending') {
            return (
              <Typography component='span' variant='subtitle1'
                sx={{ color: 'warning.light', fontWeight: 1000 }}> Pending
              </Typography>
            )
          }
          else if (hostStatus === 'Declined') {
            return (
              <Typography component='span' variant='subtitle1'
                sx={{ color: 'error.main', fontWeight: 1000 }}> Declined
              </Typography>
            )
          }
          else if (hostStatus === 'Approved') {
            return (
              <Typography component='span' variant='subtitle1'
                sx={{ color: 'success.main', fontWeight: 1000 }}> Approved
              </Typography>
            )
          }
          else {
            return (
              <Typography component='span' variant='subtitle1'
                sx={{ fontWeight: 1000 }}> Not registered
              </Typography>
            )
          }
        })()}

      </StatusBox>
      {hostStatus === 'Declined'
        ? <Button variant='contained' onClick={resetHost} sx={{ mt: 1.5, ml: 1 }}>
          Apply again
        </Button>
        : ''
      }
      <Grid
        onChange={() => !change && hostStatus === 'Approved' && setChange('save')}
        id='hostForm' component="form" noValidate onSubmit={handleSubmit}
        container spacing={2} sx={{ mt: 0 }}
      >
        <Grid item sm={12}>
          <InfoHeader title='Organisation details' />
          <Typography variant='subtitle1'
            sx={{ mb: 1.5, display: hostStatus === 'Approved' ? 'inherit' : 'none' }}>
            Note: changing organisation name or email will result in your host status reverted to pending,
            until the admin team approves the changes.
          </Typography>
          <TextField
            name="orgName"
            required
            fullWidth
            id="orgName"
            label="Organisation name"
            InputLabelProps={{ shrink: true }}
            value={changeOrgName ? undefined : hostDetails ? hostDetails.org_name : undefined}
            disabled={hostDetails ? !changeOrgName : false}
            onChange={() => {
              formErrors.orgName && setFormErrors(prevState => { return { ...prevState, orgName: false } })
            }}
            error={formErrors.orgName}
            helperText={formErrors.orgName ? 'Must be a valid organisation name.' : ''}
            sx={{ width: { sm: '100%', md: '59%' } }}
          />
          <Button
            component='span' variant="contained"
            sx={{
              mt: { sm: 2, md: 1 }, ml: { sm: 0, md: 2 }, width: '220px',
              backgroundColor: changeOrgName ? 'evenTastic.dull' : 'info.main',
              display: hostStatus === 'Approved' ? 'initial' : 'none'
            }}
            onClick={() => setChangeOrgName(!changeOrgName)}
          >
            {changeOrgName ? 'Undo change' : 'Rename Organisation?'}
          </Button>
        </Grid>
        <Grid item sm={12}>
          <TextField
            name="orgDesc"
            fullWidth
            multiline
            rows={9}
            id="orgDesc"
            label="Organisation description"
            disabled={hostStatus === 'Pending' || hostStatus === 'Declined'}
            defaultValue={hostDetails ? hostDetails.org_desc : ''}
            sx={{ width: { sm: '100%', md: '59%' } }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            name="orgEmail"
            required
            fullWidth
            id="orgEmail"
            label="Organisation email"
            InputLabelProps={{ shrink: true }}
            value={changeEmail ? undefined : hostDetails ? hostDetails.org_email : undefined}
            disabled={hostDetails ? !changeEmail : false}
            onChange={() => {
              formErrors.orgEmail && setFormErrors(prevState => { return { ...prevState, orgEmail: false } })
            }}
            error={formErrors.orgEmail}
            helperText={formErrors.orgEmail ? 'Must be a valid email.' : ''}
            sx={{ width: { sm: '100%', md: '59%' } }}
          />
          <Button
            component='span' variant="contained"
            sx={{
              mt: { sm: 2, md: 1 }, ml: { sm: 0, md: 2 }, width: '220px',
              backgroundColor: changeEmail ? 'evenTastic.dull' : 'info.main',
              display: hostStatus === 'Approved' ? 'initial' : 'none'
            }}
            onClick={() => setChangeEmail(!changeEmail)}
          >
            {changeEmail ? 'Undo change' : 'Change email?'}
          </Button>
        </Grid>
        <Grid item sm={12} md={6}>
          <InfoHeader title='Host details' />
          <TextField
            name="orgJobTitle"
            fullWidth
            type="tel"
            id="orgJobTitle"
            label="Job title"
            defaultValue={hostDetails ? hostDetails.job_title : ''}
            disabled={hostStatus === 'Pending' || hostStatus === 'Declined'}
            onChange={() => {
              formErrors.orgJobTitle && setFormErrors(prevState => { return { ...prevState, orgJobTitle: false } })
            }}
            error={formErrors.orgJobTitle}
            helperText={formErrors.orgJobTitle ? 'Must be a valid job title.' : ''}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            name="qualification"
            fullWidth
            type="tel"
            id="qualification"
            label="Qualification"
            defaultValue={hostDetails ? hostDetails.qualification : ''}
            disabled={hostStatus === 'Pending' || hostStatus === 'Declined'}
            onChange={() => {
              formErrors.qualification && setFormErrors(prevState => { return { ...prevState, qualification: false } })
            }}
            error={formErrors.qualification}
            helperText={formErrors.qualification ? 'Must be a valid qualification.' : ''}
            sx={{ mt: { sm: 0, md: 5.6 } }}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            name="hostMobile"
            fullWidth
            type="tel"
            id="hostMobile"
            label="Host mobile"
            defaultValue={hostDetails ? hostDetails.host_contact_no : ''}
            disabled={hostStatus === 'Pending' || hostStatus === 'Declined'}
            onChange={() => {
              formErrors.hostMobile && setFormErrors(prevState => { return { ...prevState, hostMobile: false } })
            }}
            error={formErrors.hostMobile}
            helperText={formErrors.hostMobile ? 'Must be a valid mobile.' : ''}
          />
        </Grid>
      </Grid>
      <HostRegisterModal2 open={OpenModal} setOpen={setOpenModal} s />
    </ScrollContainer>
  )
}

export default HostDetailsPage