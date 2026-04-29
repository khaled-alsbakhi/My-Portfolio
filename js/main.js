// Typed effect
const titles = ["Frontend Developer", "Web Designer", "Problem Solver"];
const el = document.getElementById("typed");

// دالة مساعدة لعمل "توقف مؤقت" (Promise-based sleep)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startTypingEffect() {
  let ti = 0;
  while (true) {
    let word = titles[ti];
    for (let i = 0; i <= word.length; i++) {
      el.textContent = word.slice(0, i);
      await wait(100);
    }
    await wait(2000);
    for (let i = word.length; i >= 0; i--) {
      el.textContent = word.slice(0, i);
      await wait(50);
    }
    ti = (ti + 1) % titles.length;
    await wait(500);
  }
}

startTypingEffect();

// Scroll reveal
const options = {
  threshold: 0.15,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, options);
const elementsToWatch = document.querySelectorAll(".reveal, .skill-card");
elementsToWatch.forEach((el) => observer.observe(el));

// Skill bars animation
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector(".skill-bar-fill");
        if (fill) {
          const w = fill.style.getPropertyValue("--w");
          fill.style.width = w;
          fill.style.transform = "scaleX(1)";
        }
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 },
);

document.querySelectorAll(".skill-card").forEach((el) => barObs.observe(el));

//Increase counter on scroll
let nums = document.querySelectorAll(".stat .stat-num");
let section = document.querySelector(".stat-row");
let statStarted = false; //function started ? No

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop) {
    if (!statStarted) {
      nums.forEach((num) => startCount(num));
    }
    statStarted = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let showPlus = el.dataset.plus;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
      if (showPlus === "true") {
        el.textContent = "+" + el.textContent;
      }
    }
  }, 1000 / goal);
}

// Active nav
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let cur = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) cur = s.id;
  });
  document.querySelectorAll("nav a").forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + cur ? "var(--text)" : "";
  });
});
