import React from 'react';
import './assets/styles/global.css';
import { DragonsListPage } from './features/dragons/pages/DragonsListPage'; // Importando o DragonsListPage
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="App">
      <>
      <ThemeToggle />
      <DragonsListPage />
      
      </>
    </div>
  );
}

export default App;
