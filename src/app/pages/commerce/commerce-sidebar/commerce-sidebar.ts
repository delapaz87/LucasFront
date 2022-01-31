import {Injectable} from '@angular/core';

export interface CommerceSidebarItem {
  id: string;
  title: string;
  type: 'item' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Sidebar[];
}

export interface Sidebar extends CommerceSidebarItem {
  children?: CommerceSidebarItem[];
}


const SidebarItems = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    url: '/',
    classes: '',
    children: [
      {
        id: 'commerce',
        title: 'Comercio',
        type: 'item',
        url: '/commerce/company',
        icon: 'icon-order h-fz--18 pe-2 h-color--secondary',
        classes: 'nav-item'
      },
      {
        id: 'store',
        title: 'Tiendas',
        type: 'item',
        url: '/commerce/stores',
        icon: 'icon-store h-fz--18 pe-2 h-color--secondary',
        classes: 'nav-item'
      },
      {
        id: 'cobertura',
        title: 'Cobertura',
        type: 'item',
        url: '/commerce/coverages',
        icon: 'icon-cobertura h-fz--18 pe-2 h-color--secondary',
        classes: 'nav-item'
      },
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        url: '/commerce/users',
        icon: 'icon-clients h-fz--18 pe-2 h-color--secondary',
        classes: 'nav-item'
      },
      {
        id: 'repartidores',
        title: 'Repartidores',
        type: 'item',
        url: '/commerce/drivers',
        icon: 'icon-moto h-fz--18 pe-2 h-color--secondary',
        classes: 'nav-item'
      },
    ]
  },
];

@Injectable()
export class CommerceSidebarItem {
  public get() {
    return SidebarItems;
  }
}
