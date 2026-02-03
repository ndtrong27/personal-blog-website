const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="category-filter" style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
        }}>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    style={{
                        background: selectedCategory === category ? 'var(--text-primary)' : 'transparent',
                        color: selectedCategory === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                        border: `1px solid ${selectedCategory === category ? 'var(--text-primary)' : '#ddd'}`,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
