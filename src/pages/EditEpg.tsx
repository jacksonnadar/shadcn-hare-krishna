import { ReactNode, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { Button } from '../components/ui/button';
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CalendarCheck2,
  CalendarDays,
  Check,
  ChevronsUpDown,
  Cross,
  Delete,
  Download,
  Edit,
  Edit2,
  Info,
  Menu,
  MoreVertical,
  Plus,
  PlusCircle,
  Save,
  Table2,
  Trash,
  X,
  XCircle,
} from 'lucide-react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../components/ui/context-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { cn } from '../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from '../components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../components/ui/command';
import { Separator } from '../components/ui/separator';
import {
  ScrollArea,
  ScrollAreaH,
  ScrollBar,
} from '../components/ui/scroll-area';

interface Row {
  startTime: string;
  endTime: string;
  next: string;
  program: string;
  scrollDetails: string;
  fileName: string;
  filler: string;
  timeRemaining: string;
  episodeTitle: string;
  starCast: string;
  scteOnFillers: string;
  selected: boolean;
}

export default function EditEpg() {
  return (
    <ScrollArea type='auto' className='w-full h-[calc(100vh-3.5rem)]'>
      <CustomContextMenuForEPG />
    </ScrollArea>
  );
}

function ToolTipCustom({
  children,
  tooltip,
}: {
  tooltip: string;
  children: any;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className=''>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function CustomTab() {
  const [rows, setRows] = useState([
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },

    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: '2 Fillers / 3 Promos',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Gauranga Priya Das',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
  ]);

  return (
    <Tabs defaultValue='aug1' className='w-full'>
      <div className='flex m-4 justify-between items-center h-10'>
        <div className='flex items-center gap-3'>
          <TabsList className='flex'>
            <TabsTrigger className='px-10' value='aug1'>
              Aug 1st
            </TabsTrigger>
            <TabsTrigger className='px-10' value='aug2'>
              Aug 2nd
            </TabsTrigger>
            <TabsTrigger className='px-10' value='aug3'>
              Aug 3nd
            </TabsTrigger>
            <TabsTrigger className='px-10' value='aug4'>
              Aug 4nd
            </TabsTrigger>
          </TabsList>
          <Button className='w-8 h-8 rounded-full p-0'>
            <PlusCircle className='h-4 w-4' />
          </Button>
        </div>

        <div className=''>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='w-10 h-10 flex items-center justify-center rounded-full p-0 border border-input hover:bg-accent hover:text-accent-foreground'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Add</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>More Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem inset>Clear Tab</DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash className='mr-2 h-4 w-4 text-red-600' />
                  <span className='text-red-600'>Delete Tab</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarDays className='mr-2 h-4 w-4 ' />
                  <span className=''>Edit Date</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className='mr-2 h-4 w-4 ' />
                  <span className=''>Add New Tab</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value='aug1'>
        <CustomEpgTable epgRows={rows} />
      </TabsContent>
      <TabsContent value='aug2'>
        <CustomEpgTable epgRows={rows} />
      </TabsContent>
    </Tabs>
  );
}

function CustomEpgTable({ epgRows }: { epgRows: Row[] }) {
  const [rows, setRows] = useState(epgRows);
  const [lastSelectedRow, setLastSelectedRow] = useState(-1);
  const selectRow = (e: any, index: number) => {
    //ctrl + click update rows to be selected
    //shift + click update rows to be selected
    //click update single row to be selected and un select all other rows
    e.stopPropagation();
    setLastSelectedRow(index);
    if (e.ctrlKey) {
      console.log('ctrl key pressed');

      const newRows = structuredClone(rows);
      newRows[index].selected = !newRows[index].selected;
      setRows(newRows);

      return;
    }
    if (e.shiftKey) {
      window.getSelection()?.removeAllRanges();

      console.log(lastSelectedRow, index);

      setRows((prevRows) => {
        if (lastSelectedRow >= 0) {
          const newRows = prevRows.map((row, i) => {
            //check if i is between lastSelectedRow and index
            if (
              (i >= lastSelectedRow && i <= index) ||
              (i <= lastSelectedRow && i >= index)
            ) {
              row.selected = true;
            }
            return row;
          });
          return newRows;
        }

        const newRows = [...prevRows];
        newRows[index].selected = !newRows[index].selected;
        return newRows;
      });
      return;
    }

    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        row.selected = false;
        return row;
      });
      newRows[index].selected = true;
      return newRows;
    });
    console.log('click');
  };

  const unSelectAllRows = (e: any) => {
    //stop propagation

    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        row.selected = false;
        return row;
      });
      return newRows;
    });
  };
  return (
    <div className='p-5  w-[100vw]'>
      <main
        onClick={unSelectAllRows}
        className='border-2 p-5 pt-0 rounded-md w-full'>
        <ScrollAreaH className='pb-3'>
          <Table>
            <TableCaption>Epg table for Aug 10th</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Start Time</TableHead>
                <TableHead className='w-[100px]'>End Time</TableHead>
                {/* <TableHead>Next</TableHead> */}
                <TableHead className='w-96'>Program</TableHead>
                {/* <TableHead>File Name</TableHead> */}
                <TableHead>Fillers</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Scroll Details</TableHead>
                <TableHead>Episode Title</TableHead>
                <TableHead>Cast</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  onClick={(e) => selectRow(e, index)}
                  key={index}
                  className={cn(
                    index % 2 === 0 ? 'bg-secondary/20' : '',
                    row.selected ? ' bg-secondary hover:bg-secondary/30' : ''
                  )}>
                  <TableCell>
                    <CustomDialogForTime
                      time={row.startTime}></CustomDialogForTime>
                  </TableCell>
                  <TableCell>
                    <CustomDialogForTime
                      time={row.endTime}></CustomDialogForTime>
                  </TableCell>
                  {/* <TableCell>
                <ToolTipCustom tooltip={row.next}>
                  <div className='truncate w-32'>{row.next}</div>
                </ToolTipCustom>
              </TableCell> */}
                  <TableCell>
                    <div className='flex gap-2'>
                      <ToolTipCustom tooltip={row.program}>
                        <div className='truncate w-80'>{row.program}</div>
                      </ToolTipCustom>
                      <ToolTipCustom tooltip='Add Program'>
                        <CustomProgramSearchDialog />
                      </ToolTipCustom>
                    </div>
                  </TableCell>
                  {/* <TableCell>{row.fileName}</TableCell> */}
                  <TableCell className=''>
                    <div className='flex gap-2 items-center min-w-[12rem]'>
                      <span className='flex gap-1 bg-muted p-2 rounded-md'>
                        {row.filler}
                      </span>
                      <ToolTipCustom tooltip='Add Program'>
                        <CustomProgramSearchDialog />
                      </ToolTipCustom>
                      {/* <Button className='w-6 h-6 rounded-full p-0'>
                        <Edit2 className='h-4 w-4' />
                      </Button> */}
                    </div>
                  </TableCell>
                  <TableCell>{row.timeRemaining}</TableCell>
                  <TableCell>
                    <Input className='w-40 py-0' />
                  </TableCell>
                  <TableCell>
                    <ToolTipCustom tooltip={row.episodeTitle}>
                      <div className='truncate w-32'>{row.episodeTitle}</div>
                    </ToolTipCustom>
                  </TableCell>
                  <TableCell>{row.starCast}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollAreaH>
      </main>
    </div>
  );
}

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

function CustomProgramSearchDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className='w-6 h-6 rounded-full p-0'>
        <Plus className='h-4 w-4' />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='w-[800px]'>
          <AlertDialogHeader>
            <DialogTitle>Search Program</DialogTitle>
            <DialogDescription>
              Search program and add to the row{' '}
            </DialogDescription>
          </AlertDialogHeader>
          <div className='grid grid-cols-2 gap-4'>
            <CustomSearchComboBox
              searchLabel='Category'
              keyValuePairs={frameworks}
            />
            <CustomSearchComboBox
              searchLabel='Sub Category'
              keyValuePairs={frameworks}
            />
            <CustomSearchComboBox
              searchLabel='Speaker'
              keyValuePairs={frameworks}
            />
            <CustomSearchComboBox
              searchLabel='Language'
              keyValuePairs={frameworks}
            />
            <div className='flex gap-3'>
              <Input placeholder='Duration' className='w-[60%]' type='tel' />
              <Select defaultValue='Seconds'>
                <SelectTrigger className=''>
                  <SelectValue placeholder='Unit' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit</SelectLabel>
                    <SelectItem value='Seconds'>Seconds</SelectItem>
                    <SelectItem value='Minutes'>Minutes</SelectItem>
                    <SelectItem value='Hours'>Hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <AlertDialogHeader>
            <DialogTitle>Results Found</DialogTitle>
          </AlertDialogHeader>
          {/* <CustomSearchComboBox /> */}
          <ScrollArea className=' max-h-60'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div className='flex flex-col gap-3 pt-2 hover:bg-muted'>
                  <div className='grid grid-cols-4 gap-2 max-w-full cursor-pointer'>
                    <ToolTipCustom tooltip=' Matrudin Vishesh - Sabse sundar stri Maa - Gauranga Priya Das'>
                      <p className='text-sm truncate col-span-3'>
                        Matrudin Vishesh - Sabse sundar stri Maa - Gauranga
                        Priya Das
                      </p>
                    </ToolTipCustom>
                    <p className='font-semibold text-sm truncate col-span-1 text-right'>
                      00:12:00
                    </p>
                  </div>
                  <Separator />
                </div>
              ))}
          </ScrollArea>
          <DialogFooter>
            <Button
              type='submit'
              onClick={() => setIsOpen(false)}
              variant='destructive'>
              <XCircle className='w-4 h-4 mr-2' /> <span>Close</span>{' '}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CustomSearchComboBox({
  keyValuePairs,
  searchLabel,
}: {
  keyValuePairs: { value: string; label: string }[];
  searchLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'>
          {value
            ? keyValuePairs.find((keyValuePair) => keyValuePair.value === value)
                ?.label
            : `${searchLabel}`}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[225px] p-0'>
        <Command>
          <CommandInput placeholder={`Search ${searchLabel}...`} />
          <CommandEmpty>No {searchLabel} found.</CommandEmpty>
          <CommandGroup>
            {keyValuePairs.map((keyValuePair) => (
              <CommandItem
                key={keyValuePair.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === keyValuePair.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {keyValuePair.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function CustomDialogForTime({
  time,
}: {
  children?: ReactNode;
  time: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('render');

  return (
    <>
      {/* <ToolTipCustom tooltip='Edit Start Time'> */}
      <div className='flex gap-1 bg-muted p-2 rounded-md'>
        {time}
        <Button
          onClick={() => setIsOpen(true)}
          variant='outline'
          className='w-6 h-6 rounded-full p-0'>
          <Edit2 className='h-3 w-3' />
          <span className='sr-only'>Add</span>
        </Button>
      </div>
      {/* </ToolTipCustom> */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='w-[400px]'>
          <AlertDialogHeader>
            <DialogTitle>Edit Start Time</DialogTitle>
            <DialogDescription>
              Editing will automatically update the time for other rows which
              could be effected.
            </DialogDescription>
          </AlertDialogHeader>
          <div className='flex justify-between'>
            <Select>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='Hour' />
              </SelectTrigger>
              <SelectContent className='h-48'>
                <SelectGroup>
                  <SelectLabel>Hour</SelectLabel>
                  {[...Array(24)].map((_, i) => (
                    <SelectItem key={i} value={i + ''}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='Min' />
              </SelectTrigger>
              <SelectContent className='h-48'>
                <SelectGroup>
                  <SelectLabel>Minutes</SelectLabel>
                  {[...Array(60)].map((_, i) => (
                    <SelectItem key={i} value={i + ''}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='Sec' />
              </SelectTrigger>
              <SelectContent className='h-48'>
                <SelectGroup>
                  <SelectLabel>Seconds</SelectLabel>
                  {[...Array(60)].map((_, i) => (
                    <SelectItem key={i} value={i + ''}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Select>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='AM / PM' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>AM / PM</SelectLabel>
              {['AM', 'PM'].map((_, i) => (
                <SelectItem key={i} value={i + ''}>
                  {i}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
          </div>
          <AlertDialogFooter>
            <Button type='submit'>
              <Save className='w-3 h-3 mr-2' /> <span>Save</span>{' '}
            </Button>
          </AlertDialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CustomContextMenuForEPG() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className='h-full w-full'>
        <div className='h-full w-full'>
          <div className=''>
            <CustomTab />
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-64'>
        <ContextMenuItem inset>
          Next Tab
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Previous Tab
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>Clear Tab</ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Tabs</ContextMenuSubTrigger>
          <ContextMenuSubContent className='w-48'>
            <ContextMenuItem>
              <Table2 className='mr-2 h-4 w-4' />
              <span> Add Tab</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <Trash className='mr-2 h-4 w-4 text-red-600' />
              <span className=' text-red-600'> Delete Current Tab</span>
            </ContextMenuItem>
            {/* <ContextMenuSeparator /> */}
            {/* <ContextMenuItem>Developer Tools</ContextMenuItem> */}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>
          <Save className='mr-2 h-4 w-4' />
          <span>Save EPG as</span>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Download className='mr-2 h-4 w-4' />
            <span>Download File</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='w-48'>
            <ContextMenuItem>Excel</ContextMenuItem>
            <ContextMenuItem>CSV (Comma separated)</ContextMenuItem>

            {/* <ContextMenuSeparator /> */}
            {/* <ContextMenuItem>Developer Tools</ContextMenuItem> */}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />

        <ContextMenuItem inset>Select All</ContextMenuItem>

        <ContextMenuItem>
          <Trash className='mr-2 h-4 w-4 text-red-600' />
          <span className=' text-red-600'> Delete Selected Rows</span>
        </ContextMenuItem>

        <ContextMenuItem>
          <ArrowUp className='mr-2 h-4 w-4' />
          <span className=''>Add Row Above</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <ArrowDown className='mr-2 h-4 w-4' />
          <span className=''>Add Row Below</span>
        </ContextMenuItem>
        {/* <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      Show Bookmarks Bar
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value='pedro'>
      <ContextMenuLabel inset>People</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuRadioItem value='pedro'>
        Pedro Duarte
      </ContextMenuRadioItem>
      <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>
    </ContextMenuRadioGroup> */}
      </ContextMenuContent>
    </ContextMenu>
  );
}
