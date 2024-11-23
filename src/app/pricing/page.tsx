'use client';

import Pricing, { Offering, OfferingWrapper } from '@/components/ui/pricing';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import React from 'react';

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Pricing</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <Pricing
        outerRadius="moreRounded"
        padding="large"
        plans={[
          {
            monthlyPrice: '$4.99',
            name: 'Basic',
            yearlyPrice: '$2.99',
            children: (
              <OfferingWrapper>
                <Offering>Instant SMS alerts</Offering>
              </OfferingWrapper>
            ),
          },
          {
            monthlyPrice: '$24.99',
            name: 'Family',
            yearlyPrice: '$4.99',
            popular: true,
            children: (
              <OfferingWrapper>
                <Offering>Instant SMS alerts</Offering>
                <Offering>Notify up to 5 family members</Offering>
              </OfferingWrapper>
            ),
          },
          {
            monthlyPrice: '$49.99',
            name: 'Enterprise',
            yearlyPrice: 'Custom',
            children: (
              <OfferingWrapper>
                <Offering>Up to 16 day flood forecast</Offering>
                <Offering>Seamless integration with your systems</Offering>
                <Offering>Unlimited members</Offering>
              </OfferingWrapper>
            ),
          },
        ]}
        width="xl"
      />
    </>
  );
}
