import '@inertiajs/core';
import { ErrorBag, Errors } from '@inertiajs/core';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

import '@inertiajs/core';

export interface PageProps {
  errors?: {
    [key: string]: string;
  };
  auth?: {
    user: any | null; // Replace 'any' with your actual user type
  };
  locale?: string; // Add the 'locale' property
  // Add other common props here
}

declare module '@inertiajs/core' {
  interface App<TProps extends Record<string, any> = Record<string, unknown>> {
    props: TProps & PageProps;
  }
}

import type { Component, VNode } from 'vue';

export interface PageProps {
  auth?: {
    user?: any;
  };
  locale?: string;
  [key: string]: any;
}

export interface AppType<PageProps = any> extends Component {
  (props: {
    children?: (props: {
      Component: Component;
      key: string | number;
      props: PageProps & {
        errors: Errors & ErrorBag;
        [key: string]: any;
      };
    }) => ReactNode;
  }): VNode;
}

export type HeadManagerTitleCallback = (title: string) => string;
export type HeadManagerOnUpdate = (elements: Array<HTMLElement>) => void;
export type Key = string | number | any;
export type PageResolver = (name: string) => Component;
