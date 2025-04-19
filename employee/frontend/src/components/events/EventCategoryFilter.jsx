import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Chip, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Popover,
  IconButton,
  Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'education', name: 'Education' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'vocational_training', name: 'Vocational Training' },
  { id: 'environment', name: 'Environment' },
  { id: 'women_empowerment', name: 'Women Empowerment' },
  { id: 'elderly_support', name: 'Elderly Support' },
  { id: 'support_differently_abled', name: 'Differently Abled' },
  { id: 'disaster_relief', name: 'Disaster Relief' },
  { id: 'animal_welfare', name: 'Animal Welfare' }
];

const EventCategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCategoryChange = (categoryId) => {
    onCategoryChange(categoryId);
    if (isMobile) {
      handleClose();
    }
  };
  
  const getCategoryColor = (category) => {
    if (category === 'all') return theme.palette.grey[700];
    return theme.palette.categories[category] || theme.palette.primary.main;
  };
  
  const open = Boolean(anchorEl);
  
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mr: 2 }}>
          Event Categories
        </Typography>
        
        {isMobile && (
          <IconButton onClick={handleClick} size="small" sx={{ ml: 'auto' }}>
            <FilterListIcon />
          </IconButton>
        )}
      </Box>
      
      {!isMobile ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategoryChange(category.id)}
              sx={{
                backgroundColor: selectedCategory === category.id 
                  ? getCategoryColor(category.id) 
                  : 'transparent',
                color: selectedCategory === category.id 
                  ? 'white' 
                  : 'text.primary',
                border: `1px solid ${selectedCategory === category.id 
                  ? getCategoryColor(category.id) 
                  : theme.palette.divider}`,
                '&:hover': {
                  backgroundColor: selectedCategory === category.id 
                    ? getCategoryColor(category.id) 
                    : theme.palette.action.hover
                }
              }}
            />
          ))}
        </Box>
      ) : (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, maxWidth: 300 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Filter by Category
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "contained" : "outlined"}
                  size="small"
                  onClick={() => handleCategoryChange(category.id)}
                  sx={{
                    justifyContent: 'flex-start',
                    backgroundColor: selectedCategory === category.id 
                      ? getCategoryColor(category.id) 
                      : 'transparent',
                    color: selectedCategory === category.id 
                      ? 'white' 
                      : 'text.primary',
                    borderColor: getCategoryColor(category.id),
                    '&:hover': {
                      backgroundColor: selectedCategory === category.id 
                        ? getCategoryColor(category.id) 
                        : `${getCategoryColor(category.id)}22`
                    }
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Popover>
      )}
    </Box>
  );
};

EventCategoryFilter.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default EventCategoryFilter;