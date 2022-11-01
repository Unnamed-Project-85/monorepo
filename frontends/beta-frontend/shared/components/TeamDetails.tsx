import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Avatar from '@/shared/components/Avatar'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { SampleTeam, SampleTeamStats } from 'data/SampleTeam'
import BarChartIcon from '@mui/icons-material/BarChart'

const playerStatsStyle = {
  background: 'linear-gradient(90deg, #29B6F6 0%, #1C97CE 100%);',
  borderRadius: '4px',
  color: 'white',
  width: '170px',
  height: '28px',
  margin: '2px 0',
  paddingLeft: '1rem',
}

export default function TeamDetails(SampleTeam: SampleTeamStats) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <Avatar />
      <Box
        sx={{
          marginLeft: '3rem',
        }}>
        <Typography variant="body1">
          <strong>{SampleTeam.name}</strong>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BarChartIcon sx={{ fontSize: 'large', color: '#A4BC10', marginRight: '4px' }} />
          <Typography variant="body1" sx={{ color: '#A4BC10' }}>
            {SampleTeam.position} Position
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
