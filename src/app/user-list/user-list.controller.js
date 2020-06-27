const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

class UserListController {
    
    constructor($timeout, userListService) {
        SERVICE.set(this, userListService);
        TIMEOUT.set(this, $timeout);

        INIT.set(this, () => {
            SERVICE.get(this).getUsers().then(users =>{
                this.users = users;
            });
        });

        INIT.get(this)();

        this.filter = {
            name : '',
            hobby: ''
        }

        this.user = {
            name : '',
            email: '',
            phone : '',
            password: '',
            age: '',
            gender: '',
            hobby: '',
        }
    }

    createUser() {
        
        if(this.newUserForm.$valid && !this.newUserForm.$untouched) {

            SERVICE.get(this).createUser(this.user).then(user =>{
                console.log(user);
                this.users.push(user);
            });
        }
    }
    
    filterUsers() {
        
        if(this.filter.name !== '' || this.filter.hobby !== '') {
            SERVICE.get(this).filterUsers(this.filter.name, this.filter.hobby).then(users =>{
                this.users = users;
            });
        } else {

            this.getUsers();
        }
    }

    getUsers() {

        SERVICE.get(this).getUsers().then(users =>{
            this.users = users;
        });
    }

    deleteUser(id){
        SERVICE.get(this).deleteUser(id).then(response =>{
            if(response.success) {
                this.users.splice(this.users.findIndex(x => x._id === id),1);
            }
        });
    }
}

UserListController.$inject = ['$timeout', 'userListService']
export default UserListController;
  