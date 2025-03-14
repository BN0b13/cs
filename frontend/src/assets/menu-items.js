import {
  FaRegAddressCard,
  FaGavel,
  FaGift,
  FaPeopleArrows,
  FaSeedling,
  FaStoreAlt,
  FaTicketAlt
} from 'react-icons/fa';

import {
  VscAccount,
  VscHistory,
  VscSettingsGear
} from 'react-icons/vsc';

import { pagesConfig } from '../config/cms';

export const menuItemsPublic = [
    {
      title: 'Shop',
      path: '/shop',
      icon: (<FaStoreAlt />),
      permission: 'shop'
    },
    // {
    //   title: 'About',
    //   path: '/about',
    //   icon: (<FaPeopleArrows />),
    //   permission: 'about'
    // },
    {
      title: 'Giveaways',
      path: '/giveaways',
      icon: (<FaGift />),
      permission: 'shop'
    },
];

export const menuItemsLoggedIn = [
  {
    title: 'Account',
    path: '/account',
    icon: (<VscAccount />),
    permission: 'shop'
  },
];

export const accountSidebarMenu = [
  {
    title: 'Account Details',
    path: '/account',
    icon: (<FaRegAddressCard />),
    permission: 'shop'
  },
  {
    title: 'Order History',
    path: '/account/orders',
    icon: (<VscHistory />),
    permission: 'shop'
  },
  // {
  //   title: 'Settings',
  //   path: '/account/settings',
  //   icon: (<VscSettingsGear />)
  // },
];

export const dropdownMenuItems = [
  {
    title: 'All',
    path: '/shop',
    icon: (<FaStoreAlt />),
    permission: 'shop'
  },
  {
    title: 'Seeds',
    path: '/shop/seeds',
    icon: (<FaSeedling />),
    permission: 'shop'
  },
  // {
  //   title: 'Raffles',
  //   path: '/raffles',
  //   icon: (<FaTicketAlt />),
      // permission: 'shop'
  // },
  // {
  //   title: 'Auctions',
  //   path: '/auctions',
  //   icon: (<FaGavel />),
      // permission: 'shop'
  // },
]