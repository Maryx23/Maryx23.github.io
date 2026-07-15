const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
        const isActive = navToggle.classList.toggle('active');
        nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
    });
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (navToggle && nav) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Prevent duplicating success message on multiple clicks
        const existingMessage = contactForm.querySelector('.form-feedback');
        if (existingMessage) {
            existingMessage.remove();
        }

        const successMessage = document.createElement('div');
        successMessage.className = 'form-feedback';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.appendChild(successMessage);

        contactForm.reset();
    });
}

document.getElementById('current-year').textContent = new Date().getFullYear();

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        populateSkills(data.skills);
        populateProjects(data.projects);
        populateTimeline(data.educationExperience);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function populateSkills(skills) {
    const generalContainer = document.getElementById('general-skills-container');
    if (generalContainer && skills.general) {
        generalContainer.innerHTML = skills.general.map(skill => 
            `<span class="tag-pill">${skill}</span>`
        ).join('');
    }

    const techContainer = document.getElementById('tech-skills-container');
    if (techContainer && skills.technical) {
        techContainer.innerHTML = skills.technical.map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <span>${skill.name}</span>
                    <span>${skill.level}</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${skill.level}"></div>
                </div>
            </div>
        `).join('');
    }

    const softContainer = document.getElementById('soft-skills-container');
    if (softContainer && skills.soft) {
        softContainer.innerHTML = skills.soft.map(skill => 
            `<span class="tag-pill">${skill}</span>`
        ).join('');
    }
}

function populateProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (grid) {
        grid.innerHTML = projects.map(proj => {
            const tagsHtml = proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            return `
                <article class="project-card">
                    <div class="project-img-wrapper">
                        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                    </div>
                    <div class="project-details">
                        <h3>${proj.title}</h3>
                        <p>${proj.description}</p>
                        <div class="project-tags">${tagsHtml}</div>
                        <a href="${proj.link}" class="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                </article>
            `;
        }).join('');
    }
}

function populateTimeline(entries) {
    const container = document.getElementById('timeline-container');
    if (container) {
        container.innerHTML = entries.map(entry => `
            <div class="timeline-item">
                <div class="timeline-date">${entry.period}</div>
                <div class="timeline-content">
                    <h3>${entry.role}</h3>
                    <div class="timeline-org">${entry.organization}</div>
                    <p class="timeline-desc">${entry.description}</p>
                </div>
            </div>
        `).join('');
    }
}