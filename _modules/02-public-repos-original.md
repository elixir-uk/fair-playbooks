---
title: "When submitting data to a public repository solves most of the problem"
number: 2
variant: "A · as submitted"   # shown as a label on its card and page; version B is 02-public-repos
in_builder: false             # not suggested in Build a session, certificates or promo
sitemap: false
summary: "The RNA-seq module exactly as its lead submitted it: the FAIR principles explained by checking them off on a real ArrayExpress dataset. Kept for comparison with the playbook version."
certificate: "Making research data FAIR through a public repository"   # what the certificate of attendance says was covered
slide_title: "When submitting data to a public repository solves most of the problem"
slide_subtitle: "A Dataset FAIRification Example explained by checking off the FAIR principles"
estimatedMinutes:
  long: 60  # from the agenda slide; the guide's cover says 30 and its timing table 45
timing_note: "Timings follow the agenda slide in the submitted deck (60 minutes). The facilitator guide's cover says 30 minutes and its timing table 45. Step 7 is the add-on the guide describes."
sources:
  - name: "FAIRification of an RNAseq dataset (Galaxy Training Network)"
    url: "https://training.galaxyproject.org/training-material/topics/fair/tutorials/fair-rna/tutorial.html"
    note: "The Galaxy training forming the basis of this module"
  - name: "FAIR Pointers"
    url: "https://elixir-uk.github.io/FAIR-Pointers/"
    note: "Data Carpentries overview of the FAIR principles"
  - name: "GO FAIR"
    url: "https://www.go-fair.org/"
    note: "FAIR principles are contextualised through practical examples"
  - name: "RDMkit"
    url: "https://rdmkit.elixir-europe.org"
    note: "FAIRification guidance"
  - name: "FAIRsharing"
    url: "https://fairsharing.org"
    note: "Repository and metadata vocabulary selection"
  - name: "EMBL-EBI ArrayExpress"
    url: "https://www.ebi.ac.uk/biostudies/arrayexpress/studies/"
    note: "Worked example dataset (E-MTAB-8316)"
  - name: "MAGE-TAB specification"
    url: "https://www.fged.org/projects/mage-tab/"
playbook: [fairification]
session:
  - title: "Introduction & FAIR Principles"
    minutes: "0–10"
    principles: ["F", "A", "I", "R"]
    script: "Welcome everyone. Today we're going to work through a real, published dataset and see exactly how the FAIR principles play out in practice – not as abstract theory but as actual files, accession numbers, and metadata annotation. Let's start with the principles themselves. [Advance to Slide 3] \"FAIR stands for Findable, Accessible, Interoperable, and Reusable. The FAIR principles here were published in the Nature journal in 2016, and present a framework for making research outputs useful to the wider scientific community, both for humans and for machines.\" \"A key thing to understand before we dive in: not all of these are achieved by just depositing your data somewhere. A repository can assign you a permanent web address and make your data downloadable – but it cannot write good data or metadata descriptions for you, and it cannot force you to use the right terminology, although for the example we show, this is supported by a team of curators working for the resource.\" \"In the interest of time, we focus on 7 of the 15 principles on this slide, for this workshop and these are highlighted. Content has been built from a piece of training detailing all 15 principles if you would like to learn more. This is the Galaxy FAIRification of an RNAseq dataset course which is freely available online, and the link is given to you in the information for this workshop.\""
    tip: "If attendees haven't seen FAIR before: spend 2 extra minutes on Slide 3, pointing to each letter and asking the group what they think it means before revealing the definition. This activates prior knowledge. If the group is experienced RDM practitioners: move quickly through Slide 3 and invest more time in the exercises. Discussion prompt (optional, 2 min), quick show of hands. Ask: 'Has anyone here deposited data in a public repository? What was the process like?' This surfaces experience in the room and frames the common pain points the workshop addresses."
    slides:
      - headline: "Workshop Overview"
        table:
          head: ["Time", "Section", "Content"]
          rows:
            - ["0–10 min", "Introduction", "FAIR principles overview & why RNAseq"]
            - ["10–15 min", "The Dataset", "What are we looking at? Types of data"]
            - ["15–25 min", "Finding and Accessing Data", "F1, F4 + Exercise: find the accession"]
            - ["25–40 min", "Metadata", "F2, R1, I1 + Exercises on standards"]
            - ["40–50 min", "Reuse & License", "R1.1, R1.2 + Metadata spreadsheet"]
            - ["50–60 min", "Wrap-Up", "Failings, open questions & discussion"]
      - headline: "The FAIR Principles"
        intro: "In this workshop, we focus on 7 of the 15 FAIR principles (highlighted)"
        cards:
          - title: "F – Findable"
            items:
              - "<mark>F1. (Meta)data are assigned a globally unique and persistent identifier</mark>"
              - "<mark>F2. Data are described with rich metadata (defined by R1 below)</mark>"
              - "F3. Metadata clearly and explicitly include the identifier of the data they describe"
              - "<mark>F4. (Meta)data are registered or indexed in a searchable resource</mark>"
          - title: "A – Accessible"
            items:
              - "<mark>A1. (Meta)data are retrievable by their identifier using a standardised communications protocol</mark>"
              - "A1.1 The protocol is open, free, and universally implementable"
              - "A1.2 The protocol allows for an authentication and authorisation procedure, where necessary"
              - "A2. Metadata are accessible, even when the data are no longer available"
          - title: "I – Interoperable"
            items:
              - "<mark>I1. (Meta)data use a formal, accessible, shared, and broadly applicable language for knowledge representation.</mark>"
              - "I2. (Meta)data use vocabularies that follow FAIR principles"
              - "I3. (Meta)data include qualified references to other (meta)data"
          - title: "R – Reusable"
            items:
              - "<mark>R1. (Meta)data are richly described with a plurality of accurate and relevant attributes</mark>"
              - "R1.1. (Meta)data are released with a clear and accessible data usage license"
              - "R1.2. (Meta)data are associated with detailed provenance"
              - "<mark>R1.3. (Meta)data meet domain-relevant community standards</mark>"
  - title: "The Dataset"
    minutes: "10–15"
    script: "\"RNA sequencing is one of the most widely used assays in life sciences – so it's a great example to work through. The key output is a count matrix you could open as a spreadsheet in Excel, with genes as rows and samples as columns, where each number tells you how many RNA molecules from that gene were detected in that sample.\" \"There are three things that need to go into ArrayExpress for a bulk RNAseq dataset submission: first, the metadata – what samples you collected and sequenced, under what conditions, with what reagents and so on; second, the raw FASTQ files – the raw sequence reads as they came off the sequencer; and third, the count matrix – the output from processing the raw FASTQ files.\" \"Today we're using a dataset from Alivernini and colleagues, published in Nature Medicine in 2020, studying macrophages in the synovial tissue of rheumatoid arthritis patients. The data and its metadata are in ArrayExpress with the accession E-MTAB-8316. The biology of this dataset isn't important to us today. We will be looking at how ArrayExpress supports 7 of the FAIR principles\""
    tip: "If attendees work with other data types: mention the equivalent repositories – Human Cell Atlas for scRNA-seq, PRIDE for proteomics, MetaboLights for metabolomics. The principles and structure are identical."
    slides:
      - headline: "Why RNAseq? Why This Dataset?"
        cards:
          - title: "What is RNAseq?"
            items:
              - "A high-throughput sequencing technique that profiles the transcriptome – converting RNA molecules into sequencing libraries and quantifying gene expression genome-wide."
              - "Produces: large raw sequencing files (FASTQ) which are processed to give count matrices representing transcript/gene abundance across samples."
              - "Used for: differential gene expression analysis (for example, which genes are turned on or off, in a disease state) and gene pathway activity."
          - title: "Our Workshop Dataset"
            items:
              - "Alivernini et al. (2020), Nature Medicine"
              - "Topic: Synovial tissue macrophages in rheumatoid arthritis patients."
              - "Repository: ArrayExpress · Accession: E-MTAB-8316"
              - "Three data components: 1 Metadata / experimental design file · 2 Raw FASTQ sequencing files · 3 Count matrix (genes × samples)"
  - title: "Finding the Data"
    minutes: "15–25"
    principles: ["F1", "F4", "A1", "A1.1"]
    script: "\"The first of the FAIR principles is F1 which is about identifiers. When a dataset lands in ArrayExpress, it gets a unique accession number – something like E-MTAB-8316. That number is globally unique meaning that no other dataset anywhere has it. And it's persistent: it won't change, won't break, won't disappear when a server gets updated. This is what allows a researcher to cite data the same way they cite a paper.\" \"The fourth principle, F4, is about discoverability. The accession and all the metadata are indexed within the ArrayExpress database – meaning you can search for it via the webpage textbox serach. You can type a keyword into ArrayExpress and surface datasets you'd never have known existed.\" \"Once you've found a dataset by its identifier, you can immediately click to download it over the web. No login. No paywalls. No special software. Which then satisfies the A1 and A1.1 principles also, though we will focus on F1 and F4 for our next exercise.\""
    slides:
      - headline: "Finding the Dataset – F1 & F4"
        cards:
          - title: "F1 – Globally Unique & Persistent Identifier"
            text: "When data is submitted to ArrayExpress it receives a permanent accession number (e.g. E-MTAB-8316). This serves as the appendix of a permanent web address (https://www.ebi.ac.uk/biostudies/ArrayExpress/studies/E-MTAB-8316) that will never change – anyone can cite it, link to it, or find it years later."
          - title: "F4 – Indexed in a Searchable Resource"
            text: "Because all text, titles and metadata are fully indexed in ArrayExpress (i.e. made searchable through a textbox search), a researcher can locate a dataset by typing keywords – or the exact accession – into the search bar."
        lines:
          - "Also satisfied: A1 & A1.1 – Open Access Protocol. Once you find the dataset via its identifier, you can immediately click to view or download using standard HTTPS. No login, no special software, no cost – satisfying both A1 (standardised protocol) and A1.1 (open and free download software)."
      - headline: "Exercise (5 min)"
        intro: "Locate the Dataset Accession"
        task:
          minutes: 5
          steps:
            - "Task A: Open the Alivernini et al. paper (https://doi.org/10.1038/s41591-020-0939-8) and find the accession number for the bulk RNAseq dataset. Note there are 3 accession numbers given for 3 different assays. You need the one for bulk RNAseq: E-MTAB-8316"
            - "Task B: Go to the ArrayExpress data deposition, https://www.ebi.ac.uk/biostudies/arrayexpress/studies/ and type E-MTAB-8316 into the search bar."
        notes: "What do you see? What information is available before you download anything? Expected solution: Accession number E-MTAB-8316 (found in the Data Availability statement in the paper). ArrayExpress shows: title, organism, experiment type, submission date, number of samples, licence, and links to download. All of this is available without logging in – demonstrating A1.1. Facilitator tip: If attendees struggle to find the accession in the paper: point them to the Data Availability section at the end, and explain we need the final one of the three. This illustrates a real-world challenge – accession numbers are not always prominently placed. Extension question for fast finishers: 'How many assays are in this entry? What file types are listed?'"
  - title: "Metadata & Community Standards"
    minutes: "25–40"
    principles: ["F2", "R1", "R1.3", "I1"]
    script: "\"Now let's look at the metadata. This is where most of the real FAIR work happens – and most of the real FAIR failures.\" \"ArrayExpress uses a standard called MAGE-TAB. There are two files: the IDF – Investigation Description Format – which covers study-level information like the title, the authors, the experimental design, protocols used. And the SDRF – Sample and Data Relationship Format – which is a spreadsheet listing every sample with its characteristics, and linking each sample to its raw data files. MAGE-TAB was originally defined for another platform called microarray, but is used also for RNAseq data in an adapted form called MINSEQE\" \"F2 says metadata should be rich. That means not just a title and a date, but: what organism, what tissue, what disease state, what treatment, what timepoints, what confounders did you record. This is also what makes the data findable – if someone searches ArrayExpress for 'synovial macrophage rheumatoid arthritis', they find this dataset because those terms are in the metadata.\" \"R1.3 is about community standards. Using MAGE-TAB isn't just good practice – it means your metadata in in a format that can be parsed by automated tools, ingested by downstream databases, and compared against other datasets from around the world. When everyone uses the same format, the whole field benefits.\" \"And I1:, ontologies and vocabularies can be scary. THey are effectively dictionaries of terms you can use to describe your data, where these terms are universally decided and used by a community. So, if you are using a Disease Ontology you can use one of its terms such as 'rheumatic disease' in the disease description field of your metadata. Because other people use this same ontology and ontology terms, you will be able to merge you dataset with theirs, without needing to query individual synonyms. This is an example of interoperability.\""
    slides:
      - headline: "Metadata & Community Standards – F2, R1, I1"
        cards:
          - title: "F2 | Rich Metadata"
            text: "Metadata includes information including who created the data, what it contains and how it was generated. Metadata are indexed in ArrayExpress, sometimes as keywords, so that humans and machines can find it."
          - title: "R1 / R1.3 | Community Standards (MAGE-TAB / MINSEQE)"
            text: "ArrayExpress uses a community standard called MAGE-TAB for study-level (IDF) and sample-level metadata (SDRF). These can be downloaded from the ArrayExpress record as spreadsheets."
          - title: "I1 | Shared, Formal Vocabulary"
            text: "Terms used to describe things such as tissue, disease, organism, cell type belong to community-supported, dictionaries or ontologies (e.g. EFO, OBI, UBERON). These commonly-used terms enable cross-dataset interoperability (merging) and machine-readable queries beyond free text."
      - headline: "Exercise (8 min)"
        intro: "Look at the metadata"
        task:
          minutes: 8
          steps:
            - "Open the SDRF file for E-MTAB-8316 from ArrayExpress (righthand blue banner)"
            - "Question 1: What experimental variables are recorded? Are they clearly named and consistent?"
            - "Question 2: Are controlled vocabulary terms used, or free text?"
            - "Question 3: Use the Ontology Lookp Service (OLS) (https://www.ebi.ac.uk/ols4/) to search for rheumatic disease\". What ontology does it belong to?"
        notes: "Facilitation notes for Exercise 2: This exercise often surfaces the gap between 'technically FAIR' (accession exists, metadata file present) and 'meaningfully FAIR' (metadata is complete and interpretable). Common finding: some fields have ontology URIs, others use inconsistent free text for the same concept. Good discussion question: 'Who is responsible for the quality of this metadata – the researcher, the repository, or the journal?' Facilitator tip: Allow 2–3 minutes for pairs or groups to discuss before opening up to the group. If time is short, skip the hands-on element and instead talk through a single SDRF row together as a group, pointing out fields that are and aren't present."
  - title: "Licensing & Provenance"
    minutes: "40–50"
    principles: ["R1.1", "R1.2"]
    script: "\"R1.1 is easy to overlook. It is used commonly to state how people can share, copy, adapt, or build upon your work, even for commercial purposes. CC0 waives all rights – it's the most open option. CC-BY requires attribution, and can also be adapted to control use. FAIR does allow controlled and closed access for ethical concerns. Some public repositories will support this. In these cases, the metadata are public, but the data is closed.\" \"R1.2 is about provenance – the full chain of custody of your data. Not only laboaratory processes but analysis to. Which reference genome did you align to? Which version of software did you run?\""
    slides:
      - headline: "Licensing, Provenance & Reuse – R1.1 & R1.2"
        cards:
          - title: "R1.1 – Clear Data Usage Licence"
            text: "Data must be released with an explicit licence (e.g. CC0, CC-BY). This lets a researcher know how they can use the data, commonly around how they acknowledge its use. Your data submission will inherit the licence applied by the public repository."
          - title: "R1.2 – Detailed Provenance"
            text: "Provenance records how data was generated: protocols used, software versions, reference genomes, processing steps. Without it, others cannot reproduce or critically evaluate your results."
        lines:
          - "Repository handles: F1, F3, F4, A1, A2 – assigning identifiers, indexing metadata, enabling download, preserving metadata even if the data is removed."
          - "Researcher must provide: F2 (rich descriptions), I1 (ontology terms), R1 (provenance + domain standards). A repository can guide content quality through interactions with curation teams working for the resource. If a curator team does not exist, the quality of metadata is down to the researcher."
  - title: "Wrap up"
    minutes: "50–60"
    script: "\"Now let's talk about where this can go wrong.\" \"The biggest cultural failure we see is FAIRification at the end. The dataset is deposited the week before the paper is submitted, under time pressure, with whatever metadata can be scraped together. Batch information is gone. Sample naming is inconsistent. The SDRF is incomplete..\" \"The solution is to build a metadata spreadsheet as a lab notebook. Start it on day one. Add to it as you go. By the time you submit, it's already FAIR.\""
    slides:
      - headline: "Key Takeaways"
        numbered: true
        cards:
          - text: "FAIR is a spectrum – repositories handle the 'plumbing' (F1, F4, A1) but researchers supply the 'content' (F2, I1, R1)."
          - text: "Not all databases enable FAIRification and not all datatypes have standards for metadata curation"
          - text: "Metadata quality cannot be automated. Use ontologies (OLS) and define your variables"
          - text: "FAIRification should start at experimental design, not at submission – retrofitting is painful and often incomplete."
          - text: "For a discussion of all FAIR principles, look at the Galaxy training course used to build this workshop."
        prompt: "Starter resource: Galaxy RNAseq FAIR Tutorial | go-fair.org/fair-principles | ebi.ac.uk/biostudies/arrayexpress"
  - title: "Building a FAIR Metadata Spreadsheet"
    minutes: "60–68"
    optional: true
    cut: "This is an add on. If there is time and desire to do so, engage the audience in building a spreadsheet to capture all RNAseq metadata during the course of the investigation."
    script: "\"This is the most practical part of the session. Everything we've talked about so far – the rich metadata, the controlled vocabulary, the batch information – all of that has to come from somewhere. It comes from a spreadsheet you fill in as you run your experiment.\" \"In ArrayExpress, that spreadsheet becomes the SDRF and the IDF.\" \"Let's walk through what might be in your spreadsheet. These have been compiled by a number of bioinformaticians who routinely analyse RNAseq data."
    tip: "This is an add on. If there is time and desire to do so, engage the audience in building a spreadsheet to capture all RNAseq metadata during the course of the investigation. This should start with the SDRF file and encourage people to consider anything they think is missing. The key insight participants should arrive at: most of the metadata cannot be retrospectively retrieved. Batch information, in particular, is often lost if not recorded at the bench."
    slides:
      - headline: "Building a FAIR Metadata Spreadsheet"
        intro: "Good FAIR practice starts at data collection – not at publication."
        cards:
          - title: "★ Strongly Recommended Additions by Bioinformaticians"
            items:
              - "Batch information: sample sequencing run, extraction date, operator"
              - "Biological replicates vs technical replicates"
              - "RNA quality metrics"
              - "Capture biologically/analytically relevant covariates identified during experimental design, e.g.: BMI, age, sex, time point, etc where appropriate"
              - "Workflow and software parameters and versions"
        prompt: "In ArrayExpress: IDF = study level | SDRF = sample level + file links | Both generated via Annotare"
      - headline: "Exercise (8 min)"
        intro: "Build a spreadsheet for RNAseq metadata"
        task:
          minutes: 8
          steps:
            - "Look at the SDFR and IDF files. Consider what information you would routinely capture as part of you own records. What would you have missed? What do you think is still missing? Discuss with the people around you."
          then: "Debrief question: What does this exercise tell you about when FAIR practice needs to start?"
---

<p class="callout"><strong>Version A: as submitted.</strong> Module 02 exactly as its lead submitted it, organised around the FAIR principles: the slides follow the submitted deck in order, and the script, tips and appendix are the facilitator guide's own words (only the dashes changed). Compare it with <a href="../02-public-repos/">version B, the playbook version</a>, which is organised around what the repository does for you and what you still provide. Version A isn't listed on the site.</p>

## About this workshop

For many data types in life sciences (sequencing, proteomics, molecular structures), depositing data and its metadata to a trusted community repository handles FAIR at the point of publishing and archiving. This module covers how FAIR is supported by the ArrayExpress repository, specifically looking at 7 of the 15 FAIR principles. ArrayExpress is a public repository for sharing transcriptomic data, including bulk RNA‑seq (the focus of this module), and is supported by community‑driven standards for metadata curation (MINSEQE).

Importantly, the approach to FAIRification in this module is structured around the FAIR principles themselves. For each principle, we demonstrate how it can be addressed through the submission of an RNA-seq dataset to ArrayExpress. This principle-based approach complements the approaches taken by other modules to explain FAIR, such as a focus on record keeping and activities mapping to the data lifecycle.

This module should therefore be viewed less as a step-by-step guide to FAIRifying RNAseq data and more as a practical demonstration of how the FAIR principles can be applied in a real-world research context, using RNA-seq data as the example. This is an important distinction: the primary focus is on putting the FAIR principles into practice, rather than teaching a workflow that is specific to RNA-seq.

Due to the time available, the module focuses on seven of the FAIR principles. However, the [Galaxy Training Network course](https://training.galaxyproject.org/training-material/topics/fair/tutorials/fair-rna/tutorial.html) on which this module is based covers all 15 principles, providing a more comprehensive treatment for learners who wish to explore the topic further.

The intended audience is both trainers (who may go on to deliver this material themselves) and trainees (researchers, data stewards, and anyone who needs familiarity with what the FAIR principles means in practice).

### Learning objectives

By the end of this workshop participants will be able to:

1. Explain and contextualise 7 of the 15 FAIR principles and identify which are commonly handled by repositories and which require researcher effort.
2. Locate a bulk RNAseq dataset in ArrayExpress using a persistent accession number.
3. Identify the three required components of a FAIR RNAseq submission (metadata, FASTQ, count matrix).
4. Critically appraise the quality of metadata

## The session plan

{{ page.timing_note }}

<div class="session-slot"></div>

## Facilitator prep checklist

**Before the session**

- Test that ArrayExpress and OLS are all reachable from the venue's network before the session – institutional firewalls occasionally block unfamiliar domains.
- Decide whether participants will use their own laptops/phones for the hands-on exercises, or work in pairs sharing one device.
- Consider whether your audience's discipline. Will this audience know the datatype RNAseq or not. If not, you are introducing more the datatype and promote parallels between this and other datatypes.

**Materials needed**

- Slide deck projected or screen-shared.
- Devices with internet access for participants to use during the hands-on exercises
- Follow-up materials to send afterwards: Appendix A

**Room setup**

- Open the slide deck and advance to Slide 1
- Open a browser tab to ArrayExpress: <https://www.ebi.ac.uk/biostudies/arrayexpress/studies/> and FAIRsharing: <https://fairsharing.org/>
- Have the example SDRF file ready (E-MTAB-9224 from ArrayExpress, <https://ftp.ebi.ac.uk/biostudies/fire/E-MTAB-/316/E-MTAB-8316/Files/E-MTAB-8316.sdrf.txt>)
- Participants will need to bring a laptop and access to WIFI

The slide deck mirrors this guide section by section. Adapt timing based on your group size. With 5+ participants, exercises may benefit from paired or group work. This module builds on the "What is FAIR and why do I need it?" module and assumes prior knowledge of the FAIR principles.

## Appendix A – FAIR Principles Quick Reference

| Code | Principle | Meaning | ArrayExpress role |
|---|---|---|---|
| **F1** | Persistent ID | Globally unique, never-changing identifier for data & metadata | Assigns accession numbers (e.g. E-MTAB-9224) |
| **F2** | Rich metadata | Descriptive metadata that enables discovery | Researcher must write; repository indexes it |
| **F3** | ID in metadata | Metadata explicitly names the data it describes | SDRF links sample metadata to data files |
| **F4** | Indexed | Metadata registered in searchable resource | ArrayExpress search index |
| **A1** | Retrievable | Data retrievable via standard protocol | HTTPS download links |
| **A1.1** | Open protocol | Protocol is open, free, universal | HTTPS – no login required |
| **A2** | Metadata persists | Metadata accessible even if data removed | Tombstone records retained |
| **I1** | Formal vocabulary | Shared, machine-readable language used | Controlled ontologies: EFO, OBI, UBERON |
| **R1** | Reusable | Many attributes for accurate reuse | Researcher-supplied |
| **R1.1** | Licence | Clear data usage licence | Licence adopted at submission |
| **R1.2** | Provenance | Detailed origin & processing info | Protocol and processing metadata |
| **R1.3** | Community standard | Meets domain standards (MAGE-TAB/MINSEQ) | Enforced by curation team |
