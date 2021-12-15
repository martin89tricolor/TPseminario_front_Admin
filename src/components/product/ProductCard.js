import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  magicCard: {
    '&:hover': {
      animation: `$myEffect 100ms ${theme.transitions.easing.easeInOut}`,
      animationFillMode: 'forwards',
    }
  },
  "@keyframes myEffect": {
    "0%": {
    },
    "100%": {
      boxShadow: '0 3px 5px 2px lightgray',
      color: 'white',
    }
  }
}));

const ProductCard = ({ product, onAgregarClick, ...rest }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.magicCard}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
      <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h2"
        >
          {product.nombre}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={product.img}
            alt="Product"
            variant="square"
            sx={{
              height: 170,
              width: 230
            }}
          >
            <BrokenImageIcon />
          </Avatar>
        </Box>
    
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Fecha de vencimiento: 
           {' '}{product.fecha}
        </Typography>
        {product.stock > 0 ?
        <Typography
          align="right"
          color="#009688"
        >
          Hay stock
        </Typography>
        :
        <Typography
          align="right"
          color="#d32f2f"
        >
          Sin stock
        </Typography>
        }
      </CardContent>
      <Box sx={{ flexGrow: 4 }} />
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
