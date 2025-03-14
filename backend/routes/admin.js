import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const uploadAudio = multer({ dest: path.join(__dirname, '..', 'public', 'audio')});
const uploadVideos = multer({ dest: path.join(__dirname, '..', 'public', 'video')});
const uploadCategory = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'categories')});
const uploadCompany = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'companies')});
const uploadIcon = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'icons')});
const uploadProducts = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'products')});
const uploadThemes = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'themes')});
const uploadWelcome = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'welcome')});

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { ContributorTokenVerifier } from '../middleware/contributorTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CartController from '../controllers/CartController.js';
import CategoryController from '../controllers/CategoryController.js';
import CompanyController from '../controllers/CompanyController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import CouponController from '../controllers/CouponController.js';
import GiveawayController from '../controllers/GiveawayController.js';
import GRServerController from '../controllers/GRServerController.js';
import MediaController from '../controllers/MediaController.js';
import MessageController from '../controllers/MessageController.js';
import InventoryController from '../controllers/InventoryController.js';
import OrderController from '../controllers/OrderController.js';
import PageController from '../controllers/PageController.js';
import ProductController from '../controllers/ProductController.js';
import RaffleController from '../controllers/RaffleController.js';
import RoleController from '../controllers/RoleController.js';
import SaleController from '../controllers/SaleController.js';
import ThemeController from '../controllers/ThemeController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const cartController = new CartController();
const categoryController = new CategoryController();
const companyController = new CompanyController();
const configurationController = new ConfigurationController();
const couponController = new CouponController();
const giveawayController = new GiveawayController();
const gRServerController = new GRServerController();
const inventoryController = new InventoryController();
const mediaController = new MediaController();
const messageController = new MessageController();
const orderController = new OrderController();
const pageController = new PageController();
const productController = new ProductController();
const raffleController = new RaffleController();
const roleController = new RoleController();
const saleController = new SaleController();
const themeController = new ThemeController();
const visitController = new VisitController();
const userController = new UserController();
const welcomeController = new WelcomeController();

// Carts

router.get('/carts', AdminTokenVerifier, HandleErrors(cartController.getCartsWithContents));

// Categories

router.get('/categories', AdminTokenVerifier, HandleErrors(categoryController.getCategories));

router.post('/categories', AdminTokenVerifier, uploadCategory.array('files'), HandleErrors(categoryController.create));

router.patch('/categories', AdminTokenVerifier, HandleErrors(categoryController.updateCategoryById));
router.patch('/categories/images/thumbnail', AdminTokenVerifier, uploadCategory.array('files'), HandleErrors(categoryController.addThumbnail));
router.patch('/categories/images/thumbnail/delete', AdminTokenVerifier, HandleErrors(categoryController.deleteThumbnail));

router.delete('/categories', AdminTokenVerifier, HandleErrors(categoryController.deleteCategoryById));

// Companies

router.get('/companies', ContributorTokenVerifier, HandleErrors(companyController.getCompanies));
router.get('/company', ContributorTokenVerifier, HandleErrors(companyController.getCompany));
router.get('/companies/:id', AdminTokenVerifier, HandleErrors(companyController.getCompanyById));

router.post('/company', ContributorTokenVerifier, HandleErrors(companyController.createCompany));
router.post('/companies/logo', ContributorTokenVerifier,uploadCompany.array('files'), HandleErrors(companyController.createCompanyLogo));

router.patch('/companies', ContributorTokenVerifier, HandleErrors(companyController.updateCompany));

router.delete('/companies', ContributorTokenVerifier, HandleErrors(companyController.deleteCompany));
router.delete('/companies/logo', ContributorTokenVerifier, HandleErrors(companyController.deleteCompanyLogo));

// Configuration

router.get('/configuration', AdminTokenVerifier, HandleErrors(configurationController.getAdminConfiguration));

// Coupons

router.get('/coupons', AdminTokenVerifier, HandleErrors(couponController.getCoupons));
router.get('/coupons/:id', AdminTokenVerifier, HandleErrors(couponController.getCouponById));

router.post('/coupons', AdminTokenVerifier, HandleErrors(couponController.create));

router.patch('/coupons', AdminTokenVerifier, HandleErrors(couponController.updateCoupon));

// Giveaway

router.get('/giveaway/signup/today/:amount', AdminTokenVerifier, HandleErrors(giveawayController.getRandomSignUpsFromToday));
router.get('/giveaways', ContributorTokenVerifier, HandleErrors(giveawayController.getGiveaways));
router.get('/giveaways/:giveawayId', ContributorTokenVerifier, HandleErrors(giveawayController.getGiveawayById));

router.post('/giveaways', ContributorTokenVerifier, HandleErrors(giveawayController.createGiveaway));

router.patch('/giveaways', ContributorTokenVerifier, HandleErrors(giveawayController.updateGiveaway));

router.delete('/giveaways', ContributorTokenVerifier, HandleErrors(giveawayController.deleteGiveaway));

// GR Server

router.get('/gr-server', AdminTokenVerifier, HandleErrors(gRServerController.health));
router.get('/gr-server/logs', AdminTokenVerifier, HandleErrors(gRServerController.getLogs));
router.get('/gr-server/outlet-status', AdminTokenVerifier, HandleErrors(gRServerController.outletStatus));
router.get('/gr-server/cycle-outlet/on-off', AdminTokenVerifier, HandleErrors(gRServerController.cycleOutletOnOff));

router.delete('/gr-server/logs/:id', AdminTokenVerifier, HandleErrors(gRServerController.deleteLogById));

// Inventory

router.get('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.getInventory));
router.get('/inventory/:id', AdminTokenVerifier, HandleErrors(inventoryController.getByPK));

router.post('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.createInventory));

router.patch('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.updateInventory));

router.delete('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.deleteInventory));

// Login

router.post('/login', HandleErrors(userController.adminLogin));

// Media

router.get('/media/', AdminTokenVerifier, HandleErrors(mediaController.getMedia));
router.get('/media/:id', AdminTokenVerifier, HandleErrors(mediaController.getMediaById));
router.get('/media/audio/:filename', HandleErrors(mediaController.getAudioByFilename));
router.get('/media/video/:filename', HandleErrors(mediaController.getVideoByFilename));

router.post('/media/audio', AdminTokenVerifier, uploadAudio.array("files"), HandleErrors(mediaController.createAudio));
router.post('/media/video', AdminTokenVerifier, uploadVideos.array("files"), HandleErrors(mediaController.createVideo));
router.post('/media/youtube', AdminTokenVerifier, HandleErrors(mediaController.createYoutubeUrl));

router.patch('/media/activate', AdminTokenVerifier, HandleErrors(mediaController.activateMedia));
router.patch('/media', AdminTokenVerifier, HandleErrors(mediaController.updateMedia));

router.delete('/media', AdminTokenVerifier, HandleErrors(mediaController.deleteMediaById));

// Messages

router.get('/messages', AdminTokenVerifier, HandleErrors(messageController.getMessages));
router.get('/messages/:id', AdminTokenVerifier, HandleErrors(messageController.getMessageById));

router.patch('/messages', AdminTokenVerifier, HandleErrors(messageController.updateMessage));

// Orders

router.get('/orders', AdminTokenVerifier, HandleErrors(orderController.getOrders));
router.get('/orders/status/:status', AdminTokenVerifier, HandleErrors(orderController.getOrdersByStatus));
router.get('/orders/search/id/:id', AdminTokenVerifier, HandleErrors(orderController.getOrderId));
router.get('/orders/search/product-id/:productId', AdminTokenVerifier, HandleErrors(orderController.getOrdersByProductId));
router.get('/orders/search/ref-id/:refId', AdminTokenVerifier, HandleErrors(orderController.getOrderByRefId));
router.get('/products/search', AdminTokenVerifier, HandleErrors(productController.searchProducts));

router.post('/orders/date', AdminTokenVerifier, HandleErrors(orderController.getOrdersByDateRange));

router.patch('/orders', AdminTokenVerifier, HandleErrors(orderController.updateOrder));
router.patch('/orders/cancel/:id', AdminTokenVerifier, HandleErrors(orderController.cancelOrder));
router.patch('/orders/payment-link', AdminTokenVerifier, HandleErrors(orderController.paymentLink));
router.patch('/orders/ship', AdminTokenVerifier, HandleErrors(orderController.shipOrder));

// Pages

router.get('/pages', HandleErrors(pageController.getPages));
router.get('/pages/type/:type', AdminTokenVerifier, HandleErrors(pageController.getPagesByType));

// Products

router.get('/products', AdminTokenVerifier, HandleErrors(productController.getProducts));
router.get('/products/product-types', AdminTokenVerifier, HandleErrors(productController.getProductTypes));
router.get('/products/category/:id', AdminTokenVerifier, HandleErrors(productController.getProductsByCategoryId));
router.get('/products/search', AdminTokenVerifier, HandleErrors(productController.searchProducts));

router.post('/products', AdminTokenVerifier, uploadProducts.array("files"), HandleErrors(productController.create));
router.post('/products/profiles', AdminTokenVerifier, uploadIcon.array("files"), HandleErrors(productController.createProductProfile));
router.patch('/products/images', AdminTokenVerifier, uploadProducts.array("files"), HandleErrors(productController.addProductImage));

router.patch('/products', AdminTokenVerifier, HandleErrors(productController.updateProduct));

router.delete('/products', AdminTokenVerifier, HandleErrors(productController.deleteProduct));
router.delete('/products/product-image', AdminTokenVerifier, HandleErrors(productController.deleteProductImageById));

// Raffles

router.get('/raffles', AdminTokenVerifier, HandleErrors(raffleController.getRaffles));
router.get('/raffles/:id', AdminTokenVerifier, HandleErrors(raffleController.getRaffleById));

router.post('/raffles', AdminTokenVerifier, uploadProducts.array("files"), HandleErrors(raffleController.create));

router.patch('/raffles', AdminTokenVerifier, HandleErrors(raffleController.updateRaffle));

router.delete('/raffles', AdminTokenVerifier, HandleErrors(raffleController.deleteRaffle));

// Roles

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

// Sales

router.post('/sales', AdminTokenVerifier, HandleErrors(saleController.create));

router.get('/sales', AdminTokenVerifier, HandleErrors(saleController.getSales));

router.patch('/sales', AdminTokenVerifier, HandleErrors(saleController.updateSale));
router.patch('/sales/activation', AdminTokenVerifier, HandleErrors(saleController.changeActivationStatus));

// Themes

router.post('/themes', AdminTokenVerifier, uploadThemes.array("files"), HandleErrors(themeController.create));

router.get('/themes', AdminTokenVerifier, HandleErrors(themeController.getThemes));

router.patch('/themes/colors', AdminTokenVerifier, HandleErrors(themeController.updateThemeColorScheme));

// Users

// GET - ALL, By ID, Search
// Used to GET users for table on admin site
router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));

router.get('/user/account', ContributorTokenVerifier, HandleErrors(userController.getAccountById));

router.post('/user/accounts', AdminTokenVerifier, HandleErrors(userController.adminCreateAccount));
router.post('/admin', AdminTokenVerifier, HandleErrors(userController.createAdmin));
router.get('/admin', AdminTokenVerifier, HandleErrors(userController.getAdmin));

router.post('/customers/date', AdminTokenVerifier, HandleErrors(userController.getCustomersByDateRange));
router.get('/customers', AdminTokenVerifier, HandleErrors(userController.getCustomers));

// router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));
router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getUserById));
router.get('/users/search', AdminTokenVerifier, HandleErrors(userController.searchUsers));

router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateAdminUser));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Visits

router.get('/visits', AdminTokenVerifier, HandleErrors(visitController.getVisits));
router.get('/visits/views', AdminTokenVerifier, HandleErrors(visitController.getTotalVisitCount));
router.get('/visits/pagination', AdminTokenVerifier, HandleErrors(visitController.getVisitsByPage));
router.post('/visits/date', AdminTokenVerifier, HandleErrors(visitController.getVisitsByDateRange));

// Welcome

router.post('/welcome/images', AdminTokenVerifier, uploadWelcome.array('files'), HandleErrors(welcomeController.postWelcomeImage));

router.patch('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.updateWelcomeImageById));

router.delete('/welcome/images/:id', AdminTokenVerifier, HandleErrors(welcomeController.deleteWelcomeImageById));
router.delete('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.deleteImagesAndFilesById));

export default router;