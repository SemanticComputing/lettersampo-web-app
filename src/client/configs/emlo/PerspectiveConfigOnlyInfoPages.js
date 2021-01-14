import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import LineChartIcon from '@material-ui/icons/ShowChart'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'

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
        id: 'tieNetwork',
        value: 1,
        icon: <BubbleChartIcon />
      },
      {
        id: 'sentReceivedByTie',
        value: 2,
        icon: <LineChartIcon />
      },
      {
        id: 'export',
        value: 3,
        icon: <CloudDownloadIcon />
      }
    ]
  },
  {
    id: 'sources',
    perspectiveDescHeight: 160,
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'export',
        value: 3,
        icon: <CloudDownloadIcon />
      }
    ]
  }
]
