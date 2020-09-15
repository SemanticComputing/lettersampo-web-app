import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import LineChartIcon from '@material-ui/icons/ShowChart'

export const perspectiveConfigOnlyInfoPages = [
  {
    id: 'ties',
    perspectiveDescHeight: 160,
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'sentReceivedByTie',
        value: 1,
        icon: <LineChartIcon />
      },
      {
        id: 'export',
        value: 2,
        icon: <CloudDownloadIcon />
      }
    ]
  }
]
