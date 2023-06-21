import { createContext } from 'react';
import { DataContextProps } from '../../App';

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export default DataContext;
