import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const onClick = () => {
    console.log('debug1');
  }

  return (
    <div className="App">
      <button onClick={onClick}>haha</button>
    </div>
  );
}

export default App;
