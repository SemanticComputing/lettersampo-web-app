import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
// import TripOriginIcon from '@material-ui/icons/TripOrigin'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import MailOutline from '@material-ui/icons/MailOutline'
import LineChartIcon from '@material-ui/icons/ShowChart'
// import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'
import RedoIcon from '@material-ui/icons/Redo'
// import PieChartIcon from '@material-ui/icons/PieChart'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import manuscriptsImage from '../../img/main_page/manuscripts-452x262.jpg'
import worksImage from '../../img/main_page/works-452x262.jpg'
// import eventsImage from '../../img/main_page/events-452x262.jpg'
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
        icon: <CalendarViewDayIcon />
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
        id: 'export',
        value: 4,
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
