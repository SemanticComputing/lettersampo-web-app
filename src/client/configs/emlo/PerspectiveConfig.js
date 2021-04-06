import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import MailOutline from '@material-ui/icons/MailOutline'
import LineChartIcon from '@material-ui/icons/ShowChart'
import RedoIcon from '@material-ui/icons/Redo'
import Person from '@material-ui/icons/Person'
import TrendingDown from '@material-ui/icons/TrendingDown'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

import worksImage from '../../img/main_page/works-452x262.jpg'
import actorImage from '../../img/main_page/people2-452x262.jpg'
import placesImage from '../../img/main_page/places2-452x262.jpg'

export const perspectiveConfig = [
  {
    id: 'letters',
    frontPageImage: worksImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['prefLabel']),
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'migrations',
        value: 1,
        icon: <RedoIcon />
      },
      {
        id: 'by_year',
        value: 2,
        icon: <LineChartIcon />
      },
      {
        id: 'export',
        value: 3,
        icon: <CloudDownloadIcon />
      }
    ],
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
  },
  {
    id: 'actors',
    frontPageImage: actorImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['prefLabel']),
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'map',
        value: 1,
        icon: <AddLocationIcon />
      },
      {
        id: 'network',
        value: 2,
        icon: <BubbleChartIcon />
      },
      {
        id: 'export',
        value: 3,
        icon: <CloudDownloadIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <Person />
      },
      {
        id: 'actorLetters',
        value: 1,
        icon: <MailOutline />
      },
      {
        id: 'letterNetwork',
        value: 2,
        icon: <BubbleChartIcon />
      },
      {
        id: 'sentReceived',
        value: 3,
        icon: <LineChartIcon />
      },
      {
        id: 'socialSignature',
        value: 4,
        icon: <TrendingDown />
      }, /**
      {
        id: 'correspondenceTimeline',
        value: 5,
        icon: <TrendingDown />
      }, */
      {
        id: 'export',
        value: 6,
        icon: <CloudDownloadIcon />
      }
    ]
  },
  {
    id: 'places',
    frontPageImage: placesImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set(['prefLabel']),
    tabs: [
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
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'sentReceivedByPlace',
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
