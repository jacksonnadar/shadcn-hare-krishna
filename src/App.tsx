import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/custom/NavBar';
import Epg from './pages/Epg';
import EditEpg from './pages/EditEpg';
import { ScrollArea } from './components/ui/scroll-area';

function App() {
  return (
    <ScrollArea className='h-screen w-screen'>
      <NavBar />
      <main className='max-w-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Epg />} />
            <Route path='/epg/:id' element={<EditEpg />} />
          </Routes>
        </BrowserRouter>
      </main>
    </ScrollArea>
  );
}

export default App;
