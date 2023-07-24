import {
  FaRegAddressCard,
  FaStoreAlt
} from 'react-icons/fa';

import {
  SlPresent
} from 'react-icons/sl';

import {
  VscAccount,
  VscHistory,
  VscSettingsGear
} from 'react-icons/vsc';

export const menuItemsPublic = [
    {
      title: 'Shop',
      path: '/shop',
      icon: (<FaStoreAlt />)
    },
    {
      title: 'Freebies',
      path: '/about',
      icon: (<SlPresent />)
    },
];

export const menuItemsLoggedIn = [
  {
    title: 'Account',
    path: '/account',
    icon: (<VscAccount />)
  },
];

export const accountSidebarMenu = [
  {
    title: 'Account Details',
    path: '/account',
    icon: (<FaRegAddressCard />)
  },
  {
    title: 'Order History',
    path: '/account/orders',
    icon: (<VscHistory />)
  },
  // {
  //   title: 'Settings',
  //   path: '/account/settings',
  //   icon: (<VscSettingsGear />)
  // },
];