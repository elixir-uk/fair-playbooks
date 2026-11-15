---
title: "When a public repository solves most of the problem"
number: 2
summary: "For many life-science data types (sequencing, proteomics, structures), depositing in a community repository takes care of much of FAIR. Using a real RNA-seq dataset in ArrayExpress, participants see what the repository does for them and what they still have to provide themselves: rich metadata, shared vocabulary, a licence and provenance."
estimatedMinutes:
  long: 45  # provisional – see "Timings to confirm" below
prerequisites: ["00-what-is-fair"]
timing_note: "Timings are provisional while the module lead confirms them. The steps follow the section times in the source guide. There is no short version yet."
sources:
  - name: "Galaxy Training Network – FAIRification of an RNAseq dataset"
    url: "https://training.galaxyproject.org/training-material/topics/fair/tutorials/fair-rna/tutorial.html"
    note: "The tutorial this module is built from. It covers all 15 FAIR principles; this session uses seven."
  - name: "EMBL-EBI ArrayExpress – E-MTAB-8316"
    url: "https://www.ebi.ac.uk/biostudies/arrayexpress/studies/E-MTAB-8316"
    note: "The worked example: bulk RNA-seq from Alivernini et al. (2020), Nature Medicine"
  - name: "Alivernini et al. (2020), Nature Medicine"
    url: "https://doi.org/10.1038/s41591-020-0939-8"
    note: "The paper participants search for the accession in exercise 1"
  - name: "Ontology Lookup Service (OLS)"
    url: "https://www.ebi.ac.uk/ols4/"
    note: "Used in exercise 2 to look up an ontology term"
  - name: "MAGE-TAB specification"
    url: "https://www.fged.org/projects/mage-tab/"
    note: "The metadata format ArrayExpress uses (IDF and SDRF files)"
  - name: "FAIR Pointers"
    url: "https://elixir-uk.github.io/FAIR-Pointers/"
    note: "Overview of the FAIR principles to point participants to"
  - name: "GO FAIR – FAIR principles"
    url: "https://www.go-fair.org/fair-principles/"
    note: "The principles with practical examples"
  - name: "FAIRsharing"
    url: "https://fairsharing.org"
    note: "Finding the community repository and standards for other data types"
tags: [repositories, sequencing, metadata, ontologies]
playbook: [fairification]
audience: [researcher, postdoc, phd-student, rdm-peer]
scenario: [mid-project, ending-project]
dataType: [sequencing, proteomics]
intent: [how-to, hands-on-exercise]
slide_title: "Let the repository do the heavy lifting"
slide_subtitle: "What it does for you, and what it can't"
benefit: "See what a public repository does for your data automatically, and what only you can add."
session:
  - title: "What a repository can and can't do"
    minutes: "0–10"
    principles: ["F", "A", "I", "R"]
    script: "Welcome. Today we'll look at a real, published dataset and see how FAIR works in practice: actual files, accession numbers and metadata. FAIR stands for Findable, Accessible, Interoperable and Reusable. The principles were published in 2016 as a framework for making research outputs useful to people and to machines. One thing to keep in mind all session: depositing your data does some of this for you. A repository gives you a permanent web address and makes your data downloadable. It can't write good descriptions of your data for you, and it can't make you use the right terms, although the repository we'll look at has a curation team that helps. We'll focus on seven of the fifteen principles. The Galaxy training this session is built from covers all fifteen, and the link is in your handout."
    tip: "If the group hasn't met FAIR before, spend two extra minutes on the letters and ask what they think each means before you explain. If they are experienced RDM practitioners, move quickly and give the time to the exercises. This module assumes people have done What is FAIR? or know the principles already."
    slide:
      headline: "Deposit it, and you're partly done"
      lines:
        - "The repository gives you an address and a download"
        - "You still have to describe the data"
      poll:
        question: "Have you deposited data in a public repository?"
        options: ["Yes, it went fine", "Yes, it was painful", "Not yet"]
  - title: "The dataset"
    minutes: "10–15"
    script: "RNA sequencing is one of the most widely used assays in the life sciences, so it makes a good example. The main output is a count matrix you could open in Excel: genes as rows, samples as columns, and each number is how many RNA molecules from that gene were detected in that sample. A bulk RNA-seq submission to ArrayExpress has three parts. First, the metadata: which samples, under what conditions, with which reagents. Second, the raw FASTQ files, the reads as they came off the sequencer. Third, the count matrix produced from them. Our dataset is from Alivernini and colleagues, Nature Medicine 2020, on macrophages in the joints of people with rheumatoid arthritis. Its accession is E-MTAB-8316. The biology doesn't matter today. We're looking at how ArrayExpress supports FAIR."
    tip: "If the room works with other data types, name their equivalents: the Human Cell Atlas for single-cell RNA-seq, PRIDE for proteomics, MetaboLights for metabolomics. The structure is the same. If people don't know RNA-seq, sketch the count matrix and draw parallels with their own data."
    slide:
      headline: "One real dataset"
      lines:
        - "Alivernini et al. (2020), Nature Medicine"
        - "ArrayExpress · E-MTAB-8316"
        - "Metadata · raw FASTQ files · count matrix"
      image:
        src: "/assets/modules/02/img/components.svg"
        alt: "The three components of an RNA-seq submission: metadata, raw FASTQ files and a count matrix"
  - title: "Find it: what the repository gave you"
    minutes: "15–25"
    principles: ["F1", "F4", "A1", "A1.1"]
    script: "When a dataset goes into ArrayExpress, it gets an accession number like E-MTAB-8316. No other dataset anywhere has that number, and it won't change or break when a server is updated. That's what lets people cite data the way they cite a paper. Everything in the record is also indexed, so you can find it by typing keywords into the search box and come across datasets you didn't know existed. And once you've found it, you can download it straight away over the web, with no login, no paywall and no special software. The researcher did none of this. The repository did. Let's try it."
    tip: "Expected answers: the accession is in the paper's Data Availability statement, the last of three listed (one per assay). Before downloading anything, the record shows the title, organism, experiment type, submission date, number of samples, licence and download links, all without logging in. If people can't find the accession, point them to Data Availability and use it as a talking point: accessions are often hard to find in papers. For fast finishers: how many assays are in this entry, and what file types are listed?"
    slide:
      headline: "Find the dataset"
      lines:
        - "A. Find the bulk RNA-seq accession in the paper: doi.org/10.1038/s41591-020-0939-8"
        - "B. Search for it on ArrayExpress"
      prompt: "What can you see before you download anything?"
  - title: "Read the metadata: what only you can provide"
    minutes: "25–35"
    checkpoint: true
    principles: ["F2", "R1", "R1.3", "I1"]
    script: "Now the metadata. This is where most of the FAIR work happens, and where most of it goes wrong. ArrayExpress uses a standard called MAGE-TAB, with two files. The IDF covers the study: title, authors, design and protocols. The SDRF is a spreadsheet with one row per sample, its characteristics, and links to its raw files. Rich metadata means more than a title and a date: organism, tissue, disease, treatment, time points, and any confounders you recorded. It's also what makes the data findable. Search for synovial macrophage rheumatoid arthritis and you find this dataset because those words are in its metadata. Using a community format means tools and other databases can read it and compare it with datasets from around the world. Ontologies can sound daunting. They're dictionaries of terms a community has agreed on. If you describe the disease with a term from a disease ontology, such as rheumatic disease, your dataset can be merged with others that use the same term, without anyone chasing synonyms."
    tip: "Give pairs 2–3 minutes before opening it up. People usually find that some fields use ontology terms and others use inconsistent free text for the same thing. A good discussion question: who is responsible for the quality of this metadata, the researcher, the repository or the journal? If time is short, skip the hands-on part and talk through one SDRF row together, pointing out what is and isn't there."
    slide:
      headline: "Could you reuse this?"
      lines:
        - "Open the SDRF file for E-MTAB-8316"
        - "Which variables are recorded? Are they named consistently?"
        - "Controlled terms, or free text?"
        - "Look up rheumatic disease in OLS. Which ontology is it from?"
      prompt: "Discuss in pairs, then share"
  - title: "Licence and provenance"
    minutes: "35–40"
    principles: ["R1.1", "R1.2"]
    script: "Two things are easy to overlook. First, the licence. It tells people how they can share, copy, adapt or build on the data, including commercially. CC0 waives all rights and is the most open. CC BY requires attribution. When you deposit, your data takes the licence the repository applies. FAIR also allows controlled or closed access for ethical reasons, and some repositories support that: the metadata is public and the data is restricted. Second, provenance: the full history of the data, from the lab to the analysis. Which protocols? Which reference genome did you align to? Which software version did you run? Without that, nobody can reproduce or properly evaluate the results. So who does what? The repository handles the identifier, the indexing, the download and keeping the metadata even if the data is removed. The researcher provides the rich descriptions, the ontology terms, the provenance and the domain standard. A curation team can help with quality. Where there isn't one, quality is down to the researcher."
    tip: "Use your own institution's licensing advice here if you've set it up. Make sure people understand that FAIR does not mean open."
    slide:
      headline: "Who does what?"
      lines:
        - "Repository: identifier, search, download, keeping the record"
        - "You: descriptions, shared terms, licence, provenance"
  - title: "Where it goes wrong"
    minutes: "40–45"
    checkpoint: true
    script: "The most common failure is leaving FAIR to the end. The data is deposited the week before the paper goes in, under time pressure, with whatever metadata can be scraped together. Batch information is gone. Sample names are inconsistent. The SDRF is incomplete. The fix is to keep a metadata spreadsheet like a lab notebook. Start it on day one and add to it as you go. By the time you submit, it's already done. Not every repository helps you like this one, and not every data type has a metadata standard. Metadata quality can't be automated, so use ontologies and define your variables."
    tip: "Ask: what does this tell you about when FAIR practice needs to start? Then point people to your preferred repository and to FAIRsharing for other data types."
    slide:
      headline: "Start the spreadsheet on day one"
      lines:
        - "Metadata you didn't record can't be recovered later"
        - "Not every repository curates, and not every data type has a standard"
      prompt: "What's one thing you'll record from now on?"
  - title: "Build your metadata spreadsheet"
    minutes: "45–53"
    optional: true
    cut: "Add-on. Run it if you have time and the room wants it."
    script: "Everything we've talked about, the rich metadata, the controlled terms, the batch information, has to come from somewhere. It comes from a spreadsheet you fill in while you run your experiment. In ArrayExpress, that spreadsheet becomes the SDRF and IDF files, which you generate through the Annotare submission tool. Bioinformaticians who analyse RNA-seq regularly ask for these: batch information such as sequencing run, extraction date and operator; which samples are biological and which are technical replicates; RNA quality metrics; the covariates identified when designing the experiment, such as age, sex, BMI or time point, where they apply; and workflow and software parameters and versions. Look at the SDRF and IDF files. What would you routinely record yourself? What would you have missed? What's still missing?"
    tip: "Start from the SDRF file and let people add what they think is missing. The point to reach: most metadata can't be recovered afterwards. Batch information in particular is lost if nobody records it at the bench."
    slide:
      headline: "What would you have missed?"
      lines:
        - "Batch: sequencing run, extraction date, operator"
        - "Biological vs technical replicates"
        - "RNA quality metrics"
        - "Covariates from your design: age, sex, time point"
        - "Software parameters and versions"
      prompt: "Compare with the SDRF and IDF files"
---

## The situation

Run this module with researchers whose data type has a well-established public repository: sequencing, proteomics, metabolomics, structures. They often think of deposition as an admin step at the end of a project, or don't know how much of FAIR the repository already handles for them.

The session follows one published RNA-seq dataset in ArrayExpress from the paper to the metadata files. It uses RNA-seq as the example; you don't need to teach an RNA-seq workflow, and the same structure applies to other data types with a community repository.

This module assumes people know what FAIR is. If they don't, run [What is FAIR?](../00-what-is-fair/) first. For data with no community repository, use [When there is no community standard or repository](../03-no-standards/) instead.

## The decision

Participants leave knowing which parts of FAIR the repository takes care of, which parts are their job, and that their part starts with a metadata spreadsheet on day one of the experiment.

## The session plan

{{ page.timing_note }}

<div class="session-slot"></div>

## Participant materials

| Material | Source | Status |
|---|---|---|
| The dataset and its metadata files (IDF, SDRF) | [ArrayExpress E-MTAB-8316](https://www.ebi.ac.uk/biostudies/arrayexpress/studies/E-MTAB-8316) | **Linked**, used live in exercises 1 and 2 |
| The paper | [Alivernini et al. (2020), Nature Medicine](https://doi.org/10.1038/s41591-020-0939-8) | **Linked**, exercise 1 |
| Ontology lookup | [Ontology Lookup Service](https://www.ebi.ac.uk/ols4/) | **Linked**, exercise 2 |
| All 15 principles, worked through on this dataset | [Galaxy Training Network tutorial](https://training.galaxyproject.org/training-material/topics/fair/tutorials/fair-rna/tutorial.html) | **Reused**: the basis of this module. Send it afterwards for people who want the full picture. |
| Who does what, principle by principle | The FAIR mapping table below | **Handout**: send it after the session |

## What to adapt locally

- **Your preferred repository**: <span class="repo-slot" data-profile-repo>[ your institution's preferred repository ]</span>
- **Licensing advice**: <span class="repo-slot" data-profile-help="licensing">[ library scholarly communications ]</span>
- **Research data support**: <span class="repo-slot" data-profile-team>[ set up your institution profile ]</span>
- **Swap the example** for a dataset in your audience's repository (PRIDE, MetaboLights, the Human Cell Atlas, ENA) if RNA-seq is too far from their work. Keep the same three questions: what did the repository do, what did the researcher provide, what's missing?

Before the session, check that ArrayExpress and OLS load on the venue's network, since institutional firewalls sometimes block them. Participants need a laptop or a phone with internet access; pairs can share one. Have the [SDRF file](https://www.ebi.ac.uk/biostudies/arrayexpress/studies/E-MTAB-8316) open in a tab in case the download is slow.

## What goes wrong

**People can't find the accession in the paper.** Point them to the Data Availability section at the end, and say it's the last of three. It shows how hard accession numbers can be to find.

**The venue network blocks ArrayExpress or OLS.** Run the exercises on your own screen and talk the room through one SDRF row.

**The room doesn't work with sequencing data.** Name their repository and say the structure is the same. Spend less time on RNA-seq and more on who does what.

**The metadata exercise runs long.** Cap the discussion and move on. The "Where it goes wrong" step is a checkpoint.

**"The repository does it all for me."** Use the SDRF: the curators help, but the researcher still has to record the batch, the covariates and the provenance at the bench.

## FAIR mapping

<details markdown="1">
<summary><strong>For the facilitator:</strong> who does what for each principle, using ArrayExpress as the example. Use as a lookup, and send it as a handout afterwards.</summary>

| Principle | Meaning | ArrayExpress's role |
|---|---|---|
| **F1** persistent identifier | Globally unique identifier that never changes, for data and metadata | Assigns the accession number (e.g. E-MTAB-8316) |
| **F2** rich metadata | Descriptive metadata that makes discovery possible | Researcher writes it; the repository indexes it |
| **F3** metadata names the data | Metadata explicitly names the data it describes | The SDRF links sample metadata to data files |
| **F4** searchable | Metadata registered in a searchable resource | ArrayExpress search index |
| **A1** retrievable | Data retrievable by a standard protocol | HTTPS download links |
| **A1.1** open protocol | The protocol is open, free and universal | HTTPS, no login needed |
| **A2** metadata outlives data | Metadata stays accessible even if the data is removed | Records of removed data are kept |
| **I1** formal language | Shared, machine-readable vocabulary | Ontologies such as EFO, OBI and UBERON |
| **R1** richly described | Many accurate, relevant attributes | Supplied by the researcher |
| **R1.1** licence | Clear data usage licence | Licence adopted at submission |
| **R1.2** provenance | Detailed origin and processing information | Protocol and processing metadata |
| **R1.3** community standards | Meets domain standards | MAGE-TAB, checked by the curation team |

The session covers F1, F2, F4, I1, R1, R1.1 and R1.2 directly, with A1 and A1.1 in passing.

</details>
