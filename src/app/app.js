import angular from 'angular';
import ngCookies from 'angular-cookies';

import userList from './user-list/user-list.module';

const MODULE_NAME = 'app';



angular.module(MODULE_NAME, [
  userList,
  ngCookies
]);

export default MODULE_NAME;