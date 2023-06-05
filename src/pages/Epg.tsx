import {
  Archive,
  CalendarIcon,
  Download,
  File,
  Info,
  LucideIcon,
  Plus,
  Table2,
  Trash,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '../components/ui/card';
import { cn } from '../lib/utils';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { AlertDialogHeader } from '../components/ui/alert-dialog';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { forwardRef, useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { addDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../components/ui/hover-card';
import { Badge } from '../components/ui/badge';
import { DateRange } from 'react-day-picker';

export default function Epg() {
  return (
    <div className='h-full w-full px-36 py-10 flex flex-col gap-6 max-w-full '>
      <div>
        <h1 className='text-xl pb-4'>New EPG & Recent</h1>
        <div className='flex gap-4  flex-wrap'>
          <CustomEpgCard
            type='new'
            title='New EPG'
            description=' Will create a new Epg to start working'
            Icon={Plus}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
        </div>
      </div>
      <Separator />
      <div>
        <div className='flex justify-between'>
          <h1 className='text-xl pb-4'>All EPGS</h1>
          <Input className='w-60' placeholder='Search' />
        </div>
        <div className='flex gap-4 flex-wrap pt-3'>
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
          <CustomEpgCard
            title='EPG for 4th to 20th AUG'
            description='This was last edited on 20th Aug 2021'
            Icon={File}
          />
        </div>
      </div>
    </div>
  );
}

function CustomEpgCard({
  type = 'file',
  title,
  description,
  Icon,
  onClick,
}: {
  type?: 'file' | 'new';
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick?: () => void;
}) {
  const CustomCard = forwardRef((props, ref) => (
    <Card
      ref={ref as any}
      {...props}
      className={`w-44 h-60 ${
        type === 'new' ? 'bg-secondary/40' : 'bg-secondary'
      } relative rounded-sm cursor-pointer transform hover:scale-105 transition duration-300`}>
      {/* <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader> */}
      {type === 'file' && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className='absolute top-2 right-2 flex items-center justify-center'>
              <Info className='h-4 w-4 text-primary' />
            </div>
          </HoverCardTrigger>
          <HoverCardContent align='end' className='w-80'>
            <div className='flex justify-between space-x-4'>
              <div className='space-y-1'>
                <h4 className='text-md font-semibold'>Epg for Aug to 12</h4>
                <p className='text-xs'>
                  Created by Jackson at 12-12-12 12:11:11
                </p>
                <p className='text-xs'>
                  Last updated by Jackson at 12-12-12 12:11:11
                </p>
                <div className='flex items-center pt-2 flex-wrap gap-2'>
                  {/* <span className='text-xs text-muted-foreground'>
                      Tab: 11th Aug, 12th Aug, 13th Aug, 14th Aug
                    </span> */}
                  <Badge className='text-xs'>11th Aug</Badge>
                  <Badge className='text-xs'>12th Aug</Badge>
                  <Badge className='text-xs'>13th Aug</Badge>
                  <Badge className='text-xs'>14th Aug</Badge>
                  <Badge className='text-xs'>15th Aug</Badge>
                  <Badge className='text-xs'>16th Aug</Badge>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      <CardContent className='h-44 flex items-center justify-center p-0'>
        <Icon className='w-20 h-20 text-accent-foreground' />
      </CardContent>
      <CardFooter className='p-0 px-3 flex-col flex'>
        {/* <h2 className='truncate w-40 text-lg text-accent-foreground'>
        File name this is
      </h2> */}
        <h2 className='text-accent-foreground w-full truncate '>{title}</h2>
        <CardDescription className='text-[0.8rem] w-full leading-4 line-clamp-2 '>
          {description}
        </CardDescription>
      </CardFooter>
    </Card>
  ));
  return (
    <>
      {type === 'new' ? (
        <CustomNewEpgCard>
          <CustomCard />
        </CustomNewEpgCard>
      ) : (
        <Link to='/epg/1'>
          <CustomEpgCardWithMenu>
            <CustomCard />
          </CustomEpgCardWithMenu>
        </Link>
      )}
    </>
  );
}

function CustomEpgCardWithMenu({ children }: any) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-64'>
        <ContextMenuItem inset>Open</ContextMenuItem>
        <ContextMenuItem>
          <Table2 className='mr-2 h-4 w-4' />
          <span>Open in new windoew</span>
        </ContextMenuItem>
        <ContextMenuItem inset>Rename</ContextMenuItem>
        <ContextMenuSeparator />

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

        <ContextMenuItem>
          <Archive className='mr-2 h-4 w-4' />
          <span className=''> Archive EPG</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <Trash className='mr-2 h-4 w-4 text-red-600' />
          <span className=' text-red-600'> Delete EPG</span>
        </ContextMenuItem>
        {/* <ContextMenuItem inset>Add Row Above</ContextMenuItem>
        <ContextMenuItem inset>Add Row Below</ContextMenuItem> */}
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

function CustomNewEpgCard({ children }: any) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 0, 21),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <AlertDialogHeader>
          <DialogTitle>New EPG</DialogTitle>
          <DialogDescription>
            Select date range to create an EPG
          </DialogDescription>
        </AlertDialogHeader>
        <Label>Date Range To Select</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Label>EPG Name</Label>
        <Input
          className='w-full justify-start text-left font-normal'
          placeholder='Untitled'
        />
        <DialogFooter>
          <Button type='submit'>Create EPG</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
