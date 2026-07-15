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

const fallbackPortfolioData = {
    "skills": {
        "general": ["Basic Coding"],
        "technical": [
            { "name": "Java", "level": "60%" },
            { "name": "HTML", "level": "50%" },
            { "name": "CSS", "level": "40%" },
            { "name": "JavaScript", "level": "30%" }
        ],
        "soft": ["Communication", "Problem Solving", "Critical Thinking", "Adaptability"]
    },
    "projects": [
        {
            "title": "Compro2",
            "description": "These are my files and activities i worked on Computer Programming 2 during my learning of Java.",
            "image": "assets/compro.jpg",
            "tags": ["Java", "Programming", "Activities"],
            "link": "https://github.com/Maryx23/COMPRO2"
        },
        {
            "title": "Object-Oriented Programming",
            "description": "These are the files and activities while learning Object-Oriented Programming here in Lorma.",
            "image": "assets/oop.png",
            "tags": ["Java", "OOP", "Lorma Colleges"],
            "link": "https://github.com/Maryx23/oop-2026"
        },
        {
            "title": "Web Development",
            "description": "These are my files in Web development while learning about it.",
            "image": "assets/webdev.png",
            "tags": ["HTML", "CSS", "JavaScript", "Web Dev"],
            "link": "https://github.com/Maryx23/webdev1"
        }
    ],
    "educationExperience": [
        {
            "role": "Bachelor of Science in Information Technology",
            "organization": "Lorma Colleges - San Juan",
            "period": "2026 - Present",
            "description": "First year student currently enrolled in BSIT."
        },
        {
            "role": "Orientation on Work Immersion",
            "organization": "Speaker/s: Ms. Jessyree J. Tano / Mr. Joevan Ballesteros",
            "period": "January 24, 2025",
            "description": "Seminar and Workshop Entry"
        },
        {
            "role": "Career Guidance Program",
            "organization": "Sponsors: Guidance Counseling Office",
            "period": "January 22, 2025",
            "description": "Seminar and Workshop Entry"
        },
        {
            "role": "Senior High School (STEM)",
            "organization": "Lorma Colleges - Urbiztondo, San Juan, La Union",
            "period": "2023 - 2025",
            "description": "GWA: 90% | Studied under Science, Technology, Engineering, and Mathematics (STEM)"
        },
        {
            "role": "Junior High School",
            "organization": "Lorma Colleges - Urbiztondo, San Juan, La Union",
            "period": "2018 - 2023",
            "description": "GWA: 88%"
        },
        {
            "role": "Elementary Education",
            "organization": "Lorma Colleges - Urbiztondo, San Juan, La Union",
            "period": "2012 - 2018",
            "description": "GWA: 87%"
        }
    ]
};

fetch('data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response error');
        }
        return response.json();
    })
    .then(data => {
        populateSkills(data.skills);
        populateProjects(data.projects);
        populateTimeline(data.educationExperience);
    })
    .catch(error => {
        populateSkills(fallbackPortfolioData.skills);
        populateProjects(fallbackPortfolioData.projects);
        populateTimeline(fallbackPortfolioData.educationExperience);
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
            const imagePath = proj.image.startsWith('assets/') ? proj.image : `assets/${proj.image}`;
            return `
                <article class="project-card">
                    <div class="project-img-wrapper">
                        <img src="${imagePath}" alt="${proj.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" loading="lazy">
                        <div class="img-fallback" style="display:none; width:100%; height:100%; background:#e2e8f0; align-items:center; justify-content:center; color:#64748b; font-size:0.9rem;">💻 No Image found</div>
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