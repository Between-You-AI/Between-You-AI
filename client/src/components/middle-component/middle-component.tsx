import React from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import {AttachFile, Mic, Send } from '@mui/icons-material'
const MiddleComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        What are you looking to achieve?
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        borderRadius={2}
        mt={4}
        width="80%"
        maxWidth="600px"
      >
        <TextField
          fullWidth
          variant="outlined"
          defaultValue=""
          multiline
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Mic />
                </IconButton>
                <IconButton>
                  <AttachFile />
                </IconButton>
                <IconButton>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px',
              },
            },
          }}
        />
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button variant="contained" color="primary">
            Buy a House
          </Button>
          <Button variant="contained" color="primary">
            Buy a House
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MiddleComponent;