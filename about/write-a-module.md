---
layout: about
title: Write a module
heading: How to write a module
intro: "Everything a module needs lives in one text file. This page lists what you can put in it and what each part turns into: the module page, the live slides, the PowerPoint and the facilitator guide."
description: The module format for the FAIR-in-action Playbook – every field, every kind of slide, and the house style.
permalink: /about/write-a-module/
toc: true
---

<nav class="page-toc" aria-label="On this page" markdown="1">
<p class="page-toc-label">On this page</p>

* TOC
{:toc}

</nav>
<!--toc-end-->

## How it works

Each module is one file in the `_modules` folder of the [GitHub repository](https://github.com/elixir-uk/fair-playbooks), for example `_modules/03-no-standards.md`. The file has two parts:

1. **The front matter**, between the two `---` lines at the top. It holds the module's details and its session, step by step. The session drives everything people see: the level map and plan table on the module page, the live slides, the PowerPoint and the Word facilitator guide. Change a step once and all four update.
2. **The page text**, below the second `---`. This is the facilitator's background: the situation, the decision, materials, what to adapt and what goes wrong.

The easiest way to start is to copy an existing module and change it. [Late to the party](../../modules/04-late-to-the-party/) (`_modules/04-late-to-the-party.md`) is the reference for the page text, and [When there is no community standard or repository](../../modules/03-no-standards/) (`_modules/03-no-standards.md`) shows every kind of slide.

The front matter is written in YAML. Three rules avoid most mistakes: indent with spaces (never tabs), keep the indentation exactly as in the examples, and put text in double quotes. If your text contains a double quote, use single quotes inside it or write `\"`.

## Module details

```yaml
title: "When there is no community standard or repository"
number: 3
summary: "Two or three sentences on what the module does, for the module list and the session builder."
slide_title: "Build a FAIR spreadsheet"
slide_subtitle: "For data with no dedicated repository"
benefit: "One sentence on what participants get out of it."
estimatedMinutes:
  long: 60
  short: 44
timing_note: "Shown under the session plan, e.g. what to keep if short of time."
sources:
  - name: "Data Carpentry – Spreadsheets for ecologists"
    url: "https://datacarpentry.github.io/spreadsheet-ecology-lesson/"
    note: "What you reused from it"
audience: [researcher, phd-student, postdoc, rdm-peer]
scenario: [starting-project, mid-project]
dataType: [spreadsheet, mixed]
intent: [how-to, hands-on-exercise]
playbook: [fairification]
```

| Field | What it does |
|---|---|
| `title`, `number` | The module's name and number. The number sets the order and appears as "Module 03" and "Level 03". |
| `summary` | Shown in the module list and in the session builder's suggestions. |
| `certificate` | What the certificate of attendance says people took part in, e.g. "Making existing research data FAIR". Write it as a topic, not the module's title. If you leave it out, the certificate uses the title. |
| `slide_title`, `slide_subtitle` | The title slide. If you leave them out, the title slide uses `title`. |
| `benefit` | "What's in it for you" on the title slide, the module page and the downloads. Write it for participants. |
| `hook` | Optional. "Why they'll care" on the module page. |
| `estimatedMinutes` | `long` is the full session. Add `short` only if there is a shorter version; the page then offers a Full and Short switch. |
| `timing_note` | Text you can place under the session plan with `{% raw %}{{ page.timing_note }}{% endraw %}`. |
| `sources` | Everything the module is built from. Shown as "Built from" on the page and on the closing "Credits and licence" slide. |
| `audience`, `scenario`, `dataType`, `intent` | How the session builder matches the module to someone's answers. Use only the values below. |
| `playbook` | `fairification` or `communicate-advocate`. |
| `isSideRoom` | `true` for a side-room module: it gets a side-room icon instead of a number. |
| `status` | Leave it out when the module has a full session people can run. `in-progress` (being written) or `outline` (notes only, not planned as a full session) adds a label on its card, page and journeys, and keeps it out of Build a session, the promo kit and certificates. The labels and explanations are in `_data/statuses.yml`. |
| `variant` | Only when a module exists in two versions side by side, e.g. `"A · as submitted"` and `"B · playbook"`. Shown as a label on both. Add `in_builder: false` to the version that shouldn't be suggested in Build a session. |

Values the session builder understands. Each one is a button in [Build a session](../../recommend/):

{% for ax in site.data.choices %}- **{{ ax[0] }}:** {% for c in ax[1] %}`{{ c.value }}` ({{ c.short }}){% unless forloop.last %}, {% endunless %}{% endfor %}
{% endfor %}
### Adding a new audience, scenario, data type or intent

All the choices are listed in one file, `_data/choices.yml`. To add one:

1. Add a line under the right question, for example under `dataType:`

   ```yaml
   - { value: metabolomics, label: "Metabolomics", short: "metabolomics" }
   ```

   `value` is what you'll write in module files (lowercase, hyphens, no spaces). `label` is the button text in Build a session. `short` is how it reads in the "why this matches" sentence.
2. Tag the modules it applies to, for example `dataType: [metabolomics, mixed]`. A choice no module uses can be picked but never matches anything, so add both together.
3. For a new audience, add `person:` with one of the pixel characters if one fits (`phd-student`, `postdoc`, `pi`, `decision-maker`, `rdm-peer`, `researcher`). Leave it out if none fits: the button just has no picture. A new character needs drawing in `assets/js/pixel-people.js`.

The list on this page and the buttons in Build a session both update from that file. To rename a value, change it in `_data/choices.yml` and in every module that uses it.

## Steps and slides

A module's session is made of **steps**, and each step shows one or more **slides**.

- **A step** is a chunk of the session's time that the facilitator runs: "What can you do with this data?, 10 minutes". It's one block on the level map and one row in the plan table, and it holds the facilitator's script and tip.
- **A slide** is what's on the projector. While a step runs, the room sees its slides in order. A short step may need one slide; a step that explains several things, or has an exercise and its answers, needs more.

Here is how that works out in [module 03](../../modules/03-no-standards/):

| Step | Time | Slides the room sees, in order |
|---|---|---|
| 1. Why spreadsheets need attention | 5 min | Why spreadsheets need special attention |
| 3. What can you do with this data? | 10 min | The messy table with a "Your turn" box · What's wrong with it (the answers) |
| 5. Fix the table | 8 min | Fix the table · One way to fix it |
| 6. Build it FAIR from the start | 12 min | Build FAIR from the beginning · Three kinds of metadata · The data dictionary is essential · Write the data dictionary · Example entries · Document every transformation · Make it findable |

So you write the session in two layers: first the steps (what happens, for how long, what the facilitator says), then, inside each step, the slides (what people look at).

## Session steps

The session is a list of steps under `session:`. Each step becomes one block on the level map, one row in the plan table, and one or more slides.

```yaml
session:
  - title: "Read the metadata"
    minutes: "25–35"
    short: 6
    checkpoint: true
    cut: "Skip the hands-on part and talk through one row together."
    script: "What the facilitator says. Goes into the speaker notes and the guide."
    tip: "Advice for the facilitator. Also in the notes and the guide."
    principles: ["F2", "R1.3"]
    slides:
      - headline: "Could you reuse this?"
        # ... see "Slides" below
```

| Field | What it does |
|---|---|
| `title` | The step's name on the module page and in the plan. |
| `minutes` | Where the step sits in the session, as a range with an en dash: `"25–35"`. The page works out the length (10 min). Steps should follow on from each other. |
| `short` | Minutes in the short version. Leave it out if the step stays the same length. `0` means it becomes take-home. |
| `checkpoint` | `true` means never drop this step: it's where the session's main point happens. It gets a flag on the level map and "Never cut." in the plan. |
| `optional` | `true` means the whole step can be skipped or set as take-home. It's a dashed block on the level map. |
| `cut` | A note on how to shorten this step if you're short of time, shown in the plan's "If you need to cut" column. The step still runs. |
| `script`, `tip` | For the facilitator. They go into the speaker notes (press S in the live slides) and the Word guide. Use `…` to mark a pause while people work. |
| `principles` | FAIR principles the step covers. For the facilitator only; they never appear on a slide. |
| `slides` | What the room sees: a list of slides, described below. |

`checkpoint`, `optional` and `cut` answer different questions. Checkpoint: can this step be dropped? Never. Optional: can this step be dropped? Yes. Cut: how do I make this step shorter? A step can be a checkpoint and still have a cut note, for example `checkpoint: true` with `cut: "If short of time, fix two columns instead of the whole table."`

This is how they look on the module page, from [module 02](../../modules/02-public-repos/): steps 4 and 6 are checkpoints (flags), step 7 is optional (dashed), and the last column holds the cut notes.

![The level map and plan table of module 02: seven steps as blocks, flags over steps 4 and 6, step 7 dashed, and a table with each step's time and cut note](../../assets/images/guide/page-level-map.jpg)

## Slides

Every step has a `slides:` list. Each item in the list is one slide, in order. Most steps need one:

```yaml
slides:
  - headline: "Could you reuse this?"
    lines:
      - "Open the SDRF file"
```

Add more items for more slides in the same step:

```yaml
slides:
  - headline: "Fix the table"
    table: { ... }
    task: { ... }
  - headline: "One way to fix it"
    table: { ... }
```

The step's `script` and `tip` go into the notes of its first slide. To add notes to a later slide, give that slide `notes: "..."`. (Older modules use `slide:` for a single slide without the list. That still works, but use `slides:` for anything new.)

A slide is built from blocks. Use the ones you need and leave the rest out. Each block below shows a real slide from the playbook.

### Headline, lines, prompt and image

```yaml
- headline: "Know what you've got"
  lines:
    - "What metadata already exists?"
    - "Who can still explain it?"
    - "Open, or just FAIR?"
  prompt: "Answer for your own dataset"
  image:
    src: "/assets/images/nfdi4bioimage/datasets-anonymous.jpg"
    alt: "What the image shows, for people who can't see it"
    credit: "Title, author, year, link, licence"
```

![Slide with the headline "Know what you've got", three short lines, a dark prompt pill and a cartoon on the right](../../assets/images/guide/slide-lines.jpg)

`headline` is the slide title; without one, the step title is used. `intro` (not shown) adds a short grey line under it. `lines` are bullet points: keep to four or fewer, and short. `prompt` is a question or instruction for the room. An `image` sits on the right; put image files in `assets/images/`, and always give `alt` text and a `credit` for anything you didn't make.

### Your turn: an activity

```yaml
- headline: "Write the data dictionary"
  intro: "Use your fixed table from step 5."
  task:
    who: "In pairs"
    minutes: 4
    steps:
      - "Write the dictionary entry for three columns"
      - "For each: type, unit, description, allowed values, missing-value code"
      - "List the changes you made. That's your provenance record."
    then: "One pair reads out their treatment entry"
```

![Slide with a "Your turn · In pairs" box, a 4:00 timer, three numbered steps and a "Then" line](../../assets/images/guide/slide-task.jpg)

Use a task whenever people are meant to do something, so the room always knows what, with whom and for how long. `minutes` adds the countdown timer: click it or press T to start and pause, and it flashes at zero.

### Hands-up poll

```yaml
- headline: "Which route is yours?"
  poll:
    question: "Where does most of your data come from?"
    options: ["Equipment", "Survey tools", "Data-collection software", "Manual entry", "Existing data", "Lab notebooks"]
```

![Slide with a poll question and six numbered options, each with an empty bar and a count of 0](../../assets/images/guide/slide-poll.jpg)

Ask for hands, then click each option or press its number to count; the bars fill as you go. Shift-click or right-click takes one away. Up to nine options. A slide has a poll or a task, not both.

### Table

```yaml
- headline: "Going public when there's no dedicated repository"
  table:
    head: ["Consideration", "What to do"]
    rows:
      - ["Where to host it", "Ask your institution's data lead."]
      - ["Anonymisation", "Anonymise before publishing."]
  prompt: "Do you know where your data would go? Hands up if you do."
```

![Slide with a two-column table of four considerations and what to do, and a prompt underneath](../../assets/images/guide/slide-table.jpg)

Keep to about six rows. Add `credit: "..."` under the table for its source, and `mono: true` to show raw data in a typewriter font, as in the exercise below.

### Cards

```yaml
- headline: "Before you move on: four rules"
  numbered: true
  cards:
    - title: "Understand your source"
      text: "Different sources have different issues."
    - title: "Always keep the original"
      text: "Keep an unaltered copy of the source data."
```

![Slide with four numbered cards side by side, each with a bold title and a short explanation](../../assets/images/guide/slide-cards.jpg)

Two to four cards sit side by side; five or six go in two rows. `numbered: true` adds the orange numbers. Instead of `text`, a card can have a list of `items`:

```yaml
cards:
  - title: "Do"
    items: ["Use the first row as the header", "Keep one table per sheet"]
  - title: "Don't"
    items: ["Use colour to carry information", "Merge header cells"]
```

![Slide with two cards titled Do and Don't, each with a bulleted list](../../assets/images/guide/slide-cards-items.jpg)

### An exercise with answers

Blocks combine. This exercise puts a raw-data table above a task:

```yaml
- headline: "What can you do with this data?"
  table:
    mono: true
    head: ["File Name", "Imaging Modality", "Organism"]
    rows:
      - ["image_1.tif", "Confocal", "fly"]
    credit: "Source: EuroBioimaging training material"
  task:
    who: "In pairs"
    minutes: 5
    steps: ["List every problem that would stop someone else reusing this table"]
    then: "Each pair shares one problem nobody else has said yet"
  answers:
    headline: "What's wrong with it"
    lines:
      - "Organism: scientific and common names mixed"
    prompt: "None of these fixes needs special software. They're conventions."
```

![Slide with a raw-data table in a typewriter font and a "Your turn" box with a 5:00 timer below it](../../assets/images/guide/slide-exercise.jpg)

`answers` adds the next slide automatically, so you can reveal it when people are done:

![Answers slide headed "What's wrong with it" with one line per problem and a prompt at the bottom](../../assets/images/guide/slide-answers.jpg)

If the answer is better shown as a table, use a second slide in the list with a `table` instead.

### What fits on a slide

The slides are for a projector, not a handout. As a rule of thumb, one slide holds one of these:

- a headline and up to four short lines, with a prompt, a poll or an image
- a table of up to six rows, with a task, a prompt or a couple of lines under it
- two to four cards, with a prompt or a task under them

If you need more, add a slide. Long lists belong in the page text, as a handout.

## The page text

Below the front matter, use these sections, in this order:

1. **The situation:** who the module is for and what they're facing.
2. **The decision:** what participants leave having decided or done.
3. **The session plan:** put `<div class="session-slot"></div>` here. The level map, plan table and step-by-step script appear in its place.
4. **Participant materials:** a table of everything used, with its source and status: **Reused** (used unchanged, credited), **Linked** (participants follow the link), **Handout** (on this page), or **Declared gap** (written for this playbook because nothing suitable existed).
5. **What to adapt locally.**
6. **What goes wrong.**
7. **FAIR mapping**, for the facilitator only, inside `<details markdown="1">` so it's folded away.

Lines that fill in from the institution profile:

```html
<span class="repo-slot" data-profile-repo>[ your institution's preferred repository ]</span>
<span class="repo-slot" data-profile-team>[ research data support ]</span>
<span class="repo-slot" data-profile-help="dmp">[ DMP advice ]</span>
```

`data-profile-help` takes `repository`, `dmp`, `ethics`, `licensing`, `it` or `training`. The text in brackets shows until someone sets up their institution.

## Live slides and downloads

You don't need to do anything. As soon as a module has a `session:`, the site builds three things from it:

- **Live slides**: a presentation that runs in the browser, at `/present/<module-id>/`. Facilitators open it with "Present live" on the module page. It has the speaker notes (press S), the polls and the timers.
- **A PowerPoint** and **a Word facilitator guide**, from the download buttons on the module page, with the facilitator's own institution branding.

A module without a `session:` still gets its page, with a "No slides yet" note.

## Games

Games live in `_activities`. Their details are simpler: `title`, `summary`, `barrier` (the objection it answers), `audience_label`, `group_size`, `time`, `prep`, `materials`, `drop_in` (how it works as a foyer stand), `source`, `source_url` and `licence`. Give a game `audience`, `scenario`, `dataType` and `intent` too, with the same values as modules, and Build a session will suggest it as a game to open with. Printable sheets go in `<div class="print-sheet">` blocks at the end; add `stand-sign` to the class for a large stand sign. "Print the handouts" prints only those sheets.

## House style

- British spelling: colour, organise, licence (noun), programme.
- Spaced en dashes ( – ) where you need a dash, never em dashes. Unspaced en dashes for ranges: 10–15.
- No italics and no emoji. Use bold only as a short label at the start of a line.
- Write plainly. Say what something is rather than what it isn't, and avoid "it's not X, it's Y".
- Reuse before you write. Link to or reuse existing open material and credit it in `sources`. If you write something new, say so ("written for this playbook") and list it as a declared gap.
- FAIR principle codes belong in `principles` and the FAIR mapping, not on slides. Use them on a slide only when the room is using them as a tool.

## Check your work

Run the site on your computer (see the [README](https://github.com/elixir-uk/fair-playbooks#readme)) and look at three things: the module page (level map, plan table, "On the slide" previews), the live slides (open "Present live", press → through every slide, and S for the notes), and both downloads. If the page doesn't build, the cause is almost always indentation or a missing quote in the front matter.
