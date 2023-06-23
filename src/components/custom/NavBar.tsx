import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback } from '../ui/avatar';
import logo from '../../assets/app-white-logo.png';
import moment from 'moment';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogOut, Moon, Save, Sun, Upload } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';

import * as XLSX from 'xlsx';
import DataContext from './appContext';
import { DataContentRow } from '../../App';
import {
  getFileFromFirebaseStorage,
  uploadMasterFileToFirebaseStorage,
} from '../../utility/firebaseStorage';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utility/auth';
import { excelDateToJSDate } from '../../utility/utility';
import { getFileDataStream } from '../../utility/firestore';
export default function NavBar() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { user, setDataContent } = useContext(DataContext);
  const [filename, setFilename] = useState<string>('');
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = Array.from(e.dataTransfer.files);
    // Process the dropped files
    setFile(files.at(0) as any as File);
  };
  const setTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setCurrentTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setCurrentTheme('light');
    }
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);
    setFile(files.at(0) as any as File);
  };

  const onSave = () => {
    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet) as DataContentRow[];

        const content = json.map((item) => {
          // console.log(item);
          const dateTime = moment(excelDateToJSDate(item.Duration));
          const durationInSeconds =
            dateTime.hours() * 3600 +
            dateTime.minutes() * 60 +
            dateTime.seconds();

          return {
            ...item,
            durationInSeconds,
            Duration: dateTime.format('HH:mm:ss'),
          };
        });
        const contentData = {
          program: content.filter(
            (item) => item.Category.trim() !== 'PROMO' && item.Filler !== 'YES'
          ),
          promos: content.filter((item) => {
            return item.Category.trim() === 'PROMO';
          }),
          fillers: content.filter((item) => item.Filler === 'YES'),
        };
        try {
          await uploadMasterFileToFirebaseStorage(
            JSON.stringify(contentData),
            file,
            new Date().valueOf() + ''
          );

          setIsUploadDialogOpen(false);
          // setDataContent(contentData);
        } catch (err) {
          console.log(err);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && user !== '...') navigate('/login');
  }, [user]);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') ?? 'dark';
    setTheme(localTheme);
  }, []);

  useEffect(() => {
    const unsubscribe = getFileDataStream(async (data) => {
      console.log(data);
      const jsonData = await getFileFromFirebaseStorage(data[0].jsonFilePath);
      if (jsonData) setDataContent(jsonData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (file) {
      setFilename(file.name);
    } else {
      setFilename('');
    }
  }, [file]);

  return (
    <nav className='shadow border-b-2 h-14  flex justify-between w-screen px-5 py-2'>
      <div className='flex items-center'>
        <img
          src={logo}
          alt='logo'
          className={`h-full ${currentTheme === 'dark' ? '' : 'filter invert'}`}
        />
      </div>
      <div className='flex items-center gap-3'>
        <div>
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className='w-4 h-4 mr-2' />
            <span> Upload</span>
          </Button>
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}>
            <DialogContent className='w-[60vw]'>
              <AlertDialogHeader>
                <DialogTitle>Upload Master File</DialogTitle>
                <DialogDescription>
                  Data from this file will be added to database.
                </DialogDescription>
              </AlertDialogHeader>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-md border-gray-400 bg-muted p-4 h-44 flex items-center justify-center ${
                  isDraggingOver ? 'bg-muted/60' : ''
                }`}>
                <p className='text-center'>
                  {filename
                    ? 'File "' + filename + '" is selected'
                    : 'Drag and drop files here'}
                </p>
              </div>

              <DialogFooter>
                <Button variant='secondary' className='relative'>
                  <input
                    type='file'
                    className='absolute inset-0 opacity-0 z-10'
                    onChange={onFileUpload}
                  />
                  <Upload className='w-3 h-3 mr-2' /> <span>Upload File</span>
                </Button>
                <Button type='submit' onClick={onSave}>
                  <Save className='w-3 h-3 mr-2' /> <span>Save</span>{' '}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Moon className='h-7 w-7' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className='mr-2 h-4 w-4' />
                <span>Dark Mode</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className='mr-2 h-4 w-4' />
                <span>Light Mode</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage className='h-full' alt='User' />
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>
              {user !== '...' && user
                ? user.displayName ?? user.email
                : 'No user'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={logout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
