import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Map from '@/components/ui/map/map';
import { getDataPoints } from '@/lib/actions';

export default async function Page() {
  const data = await getDataPoints();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Map</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className={'flex flex-col gap-2'}>
          <h1 className={'text-xl font-semibold'}>Flood Impact Map</h1>
          <p className={'text-gray-600'}>
            A real-time view of flood-affected areas. Take action with insights
            from live data.
          </p>
        </div>
        {/*<Button className={'w-fit ml-auto'}>Request Drone</Button>*/}
        <div className="min-h-[100vh] overflow-hidden flex-1 rounded-xl md:min-h-min">
          <Map dataPoints={data} />
        </div>
      </div>
    </>
  );
}
