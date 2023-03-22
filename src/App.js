import logo from './logo.svg';
import './App.css';
import MainComponent from './components/MainComponent'
import MainContextProvider from './context/MainContext';

function App() {
  return (
    <div className="App">
      <MainContextProvider>
        <MainComponent />
      </MainContextProvider>      
    </div>
  );
}

export default App;
