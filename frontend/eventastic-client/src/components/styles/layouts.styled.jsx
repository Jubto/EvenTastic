import { styled } from '@mui/material/styles';
import { Container as muiContainer, Box } from '@mui/material';


export const FlexBox = styled(Box)`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  flex-grow: ${({ grow }) => grow};
  flex-wrap: ${({ wrap }) => wrap};
  gap: ${({ gap }) => gap};
`;


export const Container = styled(muiContainer)`
  margin: ${({ m }) => m};
  margin-left: ${({ ml, theme }) => ml ? theme.spacing(ml) : 0};
  margin-right: ${({ mr, theme }) => mr ? theme.spacing(mr) : 0};
  margin-top: ${({ mt, theme }) => mt ? theme.spacing(mt) : 0};
  margin-bottom: ${({ mb, theme }) => mb ? theme.spacing(mb) : 0};
  padding: ${({ p }) => p};
  padding-left: ${({ pl, theme }) => pl ? theme.spacing(pl) : 0};
  padding-right: ${({ pr, theme }) => pr ? theme.spacing(pr) : 0};
  padding-top: ${({ pt, theme }) => pt ? theme.spacing(pt) : 0};
  padding-bottom: ${({ pb, theme }) => pb ? theme.spacing(pb) : 0};
`;


export const PageContainer = styled(muiContainer)`
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  overflow-y: auto;
`;
