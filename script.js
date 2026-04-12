document.addEventListener("DOMContentLoaded", function() {

  // Fade Animation
  const faders = document.querySelectorAll(".fade");

  const appearOptions = { threshold: 0.3 };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // TYPEWRITER
  const aboutElement = document.getElementById("about-text");

  if (aboutElement) {
    const aboutText = "i'm interested in ai, product, and tech policy — building things, exploring big questions about technology and society, and generally being curious about how the future works!";
    let index = 0;

    function typeWriter() {
      if (index < aboutText.length) {
        aboutElement.textContent += aboutText.charAt(index);
        index++;
        setTimeout(typeWriter, 35);
      }
    }

    aboutElement.textContent = "";
    setTimeout(typeWriter, 800);
  }

  // Setup Modal Event Listeners
  function setupModalListeners() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').classList.remove('active');
      });
    });
  }

  // Load blog post modal and attach to DOM
  async function loadBlogModal(modalId) {
    const blogFile = modalId.replace('-modal', '');
    const filePath = `/images/blog/${blogFile}.html`;
    console.log('Loading modal:', modalId, 'from', filePath);
    
    try {
      const response = await fetch(filePath);
      console.log('Fetch response:', response);
      if (!response.ok) throw new Error(`Failed to load ${filePath}`);
      const html = await response.text();
      console.log('HTML loaded:', html.substring(0, 100));
      
      // Check if modal already exists
      if (!document.getElementById(modalId)) {
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container.firstElementChild);
        setupModalListeners();
        console.log('Modal appended to DOM');
      }
      
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        console.log('Modal activated');
      } else {
        console.error('Modal not found after loading');
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
    }
  }

  // Project card modals with dynamic loading
  document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      console.log('Card clicked, modalId:', modalId);
      loadBlogModal(modalId);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

});