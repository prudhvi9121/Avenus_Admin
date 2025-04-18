import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  CssBaseline,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '../contexts/AuthContext';
import EventsManager from './EventsManager';
import AdmissionsManager from './AdmissionsManager';
import Logo from './Logo';

const drawerWidth = 280;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSection, setSelectedSection] = useState('Events');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems = [
    { text: 'Events', icon: <EventIcon /> },
    { text: 'Announcements', icon: <AnnouncementIcon /> },
    { text: 'Admins', icon: <GroupIcon /> },
    { text: 'Admissions', icon: <SchoolIcon /> },
  ];

  return (
    <>
      <Box className="dashboard-container">
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          className="dashboard-appbar"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar className="dashboard-toolbar">
            <Box className="dashboard-topbar">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="dashboard-menu-btn"
              >
                <MenuIcon />
              </IconButton>
              <Box className="dashboard-logo-group">
                <Logo height={40} />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {/* Optionally add title text here */}
                </Box>
              </Box>
              <Box className="dashboard-topbar-icons">
                {/* <IconButton color="inherit" size="large">
                  <HelpOutlineIcon />
                </IconButton>
                <IconButton color="inherit" size="large">
                  <SettingsIcon />
                </IconButton> */}
                <IconButton
                  onClick={handleProfileMenuOpen}
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                >
                  <Avatar className="dashboard-avatar">
                    {currentUser?.email?.[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Box className="dashboard-body">
          {/* Permanent Drawer */}
          <Drawer
            variant="permanent"
            className="dashboard-drawer"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                top: 64,
                height: 'calc(100% - 64px)',
                borderRight: 1,
                borderColor: 'divider',
              },
            }}
          >
            <List className="dashboard-list">
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding className="dashboard-list-item">
                  <ListItemButton
                    selected={selectedSection === item.text}
                    onClick={() => setSelectedSection(item.text)}
                    className="dashboard-list-item-btn"
                  >
                    <ListItemIcon className="dashboard-list-item-icon">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        className:
                          selectedSection === item.text
                            ? 'dashboard-list-item-text selected'
                            : 'dashboard-list-item-text',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            className="dashboard-mobile-drawer"
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRight: 1,
                borderColor: 'divider',
              },
            }}
          >
            <Toolbar className="dashboard-toolbar">
              <Logo height={40} />
            </Toolbar>
            <List className="dashboard-list">
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding className="dashboard-list-item">
                  <ListItemButton
                    selected={selectedSection === item.text}
                    onClick={() => {
                      setSelectedSection(item.text);
                      handleDrawerToggle();
                    }}
                    className="dashboard-list-item-btn"
                  >
                    <ListItemIcon className="dashboard-list-item-icon">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        className:
                          selectedSection === item.text
                            ? 'dashboard-list-item-text selected'
                            : 'dashboard-list-item-text',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            className="dashboard-main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              bgcolor: 'background.default',
            }}
          >
            {selectedSection === 'Events' && <EventsManager />}
            {selectedSection === 'Announcements' && <div>Announcements Content</div>}
            {selectedSection === 'Admins' && <div>Admins Content</div>}
            {selectedSection === 'Admissions' && <AdmissionsManager />}
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 280,
              borderRadius: 2,
              overflow: 'visible',
              boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box className="dashboard-profile-header">
            <Box className="dashboard-profile-info">
              <Avatar className="dashboard-profile-avatar">
                {currentUser?.email?.[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.primary">
                  Admin User
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <MenuItem onClick={handleLogout} className="dashboard-menu-item">
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Inline CSS Styling */}
      <style>{`
        /* Container for the entire dashboard */
        .dashboard-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f6f8fc;
        }
        
        /* AppBar styling */
        .dashboard-appbar {
          width: 100%;
          background-color: white;
          color: #5f6368;
          box-shadow: 0 1px 2px 0 rgba(60,64,67,0.1);
        }
        
        /* Toolbar and topbar grouping */
        .dashboard-toolbar {
          padding: 0 16px;
          min-height: 64px;
          background-color: white;
        }
        
        .dashboard-topbar {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          justify-content: space-between;
        }
        
        .dashboard-menu-btn {
          margin-right: 8px;
          color: #5f6368;
        }
        
        /* Grouping for logo and optional title */
        .dashboard-logo-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-grow: 1;
        }
        
        /* Icons on the right side of the top bar */
        .dashboard-topbar-icons {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .dashboard-topbar-icons .MuiIconButton-root {
          color: #5f6368;
          transition: all 0.2s ease;
        }
        
        .dashboard-topbar-icons .MuiIconButton-root:hover {
          background-color: rgba(95, 99, 104, 0.08);
        }
        
        .dashboard-avatar {
          width: 32px;
          height: 32px;
          background-color: #1a73e8;
          font-size: 0.875rem;
          transition: transform 0.2s ease;
        }
        
        .dashboard-avatar:hover {
          transform: scale(1.05);
        }
        
        /* Body layout */
        .dashboard-body {
          display: flex;
          height: calc(100vh - 64px);
          margin-top: 64px;
          background-color: #f6f8fc;
        }
        
        /* Permanent Drawer */
        .dashboard-drawer {
          width: ${drawerWidth}px;
          background-color: white;
        }
        
        .dashboard-drawer .MuiDrawer-paper {
          background-color: white;
          width: ${drawerWidth}px;
          border-right: 1px solid #e0e0e0;
        }
        
        /* List items within the drawer */
        .dashboard-list {
          padding: 16px 8px 0;
          background-color: white;
        }
        
        .dashboard-list-item {
          margin-bottom: 4px;
        }
        
        .dashboard-list-item-btn {
          border-radius: 0 28px 28px 0;
          padding-left: 16px;
          min-height: 48px;
          transition: all 0.2s ease;
        }
        
        .dashboard-list-item-btn:hover {
          background-color: #f1f3f4;
        }
        
        .dashboard-list-item-btn.Mui-selected {
          background-color: #e8f0fe;
          color: #1a73e8;
        }
        
        .dashboard-list-item-icon {
          color: inherit;
          min-width: 36px;
        }
        
        .dashboard-list-item-text {
          font-size: 0.875rem;
          font-weight: 400;
        }
        
        .dashboard-list-item-text.selected {
          font-weight: 500;
          color: #1a73e8;
        }
        
        /* Main content area */
        .dashboard-main {
          flex-grow: 1;
          padding: 24px;
          background-color: #f6f8fc;
          min-height: calc(100vh - 64px);
          overflow-y: auto;
        }
        
        /* Profile menu header styling */
        .dashboard-profile-header {
          padding: 16px;
          border-bottom: 1px solid #e0e0e0;
          background-color: white;
        }
        
        .dashboard-profile-info {
          display: flex;
          align-items: center;
        }
        
        .dashboard-profile-avatar {
          width: 40px;
          height: 40px;
          background-color: #1a73e8;
          font-size: 1rem;
          margin-right: 16px;
        }
        
        /* Additional styling for menu items */
        .dashboard-menu-item {
          padding: 12px 16px;
          transition: background-color 0.2s ease;
        }
        
        .dashboard-menu-item:hover {
          background-color: #f5f5f5;
        }
        
        @media (max-width: 600px) {
          .dashboard-main {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default Dashboard;