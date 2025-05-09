import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'  // Add smooth scrolling behavior
        });
    }, [location]);

    return null;
}

export default ScrollToTop;
