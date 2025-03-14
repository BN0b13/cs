import Alert from './Alert.js';
import Auction from './Auction.js';
import Cart from './Cart.js';
import Category from './Category.js';
import Company from './Company.js';
import Configuration from './Configuration.js';
import Coupon from './Coupon.js';
import Giveaway from './Giveaway.js';
import Image from './Image.js';
import Inventory from './Inventory.js';
import Media from './Media.js';
import Message from './Message.js';
import Order from './Order.js';
import Page from './Page.js';
import Permission from './Permission.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import ProductProfile from './ProductProfile.js';
import Raffle from './Raffle.js';
import Role from './Role.js';
import RolePermissions from './RolePermissions.js';
import Sale from './Sale.js';
import Section from './Section.js';
import SectionImage from './SectionImage.js';
import Theme from './Theme.js';
import User from './User.js';
import UserPermissions from './UserPermissions.js';
import Visit from './Visit.js';
import WelcomeImage from './WelcomeImage.js';

// Category → Products (One category can have many products)
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Company → User (A company belongs to a user)
Company.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Company, { foreignKey: 'userId' });

// Configuration → Theme
Configuration.belongsTo(Theme, { foreignKey: 'themeId' });
Theme.hasOne(Configuration, { foreignKey: 'themeId' });

// Giveaway → User & Company
Giveaway.belongsTo(User, { foreignKey: 'userId' });
Giveaway.belongsTo(Company, { foreignKey: 'companyId' });
User.hasMany(Giveaway, { foreignKey: 'userId' });
Company.hasMany(Giveaway, { foreignKey: 'companyId' });

// Message → User (Sender & Receiver)
User.hasMany(Message, { foreignKey: 'senderId', as: 'SentMessages' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'ReceivedMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });

// Order → Coupon & Sale
Order.belongsTo(Coupon, { foreignKey: 'couponId' });
Order.belongsTo(Sale, { foreignKey: 'saleId' });
Coupon.hasMany(Order, { foreignKey: 'couponId' });
Sale.hasMany(Order, { foreignKey: 'saleId' });

// Product → Category, Images, Inventory
Product.hasMany(ProductImage, { foreignKey: 'productId' });
Product.hasMany(Inventory, { foreignKey: 'productId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

ProductImage.belongsTo(Product, { foreignKey: 'productId' });
Inventory.belongsTo(Product, { foreignKey: 'productId' });

// Raffle → Product
Raffle.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(Raffle, { foreignKey: 'productId' });

// User → Cart
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// User → Orders
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// User → Role
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

// Page → Sections
Page.hasMany(Section, { foreignKey: 'pageId', onDelete: 'CASCADE' });
Section.belongsTo(Page, { foreignKey: 'pageId' });

// User → Pages (User-created content)
User.hasMany(Page, { foreignKey: 'userId', onDelete: 'CASCADE' });
Page.belongsTo(User, { foreignKey: 'userId' });

// User → Sections (User-created content)
User.hasMany(Section, { foreignKey: 'userId', onDelete: 'CASCADE' });
Section.belongsTo(User, { foreignKey: 'userId' });

// User → Images (User-uploaded content)
User.hasMany(Image, { foreignKey: 'userId', onDelete: 'SET NULL' });
Image.belongsTo(User, { foreignKey: 'userId' });

// A Section can have many Images through SectionImage
Section.belongsToMany(Image, { through: SectionImage, foreignKey: 'sectionId', onDelete: 'CASCADE' });
Image.belongsToMany(Section, { through: SectionImage, foreignKey: 'imageId', onDelete: 'CASCADE' });

export {
    Alert,
    Auction,
    Cart,
    Category,
    Company,
    Configuration,
    Coupon,
    Giveaway,
    Image,
    Inventory,
    Media,
    Message,
    Order,
    Page,
    Permission,
    Product,
    ProductImage,
    ProductProfile,
    Raffle,
    Role,
    RolePermissions,
    Sale,
    Section,
    SectionImage,
    Theme,
    User,
    UserPermissions,
    Visit,
    WelcomeImage
}