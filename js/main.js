document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initActiveNavLink();
  initProjectFilters();
});

/**
 * Handle navigation styling on scroll
 */
function initNavbarScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load to set initial state
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * Detect the current pathname and set the active class on corresponding navigation link
 */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pathname = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Normalize href and pathname to compare
    // Handle local files (e.g., index.html vs projects/index.html) and subdirectories
    const isProjectsPath = pathname.includes('/projects/') || pathname.endsWith('/projects');
    const isHomePath = !isProjectsPath;

    if (href.includes('projects') && isProjectsPath) {
      link.classList.add('active');
    } else if ((href === '/' || href.endsWith('index.html') || href === './') && isHomePath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Handle filtering of project cards on the projects page
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  
  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Remove hidden class
          card.classList.remove('hidden');
          // Trigger a micro-fade-in animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
