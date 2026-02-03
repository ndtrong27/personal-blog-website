import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-bar" style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            paddingBottom: '0.5rem',
            marginBottom: '2rem',
            maxWidth: '300px'
        }}>
            <Search size={18} style={{ color: '#888', marginRight: '0.8rem' }} />
            <input
                type="text"
                placeholder="Search stories..."
                onChange={(e) => onSearch(e.target.value)}
                style={{
                    border: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    width: '100%',
                    outline: 'none'
                }}
            />
        </div>
    );
};

export default SearchBar;
