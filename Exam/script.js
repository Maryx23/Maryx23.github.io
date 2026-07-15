var navToggle = document.querySelector('.nav-toggle');
var nav = document.querySelector('.nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

var navLinks = document.querySelectorAll('.nav-link');
for (var k = 0; k < navLinks.length; k++) {
    navLinks[k].addEventListener('click', function () {
        if (navToggle && nav) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

var contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });
}

document.getElementById('current-year').textContent = new Date().getFullYear();

fetch('data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        populateSkills(data.skills);
        populateProjects(data.projects);
        populateTimeline(data.educationExperience);
    })
    .catch(function (error) {
        console.error('Error fetching data:', error);
    });

function populateSkills(skills) {
    var generalContainer = document.getElementById('general-skills-container');
    if (generalContainer && skills.general) {
        generalContainer.innerHTML = '';
        for (var x = 0; x < skills.general.length; x++) {
            var genSkillName = skills.general[x];
            var genPill = document.createElement('span');
            genPill.className = 'tag-pill';
            genPill.textContent = genSkillName;
            generalContainer.appendChild(genPill);
        }
    }

    var techContainer = document.getElementById('tech-skills-container');
    if (techContainer && skills.technical) {
        techContainer.innerHTML = '';
        for (var i = 0; i < skills.technical.length; i++) {
            var skill = skills.technical[i];

            var skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            var skillInfo = document.createElement('div');
            skillInfo.className = 'skill-info';

            var nameSpan = document.createElement('span');
            nameSpan.textContent = skill.name;

            var percentSpan = document.createElement('span');
            percentSpan.textContent = skill.level;

            skillInfo.appendChild(nameSpan);
            skillInfo.appendChild(percentSpan);

            var barBg = document.createElement('div');
            barBg.className = 'progress-bar-bg';

            var barFill = document.createElement('div');
            barFill.className = 'progress-bar-fill';
            barFill.style.width = skill.level;

            barBg.appendChild(barFill);
            skillItem.appendChild(skillInfo);
            skillItem.appendChild(barBg);
            techContainer.appendChild(skillItem);
        }
    }

    var softContainer = document.getElementById('soft-skills-container');
    if (softContainer && skills.soft) {
        softContainer.innerHTML = '';
        for (var j = 0; j < skills.soft.length; j++) {
            var skillName = skills.soft[j];
            var pill = document.createElement('span');
            pill.className = 'tag-pill';
            pill.textContent = skillName;
            softContainer.appendChild(pill);
        }
    }
}

function populateProjects(projects) {
    var grid = document.getElementById('projects-grid');
    if (grid) {
        grid.innerHTML = '';
        for (var i = 0; i < projects.length; i++) {
            var proj = projects[i];
            var tagsHtml = '';
            for (var tg = 0; tg < proj.tags.length; tg++) {
                tagsHtml += '<span class="project-tag">' + proj.tags[tg] + '</span>';
            }
            grid.innerHTML += '<article class="project-card">' +
                '<div class="project-img-wrapper"><img src="' + proj.image + '" alt="' + proj.title + '"></div>' +
                '<div class="project-details">' +
                '<h3>' + proj.title + '</h3>' +
                '<p>' + proj.description + '</p>' +
                '<div class="project-tags">' + tagsHtml + '</div>' +
                '<a href="' + proj.link + '" class="project-link" target="_blank">View Project</a>' +
                '</div>' +
                '</article>';
        }
    }
}

function populateTimeline(entries) {
    var container = document.getElementById('timeline-container');
    if (container) {
        container.innerHTML = '';
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            container.innerHTML += '<div class="timeline-item">' +
                '<div class="timeline-date">' + entry.period + '</div>' +
                '<div class="timeline-content">' +
                '<h3>' + entry.role + '</h3>' +
                '<div class="timeline-org">' + entry.organization + '</div>' +
                '<p class="timeline-desc">' + entry.description + '</p>' +
                '</div>' +
                '</div>';
        }
    }
}