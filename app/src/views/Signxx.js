import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Grid, Typography } from '@mui/material'

import GuestTemplate from '@@/templates/GuestTemplate'
import useAlerts from '@@/hooks/useAlerts'
import { Sign } from '@@/components'


function Signxx(props) {
  const type = props.type || ''

  const [alerts, { setCreateErrorAlert }] = useAlerts()

  const { control, handleSubmit } = useForm({})
  const navigate = useNavigate()

  async function signin(data) {
    try {
      await axios.post('/auth/signin', data)
      navigate('/')
    } catch (e) {
      setCreateErrorAlert(e)
    }
  }

  async function signup(data) {
    try {
      await axios.post('/auth/signup', data)
      navigate('/')
    } catch (e) {
      setCreateErrorAlert(e)
    }
  }

  return (
    <GuestTemplate alerts={ alerts }>
      <Grid container sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} md={6}>
          {
            type == 'in' && (
              <Sign control={ control } title="Hello!" description="sign into your account" submitText="Sign In" onSubmit={ handleSubmit(signin) }>
                <Typography sx={{ textAlign: 'center' }}>Dont't have an account? <a href="/signup">Sign Up</a></Typography>
              </Sign>
            )
          }
          {
            type == 'up' && (
              <Sign control={ control } title="Welcome!" description="Create an account" submitText="Sign Up" onSubmit={ handleSubmit(signup) }>
                <Typography sx={{ textAlign: 'center' }}>Already have an account? <a href="/signin">Sign In</a></Typography>
              </Sign>
            )
          }
        </Grid>
      </Grid>
    </GuestTemplate>
  )
}

export default Signxx