import React,{useState} from 'react';
import { Typography, Box, Alert, styled } from '@mui/material';
import { Upload } from 'lucide-react';

// Styled components using MUI's styled API
const UploadBox = styled('div')(({ theme, dragActive }) => ({
  width: '100%',
  height: 256,
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

const UploadFile = ({ 
  onUpload
}) => {

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
  const handlers = {
    handleDrag,
    handleDrop,
    handleChange,
    handleUpload: () => onUpload(selectedFile),
    onErrorClose: () => setError('')
  };
  const validateFile = (file) => {
    if (!file) return false;
    
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file only');
      setSelectedFile(null);
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      setSelectedFile(null);
      return false;
    }

    setError('');
    return true;
  };

  return (
    <Box sx={{ 
      mt: 3,
      maxWidth: 600,
      mx: 'auto'
    }}>
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={handlers.onErrorClose}
        >
          {error}
        </Alert>
      )}
      <UploadBox
        dragActive={dragActive}
        onDragEnter={handlers.handleDrag}
        onDragLeave={handlers.handleDrag}
        onDragOver={handlers.handleDrag}
        onDrop={handlers.handleDrop}
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handlers.handleChange}
          accept=".csv"
        />
        <Upload 
          size={40}
          style={{ 
            marginBottom: '12px',
            color: dragActive ? '#1976d2' : '#9e9e9e'
          }} 
        />
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>Click to upload</Box>
          {' '}or drag and drop
        </Typography>
        <Typography variant="caption" color="text.secondary">
          CSV files only, up to 10MB
        </Typography>

        {selectedFile && (
          <FilePreview>
            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Selected: {selectedFile.name}
            </Typography>
          </FilePreview>
        )}
      </UploadBox>

      {selectedFile && (
        <UploadButton onClick={() => onUpload(selectedFile)}>
          Upload File
        </UploadButton>
      )}
    </Box>
  );
};

export default UploadFile;