import { SvgIconComponent } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Toolbar, Typography } from "@mui/material";

export interface NavbarProps {
  title: string,
  items: {
    text: string,
    link: string,
    Icon: SvgIconComponent
  }[];
}
export default function Navbar(props: NavbarProps) {
    const drawerWidth = 240;
    return (
      <>
              <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {props.items.map((item, index) => (
              <ListItem button key={item.text}>
                <ListItemIcon>
                  <item.Icon/>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      </>
    )
  }