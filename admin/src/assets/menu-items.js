import {
  BsCameraReels
} from 'react-icons/bs';

import {
  FaGavel,
  FaGift,
  FaMoneyBillAlt,
  FaRegBuilding,
  FaServer,
  FaStoreAlt,
  FaTicketAlt
} from 'react-icons/fa';

import {
  VscAccount,
  VscFile,
  VscFolder,
  VscPieChart,
  VscSettingsGear
} from 'react-icons/vsc';

export const menuItemsAdmin = [
  {
    title: 'Metrics',
    path: '/',
    icon: (<VscPieChart />)
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: (<VscAccount />)
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: (<FaRegBuilding />)
  },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: (<VscAccount />)
  // },
  {
    title: 'Orders',
    path: '/orders',
    icon: (<FaStoreAlt />)
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: (<VscFolder />)
  },
  {
    title: 'Products',
    path: '/products',
    icon: (<VscFile />)
  },
  // {
  //   title: 'Raffles',
  //   path: '/raffles',
  //   icon: (<FaTicketAlt />)
  // },
  // {
  //   title: 'Auctions',
  //   path: '/auctions',
  //   icon: (<FaGavel />)
  // },
  // {
  //   title: 'Sales',
  //   path: '/sales',
  //   icon: (<FaMoneyBillAlt />)
  // },
  {
    title: 'Giveaways',
    path: '/giveaways',
    icon: (<FaGift />)
  },
  // {
  //   title: 'Grow Room',
  //   path: '/grow-room',
  //   icon: (<FaServer />)
  // },
  {
    title: 'Media',
    path: '/media',
    icon: (<BsCameraReels />)
  },
  {
    title: 'Configuration',
    path: '/configuration',
    icon: (<VscSettingsGear />)
  },
];

export const menuItemsContributor = [
  {
    title: 'Home',
    path: '/',
    icon: (<VscAccount />)
  },
  {
    title: 'Company',
    path: '/company',
    icon: (<FaRegBuilding />)
  },
  {
    title: 'Giveaways',
    path: '/giveaways',
    icon: (<FaGift />)
  }
];