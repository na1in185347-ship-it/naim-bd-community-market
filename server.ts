import { getAtomyConfig, updateAtomyConfig } from "./server/atomy";
import { trackPageview, getVisitorAnalytics } from "./server/analytics";
import {
  getCourses,
  getCourseById,
  enrollCourse,
  getCourseCategories,
  createAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  applyCoursePass,
  getCoursePassStatus,
  adminGetCoursePasses,
  adminVerifyCoursePass
} from "./server/courses";
import {
  getDistricts,
  getDistrictById,
  getMapStats
} from "./server/bangladeshMap";
import {
  getIslamicCategories,
  getIslamicResources,
  getIslamicResourceById,
  likeIslamicResource,
  adminGetIslamicResources,
  adminCreateIslamicResource,
  adminUpdateIslamicResource,
  adminDeleteIslamicResource,
  adminToggleUserVerification
} from "./server/islamic";
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

// Controllers
import {
  authenticate,
  requireAuth,
  requireSeller,
  requireAdmin,
  login,
  register,
  getMe,
  updateProfile,
  switchDemoUser,
  socialLogin,
  forgotPassword,
  resetPassword,
  changePassword,
  getCustomerAddresses,
  addCustomerAddress,
  deleteCustomerAddress,
  setDefaultCustomerAddress
} from './server/auth';

import {
  getCategories,
  getProducts,
  getProductById,
  createProduct,
  uploadProductImage,
  updateProduct,
  deleteProduct,
  calculateCart,
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  addReview,
  getContentPosts,
  getContentPostById,
  likeContentPost,
  getWelcomeBonus,
  verifyWelcomeVoucher,
  subscribeNewsletter
} from './server/marketplace';

import {
  getPaymentConfig,
  createBkashPayment,
  submitManualBkashPayment,
  adminVerifyOrderPayment,
  executeBkashPayment,
  initiateNagadPayment,
  verifyNagadPayment,
  confirmCodPayment,
  submitRocketPayment,
  submitBankPayment
} from './server/payments';

import {
  submitDonation,
  getDonationStats,
  getAdminDonations,
  verifyAdminDonation
} from './server/donations';

import {
  getFashionProducts,
  createFashionProduct,
  updateFashionProduct,
  deleteFashionProduct,
  submitFashionCustomOrder,
  getMyFashionCustomOrders,
  getAdminFashionCustomOrders,
  updateFashionCustomOrderStatus
} from './server/fashion';

import {
  applyForSeller,
  getSellerDashboard,
  getSellerOrders,
  updateSuborderStatus,
  requestPayout
} from './server/seller';

import {
  getSocialFeed,
  createPost,
  editPost,
  deletePost,
  toggleReaction,
  getPostComments,
  addPostComment,
  deletePostComment,
  toggleSavePost,
  toggleFollowUser,
  getUserSocialProfile,
  uploadMediaFile,
  getReels,
  createReel,
  getStories,
  createStory,
  reportContent
} from './server/social';

import {
  getConversations,
  getMessages,
  sendMessage,
  getNotifications,
  markNotificationsRead
} from './server/messaging';

import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  unfriendUser,
  getFriendshipStatus,
  getFriendsList,
  getFriendRequests,
  getFriendSuggestions
} from './server/friends';

import {
  getAdminMetrics,
  getPendingApprovals,
  handleApprovalAction,
  adminEditContent,
  getUsersList,
  updateUser,
  deleteUser,
  handleSellerApplication,
  updateSettings,
  getAdminAds,
  createAdCampaign,
  updateAdStatus,
  handlePayoutAction,
  getModerationQueue,
  handleModerationReport,
  getAdminWelcomeBonus,
  updateAdminWelcomeBonus,
  getAdminNewsletterSubscribers,
  deleteAdminNewsletterSubscriber,
  createAdminContentPost,
  updateAdminContentPost,
  deleteAdminContentPost,
  getAdminSocialPosts,
  adminCreatePost,
  adminUpdateSocialPost,
  adminDeleteSocialPost,
  adminDeleteReel,
  adminDeleteStory,
  adminSaveProfilePhoto,
  adminSaveCoverPhoto,
  adminResetIslamicCover,
  adminResetOfficialAvatar,
  adminSaveLogo,
  adminResetOfficialLogo,
  adminGetAllOrders,
  adminUpdateOrderStatus,
  adminGetCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory
} from './server/admin';

import {
  getProblemReports,
  submitProblemReport,
  upvoteProblemReport,
  getAuthenticityGuides,
  calculateHiddenCost,
  getPoliticalPromises,
  getSubscriptionGuides,
  getLostFoundListings,
  submitLostFoundReport,
  getLegalTemplates,
  generateLegalDraft,
  getSurplusFoodListings,
  submitSurplusFoodListing,
  claimSurplusFood,
  calculateCarbonFootprint,
  getTreePlantingLogs,
  logPlantedTree,
  getScholarships,
  calculateInheritanceFaraid,
  getParentingGuides,
  adminUpdateProblemStatus,
  adminDeleteProblem,
  adminUpdateLostFoundStatus,
  adminDeleteLostFound
} from './server/platforms';

import {
  handleLyroChat,
  handleEscalateToAdmin
} from './server/lyroSupport';

import {
  getBloodDonors,
  registerBloodDonor,
  getBloodRequests,
  createBloodRequest,
  adminUpdateDonorStatus,
  updateBloodRequestStatus
} from './server/blood';

import { db } from './server/db';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Basic middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'data/uploads')));
app.get('/robots.txt', (req: Request, res: Response) => {
  res.type('text/plain');
  res.sendFile(path.resolve(process.cwd(), 'public/robots.txt'));
});
app.get('/sitemap.xml', (req: Request, res: Response) => {
  res.type('application/xml');
  res.sendFile(path.resolve(process.cwd(), 'public/sitemap.xml'));
});

// Global authentication extractor
app.use(authenticate as any);

// ==========================================
// API ROUTES
// ==========================================

// 1. Auth routes
app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.post('/api/auth/social-login', socialLogin);
app.post('/api/auth/forgot-password', forgotPassword);
app.post('/api/auth/reset-password', resetPassword);
app.get('/api/auth/me', getMe as any);
app.put('/api/auth/profile', requireAuth as any, updateProfile as any);
app.post('/api/auth/change-password', requireAuth as any, changePassword as any);
app.post('/api/auth/switch-demo', switchDemoUser);

// Customer addresses
app.get('/api/customer/addresses', requireAuth as any, getCustomerAddresses as any);
app.post('/api/customer/addresses', requireAuth as any, addCustomerAddress as any);
app.delete('/api/customer/addresses/:id', requireAuth as any, deleteCustomerAddress as any);
app.put('/api/customer/addresses/:id/default', requireAuth as any, setDefaultCustomerAddress as any);

// Content Hub (Lifestyle, Fashion, Gadgets, Guides, Recipes, Infographics, etc.)
app.get('/api/content/posts', getContentPosts);
app.get('/api/content/posts/:id', getContentPostById);
app.post('/api/content/posts/:id/like', likeContentPost);

// Free NBC Courses routes
app.get('/api/courses/categories', getCourseCategories);
app.get('/api/courses', getCourses);
app.get('/api/courses/:id', getCourseById);
app.post('/api/courses/:id/enroll', enrollCourse);
// ৳50 Verified-Payment Lifetime Course Access Pass Routes
app.post('/api/courses/pass/apply', requireAuth as any, applyCoursePass as any);
app.get('/api/courses/pass/status', requireAuth as any, getCoursePassStatus as any);
app.get('/api/admin/courses/passes', requireAdmin as any, adminGetCoursePasses as any);
app.post('/api/admin/courses/passes/:id/verify', requireAdmin as any, adminVerifyCoursePass as any);

// Social Media Upload Direct Route
app.post('/api/social/upload', requireAuth as any, uploadMediaFile as any);


// Visitor Analytics Tracking (Privacy-Preserving)
app.post('/api/analytics/track', trackPageview);

// Atomy Business Public Route
app.get('/api/atomy', getAtomyConfig);

// Welcome Bonus & Newsletter
app.get('/api/welcome-bonus', getWelcomeBonus);
app.post('/api/welcome-bonus/verify', verifyWelcomeVoucher);
app.post('/api/newsletter/subscribe', subscribeNewsletter);

// NBC Fashion Designer Routes
app.get('/api/fashion/products', getFashionProducts);
app.post('/api/fashion/products', requireAdmin as any, createFashionProduct as any);
app.put('/api/fashion/products/:id', requireAdmin as any, updateFashionProduct as any);
app.delete('/api/fashion/products/:id', requireAdmin as any, deleteFashionProduct as any);
app.post('/api/fashion/custom-orders', submitFashionCustomOrder as any);
app.get('/api/fashion/custom-orders/my', getMyFashionCustomOrders as any);
app.get('/api/admin/fashion/custom-orders', requireAdmin as any, getAdminFashionCustomOrders as any);
app.put('/api/admin/fashion/custom-orders/:id/status', requireAdmin as any, updateFashionCustomOrderStatus as any);

// 2. Marketplace & Products
app.get('/api/categories', getCategories);
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', requireSeller as any, createProduct as any);
app.post('/api/products/upload-image', requireAuth as any, uploadProductImage as any);
app.put('/api/products/:id', requireSeller as any, updateProduct as any);
app.delete('/api/products/:id', requireAuth as any, deleteProduct as any);
app.post('/api/cart/calculate', calculateCart);
app.post('/api/orders', requireAuth as any, createOrder as any);
app.get('/api/orders', requireAuth as any, getMyOrders as any);
app.get('/api/orders/:id', requireAuth as any, getOrderById as any);
app.post('/api/orders/:id/cancel', requireAuth as any, cancelOrder as any);
app.post('/api/reviews', requireAuth as any, addReview as any);

// Shops
app.get('/api/shops', (req: Request, res: Response) => {
  const shops = db.getState().shops;
  res.json({ success: true, data: shops });
});
app.get('/api/shops/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const state = db.getState();
  const shop = state.shops.find(s => s.id === idOrSlug || s.slug === idOrSlug);
  if (!shop) {
    return res.status(404).json({ success: false, error: 'Shop not found' });
  }
  const products = state.products.filter(p => p.shopId === shop.id && p.status === 'published');
  return res.json({ success: true, data: { ...shop, products } });
});

// 3. Bangladesh Payments & bKash (01782185347)
app.get('/api/payments/config', getPaymentConfig);
app.post('/api/payments/bkash/create', requireAuth as any, createBkashPayment as any);
app.post('/api/payments/bkash/submit-manual', requireAuth as any, submitManualBkashPayment as any);
app.post('/api/payments/bkash/execute', requireAuth as any, executeBkashPayment as any);
app.post('/api/admin/orders/:orderNumber/verify-payment', requireAdmin as any, adminVerifyOrderPayment as any);
app.post('/api/payments/nagad/initiate', requireAuth as any, initiateNagadPayment as any);
app.post('/api/payments/nagad/verify', requireAuth as any, verifyNagadPayment as any);
app.post('/api/payments/cod/confirm', requireAuth as any, confirmCodPayment as any);
app.post('/api/payments/rocket/submit', requireAuth as any, submitRocketPayment as any);
app.post('/api/payments/bank/submit', requireAuth as any, submitBankPayment as any);

// Voluntary Donations (01782185347)
app.post('/api/donations/submit', submitDonation);
app.get('/api/donations/stats', getDonationStats);
app.get('/api/admin/donations', requireAdmin as any, getAdminDonations as any);
app.post('/api/admin/donations/:id/verify', requireAdmin as any, verifyAdminDonation as any);

// NBC Voluntary Blood Donation Routes
app.get('/api/blood/donors', getBloodDonors);
app.post('/api/blood/donors/register', registerBloodDonor);
app.get('/api/blood/requests', getBloodRequests);
app.post('/api/blood/requests', createBloodRequest);
app.patch('/api/admin/blood/donors/:id', requireAdmin as any, adminUpdateDonorStatus as any);
app.patch('/api/blood/requests/:id/status', updateBloodRequestStatus as any);

// 4. Seller Center
app.post('/api/seller/apply', requireAuth as any, applyForSeller as any);
app.get('/api/seller/dashboard', requireAuth as any, getSellerDashboard as any);
app.get('/api/seller/orders', requireAuth as any, getSellerOrders as any);
app.patch('/api/seller/orders/:id/status', requireAuth as any, updateSuborderStatus as any);
app.post('/api/seller/payout-request', requireAuth as any, requestPayout as any);

// 5. Social & Community Platform (Facebook-style)
app.get('/api/social/posts', getSocialFeed as any);
app.post('/api/social/posts', requireAuth as any, createPost as any);
app.put('/api/social/posts/:id', requireAuth as any, editPost as any);
app.delete('/api/social/posts/:id', requireAuth as any, deletePost as any);
app.post('/api/social/posts/:id/react', requireAuth as any, toggleReaction as any);
app.get('/api/social/posts/:id/comments', getPostComments as any);
app.post('/api/social/posts/:id/comments', requireAuth as any, addPostComment as any);
app.delete('/api/social/comments/:commentId', requireAuth as any, deletePostComment as any);
app.post('/api/social/posts/:id/save', requireAuth as any, toggleSavePost as any);
app.post('/api/users/:targetUserId/follow', requireAuth as any, toggleFollowUser as any);
app.get('/api/users/:id/profile', getUserSocialProfile as any);
app.post('/api/media/upload', requireAuth as any, uploadMediaFile as any);
app.get('/api/social/reels', getReels);
app.post('/api/social/reels', requireAuth as any, createReel as any);
app.get('/api/social/stories', getStories);
app.post('/api/social/stories', requireAuth as any, createStory as any);
app.post('/api/social/report', requireAuth as any, reportContent as any);

// 5b. Facebook-style Friend System (Request, Accept, Reject, Cancel, Unfriend, List, Suggestions)
app.post('/api/friends/request/:targetUserId', requireAuth as any, sendFriendRequest as any);
app.post('/api/friends/accept/:requestIdOrSenderId', requireAuth as any, acceptFriendRequest as any);
app.post('/api/friends/reject/:requestIdOrSenderId', requireAuth as any, rejectFriendRequest as any);
app.post('/api/friends/cancel/:targetUserId', requireAuth as any, cancelFriendRequest as any);
app.post('/api/friends/unfriend/:targetUserId', requireAuth as any, unfriendUser as any);
app.get('/api/friends/status/:targetUserId', requireAuth as any, getFriendshipStatus as any);
app.get('/api/friends/list', requireAuth as any, getFriendsList as any);
app.get('/api/friends/list/:userId', getFriendsList as any);
app.get('/api/friends/requests', requireAuth as any, getFriendRequests as any);
app.get('/api/friends/suggestions', requireAuth as any, getFriendSuggestions as any);

// 6. Messaging & Notifications
app.get('/api/messaging/conversations', requireAuth as any, getConversations as any);
app.get('/api/messaging/conversations/:conversationId/messages', requireAuth as any, getMessages as any);
app.post('/api/messaging/messages', requireAuth as any, sendMessage as any);
app.get('/api/notifications', requireAuth as any, getNotifications as any);
app.post('/api/notifications/read', requireAuth as any, markNotificationsRead as any);

// 7. Administrator Control
app.get('/api/admin/metrics', requireAdmin as any, getAdminMetrics as any);
app.get('/api/admin/approvals', requireAdmin as any, getPendingApprovals as any);
app.patch('/api/admin/approvals/:type/:id', requireAdmin as any, handleApprovalAction as any);
app.put('/api/admin/content/:type/:id', requireAdmin as any, adminEditContent as any);
app.get('/api/admin/users', requireAdmin as any, getUsersList as any);
app.patch('/api/admin/users/:id', requireAdmin as any, updateUser as any);
app.delete('/api/admin/users/:id', requireAdmin as any, deleteUser as any);
app.patch('/api/admin/seller-applications/:id', requireAdmin as any, handleSellerApplication as any);
app.patch('/api/admin/settings', requireAdmin as any, updateSettings as any);
app.get('/api/admin/ads', getAdminAds);
app.post('/api/admin/ads', requireAuth as any, createAdCampaign as any);
app.patch('/api/admin/ads/:id', requireAdmin as any, updateAdStatus as any);
app.patch('/api/admin/payouts/:id', requireAdmin as any, handlePayoutAction as any);
app.get('/api/admin/moderation', requireAdmin as any, getModerationQueue as any);
app.patch('/api/admin/moderation/:id', requireAdmin as any, handleModerationReport as any);

// Welcome bonus, Newsletter, and Content Hub Admin
app.get('/api/admin/welcome-bonus', requireAdmin as any, getAdminWelcomeBonus as any);
app.put('/api/admin/welcome-bonus', requireAdmin as any, updateAdminWelcomeBonus as any);
app.get('/api/admin/newsletter-subscribers', requireAdmin as any, getAdminNewsletterSubscribers as any);
app.delete('/api/admin/newsletter-subscribers/:id', requireAdmin as any, deleteAdminNewsletterSubscriber as any);
app.post('/api/admin/content/posts', requireAdmin as any, createAdminContentPost as any);
app.put('/api/admin/content/posts/:id', requireAdmin as any, updateAdminContentPost as any);
app.delete('/api/admin/content/posts/:id', requireAdmin as any, deleteAdminContentPost as any);

// Free NBC Courses Admin routes
app.post('/api/admin/courses', requireAdmin as any, createAdminCourse as any);
app.put('/api/admin/courses/:id', requireAdmin as any, updateAdminCourse as any);
app.delete('/api/admin/courses/:id', requireAdmin as any, deleteAdminCourse as any);

// Visitor Analytics Admin Route
app.get('/api/admin/analytics', requireAdmin as any, getVisitorAnalytics as any);

// Atomy Business Admin Route
app.put('/api/admin/atomy', requireAdmin as any, updateAtomyConfig as any);

// Admin Media & Posts Management Routes
app.get('/api/admin/social/posts', requireAdmin as any, getAdminSocialPosts as any);
app.post('/api/admin/social/posts', requireAdmin as any, adminCreatePost as any);
app.put('/api/admin/social/posts/:id', requireAdmin as any, adminUpdateSocialPost as any);
app.delete('/api/admin/social/posts/:id', requireAdmin as any, adminDeleteSocialPost as any);
app.delete('/api/admin/social/reels/:id', requireAdmin as any, adminDeleteReel as any);
app.delete('/api/admin/social/stories/:id', requireAdmin as any, adminDeleteStory as any);
app.post('/api/admin/profile/photo', requireAdmin as any, adminSaveProfilePhoto as any);
app.post('/api/admin/profile/cover', requireAdmin as any, adminSaveCoverPhoto as any);
app.post('/api/admin/profile/cover/reset-islamic', requireAdmin as any, adminResetIslamicCover as any);
app.post('/api/admin/profile/photo/reset-official', requireAdmin as any, adminResetOfficialAvatar as any);
app.post('/api/admin/site/logo', requireAdmin as any, adminSaveLogo as any);
app.post('/api/admin/site/logo/reset', requireAdmin as any, adminResetOfficialLogo as any);
app.post('/api/admin/upload-media', requireAdmin as any, uploadMediaFile as any);

// Bangladesh Map & Geo Atlas Routes
app.get('/api/bangladesh-map/districts', getDistricts as any);
app.get('/api/bangladesh-map/districts/:id', getDistrictById as any);
app.get('/api/bangladesh-map/stats', getMapStats as any);

// Islamic Library Public & Admin Routes
app.get('/api/islamic-library/categories', getIslamicCategories as any);
app.get('/api/islamic-library', getIslamicResources as any);
app.get('/api/islamic-library/:id', getIslamicResourceById as any);
app.post('/api/islamic-library/like/:id', likeIslamicResource as any);
app.get('/api/admin/islamic-library', requireAdmin as any, adminGetIslamicResources as any);
app.post('/api/admin/islamic-library', requireAdmin as any, adminCreateIslamicResource as any);
app.put('/api/admin/islamic-library/:id', requireAdmin as any, adminUpdateIslamicResource as any);
app.delete('/api/admin/islamic-library/:id', requireAdmin as any, adminDeleteIslamicResource as any);
app.post('/api/admin/verification/toggle', requireAdmin as any, adminToggleUserVerification as any);

// 8. 24/7 Tidio Lyro AI Customer Support
app.post('/api/support/lyro-chat', handleLyroChat as any);
app.post('/api/support/escalate', handleEscalateToAdmin as any);

// 9. Admin Orders & Categories Management
app.get('/api/admin/orders', requireAdmin as any, adminGetAllOrders as any);
app.patch('/api/admin/orders/:id/status', requireAdmin as any, adminUpdateOrderStatus as any);
app.get('/api/admin/categories', requireAdmin as any, adminGetCategories as any);
app.post('/api/admin/categories', requireAdmin as any, adminCreateCategory as any);
app.put('/api/admin/categories/:id', requireAdmin as any, adminUpdateCategory as any);
app.delete('/api/admin/categories/:id', requireAdmin as any, adminDeleteCategory as any);

// 10. 12 Separate Bangladesh-Focused Platforms Routes
// Platform 1: Real World Problem Bank
app.get('/api/platforms/problems', getProblemReports);
app.post('/api/platforms/problems', requireAuth as any, submitProblemReport as any);
app.post('/api/platforms/problems/:id/upvote', upvoteProblemReport);
app.patch('/api/admin/platforms/problems/:id', requireAdmin as any, adminUpdateProblemStatus as any);
app.delete('/api/admin/platforms/problems/:id', requireAdmin as any, adminDeleteProblem as any);

// Platform 2: Product Authenticity & Hidden Cost Checker
app.get('/api/platforms/authenticity', getAuthenticityGuides);
app.post('/api/platforms/authenticity/calculate', calculateHiddenCost);

// Platform 3: Political Promise & Manifesto Tracker
app.get('/api/platforms/promises', getPoliticalPromises);

// Platform 4: Universal Subscription Manager
app.get('/api/platforms/subscriptions', getSubscriptionGuides);

// Platform 5: Global Lost & Found Property
app.get('/api/platforms/lost-found', getLostFoundListings);
app.post('/api/platforms/lost-found', requireAuth as any, submitLostFoundReport as any);
app.patch('/api/admin/platforms/lost-found/:id', requireAdmin as any, adminUpdateLostFoundStatus as any);
app.delete('/api/admin/platforms/lost-found/:id', requireAdmin as any, adminDeleteLostFound as any);

// Platform 6: AI Legal Drafting & Agreement Assistant
app.get('/api/platforms/legal/templates', getLegalTemplates);
app.post('/api/platforms/legal/generate', generateLegalDraft);

// Platform 7: Live Food Waste & Distribution Network
app.get('/api/platforms/food-waste', getSurplusFoodListings);
app.post('/api/platforms/food-waste', requireAuth as any, submitSurplusFoodListing as any);
app.post('/api/platforms/food-waste/:id/claim', requireAuth as any, claimSurplusFood as any);

// Platform 8: Personal Carbon Footprint & Tree Planting
app.post('/api/platforms/carbon/calculate', calculateCarbonFootprint);
app.get('/api/platforms/carbon/trees', getTreePlantingLogs);
app.post('/api/platforms/carbon/trees/log', requireAuth as any, logPlantedTree as any);

// Platform 10: Free Research & Higher Education Guide
app.get('/api/platforms/education', getScholarships);

// Platform 11: Family Property & Inheritance Calculator
app.post('/api/platforms/inheritance/calculate', calculateInheritanceFaraid);

// Platform 12: Parenting & Child Psychology Guide
app.get('/api/platforms/parenting', getParentingGuides);

// Platform public settings
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, settings: db.getState().settings });
});

// Database reset endpoint (for testing/demo)
app.post('/api/admin/reset-demo', requireAdmin as any, (req: Request, res: Response) => {
  db.resetToSeed();
  res.json({ success: true, message: 'Database reset to default seed data.' });
});

// Fallback for unmatched /api/* routes so they NEVER return HTML
app.all('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Centralized API error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  if (req.originalUrl.startsWith('/api')) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err?.message || 'Internal Server Error' });
  }
  next(err);
});

// ==========================================
// FRONTEND SERVING (VITE DEV / PRODUCTION)
// ==========================================
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 NBC – Naim-BD Community Market Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
