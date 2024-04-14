import { AlertBarAtom } from '../../states/alert-bar';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';

export const AlertBar = () => {
  const resetAlertBarAtom = useResetAtom(AlertBarAtom);
  const alertAtom = useAtomValue(AlertBarAtom);

  const handleClose = () => {
    resetAlertBarAtom();
  };

  return (
    <Snackbar
      open={alertAtom.open}
      autoHideDuration={alertAtom.timeout}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertAtom.severity}
        className="w-full"
      >
        {alertAtom.message}
      </Alert>
    </Snackbar>
  );
};
