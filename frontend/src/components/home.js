import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Stack, styled, Alert} from '@mui/material';
import UploadFile from './UploadFile.js';


const Home = () => {

const handleUpload = (file) => {
    console.log('Uploading file:', file);
    // Add your upload logic here
  };


  const data = {
    total_operation_cost: 138123,
    total_fires_addressed: {
      low: 130,
      medium: 61,
      high: 45
    },
    total_fires_missed: {
      low: 17,
      medium: 11,
      high: 2
    },
    missed_fires_damage_cost: 423645
  };

  return (
    <Box sx={{ 
      p: 3, 
      maxWidth: 1200, 
      mx: 'auto'
    }}>
      {/* Title and Upload Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Quebec Fire
        </Typography>
        
        <UploadFile onUpload={handleUpload} />
      </Box>

      {/* Rest of your existing code remains the same */}
      {/* Top Row */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
        mb: 2 
      }}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Total Operation Cost
            </Typography>
            <Typography variant="h4">
              ${data.total_operation_cost.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Missed Fires Damage Cost
            </Typography>
            <Typography variant="h4">
              ${data.missed_fires_damage_cost.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Row */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2
      }}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Total Fires Addressed
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Low Priority:</Typography>
                <Typography fontWeight="bold">{data.total_fires_addressed.low}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Medium Priority:</Typography>
                <Typography fontWeight="bold">{data.total_fires_addressed.medium}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>High Priority:</Typography>
                <Typography fontWeight="bold">{data.total_fires_addressed.high}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Total Fires Missed
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Low Priority:</Typography>
                <Typography fontWeight="bold">{data.total_fires_missed.low}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Medium Priority:</Typography>
                <Typography fontWeight="bold">{data.total_fires_missed.medium}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>High Priority:</Typography>
                <Typography fontWeight="bold">{data.total_fires_missed.high}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;