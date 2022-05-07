import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const People = lazy(() => import('../pages/People'))
const Person = lazy(() => import('../pages/Person'))
const Creditors = lazy(() => import('../pages/Creditors'))
const Creditor = lazy(() => import('../pages/Creditor'))
const Properties = lazy(() => import('../pages/Properties'))
const Property = lazy(() => import('../pages/Property'))
const Contracts = lazy(() => import('../pages/Contracts'))
const Contract = lazy(() => import('../pages/Contract'))
const Page404 = lazy(() => import('../pages/404'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/people', // the url
    component: People, // view rendered
  },
  {
    path: '/people/:personId',
    component: Person,
  },
  {
    path: '/creditors',
    component: Creditors,
  },
  {
    path: '/creditors/:creditorId',
    component: Creditor,
  },
  {
    path: '/properties',
    component: Properties,
  },
  {
    path: '/properties/:propertyId',
    component: Property,
  },
  {
    path: '/contracts',
    component: Contracts,
  },
  {
    path: '/contracts/:contractId',
    component: Contract,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
