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
  Delete,
  Download,
  Edit,
  Edit2,
  Info,
  Menu,
  MoreVertical,
  Plus,
  Save,
  Table2,
  Trash,
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
  return <CustomContextMenuForEPG />;
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
        <TooltipContent>
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
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },

    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
    {
      startTime: '00:00:00',
      endTime: '00:00:00',
      next: 'Next Program Name 1 skdm odskmmsdfkm   kmksmdklsmdkf',
      program: 'Program',
      scrollDetails: 'Scroll Details',
      fileName: 'File Name',
      filler: 'Filler',
      timeRemaining: '00:00:00',
      episodeTitle: 'EpisodsdfsdnkfsdnkfjsdkfkjsdfknsdjkfsjkdfjkeTitle',
      starCast: 'Star Cast',
      scteOnFillers: 'Scte On Fillers',
      selected: false,
    },
  ]);

  return (
    <Tabs defaultValue='aug1' className='w-full'>
      <div className='flex m-4 justify-between items-center h-10'>
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
    <main className='border-2 p-5 rounded-md m-5' onClick={unSelectAllRows}>
      <Table>
        <TableCaption>Epg table for Aug 10th</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Start Time</TableHead>
            <TableHead className='w-[100px]'>End Time</TableHead>
            <TableHead>Next</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Scroll Details</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Filler</TableHead>
            <TableHead>Time remaining</TableHead>
            <TableHead>Episode Title</TableHead>
            <TableHead>Star cast</TableHead>
            <TableHead>Scte On Fillers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              onClick={(e) => selectRow(e, index)}
              key={index}
              className={cn(
                index % 2 === 0 ? 'bg-secondary/20' : '',
                row.selected
                  ? 'dark:bg-green-900 dark:hover:bg-green-900 bg-green-200 hover:bg-green-200'
                  : ''
              )}>
              <TableCell>
                <CustomDialogForTime time={row.startTime}></CustomDialogForTime>
              </TableCell>
              <TableCell>
                {/* <ToolTipCustom tooltip='Edit End Time'>
                  <div className='flex gap-1 bg-muted p-2 rounded-md'>
                    {row.endTime}
                    <Button
                      variant='outline'
                      className='w-6 h-6 rounded-full p-0'>
                      <Edit2 className='h-3 w-3' />
                      <span className='sr-only'>Add</span>
                    </Button>
                  </div>
                </ToolTipCustom> */}
              </TableCell>
              <TableCell>
                <ToolTipCustom tooltip={row.next}>
                  <div className='truncate w-32'>{row.next}</div>
                </ToolTipCustom>
              </TableCell>
              <TableCell>
                <ToolTipCustom tooltip={row.program}>
                  <div className='truncate w-32'>{row.program}</div>
                </ToolTipCustom>
              </TableCell>
              <TableCell>{row.scrollDetails}</TableCell>
              <TableCell>{row.fileName}</TableCell>
              <TableCell>{row.filler}</TableCell>
              <TableCell>{row.timeRemaining}</TableCell>
              <TableCell>
                <ToolTipCustom tooltip={row.episodeTitle}>
                  <div className='truncate w-32'>{row.episodeTitle}</div>
                </ToolTipCustom>
              </TableCell>
              <TableCell>{row.starCast}</TableCell>
              <TableCell>{row.scteOnFillers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
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
        <ContextMenuItem inset>Add Row Above</ContextMenuItem>
        <ContextMenuItem inset>Add Row Below</ContextMenuItem>
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
