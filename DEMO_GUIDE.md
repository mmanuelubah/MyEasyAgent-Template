# Testing & Demo Guide

This guide explains how to run the **EEPROM Real Estate Marketplace** locally and test the various user flows as a "dummy" user.

## 1. Local Setup

Follow these steps to get the site running on your machine:

1. **Open Terminal** in the project directory: `/home/emmanuel/Desktop/EEPROM `
2. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
4. **Open in Browser**: Navigate to [http://localhost:3000](http://localhost:3000)

---

## 2. Testing User Flows

### Flow A: The Homeowner/Buyer (Client)
1.  **Start at Home**: Explore the Hero section. Try typing "London" or "Manhattan" in the search box.
2.  **Discover Houses**: Click on **"Explore All Properties"** or use the **"Properties"** link in the Navbar.
3.  **View Details**: Click on a property card (e.g., "Modern Sunset Villa").
    -   *Test*: Toggle between **Photos**, **Video Tour**, and **Street View** tabs.
    -   *Test*: Check the Agent Sidebar on the right.
4.  **Check Dashboard**: Go to **Sign In** and click **"Sign In as Client"**.
    -   *Test*: View your "Available Credits" and "Inspection History".

### Flow B: The Real Estate Agent
1.  **Sign In**: Go to the login page and click **"Sign In as Agent"**.
2.  **Command Center**: 
    -   *Test*: View the **"Active Listings"** and **"Total Leads"** stats.
    -   *Test*: Look at **"Today's Schedule"** to see upcoming inspections.
    -   *Test*: Hover over your listings to see the "Featured" star badge.

---

## 3. Developer Handover Notes

-   **Tech Stack**: Next.js 14 (App Router), Tailwind CSS, Lucide Icons.
-   **Mock Data**: Located in `src/lib/mock-data.ts`. Devs can easily replace this with an API or Database (Prisma/Supabase) call.
-   **Asset Strategy**: I've used high-quality Unsplash URLs for images and Pravatar for agent profiles to make the demo look premium without local asset bloat.
-   **Animations**: Uses Tailwind's `animate-in` for smooth entry transitions.

---

## 4. Key Improvements for Devs
-   [ ] **Authentication**: Replace dummy role buttons with NextAuth.js.
-   [ ] **CMS/Database**: Connect the property grid to a real backend.
-   [ ] **Maps**: Integrate Google Maps API for the "Street View" and "MapPin" logic.
-   [ ] **Credits**: Implement a Stripe payment flow for "Add More Credits".
