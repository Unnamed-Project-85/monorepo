import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Typography } from '@mui/material'

export default function PlayerTactics() {
  const [captain, setCaptain] = React.useState('')
  const [cornerTacker, setCornerTacker] = React.useState('')
  const [freeKickTacker, setFreeKickTacker] = React.useState('')

  const handleChangeCaptain = (event: SelectChangeEvent) => {
    setCaptain(event.target.value as string)
  }
  const handleChangeCorner = (event: SelectChangeEvent) => {
    setCornerTacker(event.target.value as string)
  }
  const handleChangeFreeKick = (event: SelectChangeEvent) => {
    setFreeKickTacker(event.target.value as string)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120, marginLeft: '3rem' }}>
      <Typography align="center" variant="h6">
        Team Tactics
      </Typography>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel id="captain-select-label">Captain</InputLabel>
        <Select
          labelId="captain-select-label"
          id="captain-select"
          value={captain}
          label="Captain"
          autoWidth
          onChange={handleChangeCaptain}
          sx={{ marginBottom: '1rem' }}>
          <MenuItem value={'Milagrito Sanabria'}>Milagrito Sanabria</MenuItem>
          <MenuItem value={'Nino Bravo'}>Nino Bravo</MenuItem>
          <MenuItem value={'Jesucristo Marrero'}>Jesucristo Marrero</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel id="corner-select-label">Corner Kick Taker</InputLabel>
        <Select
          labelId="corner-select-label"
          id="corner-select"
          value={cornerTacker}
          label="Corner"
          autoWidth
          onChange={handleChangeCorner}
          sx={{ marginBottom: '1rem' }}>
          <MenuItem value={'Milagrito Sanabria'}>Milagrito Sanabria</MenuItem>
          <MenuItem value={'Nino Bravo'}>Nino Bravo</MenuItem>
          <MenuItem value={'Jesucristo Marrero'}>Jesucristo Marrero</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel id="free-kick-select-label">Free Kick Tacker</InputLabel>
        <Select
          labelId="free-kick-select-label"
          autoWidth
          id="free-kick-select"
          value={freeKickTacker}
          label="Free Kick"
          onChange={handleChangeFreeKick}>
          <MenuItem value={'Milagrito Sanabria'}>Milagrito Sanabria</MenuItem>
          <MenuItem value={'Nino Bravo'}>Nino Bravo</MenuItem>
          <MenuItem value={'Jesucristo Marrero'}>Jesucristo Marrero</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
