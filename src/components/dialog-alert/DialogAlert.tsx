import React, { FC } from "react";
import { DialogProperties } from "@/hooks/useDialogAlert";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

interface Props extends DialogProperties {
  open: boolean;
  onCancel: () => void;
}

const DialogAlert: FC<Props> = ({ message, open, title, onClick, onCancel }) => {
  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Stack flexDirection="row" gap={2}>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onClick();
              onCancel();
            }}
            variant="contained"
            color="primary"
          >
            Confirmar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
