import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal';
import { loadUser } from './actions/authActions';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <AppNavbar />
      <ItemModal />
      <ShoppingList />
    </Provider>
  );
}

export default App;
