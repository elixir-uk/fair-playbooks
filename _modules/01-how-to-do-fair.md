---
title: "Tools and resources to create and support FAIR data"
number: 1
summary: "A hands-on tour of three resources every RDM professional should know: RDMkit for orientation, the FAIR Cookbook for a specific task and FAIRsharing for standards and repositories. Participants try each one on their own discipline, then get a quick map of more specific tools for each letter of FAIR."
estimatedMinutes:
  long: 40  # provisional – see the timing note
prerequisites: ["00-what-is-fair"]
timing_note: "Timings are provisional while the module lead confirms them. The steps follow the slide timings in the source manual. There is no short version yet; if you're short of time, shorten each exercise to two minutes and read through the tools by FAIR letter without discussion."
leadContributors: ["Munazah Andrabi"]
sources:
  - name: "RDMkit"
    url: "https://rdmkit.elixir-europe.org"
    note: "Broad orientation: how to approach RDM for a kind of data, by topic and by discipline"
  - name: "FAIR Cookbook"
    url: "https://faircookbook.elixir-europe.org"
    note: "Step-by-step recipes for specific FAIRification tasks"
  - name: "FAIRsharing"
    url: "https://fairsharing.org"
    note: "Registry of standards, databases and policies, searchable by discipline and data type"
tags: [resources, signposting, tools, hands-on]
playbook: [fairification]
audience: [rdm-peer, postdoc, researcher]
scenario: [starting-project, mid-project, training-team]
dataType: [mixed]
intent: [signpost, how-to, hands-on-exercise]
slide_title: "Tools and resources for FAIR data"
slide_subtitle: "What each one is for, and when to reach for it"
benefit: "Know which of three tools to open for which question, and where to look for anything else."
session:
  - title: "Three tools to know"
    minutes: "0–6"
    script: "Welcome. This session is a practical tour of the tools and resources that help you make data FAIR. We won't go over what FAIR means again. If you want to go back to first principles, the FAIR principles page and the 2016 paper by Wilkinson and colleagues in Scientific Data are the references. By the end you'll have tried three core tools yourselves, you'll know where to find more specific tools for whichever letter of FAIR you need help with, and you'll know where to look for anything we don't cover."
    tip: "Many tools serve more than one letter of FAIR. Say so now, so people aren't surprised when the same tool turns up twice later."
    slide:
      headline: "Three tools, one map"
      lines:
        - "RDMkit · FAIR Cookbook · FAIRsharing"
        - "Then a quick tour of tools for each letter of FAIR"
  - title: "RDMkit"
    minutes: "6–13"
    script: "RDMkit is maintained by ELIXIR, Europe's life-science data infrastructure. It's a community-maintained guide to good research data management, across the whole data lifecycle and not only FAIR. Think of it as your first stop for the question: how do I approach data management for my kind of data? It's organised both by topic and by discipline, so it helps whether or not you know your exact question. Let's try it. In pairs, find the section for your own discipline, if there is one, and search for one topic you're unsure about, such as sensitive data, data management plans or metadata. In three minutes, tell us one thing you learned."
    tip: "RDMkit doesn't cover every discipline equally. If a pair can't find their field, treat that as a useful finding, note it as a gap and move on."
    slide:
      headline: "RDMkit: where do I start?"
      lines:
        - "Find your discipline. Is it there?"
        - "Search one topic you're unsure about"
        - "rdmkit.elixir-europe.org"
      prompt: "In pairs, 3 minutes: one thing you didn't know"
  - title: "FAIR Cookbook"
    minutes: "13–20"
    script: "The FAIR Cookbook came out of FAIRplus, a European project that ran from 2019 to 2022 and developed guidelines and tools for making life-science data FAIR. Where RDMkit gives you broad orientation, the Cookbook gives you step-by-step recipes for one specific task, such as assigning identifiers or choosing a licence. The recipes are organised by FAIR principle and by task, and the two resources work well together. In pairs, find a recipe on identifiers or licensing and skim it. Is it written for a beginner, or does it assume a technical background? In three minutes, tell us one recipe you'd bookmark."
    slide:
      headline: "FAIR Cookbook: how do I do this step?"
      lines:
        - "Find a recipe on identifiers or licensing"
        - "Beginner, or technical?"
        - "faircookbook.elixir-europe.org"
      prompt: "In pairs, 3 minutes: one recipe you'd bookmark"
  - title: "FAIRsharing"
    minutes: "20–27"
    script: "FAIRsharing is a registry. You don't deposit data there. You search it to find which standards, databases and policies exist for your kind of data, by discipline, subject or data type. Being listed in FAIRsharing doesn't automatically mean a community endorses a standard, so check what you find. In pairs, search for your own data type, organism or discipline, for example single cell. Pick one result: does it list a recommended metadata standard, or a public repository? In three minutes, tell us whether you found something you didn't know existed."
    tip: "Coverage varies a lot by discipline. A well-established field such as genomics has far richer entries than a niche or emerging one. Say so if it comes up."
    slide:
      headline: "FAIRsharing: which standard applies?"
      lines:
        - "Search your data type, organism or discipline"
        - "Does it list a metadata standard? A repository?"
        - "fairsharing.org"
      prompt: "In pairs, 3 minutes: anything you didn't know existed?"
  - title: "Tools by FAIR letter"
    minutes: "27–39"
    script: "Beyond these three there are dozens of more specific tools, each most useful for one letter of FAIR. This is a quick tour; the full list is in your handout. Findable: DataCite and Crossref give identifiers to data and publications, ORCID to researchers and ROR to organisations. Same idea, different things. Accessible: prefer a discipline repository, such as GEO for expression data or ENA for sequencing, over a generalist one like Zenodo when there's a good fit, and check what your own institution offers first. Interoperable: the OBO Foundry ontologies, such as the Gene Ontology, Cell Ontology, ChEBI, UBERON, OBI and the Human Phenotype Ontology, are the standard controlled vocabularies for life-science data. Reusable: a licence chooser, guidance on file formats, and the same ontology tools again, because rich annotation helps reuse as well."
    tip: "About three minutes per letter. Let people follow on their own screens. Use the ontology tools reappearing under Reusable to show that the FAIR letters overlap."
    slide:
      headline: "More tools, by letter"
      lines:
        - "F: DataCite, Crossref, ORCID, ROR, re3data"
        - "A: discipline repositories, Zenodo, your institution's repository"
        - "I: OLS, OBO Foundry, BioPortal, Bioschemas"
        - "R: Creative Commons chooser, file-format guidance"
  - title: "Wrap-up"
    minutes: "39–42"
    cut: "Never cut."
    script: "Two things to take away. RDMkit for orientation, the FAIR Cookbook for a specific task, FAIRsharing for standards and repositories. And today was a map. Come back to these tools when you need them. Which one tool are you most likely to use in the next month?"
    tip: "Send the handout afterwards: the quick reference, the full list by FAIR letter and the other things to consider."
    slide:
      headline: "Come back when you need them"
      lines:
        - "RDMkit: orientation"
        - "FAIR Cookbook: a specific task"
        - "FAIRsharing: standards and repositories"
      prompt: "Which tool will you use in the next month?"
---

## The situation

Run this module with people who know what FAIR is but not which tools help them do it: researchers, data stewards, and trainers who will run the session themselves. They have usually come across one or two of these resources and don't know when to use which.

This module doesn't explain FAIR. If the room needs that first, run [What is FAIR?](../00-what-is-fair/). The three core tools come up again in later modules.

## The decision

Participants leave knowing which tool to open for which question, having tried each one on their own discipline, and knowing where to find more specific tools for the letter of FAIR they need help with.

## The session plan

{{ page.timing_note }}

<div class="session-slot"></div>

## Participant materials

| Material | Source | Status |
|---|---|---|
| The three core tools | [RDMkit](https://rdmkit.elixir-europe.org), [FAIR Cookbook](https://faircookbook.elixir-europe.org), [FAIRsharing](https://fairsharing.org) | **Linked**, used live in the exercises |
| Quick reference, tools by FAIR letter, other things to consider | Compiled at the BioFAIR Pathfinder Contentathon (lead: Munazah Andrabi) | **Handout**, below. Send it after the session. |

### Quick reference

| Tool | Background | Best for |
|---|---|---|
| [RDMkit](https://rdmkit.elixir-europe.org) | Maintained by ELIXIR | Broad orientation: how to approach RDM for your kind of data, by topic and discipline |
| [FAIR Cookbook](https://faircookbook.elixir-europe.org) | Grew out of the FAIRplus project (2019–2022) | A specific FAIRification task, with step-by-step recipes |
| [FAIRsharing](https://fairsharing.org) | A curated, cross-disciplinary registry | Finding data and metadata standards and repositories for your data type |

### Tools by FAIR letter

Many tools support more than one letter. Each is listed once, under its most direct use.

**Findable:** a persistent, unique identifier; rich, machine-readable metadata; registration in a searchable resource.

- Identifiers: [DataCite](https://datacite.org) (DOIs for many kinds of item), [Crossref](https://www.crossref.org) (DOIs for written outputs), [Identifiers.org](https://identifiers.org) (compact identifiers across life-science databases, part of ELIXIR), [ORCID](https://orcid.org) (researchers), [ROR](https://ror.org) (organisations), and the Digital Preservation Coalition's guidance on identifier systems.
- Finding repositories: [re3data](https://www.re3data.org), a registry of research data repositories.
- Metadata standards: the [Helmholtz Metadata Standards Catalog](https://helmholtz-metadaten.de/tools/metadata-standards-catalog), the [Data Documentation Initiative](https://ddialliance.org), the URGE tool for writing a dataset README (University of South-Eastern Norway), [bio.tools](https://bio.tools) (ELIXIR's registry of bioinformatics tools, described with the EDAM ontology) and [Bioschemas](https://bioschemas.org), which extends Schema.org with life-science types so datasets show up in Google Dataset Search.

**Accessible:** retrieval by open, standard protocols; metadata that stays open even if the data is restricted.

- Protocols: HTTPS, [OAI-PMH](https://www.openarchives.org/pmh/).
- Repositories: [Zenodo](https://zenodo.org) (general-purpose, hosted at CERN, DataCite DOIs, versioning, up to 50 GB per record), [GEO](https://www.ncbi.nlm.nih.gov/geo/) (gene expression, NCBI) and [ENA](https://www.ebi.ac.uk/ena/) (sequencing, EMBL-EBI). Check your own: <span class="repo-slot" data-profile-repo>[ your institution's repository ]</span>.
- Data management platforms: [FAIRDOMHub](https://fairdomhub.org), built on the ISA (Investigation, Study, Assay) framework for multi-omics experiments.

**Interoperable:** shared vocabularies, ontologies and formats, so data can be combined and used by different tools.

- [Ontology Lookup Service](https://www.ebi.ac.uk/ols4/), one place to search the latest biomedical ontologies.
- [OBO Foundry](https://obofoundry.org): Gene Ontology, Cell Ontology, ChEBI, UBERON, OBI and the Human Phenotype Ontology, the standard controlled vocabularies for life-science data.
- [BioPortal](https://bioportal.bioontology.org), over 1,000 biomedical ontologies, including ones outside OBO.
- [FAST](https://www.oclc.org/research/areas/data-science/fast.html), a controlled subject vocabulary; ISO 639 for languages; Bioschemas (see Findable).

**Reusable:** suitable formats, a clear licence and provenance.

- The [Creative Commons licence chooser](https://chooser-beta.creativecommons.org), which also gives you the machine-readable licence code.
- FAIR Spectra, guidance on file formats.
- The File Check Assistant from the UK Centre for Ecology and Hydrology.
- The ontology tools above, because rich standard annotation supports reuse too.

### Other things to consider

- Data management planning: [DMPonline](https://dmponline.dcc.ac.uk) (Digital Curation Centre) and the [Data Stewardship Wizard](https://ds-wizard.org).
- Packaging data with its metadata: [RO-Crate](https://www.researchobject.org/ro-crate/).
- Minimum-information checklists by domain, from the MIBBI project: MIAME, MIMARKS, MIAPPE, MIAPE and MIQAS.
- A general walkthrough: "Making your Research Data FAIR with OSF: A Practical Guide".
- Checking how FAIR a dataset is: [F-UJI](https://www.f-uji.net), and the FAIRsFAIR project's assessment tools.

## What to adapt locally

- **Your institution's repository**: <span class="repo-slot" data-profile-repo>[ your institution's preferred repository ]</span>. Mention it under Accessible.
- **Research data support**: <span class="repo-slot" data-profile-team>[ set up your institution profile ]</span>, for disciplines the three tools don't cover well.
- **Examples in the exercises**: swap "single cell" in the FAIRsharing exercise for a data type your audience works with.

Before the session, check that RDMkit, the FAIR Cookbook and FAIRsharing load on the venue's network, since institutional firewalls sometimes block them. Participants need a laptop or phone; pairs can share one. Check whether your audience's disciplines are well covered in RDMkit and FAIRsharing, so you're ready if they aren't.

## What goes wrong

**Someone's discipline isn't well covered.** Say so; coverage varies. Suggest they ask <span class="repo-slot" data-profile-team>[ research data support ]</span> for discipline-specific guidance, and mention that RDMkit and FAIRsharing both accept community contributions.

**The network blocks one of the sites.** Show it on your own screen instead of asking everyone to reach it.

**You run out of time before the tools by FAIR letter.** Read it through quickly rather than dropping it, and point to the handout.

**Someone already knows all three tools.** Ask them to help other pairs, or to find one tool in the handout that's new to them.

**The room turns it into a link list.** Keep each tool tied to a question: where do I start, how do I do this step, which standard applies.
