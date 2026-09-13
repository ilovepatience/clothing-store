import '../styles/Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
            >
                ← Попередня
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                if (totalPages > 7) {
                    if (page === 1 || page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                            >
                                {page}
                            </button>
                        );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="pagination-dots">...</span>;
                    }
                    return null;
                }

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
            >
                Наступна →
            </button>
        </div>
    );
};

export default Pagination;