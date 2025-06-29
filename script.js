const navItems = [
  { selector: '.nav-group', label: 'THE GROUP', href: 'team.html' },
  { selector: '.nav-research', label: 'RESEARCH', href: 'research.html' },
  { selector: '.nav-publications', label: 'PUBLICATIONS', href: 'publications.html' },
  { selector: '.nav-patents', label: 'PATENTS', href: 'patents.html' },
  { selector: '.nav-projects', label: 'PROJECTS', href: 'projects.html' },
  { selector: '.nav-activities', label: 'GROUP ACTIVITIES', href: 'group-activities.html' },
  { selector: '.nav-news', label: 'NEWS', href: 'news.html' },
  { selector: '.nav-contact', label: 'CONTACT', href: '#contact-us-section' }
];

const toggleBtn = document.querySelector('.toggle');
const subMenu = document.querySelector('.sub-menu');

function updateHamburgerMenu() {
  subMenu.innerHTML = ''; // Clear previous
  let anyHidden = false;
  navItems.forEach(item => {
    const navLink = document.querySelector(item.selector);
    if (navLink) {
      const style = window.getComputedStyle(navLink);
      if (style.display === 'none') {
        anyHidden = true;
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'option';
        link.innerHTML = `<p>${item.label}</p>`;
        subMenu.appendChild(link);
      }
    }
  });
  // Show hamburger only if at least one item is hidden
  toggleBtn.style.display = anyHidden ? 'flex' : 'none';
  // If menu is open and nothing is hidden, close it
  if (!anyHidden) subMenu.style.display = "none";
}

// Hamburger toggle logic
toggleBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  if (subMenu.style.display === "none" || subMenu.style.display === "") {
    subMenu.style.display = "flex";
  } else {
    subMenu.style.display = "none";
  }
});

// Hide menu when clicking outside
window.addEventListener("click", function(e) {
  if (!subMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
    subMenu.style.display = "none";
  }
});

// Update menu on load and resize
window.addEventListener('resize', updateHamburgerMenu);
window.addEventListener('load', updateHamburgerMenu);

document.addEventListener('DOMContentLoaded', function() {
  const ticker = document.querySelector('.news-ticker');
  const list = document.querySelector('.news-list');
  const items = Array.from(list.children);
  const itemHeight = items[0].offsetHeight;
  let index = 0;

  // Clone items for infinite loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    list.appendChild(clone);
  });

  function scrollNews() {
    index++;
    list.style.transition = 'transform 0.5s';
    list.style.transform = `translateY(-${itemHeight * index}px)`;

    // When reached halfway (original items), reset to start instantly
    if (index === items.length) {
      setTimeout(() => {
        list.style.transition = 'none';
        list.style.transform = 'translateY(0)';
        index = 0;
      }, 500); // match transition duration
    }
  }

  setInterval(scrollNews, 3000); // scroll every 3 seconds
});