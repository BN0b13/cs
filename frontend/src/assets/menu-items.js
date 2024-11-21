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

export const menuItemsPublic = [
    {
      title: 'Shop',
      path: '/shop',
      icon: (<FaStoreAlt />)
    },
    {
      title: 'About',
      path: '/about',
      icon: (<FaPeopleArrows />)
    },
    {
      title: 'Giveaways',
      path: '/giveaways',
      icon: (<FaGift />)
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

export const dropdownMenuItems = [
  {
    title: 'All',
    path: '/shop',
    icon: (<FaStoreAlt />)
  },
  {
    title: 'Seeds',
    path: '/shop/seeds',
    icon: (<FaSeedling />)
  },
  {
    title: 'Raffles',
    path: '/raffles',
    icon: (<FaTicketAlt />)
  },
  {
    title: 'Auctions',
    path: '/auctions',
    icon: (<FaGavel />)
  },
]