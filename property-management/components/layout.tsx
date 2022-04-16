import Navbar, { NavbarProps } from './navbar'
import PersonIcon from '@mui/icons-material/Person';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
interface LayoutProps {
    children: React.ReactNode;
 }
export default function Layout({ children }: LayoutProps) {
  const navbar: NavbarProps = {
    title: 'Property Manager',
    items: [
      {
        text: 'Persons',
        link: '',
        Icon: PersonIcon
      },
      {
        text: 'Properties',
        link: '',
        Icon: OtherHousesIcon
      },
    ]
  };
  return (
    <>
      <Navbar title={navbar.title} items={navbar.items}/>
      <main>{children}</main>
    </>
  )
}