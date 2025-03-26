const BreadcrumbManager = {
    container: null,
    homeLink: null,
    currentPage: null,
    middleElements: [],
    minWidth: 980,
    isExpanded: false,
  
    init() {
        this.container = document.getElementById('breadcrumb-container');
        if (!this.container) return;

        // Find the Home link (first link in the container)
        this.homeLink = this.container.querySelector('.trail-begin');
        
        // Find the current page (element with trail-end class)
        this.currentPage = this.container.querySelector('.trail-end');

        // Get all elements between Home and current page
        if (this.homeLink && this.currentPage) {
        let current = this.homeLink.nextElementSibling;
            while (current && !current.classList.contains('trail-end')) {
                this.middleElements.push(current);
                current = current.nextElementSibling;
            }
        }
  
        // Initial setup
        this.handleResize();
        
        // Add event listeners
        window.addEventListener('resize', () => this.handleResize());
        this.container.addEventListener('click', (e) => this.handleClick(e));
        this.container.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Add necessary CSS
        this.addStyles();
    },
    // Helper function to count actual breadcrumb items (excluding chevrons)
    getBreadcrumbCount() {
        const links = this.container.getElementsByTagName('a');
        const currentPage = this.container.querySelector('.trail-end');
        return links.length + (currentPage ? 1 : 0);
    },
  
    handleResize() {
        if (window.innerWidth <= this.minWidth && !this.isExpanded && this.getBreadcrumbCount() > 2) {
            this.truncateBreadcrumbs();
        } else {
            this.showAllBreadcrumbs();
        }
    },
  
    truncateBreadcrumbs() {
        if (this.getBreadcrumbCount() <= 2) {
            this.showAllBreadcrumbs();
            return;
        }

        if (this.homeLink) this.homeLink.style.display = '';
        if (this.currentPage) this.currentPage.style.display = '';

        this.middleElements.forEach((element, index) => {
        if (index === 0 && element.classList.contains('scs-chevron')) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
        });

        if (!this.container.querySelector('.breadcrumb-ellipsis')) {
            const ellipsis = document.createElement('button');
            ellipsis.className = 'breadcrumb-ellipsis';
            ellipsis.innerHTML = '...';
            ellipsis.setAttribute('type', 'button');
            ellipsis.title = 'Show all breadcrumbs';
            ellipsis.setAttribute('aria-expanded', 'false');
            ellipsis.setAttribute('aria-label', 'Show all breadcrumbs');
            
            const firstChevron = this.middleElements.find(el => el.classList.contains('scs-chevron'));
            if (firstChevron) {
                firstChevron.after(ellipsis);
            }
        }

        const lastChevron = this.currentPage?.previousElementSibling;
        if (lastChevron?.classList.contains('scs-chevron')) {
            lastChevron.style.display = '';
        }
    },
  
    showAllBreadcrumbs() {
        if (this.homeLink) this.homeLink.style.display = '';
        if (this.currentPage) this.currentPage.style.display = '';
        this.middleElements.forEach(element => {
            element.style.display = '';
        });

        const ellipsis = this.container.querySelector('.breadcrumb-ellipsis');
        if (ellipsis) {
            ellipsis.remove();
        }
    },
  
    toggleBreadcrumbs() {
        this.isExpanded = !this.isExpanded;
        const ellipsis = this.container.querySelector('.breadcrumb-ellipsis');
        
        if (this.isExpanded) {
            this.showAllBreadcrumbs();
        } else {
            this.truncateBreadcrumbs();
        }

        // Update aria-expanded state
        if (ellipsis) {
            ellipsis.setAttribute('aria-expanded', this.isExpanded.toString());
            ellipsis.setAttribute('aria-label', this.isExpanded ? 'Hide breadcrumbs' : 'Show all breadcrumbs');
        }
    },
  
    handleClick(e) {
        if (e.target.classList.contains('breadcrumb-ellipsis')) {
            this.toggleBreadcrumbs();
        }
    },
  
    handleKeydown(e) {
        if (e.target.classList.contains('breadcrumb-ellipsis')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleBreadcrumbs();
            }
        }
    },
  
    addStyles() {
        const styles = `
            .breadcrumb-ellipsis {
                margin: -2px 6px 2px 6px;
                cursor: pointer;
                color: #3D6BE4;
                background: none;
                border: none;
                padding: 0;
                font-size: 18px;
                text-decoration-color: #3D6BE4;
                text-decoration-line: underline;
                text-decoration-style: solid;
                text-decoration-thickness: 1px;
                text-underline-offset: 2px;
            }
            .breadcrumb-ellipsis:hover {
                color: #353C98;
                text-decoration-color: #353C98;
            }
            .breadcrumb-ellipsis:focus {
                margin: 0 6px;
                outline: 2px solid #458FFF;
                outline-offset: 2px;
                border-radius: 1px;
                text-decoration: none;
                line-height: 16px;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
};
  
document.addEventListener('DOMContentLoaded', () => BreadcrumbManager.init());