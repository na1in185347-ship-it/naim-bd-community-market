# NBC – Naim-BD Community Market (এনবিসি – নাঈম-বিডি কমিউনিটি মার্কেট)

A complete, professional, production-ready multi-vendor community marketplace website for Bangladesh, featuring administrative content approval, seller storefronts, customer ordering, third-party courier delivery workflows, bKash & mobile payments, video reels, and direct messaging.

---

## 🌟 1. Website Identity & Governance

* **Official Website Name:** NBC – Naim-BD Community Market
* **Bengali Name:** এনবিসি – নাঈম-বিডি কমিউনিটি মার্কেট
* **Administrator Name:** নাঈম উদ্দিন (Naim Uddin)
* **Official Contact Hotline:** 01782185347 (+880 1782-185347)
* **Administrator Email:** na1in185347@gmail.com
* **Business Location:** Sylhet District, Sylhet Division, Bangladesh
* **Primary Languages:** Bengali (`বাংলা`) and English (`en`)
* **Currency:** Bangladeshi Taka (BDT, ৳)
* **Administrator Profile Photo:** `/assets/aistudio/f180b8fc-1bd3-4bb3-9071-5bbd25ca433c_c3a9318b.png`

---

## 🛡️ 2. Admin Content Approval & Moderation System

NBC enforces strict server-side and database-level content moderation:

1. **Submission:** When a seller or user submits a product, post, reel, story, or banner, it is assigned a `pending` status.
2. **Notification:** An administrative notification is instantly dispatched to Administrator নাঈম উদ্দিন.
3. **Review & Action:** The administrator can approve, edit, or reject the submission from the protected Command Center.
4. **Publishing:** Only approved items become publicly visible. Unapproved or rejected items remain locked and inaccessible.
5. **Anti-Bypass Security:** Direct URL manipulation or query manipulation cannot access unapproved items without authorization.

---

## 📦 3. Delivery & Commission Structure

* **Third-Party Courier Model:** The platform owner does not personally deliver products. Sellers arrange package delivery through verified third-party courier services (e.g. Steadfast Courier, RedX, Sundarban Courier, eCourier).
* **Consignment Tracking:** Sellers generate and input courier consignment tracking numbers when marking orders as dispatched.
* **Configurable Commission:** Platform commission is calculated transparently from verified transactions and is fully adjustable by Administrator নাঈম উদ্দিন (default: 10%, range 0% - 50%).

---

## 💳 4. Payment Security & Bangladesh Gateways

* **bKash Tokenized Checkout (PGW v1.2):** Server-side URL generation, token validation, and execution handshake.
* **Nagad Direct Gateway & Rocket:** Mobile banking gateway integration structure.
* **Cash on Delivery (COD):** Secure courier cash collection upon parcel arrival.
* **Sandbox / Test Mode Distinction:** When live merchant keys are not present in `.env`, the system explicitly labels all transaction flows with a visible "Bangladesh Sandbox Test Mode" indicator. No real bank accounts are debited in test mode.

---

## 🏗️ 5. Technology Architecture

| Component | Technology | Description |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite | Component architecture, Tailwind CSS v4, Lucide icons |
| **Backend** | Express, Node.js, TypeScript | Server-side price calculation, auth tokens, REST endpoints |
| **Database** | Persistent JSON Store / PostgreSQL | `data/nfb_database.json`, `database/schema.sql`, `database/supabase_policies.sql` |
| **Admin Controls** | Protected Dashboard | Products, users, shops, ads, payouts, reports & audit log |

---

## 🚀 6. Getting Started & Deployment

### Run Locally:
```bash
# 1. Install dependencies
npm install

# 2. Run automated verification tests
npm test

# 3. Start development server (Port 3000)
npm run dev
```

### Environment Variables (`.env`):
```env
# Optional Supabase Connection
SUPABASE_URL=""
SUPABASE_ANON_KEY=""

# Bangladesh Payment Gateway (Sandbox or Live)
BKASH_APP_KEY=""
BKASH_APP_SECRET=""
BKASH_USERNAME=""
BKASH_PASSWORD=""
BKASH_BASE_URL="https://tokenized.sandbox.bka.sh/v1.2.0-beta"

NAGAD_MERCHANT_ID=""
NAGAD_PUBLIC_KEY=""
NAGAD_PRIVATE_KEY=""

PORT="3000"
```
Fix my existing NBC – Naim-BD Community Market project.

1. Completely remove demo-only Persona Switching and Guest/Admin role switching from the website.
2. Keep only one Super Admin account: Hafiz Qari Mohammad Naim Uddin.
3. Only the authorized Super Admin can access the Admin Dashboard, settings, approvals, user management, commission and payment controls.
4. Customers and Merchants can register normally but must never receive Admin permissions.
5. Implement secure backend authentication, role-based access control (RBAC) and database-level authorization.
6. Protect all admin routes and APIs against unauthorized access.
7. Never allow users to change their own roles or promote themselves to Admin.
8. Remove demo accounts, fake login options and evaluation-only features.
9. Update README.md and remove outdated Persona Switching instructions.
10. Keep all existing NBC designs, features, database and project structure unchanged.
11. Never expose passwords, API keys, bKash or Nagad credentials in frontend code or GitHub.
12. Test all authentication and authorization functions before completion.

IMPORTANT: Modify the actual project source code, backend and database—not just README.md. Do not create a new website or remove existing working features. Do not add fake data.

---

## 👥 7. Persona Switching for Instant Evaluation
In the top navigation announcement bar, click **Role: Guest / Role: Admin** to switch between:
1. **নাঈম উদ্দিন (Naim Uddin):** Super Administrator (approvals queue, commission controls, moderation)
2. **General Customer (Buyer):** Cart, wishlist, checkout, live courier tracking
3. **Boutique Merchant (Seller):** Product creation, order dispatch, payout request
