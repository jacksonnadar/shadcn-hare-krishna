import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/custom/NavBar';
import Epg from './pages/Epg';
import EditEpg from './pages/EditEpg';

function App() {
  return (
    <div className='h-screen w-screen overflow-x-hidden'>
      <NavBar />
      <main className='max-w-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/epg/*' element={<Epg />} />
            <Route path='/epg/:id' element={<EditEpg />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
