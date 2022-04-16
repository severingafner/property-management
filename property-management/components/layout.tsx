import Navbar, { NavbarProps } from './navbar'
import PersonIcon from '@mui/icons-material/Person';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Box } from '@mui/material';
interface LayoutProps {
    children: React.ReactNode;
 }
export default function Layout({ children }: LayoutProps) {
  const navbar: NavbarProps = {
    title: 'Property Manager',
    items: [
      {
        text: 'Persons',
        link: '/persons',
        Icon: PersonIcon
      },
      {
        text: 'Properties',
        link: '/properties',
        Icon: OtherHousesIcon
      },
      {
        text: 'Objects',
        link: '/objects',
        Icon: ApartmentIcon
      }
    ]
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar title={navbar.title} items={navbar.items}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <main>{children}</main>
        </Box>
      </Box>
    </>
  )
}