'use client';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  APIProvider as GoogleMapsAPIProvider,
  Map as GoogleMap,
} from '@vis.gl/react-google-maps';
import { Label } from '@/components/ui/label';

export default function Page() {
  return (
    <form className="flex flex-col gap-8 max-w-3xl mx-auto py-10">
      <div className={'flex flex-col gap-2'}>
        <h1 className={'text-xl font-semibold'}>
          Subscribe to our emergency service
        </h1>
        <p className="text-gray-600">
          Enter your phone number to get notified when your life is in danger.
        </p>
      </div>
      <PhoneInput placeholder="Enter your phone number" defaultCountry="SI" />

      <div>
        <Label className={'font-semibold'}>Select your location</Label>
        <div className={'w-full h-[300px] overflow-hidden rounded-lg'}>
          <GoogleMapsAPIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          >
            <GoogleMap
              defaultCenter={{ lat: 46.5547, lng: 15.6459 }}
              defaultZoom={12}
              gestureHandling="greedy"
              disableDefaultUI={true}
              keyboardShortcuts={false}
              mapId="739af084373f96fe"
              reuseMaps
            ></GoogleMap>
          </GoogleMapsAPIProvider>
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <Separator />
        <div className={'flex flex-row justify-between'}>
          <div className={'font-semibold text-sm'}>Subscription</div>
          <div className={'text-gray-600'}>2.99€ / year</div>
        </div>
      </div>

      <Button className={'w-full'} type="submit">
        Buy
      </Button>
    </form>
  );
}
