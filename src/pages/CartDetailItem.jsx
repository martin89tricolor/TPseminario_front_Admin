import { useState } from 'react';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

function SimpleDialog(props) {

  const { open, onClose } = props;

  function handleClose() {
    onClose();
  }

  function handleAddUnit() {
    props.onAddUnit(props.item);
  }

  function handleMinusUnit() {
    props.onMinusUnit(props.item);
  }

  function handleRemoveProduct() {
    props.onRemoveProduct(props.item);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">¿Cuántos vas a llevar?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${props.product.quantity} ${props.product.quantity === 1 ? 'unidad' : 'unidades'}`}
          <IconButton aria-label="add" onClick={handleAddUnit}>
            <AddIcon />
          </IconButton>
          <IconButton aria-label="minus" onClick={handleMinusUnit}>
            <RemoveIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleRemoveProduct}>
            <DeleteIcon />
          </IconButton>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

const CartDetailItem = (props) => {

  const [open, setOpen] = useState(false);

  function handleAddUnit() {
    props.onAddUnit(props.item);
  }

  function handleMinusUnit() {
    props.onMinusUnit(props.item);
  }

  function handleRemoveProduct() {
    props.onRemoveProduct(props.item);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  };

  return (
    <>
    <ListItem key={props.item.product._id}>
      <ListItemAvatar onClick={handleOpen}>
        <Avatar variant="square" src={props.item.product.img} />
      </ListItemAvatar>
      <ListItemText
        primary={props.item.product.nombre}
        secondary={`${props.item.quantity} ${props.item.quantity === 1 ? "unidad" : "unidades"} `}
      />
      <Hidden lgDown>
        <ListItemSecondaryAction>
          <IconButton aria-label="add" onClick={handleAddUnit}>
            <AddIcon />
          </IconButton>
          <IconButton aria-label="minus" onClick={handleMinusUnit}>
            <RemoveIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleRemoveProduct}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </Hidden>
    </ListItem>
    <Hidden lgUp>
      <SimpleDialog
        product={props.item}
        open={open}
        onClose={handleClose}
        onAddUnit={handleAddUnit}
        onMinusUnit={handleMinusUnit}
        onRemoveProduct={handleRemoveProduct}
      />
    </Hidden>
    </>
  )
}

export default CartDetailItem;
