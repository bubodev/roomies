export const layout = {
  base: {
    fontWeight: 100,
    color: 'white',
  },

  title: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    border: '2px solid #E2E2E2',
    borderRadius: '10px',
    color: '#E2E2E2',
    fontSize: '13pt',
    marginTop: 10,
    marginLeft: '40%',
    marginRight: '40%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    '@media (max-width: 767px)': {
      marginTop: 60
    }
  },

  mainContent: {
    textAlign: 'center',
    paddingTop: 65,
    '@media (max-width: 767px)': {
      paddingTop: 130
    }
  }
}