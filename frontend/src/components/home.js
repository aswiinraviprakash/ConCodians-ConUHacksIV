
import React,{ useState } from 'react';
import {Card, CardContent, Typography, Box, Stack, Button, Input, createTheme,TextField} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  styled, Alert} from '@mui/material';
import { Upload } from 'lucide-react';
import {submitFile} from "../Services/axios";

// Styled components using MUI's styled API
const UploadBox = styled('div')(({ theme, dragActive }) => ({
  width: '100%',
  height: 256, // 64 * 4 for similar sizing
  border: '2px dashed',
  borderColor: dragActive ? theme.palette.primary.main : theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  backgroundColor: dragActive ? theme.palette.primary.lighter : theme.palette.grey[50],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 300ms',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.grey[100]
  }
}));

const UploadButton = styled('button')(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 200ms',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const FilePreview = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.common.white,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
          setSelectedFile(file);
        }
      }
  };


  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      const status = await submitFile(selectedFile);
      if(status === 200){
        //alert
      }else{
        //alert
      }
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
        mb: 2,
        my: '50px',
        mx: "100px",
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
        gap: 2,
        my: '50px',
        mx: "100px",
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
</div>

  );
};

export default Home;