import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Typography } from '@mui/material'
import Grid from '@/shared/components/Grid'
import Avatar from '@/shared/components/Avatar'
import Image from 'next/image'

const Team: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kjeldsen</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <>
        <Box>
          <Box
            sx={{
              display: 'flex',
            }}>
            <Avatar />
            <Box>
              <Typography variant="body1">Team name</Typography>
              <Typography variant="body1">League position</Typography>
              <Typography variant="body1">Other stats</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Image src="/img/placeholderFormation.png" alt="Formation" width="100%" height="120px" object-fit="contain" />
            </Box>
          </Box>
          <Grid />
        </Box>
      </>
    </>
  )
}

export default Team
