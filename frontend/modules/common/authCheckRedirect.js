import AuthStore from '../account/stores/AuthStore'
import history from './history'

const authCheckRedirect = () => {
  if (!AuthStore.isAuthenticated()) {
    history.replace('/login');
  }
};

export default authCheckRedirect
