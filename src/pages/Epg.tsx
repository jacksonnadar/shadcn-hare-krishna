import { Download, File, LucideIcon, Plus, Trash } from 'lucide-react';
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

export default function Epg() {
  return (
    <div className='h-full w-full px-36 py-10 flex flex-col gap-6 max-w-full overflow-x-hidden'>
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
  return (
    <CustomEpgCardWithMenu>
      <Card
        className={`w-44 h-60 ${
          type === 'new' ? 'bg-secondary/40' : 'bg-secondary'
        } rounded-sm cursor-pointer transform hover:scale-105 transition duration-300`}>
        {/* <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader> */}
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
    </CustomEpgCardWithMenu>
  );
}

function CustomEpgCardWithMenu({ children }: any) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-64'>
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

        <ContextMenuItem inset>Open</ContextMenuItem>

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
