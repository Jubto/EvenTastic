import { FlexBox } from '../layouts.styled';
import { Box, Dialog, styled } from '@mui/material';

export const StandardModal = styled(Dialog)`
  & .MuiDialog-paper {
    width: 80vw;
    max-width: 650px;
  }
`

export const StyledTitle = styled(FlexBox)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
`

export const ModalBody = styled(Box)`
  ${({ theme }) => theme.typography.body1}
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`

export const LargeModal = styled(Dialog)`
  & .MuiDialog-paper {
    width: 95vw;
    height: 85vh;
    max-width: 1400px;
  }
`

export const ModalBodyLarge = styled(Box)`
  ${({ theme }) => theme.typography.body1}
  width: 95%;
  height: 95%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`