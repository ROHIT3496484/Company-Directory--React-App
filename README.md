#  Companies Directory Application

A React-based frontend application that displays brewery data from the Open Brewery DB API with advanced filtering, sorting, and pagination features.

## Project Overview

This application demonstrates key React concepts including state management, API integration, filtering, sorting, and pagination. It fetches real brewery data from a public API and provides an intuitive interface for exploring and filtering companies.

**Live API Used:** Open Brewery DB API (https://api.openbrewerydb.org/v1/breweries?per_page=50)

## Architecture & Code Structure

### 1. Main Component (`app/page.jsx`)
**Purpose:** Central hub that manages all state and orchestrates data flow

**Key States:**
- `companies` - Stores 50 breweries fetched from API
- `searchTerm` - User search input
- `selectedIndustry` - Selected brewery type filter
- `selectedState` - Selected state filter
- `sortBy` - Sort option (name/city/state)
- `currentPage` - Current pagination page

**Key Functions:**
- `fetchCompanies()` - Fetches data from Open Brewery DB API, extracts unique brewery types and states
- `filteredCompanies` - useMemo hook that applies search, industry, and state filters, then sorts results
- `handleReset()` - Clears all filters and returns to page 1
- `handlePagination()` - Manages page navigation

**Data Flow:**
\`\`\`
API Call (useEffect) → Transform Data → Extract Unique Industries/States 
→ User Filters/Sorts → useMemo applies filters & sorting 
→ Paginate results → Render table
\`\`\`

### 2. Filter Controls Component (`components/filter-controls.jsx`)
**Purpose:** Presentational component that renders all filter UI

**Features:**
- Search input (searches name, city, description)
- Brewery type dropdown (dynamically populated from API)
- State filter dropdown (dynamically populated from API)
- Sort dropdown (name, city, state)
- Reset filters button

All inputs are controlled components that update parent state via props.

### 3. Company Table Component (`components/company-table.jsx`)
**Purpose:** Displays the paginated brewery data in a table format

**Columns:**
- Brewery Name + Address
- Brewery Type (Industry)
- City
- State
- Phone
- Website (clickable link if available)

### 4. Styling (`app/styles.css`)
**Clean CSS without frameworks:**
- Responsive grid layout (1 col mobile → 2 col tablet → 5 col desktop)
- Dark/light contrast for accessibility
- Hover effects on rows and buttons
- Mobile breakpoints at 768px and 1024px
- Pagination with active page highlighting

## How Data Flows

1. **Page Load** → useEffect triggers API call to Open Brewery DB
2. **API Response** → Raw brewery data received and validated
3. **Data Transformation** → Each brewery mapped to application schema:
   \`\`\`javascript
   {
     id, name, industry (brewery_type), state, city, 
     country, phone, website, address, description
   }
   \`\`\`
4. **Extract Filters** → Unique types and states extracted for dropdowns
5. **User Interacts** → Search/filter/sort states update
6. **useMemo Recalculates** → Filtered results computed (optimized performance)
7. **Pagination** → Results sliced into pages (10 per page)
8. **Render** → Table displays current page of results

## Features Implemented

### Core Requirements
✅ Responsive UI using React.js  
✅ Brewery list displayed in table layout  
✅ Search by brewery name/city  
✅ Filter by brewery type (dynamic from API)  
✅ Filter by state (dynamic from API)  
✅ Sort options (name, city, state)  
✅ Good UX with loading/error/empty states  
✅ React hooks for state management  

### Bonus Features
✅ Pagination (10 items per page with page numbers)  
✅ Sorting options (by name, city, state)  
✅ Custom CSS styling (responsive, no frameworks)  
✅ Dynamic filter population from API  

## Demonstration Flow (5-10 Minutes)

### Step 1: Show API Integration
- Point out the `fetchCompanies()` function that calls Open Brewery DB API
- Show the data transformation logic
- Explain how unique types and states are extracted

### Step 2: Demonstrate Search
1. Type "Sierra Nevada" in search box
2. Explain the search filters name, city, and description
3. Show how results update in real-time

### Step 3: Demonstrate Filters
1. Select a brewery type (e.g., "micro")
2. Show how only matching breweries appear
3. Select a state (e.g., "CA")
4. Show how filters work together

### Step 4: Demonstrate Sorting
1. Change sort option from "Name" to "City"
2. Show breweries reorganized by city
3. Explain sort logic in useMemo

### Step 5: Demonstrate Pagination
1. Show pagination controls at bottom
2. Navigate through pages using Previous/Next
3. Click on specific page numbers
4. Explain how slice() divides data into pages

### Step 6: Demonstrate Reset
1. Apply multiple filters
2. Click "Reset All Filters"
3. Show all data returns, page 1 displays

### Step 7: Explain Performance
- Explain useMemo optimization prevents unnecessary recalculations
- Show how filters/sorting only recalculate when dependencies change

## Technologies Used
- **React 18** - State management with hooks (useState, useEffect, useMemo)
- **JavaScript** - No TypeScript for simplicity
- **CSS** - Custom styles without UI libraries (Tailwind/Material UI)
- **Open Brewery DB API** - Free, CORS-enabled, no authentication needed

## File Structure (Minimal & Clean)
\`\`\`
app/
  page.jsx           (Main component - 250 lines)
  styles.css         (All styling - 400 lines)
components/
  filter-controls.jsx    (Filter UI - 60 lines)
  company-table.jsx      (Table UI - 50 lines)
\`\`\`

**Removed:** All 57 shadcn UI components, unused dependencies, and documentation clutter

## How to Use

1. **Load the app** - Breweries automatically load from API
2. **Search** - Type a brewery name or city
3. **Filter** - Select brewery type and/or state
4. **Sort** - Choose sort order
5. **Paginate** - Browse through pages
6. **Reset** - Clear all filters with one click

## Deployment Ready
- No external dependencies beyond React
- No API keys required (Open Brewery DB is public)
- Fully responsive on mobile, tablet, and desktop
- Error handling for failed API requests
- Loading states for better UX

---

**Demo Notes for Your Presentation:**
- Emphasize the Open Brewery DB API integration
- Show the useMemo hook preventing unnecessary re-renders
- Explain the filter logic and how it combines multiple criteria
- Discuss the pagination implementation
- Highlight the responsive design approach
- Mention zero external UI library dependencies (just plain CSS)
