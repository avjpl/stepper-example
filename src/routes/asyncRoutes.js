import { AsyncComponent } from '../utils';

export const routes = [
  {
    component: AsyncComponent(() => System.import('../components/Home')),
    path: '/',
    exact: true,
  },
];
