import React from 'react'
import PublicOffersComponent, { DataTableDemo } from './table'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppContent } from '@/components/app-content'
import { AppSidebarHeader } from '@/components/app-sidebar-header'
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Offer } from '@/types';


interface Props {
    offers: Offer[];
    auth: {
        user: any; // Replace 'any' with the correct type for your user object
    };
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const test = ({ offers }: Props) => {
    return (
        <div>
            <SidebarProvider>

                <AppSidebar />
                <AppContent variant="sidebar">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <PublicOffersComponent offers={offers} />
                </AppContent>
            </SidebarProvider>
        </div>
    )
}

export default test
