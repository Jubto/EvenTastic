import React from 'react'
import { Box, Typography, styled } from '@mui/material';

export const ModalBody = styled(Box)`
  ${({ theme }) => theme.typography.body1}
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  width: 80vw;
  max-width: 650px;
`