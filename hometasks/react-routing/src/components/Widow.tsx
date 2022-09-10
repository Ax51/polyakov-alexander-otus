import { ReactNode } from 'react'
import { Grid } from '@mui/material'

export function Window({ children }: { children: ReactNode }) {
  return (
    <Grid
      container
      sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'grey.100' }}
      justifyContent="center"
    >
      <Grid item xs={12} sm={10} md={9} lg={8} xl={7} sx={{ p: 2 }}>
        {children}
      </Grid>
    </Grid>
  )
}
