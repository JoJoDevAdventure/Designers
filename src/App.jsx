import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

function App() {
  return (
    <main className='app transition-all ease-in'>
      <NavBar/>
      <SignIn/>
      <Home/>
    </main>
  );
}

export default App;