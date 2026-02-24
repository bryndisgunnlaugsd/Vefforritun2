import "./header.css"
import { SearchFilter } from "./searchfilter";

interface Headerprops{
    searchTerm: string;
    OnSearchChange: (value: string) => void;
}

export function Header({searchTerm, OnSearchChange}: Headerprops) {
    return(
        <div className="header">
            <SearchFilter searchTerm={searchTerm} onSearchChange={OnSearchChange}/>
            <h1>Explore Recipes</h1>
        </div>
    );
}