export default function CompanyTable({ companies }) {
  if (!companies || companies.length === 0) {
    return <p className="no-results-text">No breweries to display</p>
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Type</th>
              <th>City</th>
              <th>State</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>
                  <div className="company-cell">
                    <div className="company-name">{company.name}</div>
                    <div className="company-description">{company.address}</div>
                  </div>
                </td>
                <td>{company.industry}</td>
                <td>{company.city}</td>
                <td>{company.state}</td>
                <td>{company.phone}</td>
                <td>
                  {company.website !== "N/A" ? (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="website-link">
                      Visit
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
