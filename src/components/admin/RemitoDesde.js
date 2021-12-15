import * as React from 'react';
import {
    Typography,
    TextField,
    Box,
  } from '@material-ui/core';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import LocalizationProvider from '@mui/lab/LocalizationProvider';
  import DateRangePicker from '@mui/lab/DateRangePicker';

export default function RemitoDesde() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Typography  variant="h4" sx={{ mt: 2, mb: 1 }}> Su remito será enviado a su casilla de correo electrónico dentro de las próximas 24 horas.</Typography>
        <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
              }}
            >
            </Box>
        <Typography variant="h4" >
         En el remito se incluirán todos los productos entregados durante el intervalo de fechas que seleccione a continuación:
          </Typography>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
              }}
            >
            </Box>
        <DateRangePicker
          startText="Fecha Inicial"
          endText="Fecha Final"
          calendars={1}
          value={value}
          inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(InicioProps, HastaProps) => (
            <React.Fragment>
              <TextField {...InicioProps} />
              <Box sx={{ mx: 2 }}> hasta </Box>
              <TextField {...HastaProps} />
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
