import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ItunesContainer from '@containers/ItunesContainer/Loadable'
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: ItunesContainer,
    route: '/itunes'
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
