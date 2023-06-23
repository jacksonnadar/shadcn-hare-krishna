import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/custom/NavBar';
import Epg from './pages/Epg';
import EditEpg from './pages/EditEpg';
import { ScrollArea } from './components/ui/scroll-area';
import DataContext from './components/custom/appContext';
import { useRef, useState } from 'react';
import Login from './pages/login';
import { auth } from './utility/firebase';
import { User } from 'firebase/auth';

export interface DataContextProps {
  dataContent: DataContent;
  setDataContent: React.Dispatch<React.SetStateAction<DataContent>>;
  getFilteredData: ({
    filterOptions,
    paginateBy,
    search,
  }: FilterFunctionParams) => DataContentRow[];
  getFilteredFillerPromoData: ({}: FilterFillerPromoOptions) => DataContentRow[];
  user: User | null | '...';
}

export interface DataContentRow {
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
  durationInSeconds: number;
}

export interface DataContent {
  program: DataContentRow[];
  fillers: DataContentRow[];
  promos: DataContentRow[];
}

interface FilterOptions {
  Category?: string;
  SubCategory?: string;
  Speaker?: string;
  Language?: string;
}

export type Type = 'Fillers' | 'Promos';

interface FilterFillerPromoOptions {
  Language: string;
  duration: number;
  search: string;
  type: Type;
  reFetch: boolean;
}
interface FilterFunctionParams {
  filterOptions?: FilterOptions;
  paginateBy?: number;
  search?: string;
  reFetch: boolean;
  duration?: number;
}
let startAtIndex = 0;
function App() {
  const [dataContent, setDataContent] = useState<DataContent>({
    program: [],
    fillers: [],
    promos: [],
  });

  const [user, setUser] = useState<User | null | '...'>('...');

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const getFilteredData = ({
    filterOptions = {},
    reFetch,
    duration,
    paginateBy = 10,
    search = '',
  }: FilterFunctionParams): DataContentRow[] => {
    if (reFetch) {
      startAtIndex = 0;
    }

    const optionsAvailable = Object.keys(filterOptions).filter((key) =>
      filterOptions[key as keyof FilterOptions] ? true : false
    );

    if (optionsAvailable.length === 0 && search === '' && !duration) {
      const data = dataContent.program.slice(
        startAtIndex,
        startAtIndex + paginateBy
      );
      startAtIndex += paginateBy;

      return data;
    }

    let filteredData: DataContentRow[] = [];
    if (startAtIndex >= dataContent.program.length - 1) {
      return [];
    }

    for (let i = startAtIndex; i < dataContent.program.length; i++) {
      if (i === dataContent.program.length - 1) {
        startAtIndex = dataContent.program.length - 1;

        return filteredData;
      }
      let isMatched = true;

      for (let j = 0; j < optionsAvailable.length; j++) {
        if (
          (
            dataContent.program[i][
              optionsAvailable[j] as keyof DataContentRow
            ] + ''
          ).toLocaleLowerCase() !==
          (
            filterOptions[optionsAvailable[j] as keyof FilterOptions] + ''
          ).toLocaleLowerCase()
        ) {
          isMatched = false;
          break;
        }
      }

      if (
        !dataContent.program[i].FileName.toLowerCase().includes(
          search.toLowerCase()
        )
      ) {
        isMatched = false;
      }

      if (duration && dataContent.program[i].durationInSeconds > duration) {
        isMatched = false;
        continue;
      }

      if (isMatched) {
        filteredData.push(dataContent.program[i]);
      }

      if (filteredData.length === paginateBy) {
        startAtIndex = i + 1;
        break;
      }
    }

    return filteredData;
  };
  let promoFillerStartAtIndex = 0;
  const getFilteredFillerPromoData = ({
    Language,
    duration,
    search,
    type,
    reFetch,
  }: FilterFillerPromoOptions) => {
    if (reFetch) {
      promoFillerStartAtIndex = 0;
    }

    const content =
      type === 'Fillers' ? dataContent.fillers : dataContent.promos;

    let filteredData: DataContentRow[] = [];
    if (promoFillerStartAtIndex >= content.length - 1) {
      return [];
    }

    if (!Language && !duration && !search) {
      const data = content.slice(
        promoFillerStartAtIndex,
        promoFillerStartAtIndex + 10
      );
      promoFillerStartAtIndex += 10;
      return data;
    }

    for (let i = promoFillerStartAtIndex; i < content.length; i++) {
      if (i === content.length - 1) {
        promoFillerStartAtIndex = content.length - 1;

        return filteredData;
      }
      let isMatched = true;

      if (
        Language &&
        content[i].Language.toLowerCase() !== Language.toLowerCase()
      ) {
        isMatched = false;
        continue;
      }

      if (!content[i].FileName.toLowerCase().includes(search.toLowerCase())) {
        isMatched = false;
        continue;
      }

      if (duration && content[i].durationInSeconds > duration) {
        isMatched = false;
        continue;
      }

      if (isMatched) {
        filteredData.push(content[i]);
      }

      if (filteredData.length === 10) {
        promoFillerStartAtIndex = i + 1;
        break;
      }
    }

    return filteredData;
  };

  return (
    <ScrollArea className='h-screen w-screen'>
      <DataContext.Provider
        value={{
          dataContent,
          setDataContent,
          getFilteredData,
          user,
          getFilteredFillerPromoData,
        }}>
        <BrowserRouter>
          <main className='max-w-full'>
            <Routes>
              <Route path='/' element={<Epg />} />
              <Route path='/login' element={<Login />} />
              <Route path='/epg/:id' element={<EditEpg />} />
            </Routes>
          </main>
        </BrowserRouter>
      </DataContext.Provider>
    </ScrollArea>
  );
}

export default App;
