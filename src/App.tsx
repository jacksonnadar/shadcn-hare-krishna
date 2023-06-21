import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/custom/NavBar';
import Epg from './pages/Epg';
import EditEpg from './pages/EditEpg';
import { ScrollArea } from './components/ui/scroll-area';
import DataContext from './components/custom/appContext';
import { useRef, useState } from 'react';

export interface DataContextProps {
  dataContent: DataContent[];
  setDataContent: React.Dispatch<React.SetStateAction<any[]>>;
  getFilteredData: ({
    filterOptions,
    paginateBy,
    search,
  }: {
    filterOptions?: FilterOptions;
    paginateBy?: number;
    search?: string;
  }) => DataContent[];
}

export interface DataContent {
  FileName: string;
  Category: string;
  SubCategory: string;
  SpeakerType: string;
  Speaker: string;
  Language: string;
  Duration: string;
  FestivalType: string;
  Filler: string;
  Drive: string;
  ['Rec#']: string;
  Creator: string;
  CreationDate: string;
  Editor: string;
  EditDate: string;
  DBId: string;
  durationInSeconds?: number;
}

interface FilterOptions {
  Category?: string;
  SubCategory?: string;
  Speaker?: string;
  Language?: string;
  Duration?: number;
}

let startAtIndex = 0;
function App() {
  const [dataContent, setDataContent] = useState<DataContent[]>([]);

  const getFilteredData = ({
    filterOptions = {},
    paginateBy = 10,
    search = '',
  }: {
    filterOptions?: FilterOptions;
    paginateBy?: number;
    search?: string;
  }): DataContent[] => {
    const optionsAvailable = Object.keys(filterOptions).filter(
      (key) => filterOptions[key as keyof FilterOptions] !== undefined
    );
    if (optionsAvailable.length === 0) {
      const data = dataContent.slice(startAtIndex, startAtIndex + paginateBy);
      startAtIndex += paginateBy;
      console.log('here', data);

      return data;
    }

    let filteredData: DataContent[] = [];

    for (let i = startAtIndex; i < dataContent.length; i++) {
      let isMatched = true;
      for (let j = 0; j < optionsAvailable.length; j++) {
        if (
          dataContent[i][optionsAvailable[j] as keyof DataContent] !==
          filterOptions[optionsAvailable[j] as keyof FilterOptions]
        ) {
          isMatched = false;
          break;
        }
      }
      if (isMatched) {
        filteredData.push(dataContent[i]);
      }

      if (filteredData.length === paginateBy) {
        startAtIndex = i + 1;
        break;
      }
    }

    return filteredData;
  };

  return (
    <ScrollArea className='h-screen w-screen'>
      <DataContext.Provider
        value={{ dataContent, setDataContent, getFilteredData }}>
        <NavBar />
        <main className='max-w-full'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Epg />} />
              <Route path='/epg/:id' element={<EditEpg />} />
            </Routes>
          </BrowserRouter>
        </main>
      </DataContext.Provider>
    </ScrollArea>
  );
}

export default App;
