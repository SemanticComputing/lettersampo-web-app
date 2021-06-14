import bannerImage from '../../img/main_page/mmm-banner.jpg'

export const rootUrl = ''

export const defaultLocale = 'en'

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicHRsZXNraW4iLCJhIjoiY2tiOTFhem9lMDltbzJ5cGhjNzdmcHlrbiJ9.1CB-6MDzRXq9xJ6PZbqLRA'

export const MAPBOX_STYLE = 'light-v10' // https://docs.mapbox.com/api/maps/#styles

// export const documentFinderAPIUrl = 'https://data.finlex.fi/document-finder-backend'

export const yasguiBaseUrl = 'https://yasgui.triply.cc'

export const yasguiParams = {
  contentTypeConstruct: 'text/turtle',
  contentTypeSelect: 'application/sparql-results+json',
  endpoint: 'http://ldf.fi/ckcc/sparql',
  requestMethod: 'POST',
  tabTitle: 'Exported query'
}

export const SLIDER_DURATION = {
  halfSpeed: 1200,
  normalSpeed: 600,
  doubleSpeed: 300
}

export const layoutConfig = {
  hundredPercentHeightBreakPoint: 'md',
  reducedHeightBreakpoint: 'xl',
  tabHeight: 58,
  paginationToolbarHeight: 37,
  tableFontSize: '0.8rem',
  topBar: {
    showLanguageButton: true,
    feedbackLink: 'https://link.webropolsurveys.com/',
    reducedHeight: 44,
    defaultHeight: 64,
    mobileMenuBreakpoint: 1360
  },
  mainPage: {
    bannerBackround: `linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(${bannerImage})`,
    bannerMobileHeight: 150,
    bannerReducedHeight: 220,
    bannerDefaultHeight: 300
  },
  infoHeader: {
    default: {
      height: 49,
      expandedContentHeight: 160,
      headingVariant: 'h4',
      infoIconFontSize: 40
    },
    reducedHeight: {
      height: 40,
      expandedContentHeight: 100,
      headingVariant: 'h6',
      infoIconFontSize: 32
    }
  },
  footer: {
    reducedHeight: 44,
    defaultHeight: 64
  }
}
