import * as React from 'react'
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

type GridProps<T> = {
  rows: T[]
  columns: GridColDef[],
  onRowClick?: (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => void
}

function Grid<T>({ rows, columns, onRowClick }: GridProps<T>) {
  return (
    <Box>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        hideFooter={true}
        onRowClick={onRowClick}
        sx={{
          minWidth: '802px',
          width: 'auto'
        }}
      />
    </Box>
  )
}

export default Grid
