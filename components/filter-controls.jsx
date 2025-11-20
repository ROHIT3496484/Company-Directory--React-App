"use client"

import "../app/styles.css"

export default function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedIndustry,
  setSelectedIndustry,
  selectedState,
  setSelectedState,
  sortBy,
  setSortBy,
  onReset,
  industries = [],
  states = [],
}) {
  return (
    <div className="filter-controls">
      <div className="filter-grid">
        {/* Search Input */}
        <div className="filter-group">
          <label htmlFor="search">Search Companies</label>
          <input
            id="search"
            type="text"
            placeholder="Enter company name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search companies by name or city"
          />
        </div>

        {/* Brewery Type Filter */}
        <div className="filter-group">
          <label htmlFor="industry">Filter by Company Type</label>
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            aria-label="Filter by company type"
          >
            <option value="">All Types ({industries.length})</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="filter-group">
          <label htmlFor="state">Filter by State</label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            aria-label="Filter by state"
          >
            <option value="">All States ({states.length})</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort breweries by">
            <option value="name">Company Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="filter-group">
          <button onClick={onReset} className="filter-button" aria-label="Reset all filters">
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  )
}
