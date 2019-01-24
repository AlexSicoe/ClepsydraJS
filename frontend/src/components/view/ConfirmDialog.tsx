import React from 'react'
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Callback } from "../../utils/types";

interface Props {
  open: boolean,
  title: string,
  content: string,
  handleOK: any,
  handleClose: Callback,
  children?: any
}

export default function ConfirmDialog(props: Props) {
  const {
    open,
    title,
    content,
    handleOK,
    handleClose,
    children
  } = props

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOK} color="primary">
          OK
            </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
            </Button>
      </DialogActions>
    </Dialog>
  )
}