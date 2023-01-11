import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Avatar from '@/shared/components/Avatar'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { FC } from 'react'
import { PlayerStats } from '@/data/SamplePlayer'

const playerStatsStyle = {
  background: 'linear-gradient(90deg, #29B6F6 0%, #1C97CE 100%);',
  borderRadius: '4px',
  color: 'white',
  width: '170px',
  height: '28px',
  margin: '2px 0',
  paddingLeft: '1rem',
}

type PlayerDetailsProps = {
  player: PlayerStats
}

export const PlayerDetails: FC<PlayerDetailsProps> = ({ player }) => (
  <Box
    sx={{
      display: 'flex',
      marginBottom: '2rem',
      alignItems: 'center',
    }}>
    <Avatar />
    <Box
      sx={{
        marginLeft: '3rem',
      }}>
      <Typography variant="body1">
        <strong>{player.name}</strong>
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TransferWithinAStationIcon sx={{ fontSize: 'large', color: '#A4BC10', marginRight: '4px' }} />
        <Typography variant="body1" sx={{ color: '#A4BC10' }}>
          {player.position}
        </Typography>
      </Box>
      <Typography variant="body1">{player.age}</Typography>
    </Box>
    <Box sx={{ marginLeft: '2rem' }}>
      <Typography variant="body1" component="p" sx={playerStatsStyle}>
        {player.stats.DEFENSE_POSITION} - Defense
      </Typography>
      <Typography variant="body1" component="p" sx={playerStatsStyle}>
        {player.stats.BALL_CONTROL} - BallControl
      </Typography>
      <Typography variant="body1" component="p" sx={playerStatsStyle}>
        {player.stats.SCORE} - Score
      </Typography>
    </Box>
    <Box
      sx={{
        marginLeft: '2rem',
      }}>
      <Typography variant="body1" component="p" sx={playerStatsStyle}>
        {player.stats.TACKLING} - Tackling
      </Typography>
      <Typography variant="body1" component="p" sx={playerStatsStyle}>
        {player.stats.CO} - CO
      </Typography>
      <Typography variant="body1" component="p" sx={playerStatsStyle}>
        {player.stats.PASSING} - Passing
      </Typography>
    </Box>
  </Box>
)

export default PlayerDetails
