import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ width = 'auto', height = 40 }) => {
  return (
    <Box
      component="img"
      src="/logo.png"
      alt="Admin Portal Logo"
      sx={{
        width: width,
        height: height,
        objectFit: 'contain'
      }}
    />
  );
};

export default Logo;
