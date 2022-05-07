/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {},
  {
    path: '/app/people',
    icon: 'PeopleIcon',
    name: 'People',
  },
  {
    path: '/app/creditors',
    icon: 'MailIcon',
    name: 'Creditors',
  },
  {
    path: '/app/properties',
    icon: 'HomeIcon',
    name: 'Properties',
  },
  {
    path: '/app/contracts',
    icon: 'MoneyIcon',
    name: 'Contracts',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/app/404',
        name: '404',
      },
    ],
  },
]

export default routes
