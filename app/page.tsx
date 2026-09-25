import Image from "next/image";
import HeroCarousel from "./hero-carousel";

const looks = [
  {
    name: "The Ivory Set",
    detail: "Clean lines. Quiet confidence.",
    location: "London, UK",
    image: "/campaign/london-ivory.webp",
    alt: "Boy in an ivory tailored tunic and trousers on a London pavement",
  },
  {
    name: "The Red Edit",
    detail: "A little colour. A lot of character.",
    location: "New York, USA",
    image: "/campaign/newyork-red.webp",
    alt: "Boy in a red collarless tunic set beside New York brownstones",
  },
  {
    name: "The Cocoa Dress",
    detail: "A new angle on occasion dressing.",
    location: "Kampala, Uganda",
    image: "/campaign/kampala-cocoa.webp",
    alt: "Girl in a cocoa and ivory geometric dress on an urban Kampala terrace",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <nav className="nav-left" aria-label="Main navigation">
          <a href="#collection">Collection</a>
          <a href="#story">Our story</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="Kids fashion site home">
          Aisha <span>😂</span>
        </a>
        <a
          className="header-contact"
          href="https://wa.me/256708581479"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main">
        <HeroCarousel>
          <div className="hero-copy">
            <p className="eyebrow">For their own kind of extraordinary</p>
            <h1 id="hero-title">
              Little people.
              <br />
              Big presence.
            </h1>
          </div>
        </HeroCarousel>

        <div className="campaign-caption">
          <p>Modern African-inspired occasionwear for children.</p>
          <p>The city is their runway.</p>
        </div>

        <section
          className="collection section-shell"
          id="collection"
          aria-labelledby="collection-title"
        >
          <div className="collection-intro">
            <p className="eyebrow">The city collection</p>
            <h2 id="collection-title">
              Dressed for the moment.
              <br />
              <em>Free to be themselves.</em>
            </h2>
            <p>
              Distinctive silhouettes, expressive colour, and little details
              with a personality all their own.
            </p>
          </div>
          <div className="look-grid">
            {looks.map((look) => (
              <article className="look" key={look.name}>
                <div className="look-image">
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                </div>
                <div className="look-title">
                  <h3>{look.name}</h3>
                  <span>{look.location}</span>
                </div>
                <p className="look-detail">{look.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="story section-shell"
          id="story"
          aria-labelledby="story-title"
        >
          <div className="story-image">
            <Image
              src="/campaign/london-story.webp"
              alt="Two children laughing together in cocoa and ivory outfits on London townhouse steps"
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">The Kids fashion site spirit</p>
            <h2 id="story-title">
              Their world.
              <br />
              <em>Their way.</em>
            </h2>
            <p>
              A family celebration. A Sunday out. A day that becomes a favourite
              memory.
            </p>
            <p>
              We love clothes with a sense of occasion and children with a sense
              of adventure. Kids fashion site brings those two worlds together.
            </p>
            <span className="story-signature">
              Small size. Big personality.
            </span>
          </div>
        </section>

        <section
          className="contact section-shell"
          id="contact"
          aria-labelledby="contact-title"
        >
          <p className="eyebrow">Something special starts here</p>
          <h2 id="contact-title">
            For their next
            <br />
            <em>big little moment.</em>
          </h2>
          <p>Have a look in mind? Let’s talk styles, sizing, and occasions.</p>
          <a
            className="contact-link"
            href="https://wa.me/256708581479?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20a%20Kori%20Mini%20look."
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a
          className="footer-wordmark"
          href="#top"
          aria-label="Kids fashion site, back to top"
        >
          Sleepy 😴
        </a>
        <div className="footer-bottom">
          <p>Little originals. Beautifully dressed.</p>
          <p>© {new Date().getFullYear()}Yeeep</p>
          <a href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </>
  );
}
