import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Box, 
  useTheme 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const EventSearch = ({ value, onChange }) => {
  const theme = useTheme();
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);
  
  // Sync local state with prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };
  
  const handleClear = () => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };
  
  const handleFocus = (event) => {
    event.target.select();
  };
  
  return (
    <Box sx={{ width: { xs: '100%', sm: '300px' } }}>
      <TextField
        ref={inputRef}
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search events..."
        value={localValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: localValue ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: {
            borderRadius: theme.shape.borderRadius,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)'
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`
            }
          }
        }}
      />
    </Box>
  );
};

EventSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EventSearch;