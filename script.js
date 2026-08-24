/**
 * script.js
 * Handles interactivity, animations, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Hide/Show on Scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Downscroll - hide navbar
            navbar.classList.add('hidden');
        } else {
            // Upscroll - show navbar
            navbar.classList.remove('hidden');
        }

        // Add a class if we are at the top to remove the border/bg if desired
        if (scrollTop === 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        }

        lastScrollTop = scrollTop;
    });

    // 2. Intersection Observer for Fade-in on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Unobserve once animated
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section-reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Simple toggle for demonstration. 
            // In a production app, you'd want a proper slide-out menu or modal.
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg-nav)';
                navLinks.style.padding = '20px 0';
                navLinks.style.gap = '20px';
                navLinks.style.alignItems = 'center';
                navLinks.style.backdropFilter = 'blur(12px)';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

    // 4. Premium Project Screenshot Gallery
    const projectsData = [
        {
            title: 'Telegram File Sorter',
            subtitle: 'Python Desktop Automation Application',
            description: 'A standalone Windows desktop application that connects to the user\'s own Telegram account, lets them select a group and a topic, and automatically downloads course documents into an organized local folder. Tracks previously downloaded files via a local JSON log to prevent duplicates, and includes an optional one-click conversion of downloaded files to PDF using LibreOffice running silently in the background. Telegram sync and file conversion run in a dedicated background thread so the GUI stays fully responsive at all times.',
            tech: 'Python &bull; Telethon &bull; CustomTkinter &bull; asyncio &bull; PyInstaller',
            role: [
                'Application Architecture',
                'Telegram API Integration',
                'Async / Threading Design',
                'GUI Development',
                'PyInstaller Packaging'
            ],
            githubUrl: 'https://github.com/toufikk5/Telegram-Files-Manager',
            screenshots: [
                { image: "file_sorter_images/iamge_1.JPG", title: "App Interface" },
                { image: "file_sorter_images/iamge_2.JPG", title: "File Download" },
                { image: "file_sorter_images/image_3.JPG", title: "Conversion" },
                { image: "file_sorter_images/image_4.JPG", title: "Settings" },
                { image: "file_sorter_images/image_5.JPG", title: "Progress" },
                { image: "file_sorter_images/image_6.JPG", title: "Output" }
            ]
        },
        {
            title: 'LearnFirst',
            subtitle: 'AI Startup Branding Assistant',
            description: 'LearnFirst is an AI-powered web application that helps startup founders receive personalized branding recommendations using a Weighted Scoring Model (WSM) and AI-generated insights.',
            tech: 'HTML &bull; CSS &bull; JavaScript &bull; WSM &bull; LLM',
            role: [
                'Frontend Development',
                'UI Design',
                'Presentation'
            ],
            linkMessage: 'The public demo of LearnFirst is currently under development. It will be available soon.',
            screenshots: [
                { image: "images/home.png", title: "Home" },
                { image: "images/assessment.png", title: "Assessment" },
                { image: "images/loading.png", title: "Loading" },
                { image: "images/results.png", title: "Results" }
            ]
        },
        {
            title: 'Micro Jam',
            subtitle: 'Hackathon Game Project',
            description: 'A 2D Unity game developed during the USTHB Micro Jam hackathon as part of a multidisciplinary team. I contributed to gameplay implementation, game design, and audio integration while collaborating with teammates under tight time constraints.',
            tech: 'Unity &bull; C# &bull; Git &bull; GitHub &bull; Game Design',
            role: [
                'Unity Development (C#)',
                'Game Design',
                'Audio System Configuration',
                'Team Collaboration'
            ],
            linkMessage: 'The public demo of Micro Jam is currently under development. It will be available soon.',
            screenshots: [
                { image: "placeholder", title: "Placeholder 1" },
                { image: "placeholder", title: "Placeholder 2" }
            ]
        }
    ];

    const titleEl = document.getElementById('project-title');
    const subtitleEl = document.getElementById('project-subtitle');
    const descEl = document.getElementById('project-desc');
    const techEl = document.getElementById('project-tech');
    const roleListEl = document.getElementById('project-role-list');
    const projectPagination = document.getElementById('project-pagination');
    const projectCard = document.querySelector('.featured-project-card');
    const viewProjectBtn = document.getElementById('btn-view-project');

    let currentProjectIndex = 0;
    let activeProject = projectsData[0];

    // Generate pagination dots (indicators only — not clickable)
    if (projectPagination) {
        projectsData.forEach((proj, idx) => {
            const dot = document.createElement('span');
            dot.className = 'project-dot' + (idx === 0 ? ' active' : '');
            dot.setAttribute('aria-hidden', 'true');
            projectPagination.appendChild(dot);
        });
    }

    // Arrow navigation
    const projectPrevBtn = document.getElementById('project-prev');
    const projectNextBtn = document.getElementById('project-next');

    if (projectPrevBtn) {
        projectPrevBtn.addEventListener('click', () => {
            const idx = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
            switchProject(idx);
        });
    }

    if (projectNextBtn) {
        projectNextBtn.addEventListener('click', () => {
            const idx = (currentProjectIndex + 1) % projectsData.length;
            switchProject(idx);
        });
    }

    function switchProject(index) {
        currentProjectIndex = index;

        // Update dots visual
        Array.from(projectPagination.children).forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });

        // Fade out
        if (projectCard) {
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'scale(0.98)';
            projectCard.style.pointerEvents = 'none';
        }

        setTimeout(() => {
            activeProject = projectsData[index];

            if (titleEl) {
                titleEl.textContent = activeProject.title;
                subtitleEl.textContent = activeProject.subtitle;
                descEl.textContent = activeProject.description;
                techEl.innerHTML = activeProject.tech;

                roleListEl.innerHTML = '';
                activeProject.role.forEach(roleItem => {
                    const li = document.createElement('li');
                    li.textContent = roleItem;
                    roleListEl.appendChild(li);
                });
            }

            // Update the View Project button behaviour
            const liveBtn = document.getElementById('btn-view-project');
            if (liveBtn) {
                if (activeProject.githubUrl) {
                    liveBtn.dataset.githubUrl = activeProject.githubUrl;
                    delete liveBtn.dataset.toastMessage;
                    liveBtn.textContent = 'View on GitHub';
                } else {
                    delete liveBtn.dataset.githubUrl;
                    liveBtn.dataset.toastMessage = activeProject.linkMessage || '';
                    liveBtn.textContent = 'View Project';
                }
            }

            renderGallery();

            // Fade in
            if (projectCard) {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'scale(1)';
                projectCard.style.pointerEvents = 'auto';
            }
        }, 300);
    }

    // Initial project render
    if (titleEl) {
        titleEl.textContent = activeProject.title;
        subtitleEl.textContent = activeProject.subtitle;
        descEl.textContent = activeProject.description;
        techEl.innerHTML = activeProject.tech;

        activeProject.role.forEach(roleItem => {
            const li = document.createElement('li');
            li.textContent = roleItem;
            roleListEl.appendChild(li);
        });

        // Set initial button state
        if (viewProjectBtn) {
            if (activeProject.githubUrl) {
                viewProjectBtn.dataset.githubUrl = activeProject.githubUrl;
                viewProjectBtn.textContent = 'View on GitHub';
            } else if (activeProject.linkMessage) {
                viewProjectBtn.dataset.toastMessage = activeProject.linkMessage;
                viewProjectBtn.textContent = 'View Project';
            }
        }
    }

    const galleryView = document.getElementById('gallery-view');
    const galleryCounter = document.getElementById('gallery-counter');
    const galleryLabel = document.getElementById('gallery-label');
    const galleryDots = document.getElementById('gallery-dots');
    const btnPrev = document.getElementById('gallery-prev');
    const btnNext = document.getElementById('gallery-next');

    let currentSlideIndex = 0;

    const renderGallery = () => {
        if (!galleryView) return;
        currentSlideIndex = 0;
        const screenshots = activeProject.screenshots;

        galleryView.innerHTML = '';
        galleryDots.innerHTML = '';

        if (screenshots.length > 0) {
            screenshots.forEach((shot, index) => {
                // Slide
                const slide = document.createElement('div');
                slide.classList.add('gallery-slide');

                if (shot.image === "placeholder" || !shot.image) {
                    slide.classList.add('is-placeholder');
                    const textSpan = document.createElement('span');
                    textSpan.textContent = shot.title + " (Placeholder)";
                    slide.appendChild(textSpan);
                } else {
                    const img = document.createElement('img');
                    img.src = shot.image;
                    img.alt = shot.title;
                    slide.appendChild(img);
                }

                // Click to open modal
                slide.addEventListener('click', () => {
                    if (slide.classList.contains('stack-0')) {
                        openModal(currentSlideIndex);
                    }
                });

                galleryView.appendChild(slide);

                // Dot
                const dot = document.createElement('button');
                dot.classList.add('gallery-dot');
                dot.setAttribute('aria-label', `Go to ${shot.title}`);
                dot.addEventListener('click', () => {
                    currentSlideIndex = index;
                    updateGallery();
                });
                galleryDots.appendChild(dot);
            });
        }
        updateGallery();
    };

    const updateGallery = () => {
        if (!galleryView) return;
        const slides = Array.from(galleryView.querySelectorAll('.gallery-slide'));
        const dots = Array.from(galleryDots.querySelectorAll('.gallery-dot'));
        const total = slides.length;
        if (total === 0) return;

        // Assign stack classes based on relative distance
        slides.forEach((slide, idx) => {
            // Remove previous stack classes
            slide.className = 'gallery-slide' + (slide.classList.contains('is-placeholder') ? ' is-placeholder' : '');

            let dist = (idx - currentSlideIndex + total) % total;

            if (dist === 0) {
                slide.classList.add('stack-0');
            } else if (dist === 1) {
                slide.classList.add('stack-1');
            } else if (dist === 2) {
                slide.classList.add('stack-2');
            }
        });

        // Update dots
        dots.forEach((dot, idx) => {
            if (idx === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update text
        galleryCounter.textContent = `${currentSlideIndex + 1} / ${total}`;
        galleryLabel.style.opacity = 0;
        setTimeout(() => {
            galleryLabel.textContent = activeProject.screenshots[currentSlideIndex].title;
            galleryLabel.style.opacity = 1;
        }, 150);
    };

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            const len = activeProject.screenshots.length;
            if (!len) return;
            currentSlideIndex = (currentSlideIndex - 1 + len) % len;
            updateGallery();
        });

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            const len = activeProject.screenshots.length;
            if (!len) return;
            currentSlideIndex = (currentSlideIndex + 1) % len;
            updateGallery();
        });
    }

    // Initialize first gallery
    renderGallery();

    // 5. Fullscreen Modal Logic
    const modal = document.getElementById('gallery-modal');
    const modalBackdrop = modal.querySelector('.gallery-modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalPrevBtn = document.getElementById('modal-prev');
    const modalNextBtn = document.getElementById('modal-next');
    const modalImage = document.getElementById('modal-image');
    const modalLabel = document.getElementById('modal-label');

    let modalCurrentIndex = 0;

    const updateModal = () => {
        const shot = activeProject.screenshots[modalCurrentIndex];
        modalLabel.textContent = shot.title;

        // Handle placeholder vs image
        const existingPlaceholder = modal.querySelector('.modal-placeholder');
        if (existingPlaceholder) existingPlaceholder.remove();

        if (shot.image === "placeholder" || !shot.image) {
            modalImage.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.classList.add('modal-placeholder');
            placeholder.textContent = shot.title + " (Placeholder)";
            modal.querySelector('.gallery-modal-content').insertBefore(placeholder, modalNextBtn);
        } else {
            modalImage.style.display = 'block';
            modalImage.src = shot.image;
            modalImage.alt = shot.title;
        }
    };

    const openModal = (index) => {
        modalCurrentIndex = index;
        updateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    modalPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const len = activeProject.screenshots.length;
        modalCurrentIndex = (modalCurrentIndex - 1 + len) % len;
        updateModal();
    });

    modalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const len = activeProject.screenshots.length;
        modalCurrentIndex = (modalCurrentIndex + 1) % len;
        updateModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') {
            const len = activeProject.screenshots.length;
            modalCurrentIndex = (modalCurrentIndex - 1 + len) % len;
            updateModal();
        }
        if (e.key === 'ArrowRight') {
            const len = activeProject.screenshots.length;
            modalCurrentIndex = (modalCurrentIndex + 1) % len;
            updateModal();
        }
    });

    // 6. "Coming Soon" Toast for Email & LinkedIn
    let toastEl = null;
    let toastTimer = null;

    const showToast = () => {
        // Create the toast element once, reuse it afterwards
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.className = 'toast';
            toastEl.setAttribute('role', 'status');
            toastEl.setAttribute('aria-live', 'polite');
            toastEl.innerHTML = `
                <span class="toast-icon">🚧</span>
                <div class="toast-body">
                    <span class="toast-title">Coming Soon!</span>
                    <span class="toast-message">I'm currently setting up this contact method. Please check back soon.</span>
                </div>`;
            document.body.appendChild(toastEl);
        }

        // Reset any running timer and restart the animation
        clearTimeout(toastTimer);
        toastEl.classList.remove('toast-visible');

        // Force reflow so the CSS transition re-triggers if already visible
        void toastEl.offsetWidth;

        toastEl.classList.add('toast-visible');

        toastTimer = setTimeout(() => {
            toastEl.classList.remove('toast-visible');
        }, 3000);
    };

    const emailBtn = document.getElementById('contact-email');
    const linkedinBtn = document.getElementById('contact-linkedin');

    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast();
        });
    }

    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast();
        });
    }
});

/* =====================================================
   Toast – standalone safety net (runs after DOM ready)
   ===================================================== */
(function () {
    function attachToastHandlers() {
        var toastEl = null;
        var toastMsgEl = null;
        var toastTimer = null;

        function showToast(message) {
            if (!toastEl) {
                toastEl = document.createElement('div');
                toastEl.className = 'toast';
                toastEl.setAttribute('role', 'status');
                toastEl.setAttribute('aria-live', 'polite');
                toastEl.innerHTML =
                    '<span class="toast-icon">\uD83D\uDEA7</span>' +
                    '<div class="toast-body">' +
                    '<span class="toast-title">Coming Soon!</span>' +
                    '<span class="toast-message"></span>' +
                    '</div>';
                document.body.appendChild(toastEl);
                toastMsgEl = toastEl.querySelector('.toast-message');
            }

            // Update message text for this specific button
            toastMsgEl.textContent = message;

            clearTimeout(toastTimer);
            toastEl.classList.remove('toast-visible');
            void toastEl.offsetWidth; // reflow to re-trigger transition
            toastEl.classList.add('toast-visible');

            toastTimer = setTimeout(function () {
                toastEl.classList.remove('toast-visible');
            }, 3000);
        }

        var buttons = [
            {
                id: 'contact-email',
                message: 'I\u2019m currently setting up this contact method. Please check back soon.'
            },
            {
                id: 'contact-linkedin',
                message: 'I\u2019m currently setting up this contact method. Please check back soon.'
            }
        ];

        buttons.forEach(function (item) {
            var btn = document.getElementById(item.id);
            if (btn) {
                // Replace node to clear any previously-attached listeners
                var clone = btn.cloneNode(true);
                btn.parentNode.replaceChild(clone, btn);
                clone.addEventListener('click', function (e) {
                    e.preventDefault();
                    var msg = this.dataset.toastMessage || item.message;
                    showToast(msg);
                });
            }
        });

        // Handle the view-project button separately so it can open a GitHub link or show a toast
        var viewProjectBtn = document.getElementById('btn-view-project');
        if (viewProjectBtn) {
            var clonedBtn = viewProjectBtn.cloneNode(true);
            viewProjectBtn.parentNode.replaceChild(clonedBtn, viewProjectBtn);
            clonedBtn.addEventListener('click', function (e) {
                e.preventDefault();
                var githubUrl = this.dataset.githubUrl;
                if (githubUrl) {
                    window.open(githubUrl, '_blank', 'noopener,noreferrer');
                } else {
                    var msg = this.dataset.toastMessage || 'The demo for this project is currently under development. Please check back soon.';
                    showToast(msg);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachToastHandlers);
    } else {
        attachToastHandlers();
    }
})();

