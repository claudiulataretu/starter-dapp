import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import withPageTitle from './components/PageTitle';
import Owner from 'pages/Owner';
import LandingPage from 'pages/LandingPage';

interface RouteType {
  path: string;
  page: string;
  title: string;
  component: any;
}

const routes: RouteType[] = [
  {
    path: '/',
    page: 'home',
    title: '',
    component: LandingPage,
  },
  {
    path: '/stake',
    page: 'stake',
    title: '',
    component: Home,
  },
  {
    path: '/dashboard',
    page: 'dashboard',
    title: 'MGStaking | Dashboard',
    component: Dashboard,
  },
  {
    path: '/owner',
    page: 'owner',
    title: 'MGStaking | Owner',
    component: Owner,
  },
];

const wrappedRoutes = () => {
  return routes.map(route => {
    const title = route.title ? `${route.title}` : 'MGStaking';
    return {
      path: route.path,
      page: route.page,
      component: (withPageTitle(title, route.component) as any) as React.ComponentClass<{}, any>,
    };
  });
};

export default wrappedRoutes();
