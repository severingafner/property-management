import { SvgIconComponent } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, IconButton, List, Link, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";

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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
              <NextLink href={item.link} key={index} passHref>
                  <ListItem button component={Link}>
                    <ListItemIcon>
                      <item.Icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
              </NextLink>
            ))}
          </List>
        </Box>
      </Drawer>
      </>
    )
  }