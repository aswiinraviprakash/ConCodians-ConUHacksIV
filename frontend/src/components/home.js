
import React,{ useState } from 'react';
import {Card, CardContent, Typography, Box, Stack, Button, Input, createTheme,TextField} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  styled} from '@mui/material';
import { Upload } from 'lucide-react';
import {submitFile} from "../Services/axios";
import UploadFile from "./UploadFile";
import {Link} from "react-router-dom";

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
const[cardDisplay, setCardDisplay] = useState(false);
const [data, setData] = useState();

  const handleUpload = async (selectedFile) => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      const response = await submitFile(selectedFile);
      if(response.status === 200){
        setCardDisplay(true);
        setData(response.data);
      }
    }
  };


  return (
    <Box sx={{
        
      maxWidth: 1200,
      mx: 'auto'
    }}>
      {/* Title and Upload Section */}

        <Box>

        <UploadFile onUpload={handleUpload} />
      </Box>

      <Box sx={{
        display: cardDisplay ? 'grid' : 'none',
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
              ${data?.op_cost}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Missed Fires Damage Cost
            </Typography>
            <Typography variant="h4">
              ${data?.damage_cost}
            </Typography>
          </CardContent>
        </Card>
      </Box>
{/*Card to display the report*/}
      <Box sx={{ 
        display: cardDisplay ? 'grid' : 'none',
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
                <Typography fontWeight="bold">{data?.low_severity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Medium Priority:</Typography>
                <Typography fontWeight="bold">{data?.med_severity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>High Priority:</Typography>
                <Typography fontWeight="bold">{data?.high_severity}</Typography>
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
                <Typography fontWeight="bold">{data?.d_low_severity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Medium Priority:</Typography>
                <Typography fontWeight="bold">{data?.d_med_severity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>High Priority:</Typography>
                <Typography fontWeight="bold">{data?.d_high_severity}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{
        textAlign: 'center',
        my: "10px",
      }}>
        {/* To view the previous reports results*/}
        <Button variant="contained" component={Link} to="/history">
          History
        </Button>
      </Box>
    </Box>

  );
};

export default Home;