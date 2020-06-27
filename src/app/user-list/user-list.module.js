import angular from 'angular';

import '../../style/app.css';

import UserListController from './user-list.controller';
import userListService from './user-list.service';

const MODULE_NAME = 'userList';

angular.module(MODULE_NAME, [userListService])
    .component('userList', {
        template: require('./user-list.template.html'),
        controller: UserListController
    });

export default MODULE_NAME;