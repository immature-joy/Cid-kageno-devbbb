class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="fixed top-4 left-1/2 -translate-x-1/2 z-40
                  px-6 py-2 rounded-full glass-nav shadow-lg
                  flex items-center gap-6 text-sm">

        <a href="index.html" class="font-medium hover:text-[var(--accent-a)] transition">Home</a>
        <a href="projects.html" class="hover:text-[var(--accent-a)] transition">Projects</a>
        <a href="about.html" class="hover:text-[var(--accent-a)] transition">About</a>
        <a href="contact.html" class="hover:text-[var(--accent-a)] transition">Contact</a>
      </nav>
    `;
  }
}
customElements.define("custom-navbar", CustomNavbar);
