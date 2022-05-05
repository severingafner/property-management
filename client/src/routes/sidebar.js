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
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },
]

export default routes
