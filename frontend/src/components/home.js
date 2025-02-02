import React,{ useState } from 'react';
import {Card, CardContent, Typography, Box, Stack, Button, Input, createTheme,TextField} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const Home = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
          setSelectedFile(file);
        } else {
          alert('Please select a valid CSV file');
          event.target.value = null; // Reset the input
        }
      };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // Add your upload logic here
    }
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
      <Box sx={{ mb: 25, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Quebec Fire
        </Typography>
        
        <Box sx={{ 
          mt: 3, 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'center',
          alignItems: 'center',
        
        }}>
           <TextField
            type="file"
            variant="outlined"
            onChange={handleFileChange}
            sx={{ 
                width: '300px',
                '& .MuiOutlinedInput-root': {
                  height: '50px'
                }
              }}
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            disabled={!selectedFile}
            sx={{ height: '50px' }}
          >
            Upload
          </Button>
        </Box>
      </Box>
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