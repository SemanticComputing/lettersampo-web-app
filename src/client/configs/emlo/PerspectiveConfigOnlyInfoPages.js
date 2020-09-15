import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

export const perspectiveConfigOnlyInfoPages = [
  {
    id: 'correspondences',
    perspectiveDescHeight: 160,
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },

      {
        id: 'export',
        value: 1,
        icon: <CloudDownloadIcon />
      }
    ]
  }
]
