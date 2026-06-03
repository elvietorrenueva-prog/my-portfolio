const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section').forEach((section) => observer.observe(section));

const carousels = document.querySelectorAll('.project-carousel');

carousels.forEach((carousel) => {
  const imageSources = carousel.dataset.images.split(',').map((src) => src.trim());
  const imageElement = carousel.querySelector('.project-carousel__image');
  const dotsContainer = carousel.querySelector('.project-carousel__dots');
  const prevButton = carousel.querySelector('.project-carousel__button--prev');
  const nextButton = carousel.querySelector('.project-carousel__button--next');
  let activeIndex = 0;

  const updateCarousel = (index) => {
    activeIndex = index;
    imageElement.classList.add('fade-out');
    setTimeout(() => {
      imageElement.src = imageSources[activeIndex];
      imageElement.classList.remove('fade-out');
    }, 300);

    dotsContainer.querySelectorAll('.project-carousel__dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  };

  imageSources.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'project-carousel__dot';
    dot.addEventListener('click', () => updateCarousel(index));
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const startAutoRotate = () => {
    return setInterval(() => {
      updateCarousel((activeIndex + 1) % imageSources.length);
    }, 3500);
  };

  let autoRotate = startAutoRotate();

  const resetAutoRotate = () => {
    clearInterval(autoRotate);
    autoRotate = startAutoRotate();
  };

  carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
  carousel.addEventListener('mouseleave', () => {
    resetAutoRotate();
  });

  prevButton.addEventListener('click', () => {
    updateCarousel((activeIndex - 1 + imageSources.length) % imageSources.length);
    resetAutoRotate();
  });

  nextButton.addEventListener('click', () => {
    updateCarousel((activeIndex + 1) % imageSources.length);
    resetAutoRotate();
  });
});
