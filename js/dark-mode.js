document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Initialize theme from localStorage or system preference
    let currentTheme = localStorage.getItem('crispie-theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
  
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('crispie-theme', currentTheme);
      updateIcon(currentTheme);
    });
  
    // Update the toggle icon
    function updateIcon(theme) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  
    // Sync across tabs
    window.addEventListener('storage', function(e) {
      if (e.key === 'crispie-theme') {
        currentTheme = e.newValue;
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
      }
    });
  });