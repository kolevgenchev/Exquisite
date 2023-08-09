import React, { useState } from 'react';
import Header from './Components/Header.jsx';
import './App.css';
import Grid from './Components/Grid.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Accessories');
  const [resetGrid, setResetGrid] = useState(false);
  const categories = ['Accessories', 'Bags', 'Shoes'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setResetGrid(true);
  };

  return (
    <div>
      <Header categories={categories} onCategoryChange={handleCategoryChange} />
      <Grid selectedCategory={selectedCategory} resetGrid={resetGrid} onReset={() => setResetGrid(false)} />
      <Footer />
    </div>
  );
}

export default App;



