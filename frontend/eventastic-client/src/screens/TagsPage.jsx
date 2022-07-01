import eventTags from '../event_tags'
import { PageContainer } from '../components/styles/layouts.styled'
import { FlexBox, ScrollContainer } from '../components/styles/layouts.styled'
import { Box, Chip, Divider, Typography, styled } from '@mui/material'

const StyledContainer = styled(Box)`
  border: 3px solid #ad9fa3;
  border-radius: 10px;
  overflow: hidden;
  height: 65vh;
`

const StyledTagContainer = styled(FlexBox)`
  border: 3px solid #ad9fa3;
  border-radius: 10px;
  margin-bottom: 1rem;
`

const TagContainer = ({ categoryAndTags }) => {
  const category = categoryAndTags.cat_name
  const tags = categoryAndTags.tags
  return (
    <div>
      <Typography variant='h6' align='center'>
        {category}
      </Typography>
      <StyledTagContainer wrap='wrap'>
        {tags.map((tag, idx) => (
          <Chip key={idx} label={tag.tag_name} sx={{m:0.5}}/>
        ))}
      </StyledTagContainer>
    </div>
  )
}

console.log(eventTags)

const TagsPage = () => {
  return (
    <PageContainer maxWidth='lg' sx={{mt:5}}>
      <FlexBox justify='space-between'>
        <Box sx={{maxWidth:'60vw', height:'80vh', mr:3, flexGrow:1, overflow:'hidden', mb:1}}>
          <FlexBox direction='column'>
            <Typography variant='h5' align='center'
              sx={{ color: 'evenTastic.grey', fontWeight: 1000 }}>
              Select the tags to customise your profile!
            </Typography>
            <Typography variant='subtitle1' align='center'>
              Make it easier to find events suited to you and improve your chances of joining a group!
            </Typography>
            <Divider variant="middle" sx={{ mb: 2 }} />
          </FlexBox>
          <ScrollContainer>
            {eventTags.eventTagsByCategory.map((tags, idx) => (
              <TagContainer key={idx} categoryAndTags={tags}/>
            ))}
          </ScrollContainer>
        </Box>
        <Box sx={{flexGrow:1}} >
          <Typography variant='h5' align='center' sx={{ color: 'evenTastic.grey', fontWeight: 1000 }}>
            your tags
          </Typography>
          <StyledContainer sx={{mt:2, width:'250px'}}>
            <ScrollContainer flex='true' wrap='true'>
              Stuff
            </ScrollContainer>
          </StyledContainer>
        </Box>
      </FlexBox>
    </PageContainer>
  )
}

export default TagsPage