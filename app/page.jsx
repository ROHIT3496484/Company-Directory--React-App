"use client"

import { useState, useMemo, useEffect } from "react"
import CompanyTable from "@/components/company-table"
import FilterControls from "@/components/filter-controls"
import "./styles.css"

export default function Page() {
  // State for API data
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)

  // State for filter options extracted from API
  const [industries, setIndustries] = useState([])
  const [states, setStates] = useState([])

  // Fetch breweries from Open Brewery DB API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        setError(null)

        // Call Open Brewery DB API
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=50")

        if (!response.ok) {
          throw new Error("Failed to load brewery data from API")
        }

        const data = await response.json()
        const breweries = Array.isArray(data) ? data : []

        // Extract unique brewery types and states for filter options
        const uniqueTypes = [...new Set(breweries.map((b) => b.brewery_type).filter(Boolean))]
        const uniqueStates = [...new Set(breweries.map((b) => b.state).filter(Boolean))].sort()

        // Transform API data into application format
        const transformedCompanies = breweries.map((brewery) => {
          return {
            id: brewery.id,
            name: brewery.name || "Unknown Brewery",
            industry: brewery.brewery_type || "Brewery",
            state: brewery.state || "Unknown",
            city: brewery.city || "Unknown City",
            country: brewery.country || "United States",
            phone: brewery.phone || "N/A",
            website: brewery.website_url || "N/A",
            address: brewery.address_1 || "N/A",
            description: `${brewery.brewery_type || "Brewery"} located in ${brewery.city}, ${brewery.state}. ${brewery.phone ? `Contact: ${brewery.phone}` : ""}`,
          }
        })

        // Set state with fetched data
        setIndustries(uniqueTypes)
        setStates(uniqueStates)
        setCompanies(transformedCompanies)
      } catch (err) {
        setError("Failed to load brewery data. Please try refreshing the page.")
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  // Filter and sort companies based on user input
  const filteredCompanies = useMemo(() => {
    if (!companies || companies.length === 0) return []

    // Apply search, industry, and state filters
    const result = companies.filter((company) => {
      const matchesSearch =
        !searchTerm ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry
      const matchesState = !selectedState || company.state === selectedState

      return matchesSearch && matchesIndustry && matchesState
    })

    // Apply sorting
    if (result.length > 0) {
      if (sortBy === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortBy === "city") {
        result.sort((a, b) => a.city.localeCompare(b.city))
      } else if (sortBy === "state") {
        result.sort((a, b) => a.state.localeCompare(b.state))
      }
    }

    return result
  }, [companies, searchTerm, selectedIndustry, selectedState, sortBy])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedIndustry, selectedState])

  // Pagination logic
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedCompanies = filteredCompanies.slice(startIdx, startIdx + itemsPerPage)

  // Handler functions
  const handleReset = () => {
    setSearchTerm("")
    setSelectedIndustry("")
    setSelectedState("")
    setSortBy("name")
    setCurrentPage(1)
  }

  const handlePrevious = () => {
    setCurrentPage(Math.max(1, currentPage - 1))
  }

  const handleNext = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1))
  }

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum)
  }

  return (
    <main className="main-container">
      <div className="container">
        {/* Page Header */}
        <div className="header">
          <h1>Companies Directory</h1>
          <p>Real-time brewery data from Open Brewery DB API with dynamic filtering and sorting</p>
        </div>

        {/* Filter Controls */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
          industries={industries}
          states={states}
        />

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <p className="loading-text">Loading breweries from Open Brewery DB API...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            <div className="results-info">
              <p>
                Showing {filteredCompanies.length === 0 ? "0" : startIdx + 1}-
                {Math.min(startIdx + itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} breweries
              </p>
            </div>

            {paginatedCompanies.length > 0 ? (
              <>
                <CompanyTable companies={paginatedCompanies} />

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination-section">
                    <div className="pagination-controls">
                      <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-button">
                        ← Previous
                      </button>

                      <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageClick(pageNum)}
                            className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-button">
                        Next →
                      </button>
                    </div>

                    <p className="pagination-info">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <p className="no-results-text">No breweries found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
