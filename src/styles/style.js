import { makeStyles, fade } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    header: {
      marginBottom: theme.spacing(3),
      backgroundColor: alpha(theme.palette.common.black, 0.8),
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: theme.palette.common.white,
    },
    card: {
      position: 'relative',
      animation: `$fadeIn 1s ${theme.transitions.easing.easeInOut}`,
      marginBottom: theme.spacing(2),
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[4],
      },
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    postTitle: {
      marginBottom: theme.spacing(1),
    },
    author: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
    },
    postBody: {
      color: theme.palette.text.secondary,
    },
  }));

  export default useStyles;