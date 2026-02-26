import "./searchfilter.css"

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchFilter({ searchTerm, onSearchChange }: SearchFilterProps) {
  return (
    <div className="search-wrapper">
      <span uk-icon="search" className="search-icon"></span>
      <input
        type="text"
        placeholder="Search for recipes"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}