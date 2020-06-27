var moduleName='userListService';

const HTTP = new WeakMap();
const COOKIES = new WeakMap();

const API_ENTRYPOINT = 'http://localhost:3000';

//IMPORTANT: This values must match the ones provided in the env variables in the backend
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'sudo make me a sandwich';

class UserListService
{
    constructor($http, $cookies)
    {
        HTTP.set(this, $http);

        COOKIES.set(this, $cookies);
        
        this.login().then(data => COOKIES.get(this).put('jwt', data.token));
    }

    getUsers(){
        const config = { 
            headers : {
                'authorization': 'bearer ' + COOKIES.get(this).get('jwt'),
                'withCredentials': true
            }
        };
        return HTTP.get(this).get(API_ENTRYPOINT+'/users', config).then(result => result.data );
    }

    filterUsers(name = '', hobby = ''){

        let params = {};

        if(name !== '') params.name = name;
        if(hobby !== '') params.hobby = hobby;

        const config = { 
            headers : {
                'authorization': 'bearer ' + COOKIES.get(this).get('jwt'),
                'withCredentials': true
            },
            params
        };

        return HTTP.get(this).get(API_ENTRYPOINT+'/users', config).then(result => result.data );
    }

    deleteUser(id) {
        const config = { 
            headers : {
                'authorization': 'bearer ' + COOKIES.get(this).get('jwt'),
                'withCredentials': true
            }
        };

        return HTTP.get(this).delete(API_ENTRYPOINT+'/users/' + id, config).then(result => result.data );
    }

    createUser(user){
        const config = { 
            headers : {
                'authorization': 'bearer ' + COOKIES.get(this).get('jwt'),
                'withCredentials': true
            }
        };
        return HTTP.get(this).post(API_ENTRYPOINT+'/users', user, config).then(result => result.data )
    }

    login(){
        return HTTP.get(this).post(API_ENTRYPOINT+'/login',{'username': ADMIN_USERNAME, 'password': ADMIN_PASSWORD}).then(result => result.data )
    }

    static userListFactory($http, $cookies){
        return new UserListService($http, $cookies);
    }
}

UserListService.userListFactory.$inject = ['$http', '$cookies'];

angular.module(moduleName, [])
  .factory('userListService', UserListService.userListFactory);

export default moduleName;