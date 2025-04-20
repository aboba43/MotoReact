import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import './style.css'

export default function Sidebar({ onFilterChange, activeFilters }) {
    // Define filter options
    const filterOptions = {
        type: ["Sport", "Cruiser", "Touring", "Adventure"],
        year: ["2020", "2021", "2022", "2023"],
        make: ["Kawasaki", "Honda", "Yamaha", "Suzuki"]
    };

    const handleFilterChange = (filterType, value) => (event) => {
        onFilterChange(filterType, value, event.target.checked);
    };

    return (
        <div className="sidebar">
            {/* Type Filters */}
            <div>
                <p>Type</p>
                <FormGroup>
                    {filterOptions.type.map((type) => (
                        <FormControlLabel
                            key={type}
                            control={
                                <Checkbox 
                                    checked={activeFilters.type.includes(type)}
                                    onChange={handleFilterChange('type', type)}
                                />
                            }
                            label={type}
                        />
                    ))}
                </FormGroup>
            </div>

            {/* Year Filters */}
            <div>
                <p>Year</p>
                <FormGroup>
                    {filterOptions.year.map((year) => (
                        <FormControlLabel
                            key={year}
                            control={
                                <Checkbox 
                                    checked={activeFilters.year.includes(year)}
                                    onChange={handleFilterChange('year', year)}
                                />
                            }
                            label={year}
                        />
                    ))}
                </FormGroup>
            </div>

            {/* Make Filters */}
            <div>
                <p>Make</p>
                <FormGroup>
                    {filterOptions.make.map((make) => (
                        <FormControlLabel
                            key={make}
                            control={
                                <Checkbox 
                                    checked={activeFilters.make.includes(make)}
                                    onChange={handleFilterChange('make', make)}
                                />
                            }
                            label={make}
                        />
                    ))}
                </FormGroup>
            </div>
        </div>
    );
}