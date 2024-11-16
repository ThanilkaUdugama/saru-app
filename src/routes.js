import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CategoryIcon from '@mui/icons-material/Category';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ExtensionIcon from '@mui/icons-material/Extension';
import FaceIcon from '@mui/icons-material/Face';
import HardwareIcon from '@mui/icons-material/Hardware';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PetsIcon from '@mui/icons-material/Pets';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import SellIcon from '@mui/icons-material/Sell';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StoreIcon from '@mui/icons-material/Store';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { ACCOUNTANT, ADMIN, CUSTOMER, DELIVERY_DRIVER, EXECUTIVE, EXT_CUT_SEC_EMP, INT_CUT_SEC_EMP, SALESMAN, STORE_KEEPER, VERIFIER } from '.';
import './index.css';
import Report from './pages/analytics/reports';
import FinanceSectionDashboard from './pages/dashboards/finance_section_dashboard';
import ProductSectionDashboard from './pages/dashboards/product_section_dashboard';
import ProductionSectionDashboard from './pages/dashboards/production_section_dashboard';
import SalesSectionDashboard from './pages/dashboards/sales_section_dashboard';
import SalesmanSalesDashboard from './pages/dashboards/salesman_sales_dashboard';
import StoreDashboard from './pages/dashboards/stores_section_dashboard';
import RevenuePage from './pages/finance/revenue';
import Transactions from './pages/finance/transactions';
import TransactionTypes from './pages/finance/transactions_types';
import AddEmployeePage from './pages/hr/add_employee';
import LoginPage from './pages/login';
import CreateProductPage from './pages/product/create_product';
import PartsPage from './pages/product/parts_page';
import ProductPage from './pages/product/product_page';
import AssembleBatch from './pages/production/assemble_batch';
import CreateAssembleBatchPage from './pages/production/create_assemble_batch';
import ProfilePage from './pages/profile';
import AddShopPage from './pages/sales/add_shop';
import CreateDeliveryPage from './pages/sales/create_delivery';
import CustomerDelivery from './pages/sales/create_delivery_to_customer';
import ShopDelivery from './pages/sales/create_delivery_to_shop';
import ReturnBatchPage from './pages/sales/return_batch';
import SalesBatch from './pages/sales/sales_batch';
import SalesmanDelivery from './pages/sales/salesman_delivery';
import SalesmanSales from './pages/sales/salesman_sales';
import MaterialPage from './pages/stores/material_page';
import CutBatchDispatchPage from './pages/stores/parts_process_batch_page';
import MaterialRestockPage from './pages/stores/restock_page';
import AssessmentIcon from '@mui/icons-material/Assessment';

const LOGIN_PAGE =  {path: "/login/", element: (setPath, view, setSession) => <LoginPage setPath = {setPath} view = {view} setSession={setSession}/>}
const SALESMAN_DASHBOARD = {path: "/dashboard/", element: (setPath, view) => <SalesmanSalesDashboard setPath = {setPath} view = {view} />,name : 'Dashboard', segment : 'dashboard', icon: <SpaceDashboardIcon />}
const PRODUCT_SECTION_DASHBOARD_PAGE = {path: "/products", element: (setPath, view) => <ProductSectionDashboard setPath = {setPath} view = {view} />}
const PRODUCTION_SECTION_DASHBOARD_PAGE = {path: "/production", element: (setPath, view) => <ProductionSectionDashboard setPath = {setPath} view = {view} />}
const SALES_SECTION_DASHBOARD_PAGE = {path: "/sales", element: (setPath, view) => <SalesSectionDashboard setPath = {setPath} view = {view} />}
const CREATE_PRODUCT_PAGE = {path: "/products/product/", element: (setPath, view) => <CreateProductPage setPath = {setPath} view = {view} />, name: "Product", icon: <PetsIcon />, segment : 'product/'}
const PARTS_PAGE = {path: "/products/parts/", element: (setPath, view) => <PartsPage setPath = {setPath} view = {view} />, name: "Product Parts", icon: <ExtensionIcon />,  segment : 'parts/'}
const PRODUCT_PAGE =  {path: "/products/product/:productId/", element: (setPath, view) => <ProductPage setPath = {setPath} view = {view} />}
const CREATE_DELIVERY_PAGE = {path: "/sales/delivery/", element: (setPath, view) => <CreateDeliveryPage setPath = {setPath} view = {view} />, name: "Delivery", icon: <DeliveryDiningIcon />,segment : 'delivery/' }
const SALES_BATCH_PAGE = {path: "/sales/delivery/:deliveryId/", element: (setPath, view) => <SalesBatch setPath = {setPath} view = {view} />}
const SHOP_PAGE = {path: "/shops/", element: (setPath, view) => <AddShopPage setPath = {setPath} view = {view} />, name: "Shops", icon: <StoreIcon />, segment : 'shops/'}
const RETURN_PAGE = {path: "/sales/return/", element: (setPath, view) => <ReturnBatchPage setPath = {setPath} view = {view} />, name: "Returns", icon: <ReplayCircleFilledIcon />, segment : 'return/'}
const SALESMAN_DELIVERY_PAGE = {path: "/delivery/", element: (setPath, view) => <SalesmanDelivery setPath = {setPath} view = {view} />, name: "Sales", icon: <SellIcon />, segment : 'delivery/'}
const SALESMAN_SALES_PAGE = {path: "/sales/:deliveryId/", element: (setPath, view) => <SalesmanSales setPath = {setPath} view = {view} />}
const MATERIAL_DASHBOARD = {path: "/materials", element: (setPath, view) => <StoreDashboard setPath = {setPath} view = {view} />}
const MATERIAL_PAGE = {path: "/materials/material/", element: (setPath, view) => <MaterialPage  view={view} setPath = {setPath} />, name: "Materials", icon: <CategoryIcon />, segment : 'material/'}
const MATERIAL_RESTOCK_PAGE = {path: "/materials/restock/", element: (setPath, view) => <MaterialRestockPage setPath = {setPath} view = {view} />, name: "Restock", icon: <LocalMallIcon />, segment : 'restock/'}
const ADD_EMPLOYEE_PAGE = {path: "/hr/users/", element: (setPath, view) => <AddEmployeePage setPath = {setPath} view = {view} />, name: "Add User", icon: <PersonAddIcon />, segment : 'users/'}
const FABRIC_PROCESS_BATCH_PAGE = {path: "/production/cutbatch/", element: (setPath, view) => <CutBatchDispatchPage setPath = {setPath} view = {view} />, name: "Parts Processes", icon: <AccountTreeIcon />, segment : 'cutbatch/'}
const CREATE_ASSEMBLE_BATCH_PAGE = {path: "/production/assemblebatch/", element: (setPath, view) => <CreateAssembleBatchPage setPath = {setPath} view = {view} />, name: "Production Processes", icon: <HardwareIcon />, segment : 'assemblebatch/'}
const ASSEMBLE_BATCH =  {path: "/production/assemblebatch/:assembleBatchId/", element: (setPath, view) => <AssembleBatch setPath = {setPath} view = {view} />}
const SALESMAN_DELIVERY_CONTENT_PAGE = {path: "/sales/", element: (setPath, view) => <ShopDelivery setPath = {setPath} view = {view} />, name: "Delivery", icon: <DeliveryDiningIcon />, segment : 'sales/'}
const SALESMAN_DELIVERY_CONTENT_SALES_PAGE = {path: "/delivery/:deliveryId/", element: (setPath, view) => <SalesBatch setPath = {setPath} view = {view} />}
const DELIVERY_DRIVER_DELIVERY_PAGE = {path: "/sales/delivery/", element: (setPath, view) => <CustomerDelivery setPath = {setPath} view = {view} />, name: "Delivery", icon: <MoveToInboxIcon />}
const DELIVERY_DRIVER_SALES_BATCH = {path: "/sales/delivery/:deliveryId/", element: (setPath, view) => <SalesBatch setPath = {setPath} view = {view} />}
const FINANCE_SECTION_DASHBOARD = {path : '/transactions', element :(setPath, view) =>  <FinanceSectionDashboard setPath = {setPath} view = {view} />, name: "Transaction"}
const TRANSACTION_PAGE = {path : '/transactions/transaction/', element :(setPath, view) =>  <Transactions setPath = {setPath} view = {view} />, name: "Transactions", icon: <PointOfSaleIcon />, segment : 'transaction/'}
const TRANSACTION_TYPES_PAGE = {path : '/transactions/transaction-types/', element :(setPath, view) =>  <TransactionTypes setPath = {setPath} view = {view} />, name: "Transaction Types", icon: <AccountBalanceWalletIcon />, segment : 'transaction-types/'}
const REVENUE_PAGE = {path : '/revenue/', element :(setPath, view) =>  <RevenuePage setPath = {setPath} view = {view} />, name: "Sales", icon: <PointOfSaleIcon />, segment : 'revenue/'}
const PROFILE_PAGE = {path : '/profile/', element :(setPath, view, setSession) =>  <ProfilePage  setSession = {setSession} setPath = {setPath} view = {view} />, name: "Profile", icon: <FaceIcon />, segment : 'profile/'}
const REPORT_PAGE = {path : '/reports/', element :(setPath, view, setSession) =>  <Report  setSession = {setSession} setPath = {setPath} view = {view} />, name: "Reports", icon: <AssessmentIcon />, segment : 'reports/'}

let paths = []
let navigation = []

const translation = (item) => { return {segment : item.segment, title : item.name, icon : item.icon}}


export const getRoute = () => {
  const token = localStorage.getItem('accessToken')
  const view = token ? jwtDecode(token)['type'] : -1;
  
  
switch(view){

  case SALESMAN: {
    paths = {
      [SALESMAN_DELIVERY_PAGE.path] : SALESMAN_DELIVERY_PAGE,
      [SALESMAN_SALES_PAGE.path] : SALESMAN_SALES_PAGE,
      [SALESMAN_DELIVERY_CONTENT_PAGE.path] : SALESMAN_DELIVERY_CONTENT_PAGE,
      [SALESMAN_DELIVERY_CONTENT_SALES_PAGE.path] : SALESMAN_DELIVERY_CONTENT_SALES_PAGE,
      [SHOP_PAGE.path] : SHOP_PAGE,
      [TRANSACTION_PAGE.path] : TRANSACTION_PAGE,
      [SALESMAN_DASHBOARD.path] : SALESMAN_DASHBOARD,
      [PROFILE_PAGE.path] : PROFILE_PAGE,
      [LOGIN_PAGE.path] : LOGIN_PAGE,
      
    }

  navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },

    translation(SALESMAN_DASHBOARD),
    translation(SALESMAN_DELIVERY_PAGE),
    translation(SALESMAN_DELIVERY_CONTENT_PAGE),
    translation(SHOP_PAGE),
    {...translation(TRANSACTION_PAGE), segment : 'transactions/transaction/'},
    
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    
            translation(PROFILE_PAGE),
        {
        segment : 'signout',
        title : 'Sign Out',
        icon : <LogoutIcon/>,
        sx : {color : 'red'}
      }

    
    
  ]
    break;
  }

  case ADMIN: {
    paths = {
      [CREATE_PRODUCT_PAGE.path] : CREATE_PRODUCT_PAGE,
      [PRODUCT_PAGE.path] : PRODUCT_PAGE,
      [CREATE_DELIVERY_PAGE.path] : CREATE_DELIVERY_PAGE,
      '/sales/shops/' : SHOP_PAGE,
      [SALESMAN_DELIVERY_PAGE.path] : SALESMAN_DELIVERY_PAGE,
      [SALESMAN_SALES_PAGE.path] : SALESMAN_SALES_PAGE,
      [RETURN_PAGE.path] : RETURN_PAGE,
      [SALES_BATCH_PAGE.path] : SALES_BATCH_PAGE,
      [PARTS_PAGE.path] : PARTS_PAGE,
      [MATERIAL_PAGE.path] : MATERIAL_PAGE,
      [MATERIAL_RESTOCK_PAGE.path] : MATERIAL_RESTOCK_PAGE,
      [FABRIC_PROCESS_BATCH_PAGE.path] : FABRIC_PROCESS_BATCH_PAGE,
      [PRODUCT_PAGE.path] : PRODUCT_PAGE,
      [ADD_EMPLOYEE_PAGE.path] : ADD_EMPLOYEE_PAGE,
      [CREATE_ASSEMBLE_BATCH_PAGE.path] : CREATE_ASSEMBLE_BATCH_PAGE,
      [ASSEMBLE_BATCH.path] : ASSEMBLE_BATCH,
      [FINANCE_SECTION_DASHBOARD.path] : FINANCE_SECTION_DASHBOARD,
      ['/transactions/transaction/'] : TRANSACTION_PAGE,
      ['/transactions/transaction-types/'] : TRANSACTION_TYPES_PAGE,

      [MATERIAL_DASHBOARD.path] : MATERIAL_DASHBOARD,
      [PRODUCT_SECTION_DASHBOARD_PAGE.path] : PRODUCT_SECTION_DASHBOARD_PAGE,
      [PRODUCTION_SECTION_DASHBOARD_PAGE.path] : PRODUCTION_SECTION_DASHBOARD_PAGE,
      [SALES_SECTION_DASHBOARD_PAGE.path] : SALES_SECTION_DASHBOARD_PAGE,
      [FINANCE_SECTION_DASHBOARD.path] : FINANCE_SECTION_DASHBOARD,
      [PROFILE_PAGE.path] : PROFILE_PAGE,
      [LOGIN_PAGE.path] : LOGIN_PAGE, 
      [REPORT_PAGE.path] : REPORT_PAGE
    }

  navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },

    {
      segment : 'materials',
      title : 'Stores',
      pattern : 'materials{/:segment}+' ,
      icon : <WarehouseIcon />,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(MATERIAL_PAGE),
        translation(MATERIAL_RESTOCK_PAGE),
      ]
    },

    {
      segment : 'products',
      title : 'Products',
      icon : <QrCodeIcon />,
      pattern : 'products{/:segment}+' ,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(CREATE_PRODUCT_PAGE),
        translation(PARTS_PAGE),
      ]
    },

    {
      segment : 'production',
      title : 'Production',
      icon : <PrecisionManufacturingIcon/>,
      pattern : 'production{/:segment}+' ,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(FABRIC_PROCESS_BATCH_PAGE),
        translation(CREATE_ASSEMBLE_BATCH_PAGE),
      ]
    },

    {
      segment : 'sales',
      title : 'Sales',
      pattern : 'sales{/:segment}+' ,
      icon : <SellIcon />,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(SHOP_PAGE),
        translation(CREATE_DELIVERY_PAGE),
        translation(RETURN_PAGE),
      ]
    },

    {
      segment : 'hr',
      title : 'Human Resources',
      pattern : 'hr{/:segment}+' ,
      icon : <SupervisedUserCircleIcon />,
      children : [
        
        translation(ADD_EMPLOYEE_PAGE)
      ]
    },

    {
      segment : 'transactions',
      title : 'Transactions',
      pattern : 'transactions{/:segment}+' ,
      icon : <AccountBalanceIcon />,
      children : [
        
        {...translation(TRANSACTION_PAGE), segment : 'transaction/'},
    {...translation(TRANSACTION_TYPES_PAGE), segment : 'transaction-types/'},
      ]
    },

    translation(REPORT_PAGE),

    
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
    
  ]

  
  }
  break;

  case EXECUTIVE: {
    paths = {
      [CREATE_PRODUCT_PAGE.path] : CREATE_PRODUCT_PAGE,
      [PRODUCT_PAGE.path] : PRODUCT_PAGE,
      [CREATE_DELIVERY_PAGE.path] : CREATE_DELIVERY_PAGE,
      '/sales/shops/' : SHOP_PAGE,
      [SALESMAN_DELIVERY_PAGE.path] : SALESMAN_DELIVERY_PAGE,
      [SALESMAN_SALES_PAGE.path] : SALESMAN_SALES_PAGE,
      [RETURN_PAGE.path] : RETURN_PAGE,
      [SALES_BATCH_PAGE.path] : SALES_BATCH_PAGE,
      [PARTS_PAGE.path] : PARTS_PAGE,
      [MATERIAL_PAGE.path] : MATERIAL_PAGE,
      [MATERIAL_RESTOCK_PAGE.path] : MATERIAL_RESTOCK_PAGE,
      [FABRIC_PROCESS_BATCH_PAGE.path] : FABRIC_PROCESS_BATCH_PAGE,
      [PRODUCT_PAGE.path] : PRODUCT_PAGE,
      [CREATE_ASSEMBLE_BATCH_PAGE.path] : CREATE_ASSEMBLE_BATCH_PAGE,
      [ASSEMBLE_BATCH.path] : ASSEMBLE_BATCH,
      [FINANCE_SECTION_DASHBOARD.path] : FINANCE_SECTION_DASHBOARD,
      ['/transactions/transaction/'] : TRANSACTION_PAGE,
      ['/transactions/transaction-types/'] : TRANSACTION_TYPES_PAGE,

      [MATERIAL_DASHBOARD.path] : MATERIAL_DASHBOARD,
      [PRODUCT_SECTION_DASHBOARD_PAGE.path] : PRODUCT_SECTION_DASHBOARD_PAGE,
      [PRODUCTION_SECTION_DASHBOARD_PAGE.path] : PRODUCTION_SECTION_DASHBOARD_PAGE,
      [SALES_SECTION_DASHBOARD_PAGE.path] : SALES_SECTION_DASHBOARD_PAGE,
      [FINANCE_SECTION_DASHBOARD.path] : FINANCE_SECTION_DASHBOARD,
      [PROFILE_PAGE.path] : PROFILE_PAGE,
      [LOGIN_PAGE.path] : LOGIN_PAGE,
      [REPORT_PAGE.path] : REPORT_PAGE 
    }

  navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },

    {
      segment : 'materials',
      title : 'Stores',
      pattern : 'materials{/:segment}+' ,
      icon : <WarehouseIcon />,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(MATERIAL_PAGE),
        translation(MATERIAL_RESTOCK_PAGE),
      ]
    },

    {
      segment : 'products',
      title : 'Products',
      icon : <QrCodeIcon />,
      pattern : 'products{/:segment}+' ,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(CREATE_PRODUCT_PAGE),
        translation(PARTS_PAGE),
      ]
    },

    {
      segment : 'production',
      title : 'Production',
      icon : <PrecisionManufacturingIcon/>,
      pattern : 'production{/:segment}+' ,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(FABRIC_PROCESS_BATCH_PAGE),
        translation(CREATE_ASSEMBLE_BATCH_PAGE),
      ]
    },

    {
      segment : 'sales',
      title : 'Sales',
      pattern : 'sales{/:segment}+' ,
      icon : <SellIcon />,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
        translation(SHOP_PAGE),
        translation(CREATE_DELIVERY_PAGE),
        translation(RETURN_PAGE),
      ]
    },

    {
      segment : 'transactions',
      title : 'Transactions',
      pattern : 'transactions{/:segment}+' ,
      icon : <AccountBalanceIcon />,
      children : [
        {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />},
        {...translation(TRANSACTION_PAGE), segment : 'transaction/'},
    {...translation(TRANSACTION_TYPES_PAGE), segment : 'transaction-types/'},
      ]
    },

    translation(REPORT_PAGE),

    
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
    
  ]

  
  }
  break;

  case VERIFIER: 
    paths = {
    [CREATE_DELIVERY_PAGE.path] : CREATE_DELIVERY_PAGE,
    [PROFILE_PAGE.path] : PROFILE_PAGE,
    [LOGIN_PAGE.path] : LOGIN_PAGE,
    SALES_BATCH_PAGE
    }

  navigation = [
    {
      segment : 'sales/delivery/',
      title : 'Verify',
      icon : <PlaylistAddCheckIcon />
    },
   
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
    
  ]
  break;


  case ACCOUNTANT: 
    paths = {
    [FINANCE_SECTION_DASHBOARD.path] : FINANCE_SECTION_DASHBOARD,
    [TRANSACTION_PAGE.path] : TRANSACTION_PAGE,
    [TRANSACTION_TYPES_PAGE.path] : TRANSACTION_TYPES_PAGE,
    [PROFILE_PAGE.path] : PROFILE_PAGE,
    [LOGIN_PAGE.path] : LOGIN_PAGE,
    [REPORT_PAGE.path] : REPORT_PAGE
    
    }

  navigation = [
    {
      segment : 'dashboard',
      title : 'Dashboard',
      icon : <SpaceDashboardIcon />
    },

    {
      segment : 'transactions',
      title : 'Transactions',
      icon : <AccountBalanceIcon />,
      children : [
        translation(TRANSACTION_PAGE),
        translation(TRANSACTION_TYPES_PAGE)
      ]
    },

    translation(REPORT_PAGE),
    
   
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
    
  ]
  break;

  case DELIVERY_DRIVER: 
  paths = {
    [DELIVERY_DRIVER_DELIVERY_PAGE.path] : DELIVERY_DRIVER_DELIVERY_PAGE,
    [DELIVERY_DRIVER_SALES_BATCH.path] : DELIVERY_DRIVER_SALES_BATCH,
    [PROFILE_PAGE.path] : PROFILE_PAGE,
    [LOGIN_PAGE.path] : LOGIN_PAGE
  }

  navigation = [
    {
      segment : 'sales/delivery/',
      title : 'Delivery Data',
      icon : <DeliveryDiningIcon />
    },
   
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
    
  ]
  break;

  case CUSTOMER: 
    paths = {
    [DELIVERY_DRIVER_DELIVERY_PAGE.path] : DELIVERY_DRIVER_DELIVERY_PAGE,
    [DELIVERY_DRIVER_SALES_BATCH.path] : DELIVERY_DRIVER_SALES_BATCH,
    [REVENUE_PAGE.path] : REVENUE_PAGE,
    [PROFILE_PAGE.path] : PROFILE_PAGE,
    [LOGIN_PAGE.path] : LOGIN_PAGE
    }

  navigation = [
    {
      segment : 'sales/delivery/',
      title : 'Delivery Data',
      icon : <DeliveryDiningIcon />
    },

    {
      segment : 'revenue/',
      title : 'Revenue',
      icon : <PointOfSaleIcon />
    },
   
    
    {
      kind: 'divider',
    },

    {
      kind: 'header',
      title: 'Account',
    },

    {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
  ]
  break;

  case STORE_KEEPER: {
    paths = {
      [CREATE_PRODUCT_PAGE.path] : CREATE_PRODUCT_PAGE,
      [PRODUCT_PAGE.path] : PRODUCT_PAGE,
      [PARTS_PAGE.path] : PARTS_PAGE,
      [MATERIAL_PAGE.path] : MATERIAL_PAGE,
      [MATERIAL_RESTOCK_PAGE.path] : MATERIAL_RESTOCK_PAGE,
      [FABRIC_PROCESS_BATCH_PAGE.path] : FABRIC_PROCESS_BATCH_PAGE,
      [CREATE_ASSEMBLE_BATCH_PAGE.path] : CREATE_ASSEMBLE_BATCH_PAGE,
      [ASSEMBLE_BATCH.path] : ASSEMBLE_BATCH,
      [CREATE_DELIVERY_PAGE.path] : CREATE_DELIVERY_PAGE,
      [SALES_BATCH_PAGE.path] : SALES_BATCH_PAGE,
      [RETURN_PAGE.path] : RETURN_PAGE,
      ['/transactions/transaction'] : TRANSACTION_PAGE,
      [TRANSACTION_TYPES_PAGE.path] : TRANSACTION_TYPES_PAGE,

      [MATERIAL_DASHBOARD.path] : MATERIAL_DASHBOARD,
      [PRODUCT_SECTION_DASHBOARD_PAGE.path] : PRODUCT_SECTION_DASHBOARD_PAGE,
      [PRODUCTION_SECTION_DASHBOARD_PAGE.path] : PRODUCTION_SECTION_DASHBOARD_PAGE,
      [SALES_SECTION_DASHBOARD_PAGE.path] : SALES_SECTION_DASHBOARD_PAGE,
      [FINANCE_SECTION_DASHBOARD.path] : FINANCE_SECTION_DASHBOARD,
      [PROFILE_PAGE.path] : PROFILE_PAGE,
      [LOGIN_PAGE.path] : LOGIN_PAGE, 
      [REPORT_PAGE.path] : REPORT_PAGE
      
    }

      navigation = [
        {
          kind: 'header',
          title: 'Data Entry',
        },

        {
          segment : 'materials',
          title : 'Stores',
          pattern : 'materials' ,
          icon : <WarehouseIcon />,
          children : [
            {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
            translation(MATERIAL_PAGE),
            translation(MATERIAL_RESTOCK_PAGE),
          ]
        },

        {
          segment : 'products',
          title : 'Products',
          icon : <QrCodeIcon />,
          pattern : 'products' ,
          children : [
            {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
            translation(CREATE_PRODUCT_PAGE),
            translation(PARTS_PAGE),
          ]
        },

        {
          segment : 'production',
          title : 'Production',
          icon : <PrecisionManufacturingIcon />,
          children : [
            {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
            translation(FABRIC_PROCESS_BATCH_PAGE),
            translation(CREATE_ASSEMBLE_BATCH_PAGE),
          ]
        },

        {
          segment : 'sales',
          title : 'Sales',
          icon : <SellIcon/>,
          children : [
            {segment : '', title : "Dashboard", icon : <SpaceDashboardIcon />,},
            translation(CREATE_DELIVERY_PAGE),
            translation(RETURN_PAGE),
            
          ]
        },

        {...translation(TRANSACTION_PAGE), segment : 'transactions/transaction'},
        translation(REPORT_PAGE),
        
        {
          kind: 'divider',
        },

        {
          kind: 'header',
          title: 'Account',
        },

        {
          segment : 'profile/',
          title : 'Profile',
          icon : <FaceIcon />,
          

        },

        {
            segment : 'signout',
            title : 'Sign Out',
            icon : <LogoutIcon />,
            sx : {color : 'red'}
          }

      ]
        
  }
  break;

  case INT_CUT_SEC_EMP:
  case EXT_CUT_SEC_EMP:{
    paths = {
      [FABRIC_PROCESS_BATCH_PAGE.path] : FABRIC_PROCESS_BATCH_PAGE,
      [PROFILE_PAGE.path] : PROFILE_PAGE,
      [LOGIN_PAGE.path] : LOGIN_PAGE
    }

    navigation = [
      {
        segment : 'production/cutbatch/',
        title : 'Processes',
        icon : <ContentCutIcon />
      },
      {
        kind: 'divider',
      },

      {
        kind: 'header',
        title: 'Account',
      },

      {
        segment : 'profile/',
        title : 'Profile',
        icon : <FaceIcon />,
        

      },

      {
          segment : 'signout',
          title : 'Sign Out',
          icon : <LogoutIcon />,
          sx : {color : 'red'}
        }
      
    ]
    break;
  }

  default: {
    paths = {
      
      [LOGIN_PAGE.path] : LOGIN_PAGE,
      
    }
    navigation = [
      {
        segment : 'login/',
        title : 'Login Portal',
        icon : <InventoryIcon />
      },
      
    ]
    break;
  }

}
  return [navigation, paths]
}
