import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import TripsList from './components/Trip/TripsList/TripsList';
import store, { RootState } from './store';
import './styles.scss';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/trips');
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/trips" element={<TripsList />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;