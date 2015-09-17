export const layout = {
  base: {
  },

  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottom: '1px solid #E2E2E2',
    width: '100%',
    color: '#606060',
    fontSize: '13pt',
    paddingTop: 12,
    paddingBottom: 12,
    background: '#F8F8F8',
    '@media (max-width: 767px)': {
      borderTop: '57px solid rgb(64, 71, 78)'
    }
  },

  mainContent: {
    paddingTop: 65,
    '@media (max-width: 767px)': {
      paddingTop: 130
    }
  }
}