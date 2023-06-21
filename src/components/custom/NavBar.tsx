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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  LogOut,
  Moon,
  Save,
  Sun,
  Upload,
  User,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../ui/menubar';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';
import { Label } from '@radix-ui/react-menubar';
import { Input } from '../ui/input';
import * as XLSX from 'xlsx';
import DataContext from './appContext';
import { DataContent } from '../../App';
export default function NavBar() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { dataContent, setDataContent } = useContext(DataContext);
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

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') ?? 'dark';
    setTheme(localTheme);
  }, []);

  useEffect(() => {
    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet) as DataContent[];
        const excelDateToJSDate = (serial: any) => {
          const utc_days = Math.floor(serial - 25569);
          const utc_value = utc_days * 86400;
          const date_info = new Date(utc_value * 1000);
          const fractional_day = serial - Math.floor(serial) + 0.0000001;
          let total_seconds = Math.floor(86400 * fractional_day);
          const seconds = total_seconds % 60;
          total_seconds -= seconds;
          const hours = Math.floor(total_seconds / (60 * 60));
          const minutes = Math.floor(total_seconds / 60) % 60;
          return new Date(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate(),
            hours,
            minutes,
            seconds
          );
        };
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

        setDataContent(content);
      };
      reader.readAsBinaryString(file);
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
        {/* <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>New Incognito Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>
                Always Show Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked>
                Always Show Full URLs
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value='benoit'>
                <MenubarRadioItem value='andy'>Andy</MenubarRadioItem>
                <MenubarRadioItem value='benoit'>Benoit</MenubarRadioItem>
                <MenubarRadioItem value='Luis'>Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar> */}
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
                <p className='text-center'>Drag and drop files here</p>
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
                <Button type='submit'>
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

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage className='h-full' alt='User' />
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Jackson Nadar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage className='h-full' alt='User' />
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Jackson Nadar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='mr-2 h-4 w-4' />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className='mr-2 h-4 w-4' />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className='mr-2 h-4 w-4' />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className='mr-2 h-4 w-4' />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className='mr-2 h-4 w-4' />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className='mr-2 h-4 w-4' />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className='mr-2 h-4 w-4' />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className='mr-2 h-4 w-4' />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github className='mr-2 h-4 w-4' />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className='mr-2 h-4 w-4' />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className='mr-2 h-4 w-4' />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
