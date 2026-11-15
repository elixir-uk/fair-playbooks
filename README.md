# FAIR-in-action Playbook

Ready-to-use FAIR activities for the people who support researchers: pick a session, adapt it to your institution, and run it. Built by the **ELIXIR-UK RDM Club**, commissioned by **BioFAIR** as part of the Pathfinder project *The FAIR-in-action Bridge*.

Live site: <https://elixir-uk.github.io/fair-playbooks/>

The site is a static [Jekyll](https://jekyllrb.com) site. There is no Node or npm build: `package.json` does not exist on purpose.

---

## Run it locally

You need Ruby 3.x and Bundler (`gem install bundler`).

```sh
git clone https://github.com/elixir-uk/fair-playbooks.git
cd fair-playbooks
bundle install                 # once
bundle exec jekyll serve       # http://localhost:4000, rebuilds when you save
```

Build without serving: `bundle exec jekyll build` (output in `_site/`).

---

## Add your institution's branding to your copy

Everyone can set up their institution in the browser at `/branding/`: name, contacts, repositories, colours and logo. That profile is saved in the browser and can be exported as a JSON file to share with a team (**Import profile** is at the top of the set-up page).

If you run your own copy of the site (a fork or a local clone), you can build that profile in, so every visitor sees it without setting anything up:

1. On `/branding/`, set up your institution and press **Export profile**.
2. Save the downloaded file as **`_data/profile.json`** in your copy.
3. Rebuild. Every page now uses that profile by default. A profile someone saves in their own browser still takes priority.

---

## How a module works: one source, many outputs

Each module is one Markdown file in `_modules/`. Its `session:` list in the front matter drives everything:

| Output | Where | Made by |
| --- | --- | --- |
| Module page with the session as a level, step-by-step script and plan table | `/modules/<id>/` | [`_layouts/module.html`](_layouts/module.html) |
| Live slides (press S for the script) | `/present/<id>/` | [`_layouts/present.html`](_layouts/present.html) + reveal.js |
| PowerPoint (`.pptx`, also the way to get a PDF) and facilitator guide (`.docx`) | download buttons on the module page | [`assets/js/decks.js`](assets/js/decks.js), in the browser, with the visitor's institution profile |
| Promo poster (slide, square, A4) | `/promo/` | [`assets/js/promo.js`](assets/js/promo.js) |
| Certificates of attendance | `/certificate/` | [`assets/js/certificate.js`](assets/js/certificate.js) |

Edit the `session:` once and they all update. A module without a `session:` has a page but no slides or downloads yet.

### A `session:` step

```yaml
session:
  - title: "Triage: quick wins vs deeper retrofit"
    minutes: "23–28"          # cumulative range; the page shows the duration (5 min)
    short: 5                  # minutes in the short version (0 = take-home)
    cut: "Never cut."         # "Never cut." marks a checkpoint
    principles: ["F1", "R1.1"] # facilitator reference only, never on slides
    script: "..."             # what the facilitator says (slide notes + guide)
    tip: "..."                # facilitator tip
    slide:
      headline: "Minutes, or days?"
      lines: ["..."]
      prompt: "Start with the minutes"
      poll: { question: "...", options: ["...", "..."] }
      image: { src: "/assets/...", alt: "...", credit: "..." }
```

[`_modules/04-late-to-the-party.md`](_modules/04-late-to-the-party.md) is the reference module: copy its shape.

---

## Look and feel

- **Styles:** one stylesheet, [`assets/css/site.css`](assets/css/site.css). Read the note at the top first: every colour, size, radius and shadow is a token, and shared components (labels, buttons, pills, cards) are grouped so you add a class to a list rather than writing a new rule.
- **Brand:** ELIXIR-UK navy `#023452` and orange `#F47D20`, Lato, plus the pixel font Press Start 2P for short labels and numbers. An institution profile swaps the dark and accent colours everywhere.
- **Pixel art (original, CC BY):** characters in [`assets/js/pixel-people.js`](assets/js/pixel-people.js) and icons in [`assets/js/pixel-icons.js`](assets/js/pixel-icons.js), each drawn as editable text grids.
- **Game touches:** the module level map, journeys as world maps, quest results, the present-mode extras and the cheat code ([`assets/js/cheat.js`](assets/js/cheat.js)).

---

## Project structure

```text
_modules/        modules (Markdown + session: front matter)
_activities/     games (LEGO metadata, spot the mess, …)
_journeys/       ready-made paths through modules
_layouts/        page templates (module, journey, activity, present, default)
_includes/       header, footer, module data for downloads
_data/           optional profile.json (see "Add your institution's branding")
assets/css/      site.css
assets/js/       profile, downloads, recommender, promo, certificates, pixel art
assets/fonts/    Lato + Press Start 2P (OFL), used to draw downloadable posters
assets/vendor/   pptxgenjs and docx (MIT), for the browser-made downloads
index.html, recommend.html, branding.html, promo.html, certificate.html, 404.html
scripts/         older offline generators from the Astro version (not used by the site)
```

---

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it builds with Jekyll (`--baseurl /fair-playbooks`) and publishes to GitHub Pages. If you move to a custom domain, change `url` in [`_config.yml`](_config.yml) and drop `--baseurl` in the workflow.

---

## Licence

The site, slides and guides state CC BY 4.0 for the playbook's own content. Reused material keeps its own licence and is credited where it's used (each module's "Built from" list, and the credits slide in the downloads). Fonts: SIL Open Font License. Vendored libraries: MIT (licences alongside them in `assets/vendor/`).

**To do:** the repository has no `LICENSE` file yet. Add one (CC BY 4.0 for content; a code licence such as MIT if wanted) before others fork it.
