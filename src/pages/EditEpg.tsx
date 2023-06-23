import {
  ReactNode,
  useState,
  forwardRef,
  useRef,
  useContext,
  useEffect,
} from 'react';
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
  ShieldCloseIcon,
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
import { HotKeys } from 'react-hotkeys';
import DataContext from '../components/custom/appContext';
import { DataContentRow, Type } from '../App';
import debounce from 'lodash/debounce';
import {
  EpgRow,
  defaultEpgData,
  hhmmssAddition,
  hhmmssSubtraction,
  unitToSeconds,
} from '../utility/utility';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../components/ui/hover-card';
import NavBar from '../components/custom/NavBar';

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
  const [rows, setRows] = useState(defaultEpgData);

  const [tabs, setTabs] = useState([
    {
      label: 'Aug 1st',
      value: 'aug1',
    },
    {
      label: 'Aug 2nd',
      value: 'aug2',
    },
    {
      label: 'Aug 3rd',
      value: 'aug3',
    },
    {
      label: 'Aug 4th',
      value: 'aug4',
    },
    {
      label: 'Aug 5th',
      value: 'aug5',
    },
    {
      label: 'Aug 6th',
      value: 'aug6',
    },
  ]);
  const tabRef = useRef<HTMLButtonElement>(null);
  const [tabValue, setTabValue] = useState('aug1');
  const keyMap = {
    NEXT_TAB: 'ctrl+]',
    PREVIOUS_TAB: 'ctrl+[',
    FIRST_TAB: 'ctrl+shift+[',
    LAST_TAB: 'ctrl+shift+]',
  };

  const handlers = {
    NEXT_TAB: () => {
      setTabValue((prevTabValue) => {
        const tabIndex = tabs.findIndex((tab) => tab.value === prevTabValue);
        const newValue = tabs.at(tabIndex + 1)?.value;
        tabRef.current?.focus();
        return newValue ?? tabs.at(0)?.value ?? '';
      });
    },
    PREVIOUS_TAB: () => {
      setTabValue((prevTabValue) => {
        const tabIndex = tabs.findIndex((tab) => tab.value === prevTabValue);
        tabRef.current?.focus();

        return tabs.at(tabIndex - 1)?.value ?? '';
      });
    },
    FIRST_TAB: () => {
      tabRef.current?.focus();
      setTabValue(() => tabs.at(0)?.value ?? '');
    },

    LAST_TAB: () => {
      tabRef.current?.focus();
      setTabValue(() => tabs.at(-1)?.value ?? '');
    },
  };

  return (
    <>
      <NavBar />

      <HotKeys keyMap={keyMap} handlers={handlers} unselectable='on'>
        <Tabs value={tabValue} onValueChange={setTabValue} className='w-full'>
          <div className='flex m-4 justify-between items-center gap-3'>
            <div className='flex items-center gap-3'>
              <TabsList className='flex'>
                {tabs.map((tab) => (
                  <TabsTrigger
                    ref={tabRef}
                    className='px-10'
                    value={tab.value}
                    key={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button className='min-w-[2rem] h-8 rounded-full p-0'>
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
          {tabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value}>
              <CustomEpgTable epgRows={rows} />
            </TabsContent>
          ))}
        </Tabs>
      </HotKeys>
    </>
  );
}

function CustomEpgTable({ epgRows }: { epgRows: EpgRow[] }) {
  const [rows, setRows] = useState(epgRows);
  const [lastSelectedRow, setLastSelectedRow] = useState(-1);
  const selectRow = (index: number, e?: any) => {
    //ctrl + click update rows to be selected
    //shift + click update rows to be selected
    //click update single row to be selected and un select all other rows
    e?.stopPropagation();
    setLastSelectedRow(index);
    if (e?.ctrlKey) {
      const newRows = structuredClone(rows);
      newRows[index].selected = !newRows[index].selected;
      setRows(newRows);

      return;
    }
    if (e?.shiftKey) {
      window.getSelection()?.removeAllRanges();

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
  };

  const unSelectAllRows = (e: any) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        row.selected = false;
        return row;
      });
      return newRows;
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentRowForProgramIndex, setCurrentRowForProgramIndex] = useState<
    number | null
  >(null);
  const [currentRowForPromoFillerIndex, setCurrentRowForPromoFillerIndex] =
    useState<number | null>(null);
  const { getFilteredData } = useContext(DataContext);
  const [categoryValue, setCategoryValue] = useState('');
  const [subCategoryValue, setSubCategoryValue] = useState('');
  const [speakersValue, setSpeakersValue] = useState('');
  const [languageValue, setLanguageValue] = useState('');
  const [duration, setDuration] = useState({ value: '', unit: 'seconds' });
  const [search, setSearch] = useState('');
  const { dataContent } = useContext(DataContext);

  const onSearchChange = debounce((e: any) => {
    console.log(e.target.value);

    setSearch(e.target.value);
  }, 1000);

  // first 10

  const [filteredRows, setFilteredRows] = useState<DataContentRow[]>([]);

  useEffect(() => {
    const data = getFilteredData({
      filterOptions: {
        Category: categoryValue,
        SubCategory: subCategoryValue,
        Language: languageValue,
        Speaker: speakersValue,
      },
      duration: unitToSeconds(duration.unit, +duration.value),
      search,
      reFetch: true,
    });
    console.log(data);

    setFilteredRows(data);
  }, [
    categoryValue,
    subCategoryValue,
    speakersValue,
    languageValue,
    duration.unit,
    duration.value,
    search,
    dataContent.program,
  ]);

  const onScrollEnd = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      (e.target as any).scrollHeight - (e.target as any).scrollTop - 1 <
      (e.target as any).clientHeight
    ) {
      setFilteredRows((prev) => [
        ...prev,
        ...getFilteredData({
          reFetch: false,
          filterOptions: {
            Category: categoryValue,
            SubCategory: subCategoryValue,
            Language: languageValue,
            Speaker: speakersValue,
          },
          duration: unitToSeconds(duration.unit, +duration.value),
          search,
        }),
      ]);
    }
  };

  const addProgramToEpgRow = (
    programId: string,
    cast: string,
    timeString: string
  ) => {
    const newRows = structuredClone(rows);
    const timeRemaining = hhmmssSubtraction(
      newRows[currentRowForProgramIndex!].timeRemaining,
      timeString
    );
    newRows[currentRowForProgramIndex!].program = programId;
    newRows[currentRowForProgramIndex!].starCast = cast;
    newRows[currentRowForProgramIndex!].timeRemaining = timeRemaining;

    setRows(newRows);
    setCurrentRowForProgramIndex(null);
  };
  const selectFillerOrPromo = (data: DataContentRow, type: Type) => {
    const newRows = structuredClone(rows);

    const typeString = type === 'Promos' ? 'promos' : 'fillers';

    newRows[currentRowForPromoFillerIndex!].filler[typeString].push(data);
    const ids = [
      ...new Set(
        newRows[currentRowForPromoFillerIndex!].filler[typeString].map(
          (item) => item['Rec#']
        )
      ),
    ];
    newRows[currentRowForPromoFillerIndex!].filler[typeString] = ids.map(
      (id) =>
        newRows[currentRowForPromoFillerIndex!].filler[typeString].find(
          (item) => item['Rec#'] === id
        )!
    );
    newRows[currentRowForPromoFillerIndex!].timeRemaining = hhmmssSubtraction(
      newRows[currentRowForPromoFillerIndex!].timeRemaining,
      data.Duration
    );

    setRows(newRows);
  };

  const deselectFillerOrPromo = (id: string) => {
    const newRows = structuredClone(rows);

    //remove from both fillers and promos if available

    const fillerIndex = newRows[
      currentRowForPromoFillerIndex!
    ].filler.fillers.findIndex((item) => item['Rec#'] === id);
    if (fillerIndex !== -1) {
      newRows[currentRowForPromoFillerIndex!].timeRemaining = hhmmssAddition(
        newRows[currentRowForPromoFillerIndex!].timeRemaining,
        newRows[currentRowForPromoFillerIndex!].filler.fillers[fillerIndex]
          .Duration
      );
      newRows[currentRowForPromoFillerIndex!].filler.fillers.splice(
        fillerIndex,
        1
      );
    }

    const promoIndex = newRows[
      currentRowForPromoFillerIndex!
    ].filler.promos.findIndex((item) => item['Rec#'] === id);
    if (promoIndex !== -1) {
      newRows[currentRowForPromoFillerIndex!].timeRemaining = hhmmssAddition(
        newRows[currentRowForPromoFillerIndex!].timeRemaining,
        newRows[currentRowForPromoFillerIndex!].filler.promos[promoIndex]
          .Duration
      );
      console.log(newRows[currentRowForPromoFillerIndex!].filler.promos);

      newRows[currentRowForPromoFillerIndex!].filler.promos.splice(
        promoIndex,
        1
      );
    }

    setRows(newRows);
  };

  return (
    <div className='p-5  w-[100vw]'>
      <main
        onClick={unSelectAllRows}
        className='border-2 p-5 pt-0 rounded-md w-full'>
        <ScrollAreaH className='pb-3'>
          <Dialog
            open={currentRowForProgramIndex !== null ? true : false}
            onOpenChange={(value) => setCurrentRowForProgramIndex(null)}>
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
                  value={categoryValue}
                  setValue={setCategoryValue}
                  keyValuePairs={category.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <CustomSearchComboBox
                  searchLabel='Sub Category'
                  value={subCategoryValue}
                  setValue={setSubCategoryValue}
                  keyValuePairs={subCategory.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <CustomSearchComboBox
                  searchLabel='Speaker'
                  value={speakersValue}
                  setValue={setSpeakersValue}
                  keyValuePairs={speaker.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <CustomSearchComboBox
                  searchLabel='Language'
                  value={languageValue}
                  setValue={setLanguageValue}
                  keyValuePairs={language.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <div className='flex gap-3'>
                  <Input
                    placeholder='Duration'
                    className='w-[60%]'
                    type='tel'
                    value={duration.value}
                    onChange={(e) =>
                      setDuration({
                        ...duration,
                        value: isNaN(+e.target.value)
                          ? duration.value
                          : e.target.value,
                      })
                    }
                  />
                  <Select
                    defaultValue='seconds'
                    value={duration.unit}
                    onValueChange={(value) =>
                      setDuration({ ...duration, unit: value })
                    }>
                    <SelectTrigger className=''>
                      <SelectValue placeholder='Unit' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unit</SelectLabel>
                        <SelectItem value='seconds'>Seconds</SelectItem>
                        <SelectItem value='minutes'>Minutes</SelectItem>
                        <SelectItem value='hours'>Hours</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <AlertDialogHeader>
                <div className='flex justify-between items-center'>
                  <DialogTitle className='w-44'>Results Found</DialogTitle>
                  <Input
                    placeholder='Search'
                    // value={search}
                    onChange={onSearchChange}
                  />
                </div>
              </AlertDialogHeader>

              <ScrollArea
                className='h-60'
                onScroll={console.log}
                onScrollCapture={onScrollEnd}>
                {filteredRows.map((item, index) => (
                  <div
                    className='flex flex-col gap-3 pt-2 hover:bg-muted/20  cursor-pointer'
                    onDoubleClick={() =>
                      addProgramToEpgRow(
                        item['Rec#'],
                        item.Speaker,
                        item.Duration
                      )
                    }
                    key={item['Rec#']}>
                    <div className='grid grid-cols-5 gap-2 max-w-full'>
                      <ToolTipCustom tooltip={item.FileName}>
                        <p className='text-sm truncate col-span-4'>
                          {item.FileName}
                        </p>
                      </ToolTipCustom>
                      <p className='font-semibold text-sm truncate col-span-1 text-right pr-4'>
                        {item['Duration']}
                      </p>
                    </div>
                    <Separator />
                  </div>
                ))}
              </ScrollArea>
              <DialogFooter>
                <Button
                  type='submit'
                  onClick={() => setCurrentRowForProgramIndex(null)}
                  variant='destructive'>
                  <XCircle className='w-4 h-4 mr-2' /> <span>Close</span>{' '}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CustomFillerPromoDialog
            selectFillerOrPromo={selectFillerOrPromo}
            row={
              currentRowForPromoFillerIndex !== null
                ? rows[currentRowForPromoFillerIndex]
                : null
            }
            currentRowForPromoFillerIndex={currentRowForPromoFillerIndex}
            setCurrentRowForPromoFillerIndex={setCurrentRowForPromoFillerIndex}
            deselectFillerOrPromo={deselectFillerOrPromo}
          />

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
                {/* <TableHead>Episode Title</TableHead> */}
                <TableHead>Cast</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  onClick={(e) => selectRow(index, e)}
                  onContextMenu={(e) => selectRow(index)}
                  key={index}
                  className={cn(
                    index % 2 === 0 ? 'bg-secondary/30' : '',
                    row.selected ? ' bg-secondary hover:bg-secondary' : ''
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
                      <ToolTipCustom
                        tooltip={
                          [
                            dataContent.program.find(
                              (dataRow) => dataRow['Rec#'] === row.program
                            ),
                          ].map((item) => {
                            const { FileName, Duration } = item ?? {};
                            if (FileName && Duration)
                              return `${FileName} (${Duration})`;
                            return 'Please add a row by clicking the plus icon and double click on the row to add a program';
                          })[0]
                        }>
                        <div className='truncate w-80'>
                          {dataContent.program.find(
                            (dataRow) => dataRow['Rec#'] === row.program
                          )?.FileName ?? ''}
                        </div>
                      </ToolTipCustom>
                      <ToolTipCustom tooltip='Add Program'>
                        <Button
                          onClick={() => setCurrentRowForProgramIndex(index)}
                          className='w-6 h-6 rounded-full p-0'>
                          <Plus className='h-4 w-4' />
                        </Button>
                      </ToolTipCustom>
                    </div>
                  </TableCell>
                  {/* <TableCell>{row.fileName}</TableCell> */}
                  <TableCell className=''>
                    <div className='flex gap-2 items-center min-w-[12rem]'>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span className='flex gap-1 bg-muted p-2 rounded-md'>
                            {row.filler.fillers.length +
                              ' Fillers / ' +
                              row.filler.promos.length +
                              ' Promos'}
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent side='bottom' className='w-80'>
                          <div className='flex justify-between space-x-4'>
                            <div className='space-y-1'>
                              <h4 className='text-lg font-semibold'>Fillers</h4>
                              {row.filler.fillers.map((item, index) => (
                                <p className='text-sm'>
                                  <b>({item['Rec#']})</b> {item.FileName}{' '}
                                  {item.Duration}
                                </p>
                              ))}
                              {row.filler.fillers.length === 0 && (
                                <p className='text-sm'>No Fillers</p>
                              )}

                              <h4 className='text-lg font-semibold'>Promos</h4>
                              {row.filler.promos.map((item, index) => (
                                <p className='text-sm'>
                                  <b>({item['Rec#']})</b> {item.FileName}{' '}
                                  {item.Duration}
                                </p>
                              ))}
                              {row.filler.promos.length === 0 && (
                                <p className='text-sm'>No Promos</p>
                              )}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>

                      <ToolTipCustom tooltip='Add Fillers / Promo'>
                        <Button
                          onClick={() =>
                            setCurrentRowForPromoFillerIndex(index)
                          }
                          className='w-6 h-6 rounded-full p-0'>
                          <Plus className='h-4 w-4' />
                        </Button>
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
                  {/* <TableCell>
                    <ToolTipCustom tooltip={row.episodeTitle}>
                      <div className='truncate w-32'>{row.episodeTitle}</div>
                    </ToolTipCustom>
                  </TableCell> */}
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

const CustomFillerPromoDialog = ({
  currentRowForPromoFillerIndex,
  setCurrentRowForPromoFillerIndex,
  row,
  selectFillerOrPromo,
  deselectFillerOrPromo,
}: {
  currentRowForPromoFillerIndex: number | null;
  setCurrentRowForPromoFillerIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  row: EpgRow | null;
  deselectFillerOrPromo: (id: string) => void;
  selectFillerOrPromo: (id: DataContentRow, type: Type) => void;
}) => {
  const [languageValue, setLanguageValue] = useState('');
  const [duration, setDuration] = useState({ value: '', unit: 'seconds' });
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'Fillers' | 'Promos'>('Fillers');

  const [filteredRows, setFilteredRows] = useState<DataContentRow[]>([]);

  const onSearchChange = debounce((e: any) => {
    console.log(e.target.value);

    setSearch(e.target.value);
  }, 1000);

  const checkIfSelected = (id: string) => {
    if (row?.filler.fillers.find((row) => row['Rec#'] === id)) return true;
    if (row?.filler.promos.find((row) => row['Rec#'] === id)) return true;
    return false;
  };

  const { getFilteredFillerPromoData } = useContext(DataContext);

  const onScrollEnd = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      (e.target as any).scrollHeight - (e.target as any).scrollTop - 1 <
      (e.target as any).clientHeight
    ) {
      console.log('end reached');
      const data = getFilteredFillerPromoData({
        Language: languageValue,
        duration: +duration.value,
        search,
        type,
        reFetch: false,
      });

      console.log(data);

      setFilteredRows((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    const data = getFilteredFillerPromoData({
      Language: languageValue,
      duration: unitToSeconds(duration.unit, +duration.value),
      search,
      type,
      reFetch: true,
    });
    setFilteredRows(data);
  }, [
    languageValue,
    duration.unit,
    duration.value,
    search,
    type,
    getFilteredFillerPromoData,
  ]);

  return (
    <Dialog
      open={currentRowForPromoFillerIndex !== null ? true : false}
      onOpenChange={() => setCurrentRowForPromoFillerIndex(null)}>
      <DialogContent className='w-[800px]'>
        <AlertDialogHeader>
          <DialogTitle>
            Search Filler / Promo - {row?.timeRemaining ?? ''}
          </DialogTitle>
          <DialogDescription>
            Search Filler and Promo and add to the row{' '}
          </DialogDescription>
        </AlertDialogHeader>
        <div className='grid grid-cols-2 gap-4'>
          {/* <CustomSearchComboBox
            searchLabel='Language'
            value={languageValue}
            setValue={setLanguageValue}
            keyValuePairs={language.map((item) => ({
              value: item,
              label: item,
            }))}
          /> */}
          <Select
            defaultValue='Fillers'
            value={type}
            onValueChange={(value) => setType(value as Type)}>
            <SelectTrigger className=''>
              <SelectValue placeholder='Fillers' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value='Fillers'>Fillers</SelectItem>
                <SelectItem value='Promos'>Promos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='flex gap-3'>
            <Input
              placeholder='Duration'
              className='w-[60%]'
              type='tel'
              value={duration.value}
              onChange={(e) =>
                setDuration({
                  ...duration,
                  value: isNaN(+e.target.value)
                    ? duration.value
                    : e.target.value,
                })
              }
            />
            <Select
              defaultValue='seconds'
              value={duration.unit}
              onValueChange={(value) =>
                setDuration({ ...duration, unit: value })
              }>
              <SelectTrigger className=''>
                <SelectValue placeholder='Unit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Unit</SelectLabel>
                  <SelectItem value='seconds'>Seconds</SelectItem>
                  <SelectItem value='minutes'>Minutes</SelectItem>
                  <SelectItem value='hours'>Hours</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <AlertDialogHeader>
          <div className='flex justify-between items-center'>
            <DialogTitle className='w-44'>Results Found</DialogTitle>
            <Input
              placeholder='Search'
              // value={search}
              onChange={onSearchChange}
            />
          </div>
        </AlertDialogHeader>

        <div className='flex flex-col w-full gap-2 flex-wrap text-primary-foreground'>
          {(row?.filler?.fillers?.length ?? 0) > 0 && (
            <h2 className='text-primary text-lg text'>Fillers</h2>
          )}
          <div className='flex flex-wrap gap-2'>
            {row?.filler?.fillers.map((item) => (
              <div
                key={item['Rec#']}
                className='flex items-center gap-2 bg-gray-200 rounded-full px-2 py-1 cursor-pointer'>
                <p className='text-sm'>{item['Rec#']}</p>
                <XCircle
                  className='w-4 h-4'
                  onClick={() => deselectFillerOrPromo(item['Rec#'])}
                />
              </div>
            ))}
          </div>
          {(row?.filler?.promos.length ?? 0) > 0 && (
            <Separator className='mt-1' />
          )}
          {(row?.filler?.promos.length ?? 0) > 0 && (
            <h2 className='text-primary text-lg text'>Promos</h2>
          )}
          <div className='flex flex-wrap gap-2'>
            {row?.filler?.promos.map((item) => (
              <div
                key={item['Rec#']}
                className='flex items-center gap-2 bg-gray-200 rounded-full px-2 py-1 cursor-pointer'>
                <p className='text-sm'>{item['Rec#']}</p>
                <XCircle
                  className='w-4 h-4'
                  onClick={() => deselectFillerOrPromo(item['Rec#'])}
                />
              </div>
            ))}
          </div>
        </div>

        <ScrollArea
          className='h-60'
          onScroll={console.log}
          onScrollCapture={onScrollEnd}>
          {filteredRows.map((item, index) => {
            const isSelected = checkIfSelected(item['Rec#']);
            return (
              <div
                className={cn(
                  'flex flex-col gap-3 pt-2 hover:bg-muted/20 cursor-pointer select-none',
                  isSelected ? 'bg-muted hover:bg-muted' : ''
                )}
                onDoubleClick={() =>
                  isSelected
                    ? deselectFillerOrPromo(item['Rec#'])
                    : selectFillerOrPromo(item, type)
                }
                key={item['Rec#']}>
                <div className='grid grid-cols-5 gap-2 max-w-full'>
                  <ToolTipCustom tooltip={item.FileName}>
                    <p className='text-sm truncate col-span-4'>
                      {item.FileName}
                    </p>
                  </ToolTipCustom>
                  <p className='font-semibold text-sm truncate col-span-1 text-right pr-4'>
                    {item['Duration']}
                  </p>
                </div>
                <Separator />
              </div>
            );
          })}
        </ScrollArea>
        <DialogFooter>
          <Button
            type='submit'
            onClick={() => setCurrentRowForPromoFillerIndex(null)}
            variant='destructive'>
            <XCircle className='w-4 h-4 mr-2' /> <span>Close</span>{' '}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
const category = [
  'Talk',
  'Kirtan',
  'Recipe',
  'Drama',
  'Hare Krishna Culture',
  'Aratis',
  'Kids',
  'Darshan',
  'Quick Recipes',
  'Abhay Charan',
  'How I Came To Krishna Consciousness',
  'Documentary',
  'Wishes',
  'Promo',
  'Music Videos',
  'Festival',
];
const subCategory = [
  'Katha',
  'Packaged',
  'Series',
  'Live',
  'Satvik Rasoi',
  'Kurma Das',
  'Illustrated Stories',
  'Talk',
  'Naitik Kahaniya',
  'Others',
];

const speaker = ['Swami', 'Prabhuji', 'Mataji', 'Kids', 'NA'];

const language = ['English', 'Hindi', 'NA'];

// const CustomProgramSearchDialog = forwardRef((props, ref) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { dataContent } = useContext(DataContext);
//   // first 10

//   const FilteredRows = dataContent?.slice(0, 10);
//   console.log(FilteredRows);

//   return (
//     <>
//       <Button
//         onClick={() => setIsOpen(true)}
//         className='w-6 h-6 rounded-full p-0'>
//         <Plus className='h-4 w-4' />
//       </Button>
//     </>
//   );
// });

function CustomSearchComboBox({
  keyValuePairs,
  searchLabel,
  value,
  setValue,
}: {
  keyValuePairs: { value: string; label: string }[];
  searchLabel: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'>
          {value
            ? keyValuePairs.find(
                (keyValuePair) =>
                  keyValuePair.value.toLocaleLowerCase() ===
                  value.toLocaleLowerCase()
              )?.label ?? searchLabel
            : `${searchLabel}`}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[225px] max-h-[25rem] overflow-auto'>
        <Command
          value={value}
          onValueChange={(value) => {
            if (value.toUpperCase() === searchLabel.toUpperCase())
              return setValue('');
            setValue(value);
          }}>
          <CommandInput placeholder={`Search ${searchLabel}...`} />
          <CommandEmpty>No {searchLabel} found.</CommandEmpty>
          <ScrollArea className='max-h-[20rem] h-[15rem]'>
            <CommandGroup>
              <CommandItem
                onSelect={(currentValue) => {
                  setValue('');
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === '' ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {searchLabel}
              </CommandItem>

              {keyValuePairs.map((keyValuePair) => (
                <CommandItem
                  key={keyValuePair.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.toLocaleLowerCase() ===
                        keyValuePair.value.toLocaleLowerCase()
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {keyValuePair.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
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
        <ContextMenuItem inset>
          Previous Tab
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          First Tab <ContextMenuShortcut>⌘shift[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Last Tab <ContextMenuShortcut>⌘shift]</ContextMenuShortcut>
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
