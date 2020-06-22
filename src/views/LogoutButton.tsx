import React from 'react'
import { Button } from '@material-ui/core';

export const LogoutButton = ({onClick}: {onClick: () => void}) =>
  <Button variant="contained" color="primary" onClick={onClick}>
    Logout
  </Button>