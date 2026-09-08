# 🛒 Full-Stack E-Commerce Web Application

A complete, modern full-stack e-commerce store implementation featuring dynamic product management, state-managed shopping cart logic, safe user/admin authentication access rules, and persistent cloud data tracking.

---

## ⚡ Key Technical Features

### 🖥️ Frontend Client Layer
*   **Dynamic Visual Catalog:** High-fidelity, multi-category layout structured via responsive product layout views.
*   **Persistent Global Cart Management:** State handling mechanisms tracking real-time purchase tallies.
*   **Context-Based Access Routing:** Distinct customer interfaces vs protected system configurations.

### ⚙️ Backend API Architecture
*   **Role-Based Security:** Protected administration routes managed securely via cryptographic user session parameters.
*   **Structured Data Pipelines:** Integrated endpoints processing product catalog manipulation and order placement.
*   **Cloud Ledger Management:** Persistent cloud environment tracking active catalog states and user order records.

---

## 🛠️ System Architecture Breakdown

*   **Frontend Engine:** HTML5, CSS3 (Tailwind Framework), Modern JavaScript Build Tooling (Vite execution runtime)
*   **Backend Server:** Node.js with Express API routing gateway framework
*   **Database Cloud System:** MongoDB Atlas Cloud ecosystem configuration

---

## 🚀 Local Deployment Quick-Start Manual

### 1. Repository Setup & Extraction
Clone or download the project environment down into your local machine workspace:
```bash
cd ecommerce-backend-frontend
```

### 2. Backend Environment Configurations
Move into your backend directory, configure an environmental `.env` key variable structure mapping your database credentials, and install core dependencies:
```bash
cd backend
npm install
npm start
```

### 3. Frontend Web Hosting
Launch a secondary split terminal instance, change directory tracking into the client source folder, execute package setups, and run your client interface:
```bash
cd frontend
npm install
npm run dev
```
Open up your web browser to the default development address endpoint `http://localhost:5173` to explore the live application.

---

## 🔑 Pre-Configured Application Credentials
Test system operations immediately out of the box using these sandbox testing accounts:

| Access Profile Persona | Account User ID Reference | Private Passcode Entry | System Authority Level |
| :--- | :--- | :--- | :--- |
| **Store Customer** | `user@store.com` | `user123` | Product exploration, personal shopping cart actions, checkouts, order logs. |
| **System Administrator** | `admin@store.com` | `admin123` | Complete store configuration dashboard access, modify active products list. |
    ![image](Screenshot (50).png)
