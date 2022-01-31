import {Injectable} from '@angular/core';

export interface NavigationItem {
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
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    url: '/',
    classes: '',
    children: [
      {
        id: 'store',
        title: 'Vender en Tienda',
        type: 'item',
        url: '/',
        icon: 'icon-store',
        classes: ''
      },
      {
        id: 'ordersstore',
        title: 'Pedidos online',
        type: 'item',
        url: '/orders/online',
        icon: 'icon-order',
        classes: ''
      },
      {
        id: 'ordersstore',
        title: 'Recibos de Venta',
        type: 'item',
        url: '/receipts/sales',
        icon: 'icon-receipt',
        classes: ''
      },
      {
        id: 'ordersstore',
        title: 'Transacciones',
        type: 'item',
        url: '/donations/affiliates',
        icon: 'icon-transactions',
        classes: ''
      },
    ]
  },
  {
    id: 'navigation2',
    title: '',
    type: 'group',
    url: '/bell/available',
    classes: '',
    children: [
        {
          id: 'catalogo',
          title: 'Catálogo',
          type: 'item',
          url: '/bell/available',
          icon: 'icon-products',
          classes: ''
      },
      {
        id: 'inventario',
        title: 'Inventario',
        type: 'item',
        url: '/bell/available',
        icon: 'icon-inventory',
        classes: ''
    },
    ]
  },
  {
    id: 'navigation3',
    title: '',
    type: 'group',
    url: '/bell/available',
    classes: '',
    children: [
        {
          id: 'clientes',
          title: 'Clientes',
          type: 'item',
          url: '/clients',
          icon: 'icon-clients',
          classes: ''
      },
      {
        id: 'reportes',
        title: 'Reportes',
        type: 'item',
        url: '/reports',
        icon: 'icon-report',
        classes: ''
    },
    ]
  },
  {
    id: 'navigation4',
    title: '',
    type: 'group',
    url: '/commerce',
    classes: '',
    children: [
      {
        id: 'comercio',
        title: 'Comercio',
        type: 'item',
        url: '/commerce',
        icon: 'icon-clients',
        classes: ''
    }]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
