# Prabhav — Photography Portfolio

A static, single-page portfolio site. Dark motorsport-night theme with an amber/blue duotone, EXIF-style captions on every photo, category filters, and a lightbox.

## Files

```
portfolio/
├── index.html      the whole site (hero, gallery, about, contact)
├── styles.css       all styling
├── script.js        gallery data, lightbox, filters, dark/light toggle
├── assets/          put your real photos here
└── README.md
```

## Adding / swapping photos

Open `script.js`. Near the top there's a `photoData` array — one object per photo:

```js
{
  title: "Earthshakers",
  category: "drift",              // drift | street | portrait | lifestyle
  src: "assets/drift-earthshakers.jpg",
  location: "Drift day, VIC"       // short caption, shown on hover + in lightbox
}
```

The gallery is a true masonry layout: each photo keeps its own natural aspect ratio (no cropping, no forced squares). Landscape shots sit wide, portraits sit tall, and the columns just flow around them.

Real photos already in the site: 3 drift shots, 1 street shot, 2 portraits, 2 lifestyle shots. The remaining slots are placeholders (colour swatches with "more soon") holding space for street/portrait/lifestyle shots you haven't sent yet.

To add a real photo:
1. Drop the image file into `assets/`.
2. Either edit one of the `src: ""` placeholder entries (set `src` and `title`), or copy a whole object and add it as a new entry — no other code needs to change.
3. `ratio` (e.g. `"3/4"`) is only used by placeholder tiles so they hold a sensible shape until you replace them — real photos ignore it and size themselves from the actual file.

Note: camera/lens/settings (EXIF-style) info has been removed from both the gallery hover captions and the lightbox — photos just show a title and a location line now.

## Before you launch

- [ ] Replace `https://instagram.com/yourhandle` (appears twice: hero button + contact card) with your real handle.
- [ ] Replace `your.email@example.com` in the contact section.
- [ ] Replace the About section's placeholder headshot (`.about-portrait-placeholder` in `index.html`) with a real photo — same pattern as gallery photos, or just add an `<img>` tag inside it.
- [ ] Add real photos per the section above.
- [ ] If you want the "Portfolio PDF" contact card to work, add a PDF to `assets/` and update the `href` on `#pdfLink` in `index.html` (currently it's a placeholder alert in `script.js`).
- [ ] Update the `<title>` and meta description in `index.html` if you want a different site name than "Prabhav | Photography".

## Performance

Before uploading photos, compress them — aim for under ~300KB each at web resolution (long edge ~2000px is plenty for screen viewing). Tools: Squoosh (squoosh.app), or `Image > Export As > JPEG (quality 75-85)` in Lightroom/Photoshop.

## Hosting (free options)

**GitHub Pages**
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → set source to your main branch, root folder.
3. Site goes live at `yourusername.github.io/reponame`.

**Netlify**
1. Drag the whole `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Done — you get a live URL instantly, and can add a custom domain later under Site Settings → Domain Management.

Either way, if you buy a domain (e.g. `prabhavphotography.com`), you can point it at GitHub Pages or Netlify from your domain registrar's DNS settings — both have guides for this.

## What's already built

- Responsive grid gallery with category filters (Drift/Motorsport, Street, Portrait, Family/Lifestyle)
- Lightbox with prev/next, keyboard arrows + Esc, and an EXIF readout per photo
- Light/dark mode toggle (remembers your choice via localStorage)
- Mobile nav, reduced-motion support, keyboard focus states
- Basic SEO meta tags — update these to match your final content
