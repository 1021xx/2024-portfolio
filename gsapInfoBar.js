export class GSAPInfoBar {
  constructor({
    link = "./index.html",
    club = false,
    container = document.body,
    position = "bottom",
    text = "1021"
  }) {
    this.link = link;
    this.container = container;
    this.club = club;
    this.position = position;
    this.text = text;
    this.createInfoBar();
  }

  createInfoBar() {
    // Create the infobar container
    const aside = document.createElement("aside");
    aside.className = "gsap-infobar";

    // Apply inline styles that do not rely on CSS variables
    aside.style.position = "fixed";

    if (this.position === "bottom") {
      aside.style.bottom = "0.75rem";
    }
    if (this.position === "top") {
      aside.style.top = "0.75rem";
    }

    const style = document.createElement("style");
    style.textContent = `
       .gsap-infobar {
        position: fixed;
        left: 50%;
        z-index: 99999;
        transform: translateX(-50%);
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        font-size: 14px;
        font-family: Mori, sans-serif;
        background-color: #0e100f;
        color: var(--infobar-theme-alt);
        border: solid 2px var(--infobar-theme-highlight);
        border-radius: 99px;
        --infobar-theme: #bbbaa6;
        --infobar-theme-alt: #fffce1;
        --infobar-theme-highlight: #fffce1;
      }
      
      @media (max-height: 600px) {
        .gsap-infobar {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Add SVG and other elements
    aside.innerHTML = `
      <a href="./index.html" style="align-self: stretch; display: flex; align-items: center; justify-content: center">
      <svg class="gsap-infobar__svg" width="5rem" viewBox="0 0 704 215" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M106.718 0.500003V0.999997V76V215H31.2178V76H0.467804L31.2178 0.500003H106.718ZM259.114 62.75C259.114 51.75 250.114 42.75 238.864 42.75C227.614 42.75 218.614 51.75 218.614 62.75V153.25C218.614 164.5 227.614 173.5 238.864 173.5C250.114 173.5 259.114 164.5 259.114 153.25V62.75ZM358.614 66.25V150C358.614 186 329.364 215 293.364 215H184.364C148.364 215 119.364 186 119.364 150V66.25C119.364 30.25 148.364 0.999997 184.364 0.999997H293.364C329.364 0.999997 358.614 30.25 358.614 66.25ZM585.073 0.500003V54V67.25V67.5L437.823 146H566.073C576.573 146 585.073 154.5 585.073 165V215H371.073V167V147.25L372.823 146L520.073 67.5H437.573V93.75H371.073V67.5V19.75C371.073 9 379.573 0.500003 390.073 0.500003H585.073ZM703.886 0.500003V0.999997V76V215H628.386V76H597.636L628.386 0.500003H703.886Z" fill="white"/>
      </svg>
      </a>
    `;

    // Append the infobar to the container
    this.container.appendChild(aside);

    this.initEvents(aside);

    // Animate the infobar using GSAP
    this.animateInfoBar(aside);
  }

  initEvents(el) {
    el.addEventListener("mouseenter", () => this.hover(el, true));
    el.addEventListener("mouseleave", () => this.hover(el, false));
  }

  hover(el, isHover) {
    let color = "#abff84";

    gsap.to(el, {
      "--infobar-theme-highlight": isHover ? color : "#fffce1"
    });
  }

  animateInfoBar(el) {
    gsap.from(el, {
      autoAlpha: 0,
      yPercent: this.position === "top" ? -50 : 50,
      ease: "expo.out",
      duration: 1,
      delay: 1
    });
  }
}

// new GSAPInfoBar({
//   link: "https://gsap.com/docs/v3/Plugins/Draggable/",
//   position: "top"
// });