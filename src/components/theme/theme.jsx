export const colors = {
  black: "#000000",
  white: "#FFFFFF",
  lightGray: "#9aa3ad",
  blue: "#046DC2",
  border: "#595f62",
  card: '#202930',
  background: '#152128',
  green: '#1abc9c',
  red: '#ed4337'
};

const customTheme =  {
  type: 'dark',
  palette: {
    primary: {
      main: colors.blue
    },
    secondary: {
      main: colors.background
    },
    text: {
      primary: colors.lightGray,
      secondary: colors.white
    }
  },
  typography: {
    body1: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: colors.lightGray
    },
    body2: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: colors.white
    },
    h1: {
      letterSpacing: '1px',
      fontSize: '36px',
      fontWeight: '100',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: colors.white,
      lineHeight: 1.5
    },
    h2: {
      letterSpacing: '1px',
      fontSize: '20px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: colors.white
    },
    h3: {
      letterSpacing: '1px',
      fontSize: '19px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: colors.white
    },
    h4: {
      letterSpacing: '1px',
      fontSize: '30px',
      fontWeight: '100',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: colors.lightGray
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '0px',
        fontSize: '16px',
        minWidth: '150px',
        padding: '10px 16px'
      },
      contained: {
        boxShadow: 'none',
        backgroundColor: colors.white
      },
      outlined: {
        borderColor: colors.white,
        padding: '10px 30px'
      },
      label: {
        textTransform: 'none',
        letterSpacing: '0.5px',
        color: colors.white,
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflowX: 'hidden'
      },
      sizeLarge: {
        fontSize: '16px',
        minWidth: '300px',
        padding: '12px 24px'
      },
      sizeSmall: {
        fontSize: '12px',
        padding: '8px 12px',
        minWidth: '100px'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: colors.white,
          color: colors.white
        }
      },
      notchedOutline: {
        borderColor: colors.white
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: colors.white
        }
      }
    },
    MuiCard: {
      root: {
        borderRadius: '0px'
      }
    }
    /*,
    MuiList: {
      padding: {
        padding: '24px',
        paddingTop: '24px',
        paddingBottom: '24px',
      },
      root: {
        backgroundImage: "linear-gradient("+colors.darkBlue+", #39495F)"
      }
    },
    MuiListItem: {
      root: {
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '5px',
        '&$selected': {
          backgroundColor: colors.lightBlue+' !important'
        }
      },
      gutters: {
        paddingLeft: '24px',
        paddingRight: '24px'
      },
    },
    MuiListItemText: {
      primary: {
        color: colors.white,
        fontSize: '14px'
      }
    },
    MuiListSubheader: {
      root: {
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing:  '1px',
        color: colors.white,
        paddingBottom: '12px',
        fontSize: '14px'
      }
    },
    MuiMenuItem: {
      root: {
        height: 'auto'
      }
    },
    MuiDivider: {
      root: {
        height: '2px',
        backgroundColor: colors.white,
        marginTop: '42px',
        marginBottom: '42px'
      }
    },
    MuiStepConnector: {
      lineVertical: {
        minHeight: '50px',
      },
      vertical: {
        padding: '0px'
      }
    },
    MuiStepContent: {
      root: {
        marginTop: '0px'
      }
    },
    MuiStepIcon: {
      root: {
        color: colors.darkGray
      },
      active: {
        color: colors.darkGray+"!important",
        fontSize: '34px',
        marginLeft: '-5px'
      },
      completed: {
      },
      text: {
        fill: colors.darkGray
      }
    },
    MuiStepLabel: {
      label: {
        color: colors.white,
        letterSpacing: '0.5px',
        fontSize: '14px',
        marginLeft: '12px'
      },
      active: {
        marginLeft: '7px',
        color: colors.white+' !important'
      }
    },
    MuiInput: {
      underline: {
        '&:before': { //underline color when textfield is inactive
          backgroundColor: colors.black,
          height: '1px'
        },
        '&:hover:not($disabled):before': { //underline color when hovered
          backgroundColor: colors.black,
          height: '1px'
        },
        '&:after': { //underline color when textfield is inactive
          backgroundColor: colors.lightBlue,
          borderBottom: "2px solid "+colors.lightBlue,
          height: '1px'
        },
      }
    },
    MuiFormLabel: {
      root: {
        color: colors.darkGray,
        fontSize: '15px',
        letterSpacing: '0.5px'
      }
    },
    MuiInputBase: {
      root: {
        color: colors.black
      },
      input: {
        letterSpacing: '0.5px'
      }
    },
    MuiInputLabel: {
      root: {
        letterSpacing: '0.5px',
        "&$focused": {
          color: colors.lightBlue+" !important"
        }
      }
    },
    MuiCard: {
      root: {
        borderRadius: 0
      }
    },
    MuiTab: {
      textColorPrimary: {
        color: colors.black,
        "&$selected": {
          color: colors.black
        }
      }
    },
    MuiSnackbar : {
      anchorOriginBottomLeft: {
        bottom: '50px',
        left: '80px',
        '@media (min-width: 960px)': {
          bottom: '50px',
          left: '80px'
        }
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: colors.white,
        padding: '0px',
        minWidth: '450px',
        '@media (min-width: 960px)': {
          minWidth: '450px',
        }
      },
      message: {
        padding: '0px'
      },
      action: {
        marginRight: '0px'
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
      },
      elevation2: {
        boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
      }
    },
    MuiTable: {
      root: {
        borderSpacing: '0 15px',
        borderCollapse: 'separate'
      }
    },
    EnhancedTable: {
      tableWrapper: {
        overflowX: 'inherit'
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: 'none',
        padding: "12px 0px 12px 24px"
      }
    },
    MuiTableHead: {
      root: {
        padding: '16px',
        backgroundColor: colors.lightBlack
      }
    },
    MuiTableSortLabel: {
      root: {
        color: colors.white,
        fontSize: '14px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        '&:hover': {
          color: colors.white+"!important"
        }
      },
      active: {
        color: colors.white+"!important"
      },
      icon: {
        color: colors.white+"!important"
      }
    },
    MuiTableRow: {
      root: {
        marginTop: '8px',
        marginBottom: '8px',
        boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
      }
    },
    MuiToolbar: {
      gutters: {
        padding: '0px',
        paddingLeft: '0px',
        '@media (min-width: 600px)': {
          padding: '0px',
          paddingLeft: '0px',
        }
      }
    },
    MuiCheckbox: {
      root: {
        color: colors.text
      }
    },
    MuiFormControlLabel: {
      label: {
        color: colors.text,
        letterSpacing: '0.5px',
        fontSize: '12px'
      },
      outlined: {
        borderWidth: 2,
      },
      outlinedSecondary: {
        borderWidth: 2,
        color: "white",
      },
      sizeSmall: {
        padding: '10px 20px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0px 12px 12px 32px'
      }
    },
    MuiExpansionPanel: {
      root: {
        boxShadow: 'none',
        '&:before': {
          opacity: '0'
        },
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '0px'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: '0px'
      }
    },
    MuiDialog: {
      paper: {
        margin: '0px'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        padding: 20
      }
    }*/
  }
};

export default customTheme;
