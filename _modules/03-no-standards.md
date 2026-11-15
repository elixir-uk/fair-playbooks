---
title: "When there is no community standard or repository"
number: 3
summary: "A lot of research data has no dedicated repository and lives in a spreadsheet. Participants find the problems in a messy table, learn Tidy Data and the three kinds of metadata every spreadsheet needs, and work out what to consider when sharing data without a discipline repository."
estimatedMinutes:
  short: 44
  long: 60
prerequisites: ["00-what-is-fair"]
timing_note: "The full session runs an hour and the short version about 45 minutes. Switch to Short to see what to cut. Steps 3, 5 and 6 are where people practise (finding the problems, fixing the table, writing the data dictionary), so don't cut them. Step 5 and the data dictionary exercise in step 6 were added to the source manual's plan to give more hands-on time; its going-public and wrap-up segments are shorter to make room."
leadContributors: ["Richard Ostler"]
sources:
  - name: "Tidy Data – a gentle introduction (data.europa.eu)"
    url: "https://data.europa.eu/apps/data-visualisation-guide/intro-to-tidy-data"
    note: "Participant reference for the three Tidy Data rules"
  - name: "Tidy data – tidyr vignette"
    url: "https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html"
    note: "More technical reference, for R users"
  - name: "Data Carpentry – Spreadsheets for ecologists"
    url: "https://datacarpentry.github.io/spreadsheet-ecology-lesson/01-format-data.html"
    note: "The messy survey spreadsheet used as the longer alternative exercise, CC BY 4.0"
  - name: "Frictionless Data"
    url: "https://frictionlessdata.io/introduction/"
    note: "A formal way to describe a table, its column types and keys"
  - name: "FAIRsharing"
    url: "https://fairsharing.org"
    note: "Checking for discipline standards, vocabularies and repositories"
tags: [spreadsheets, tidy-data, metadata, data-dictionary, custom-data]
playbook: [fairification]
audience: [researcher, phd-student, postdoc, rdm-peer]
scenario: [starting-project, mid-project]
dataType: [spreadsheet, mixed]
intent: [how-to, hands-on-exercise]
slide_title: "Build a FAIR spreadsheet"
slide_subtitle: "For data with no dedicated repository"
benefit: "Start your next spreadsheet so that someone else, including your future self, can understand and reuse it."
session:
  - title: "Why spreadsheets need attention"
    minutes: "0–5"
    short: 3
    cut: "Read the four risks without opening a discussion."
    script: "Welcome. This is a hands-on session on making spreadsheet data FAIR, particularly when there's no dedicated repository for your kind of data, so a well-built spreadsheet has to do a lot of the work itself. By the end you'll be able to spot common problems in spreadsheets, apply Tidy Data, name the three kinds of metadata you need, and know what to weigh up when there's no repository to share your data in. Spreadsheets are the most common way research data first gets entered. Unlike a database, they don't enforce any structure. That makes them flexible, and it makes them risky. Poor naming and missing metadata hurt findability. Proprietary formats and hidden formatting, such as colour and merged cells, hurt accessibility. Inconsistent dates and free text hurt interoperability. Missing provenance hurts reuse."
    tip: "Introduce yourself and say why your organisation is running this, for example as part of its RDM support programme. By spreadsheet we mean any tabular format: Excel, Google Sheets, CSV or TSV."
    slides:
      - headline: "Why spreadsheets need special attention"
        intro: "Spreadsheets are the most common way research data first gets entered. Unlike databases, they rarely enforce any structure, and that flexibility comes at a cost."
        cards:
          - title: "Findable"
            text: "Poor file names, missing metadata, unclear variable names and no standard descriptors make datasets hard to find and interpret."
          - title: "Accessible"
            text: "Proprietary formats, undocumented structure and hidden information, such as colour coding and merged cells, can block access."
          - title: "Interoperable"
            text: "Non-standard dates, free text and no controlled vocabularies make datasets hard to combine."
          - title: "Reusable"
            text: "Missing provenance, undocumented changes, missing values and thin metadata make data hard to reuse."
        prompt: "Think of one spreadsheet you use now. Keep it in mind for the session."
  - title: "Where your data comes from"
    minutes: "5–10"
    short: 3
    cut: "Show the sources in one pass and skip the questions."
    script: "Before you can fix a spreadsheet, you need to know where its data came from, because each source has its own risks: output from equipment, in a proprietary or a text format; online survey tools; specialist data-collection software; manual entry; existing or published data; and lab notebooks. Which of these do you recognise? Whatever the source, four rules apply. Understand where your data comes from. Always keep the original copy. Agree common ways of working within your team. And record every transformation, ideally in code rather than by hand."
    tip: "Ask the room which routes they use; it tells you which examples to lean on later. Questions for each source: equipment output may need converting from a proprietary format. Survey tools (Google or Microsoft Forms): are the column headings long, and how are multiple-choice answers stored? Data-collection software such as ODK: where does the data go, and does it record who entered it? Manual entry: is the sheet built with validation, and do you know who typed what? Existing or published data and lab notebooks: is it in a usable, Tidy shape?"
    slides:
      - headline: "Where does your data come from?"
        intro: "Every source of spreadsheet data carries its own risks. Know yours before you start."
        table:
          head: ["Source", "Questions to ask"]
          rows:
            - ["Equipment", "Is it in a proprietary format that needs converting, or in a text-delimited format?"]
            - ["Online survey tools (Google or Microsoft Forms)", "Are the column headings long? How are multiple-choice answers stored? Will it need cleaning?"]
            - ["Specialist data-collection software (e.g. ODK)", "Where does the data go? Does it record who entered it?"]
            - ["Manual entry into Excel", "Is the sheet built for reliable entry, with validation? Do you know who entered the data?"]
            - ["Existing or published data", "Is it in a usable, Tidy format?"]
            - ["Lab or research notebooks", "Is it in a usable, Tidy format?"]
      - headline: "Which route is yours?"
        poll:
          question: "Where does most of your data come from?"
          options: ["Equipment", "Survey tools", "Data-collection software", "Manual entry", "Existing data", "Lab notebooks"]
      - headline: "Before you move on: four rules"
        numbered: true
        cards:
          - title: "Understand your source"
            text: "Different sources have different issues. Know yours and how to manage it."
          - title: "Always keep the original"
            text: "Keep an unaltered copy of the source data, whatever the format."
          - title: "Agree common protocols"
            text: "Agree shared guidelines in your team or institute, so data is handled consistently and new people are easy to train."
          - title: "Capture the provenance"
            text: "Record every change: renamed columns, recoded or derived variables. Prefer code (R, Python) to manual edits, and keep the code with the data."
  - title: "What can you do with this data?"
    minutes: "10–20"
    short: 8
    checkpoint: true
    cut: "If short of time, cap the feedback at 3 minutes."
    script: "In pairs, you have five minutes. Look at this table and list every problem you can find, and what would need to change before someone else could reliably reuse it. … Let's hear one problem from each of two or three pairs. … Now the answers. The resolution column contains 512x512, which isn't a resolution at all. It's most likely the image size in pixels, entered in the wrong column. It looks plausible and it's wrong. The organism column mixes a scientific name with common names, Drosophila, fly and mouse. Pick one convention and use it everywhere. And drug1 and drug2 mean nothing to anyone outside the original team, which is a clear case for a data dictionary. None of these fixes needs special software. They're conventions. Making a spreadsheet FAIR is mostly about consistency and agreement."
    tip: "Hand out the table (below) and keep the answers back until after the exercise. Set a visible five-minute timer. Prompt stuck pairs with: what does 512x512 mean in the Resolution column? Can you tell what drug1 and drug2 are? The table is imaging data, but participants don't need imaging expertise to spot the problems. You can swap in a messy table from your own institution, keeping the same kinds of problem. For a longer, hands-on version, use the original Data Carpentry messy spreadsheet instead (see Participant materials)."
    slide:
      headline: "What can you do with this data?"
      table:
        head: ["File Name", "Imaging Modality", "Organism", "Channel 1", "Ch2", "Resolution (um/pixel)", "Experiment Date", "Treatment"]
        rows:
          - ["image_1.tif", "Confocal", "fly", "actin-GFP", "myosin:mCherry", "0.05", "2023/01/15", "control"]
          - ["sample_B.tif", "Microscopy", "Drosophila", "actin:GFP", "myosin:mCherry", "512x512", "02-15-2023", "drug1"]
          - ["sample_3.tiff", "", "mouse", "actin", "myosin:mCherry", "0.1", "Jan 25th, 2023", "drug2"]
        mono: true
        credit: "Source: EuroBioimaging training material"
      task:
        who: "In pairs"
        minutes: 5
        steps:
          - "List every problem that would stop someone else reusing this table"
          - "For each one, note what would need to change"
        then: "Each pair shares one problem nobody else has said yet"
      answers:
        headline: "What's wrong with it"
        lines:
          - "File Name: inconsistent names and extensions (.tif and .tiff)"
          - "Imaging Modality: which microscopy? One cell is empty"
          - "Organism: scientific and common names mixed (fly, Drosophila, mouse)"
          - "Channel 1: actin-GFP or actin:GFP? Is actin the same thing?"
          - "Ch2: is it Channel 2, or something else?"
          - "Resolution: 512x512 isn't a resolution. It's probably the image size"
          - "Experiment Date: three formats, none of them ISO 8601"
          - "Treatment: what are drug1 and drug2?"
          - "General: avoid spaces in headers and file names, and watch for inconsistent capitals and header names"
        prompt: "None of these fixes needs special software. They're conventions."
  - title: "What good looks like"
    minutes: "20–28"
    short: 6
    cut: "Skim the list of bad habits; keep Tidy Data and the dos and don'ts in full."
    script: "Here are ten habits that make a spreadsheet hard to use. Most explain themselves. Two are worth pausing on. Missing values: a blank cell, minus 9999 and N/A are different things to software, even if a person reads them the same way. And colour, fonts, bold and italics carry meaning for a person but are invisible to software, and not everyone can see them, for example people with colour blindness or anyone with a black-and-white printout. Tidy Data gives three rules. Each row is one observation, each column is one variable, and each cell holds one value. A Tidy table can be read by software as it is, grows cleanly as you add rows, and keeps filtering, joining and analysis predictable. Two more don'ts. Don't record data in cell comments, because software can't read them. And don't mix raw and processed data in the same file, because nobody can tell which values are the originals."
    tip: "The ten bad habits and the dos and don'ts are listed under Participant materials. Read the bad habits quickly. If time allows, ask whether any of them are true of a spreadsheet people use now."
    slides:
      - headline: "What does a bad spreadsheet look like?"
        cards:
          - items:
              - "1. More than one table per worksheet. Blank rows and columns don't stop a script reading them as one table"
              - "2. Metadata on the same worksheet as the data"
              - "3. Raw and processed data mixed in one workbook, with nothing saying which is which"
              - "4. Many data tables crammed into one file"
              - "5. Colour, fonts, bold or italics used to carry information a computer can't read"
          - items:
              - "6. Merged cells in headers or across rows"
              - "7. More than one header row"
              - "8. Mixed naming conventions, such as common and scientific names together"
              - "9. Inconsistent missing values: blank, -9999 and N/A are not the same"
              - "10. Special characters in headers or values, and data recorded in cell comments"
        prompt: "Is any of these true of your spreadsheet? Hands up if it is."
      - headline: "Quick quiz: what does a blank cell mean?"
        poll:
          question: "In someone else's spreadsheet, a cell is blank. What does it mean?"
          options: ["Not measured", "Zero", "Not applicable", "No way to tell"]
        notes: "Count hands, then: there's no way to tell unless the spreadsheet says. Blank, 0, -9999 and N/A are different values to software, and a blank cell can mean any of them. That's why you define one missing-value code in the data dictionary and use it everywhere."
      - headline: "Tidy Data"
        intro: "A way to organise any table: a spreadsheet, CSV, TSV or any other tabular format."
        numbered: true
        cards:
          - title: "Each row is an observation"
          - title: "Each column is a variable"
          - title: "Each cell is a value"
        lines:
          - "Software can load it straight into R or Python"
          - "It grows to thousands of rows without breaking"
          - "Filtering, joining and analysis work predictably, and you can explore it without cleaning it first"
      - headline: "Tips for spreadsheets"
        cards:
          - title: "Do"
            items:
              - "Use the first row as the header"
              - "Put one fact in each cell"
              - "Keep one table per sheet"
              - "Set a format for each cell where you can (date, number)"
              - "Add a README tab"
              - "Decide how you'll code missing values"
              - "Control automatic conversions, and check key fields after entry"
          - title: "Don't"
            items:
              - "Use colour, bold or fonts to carry information"
              - "Spread one heading across columns or merge header cells"
              - "Use commas as thousands separators (they clash with CSV)"
              - "Record data in cell comments"
              - "Mix raw and processed data in one file"
              - "Use special characters in headers or file names"
  - title: "Fix the table"
    minutes: "28–36"
    short: 5
    checkpoint: true
    cut: "If short of time, fix two columns instead of the whole table."
    script: "Let's use what we've just seen. Go back to the table from the exercise. In pairs, rewrite it so it's Tidy and consistent: one convention for names, one date format, clear column headers, and every value in the right column. Some things you can fix yourselves. Some you can't, because only the person who collected the data knows. Mark those as missing and write down the question you'd ask them. … Here's one way to do it. The organism names are consistent, the dates are ISO 8601, the headers have no spaces, and 512x512 has moved to its own column for image size. Three things we couldn't fix: which microscope was used, whether actin in the last row is actin-GFP, and what drug1 and drug2 are. Those go back to whoever collected the data, and drug1 and drug2 get defined in the data dictionary, which is next."
    tip: "Paper and pen work fine; people don't need to type. Expect different answers for column names and file names, which is fine as long as they're consistent. The point to reach: some fixes are conventions you can apply, and some information is lost unless it was recorded at the time. The cleaned version on the answers slide is one possible answer written for this playbook, not part of the EuroBioimaging material."
    slides:
      - headline: "Fix the table"
        table:
          mono: true
          head: ["File Name", "Imaging Modality", "Organism", "Channel 1", "Ch2", "Resolution (um/pixel)", "Experiment Date", "Treatment"]
          rows:
            - ["image_1.tif", "Confocal", "fly", "actin-GFP", "myosin:mCherry", "0.05", "2023/01/15", "control"]
            - ["sample_B.tif", "Microscopy", "Drosophila", "actin:GFP", "myosin:mCherry", "512x512", "02-15-2023", "drug1"]
            - ["sample_3.tiff", "", "mouse", "actin", "myosin:mCherry", "0.1", "Jan 25th, 2023", "drug2"]
        task:
          who: "In pairs"
          minutes: 6
          steps:
            - "Rewrite the table so it's Tidy and consistent: names, dates, headers, values in the right column"
            - "Where only the person who collected it would know, write NA and the question you'd ask them"
          then: "Compare with the pair next to you"
      - headline: "One way to fix it"
        table:
          mono: true
          head: ["file_name", "imaging_modality", "organism", "channel_1", "channel_2", "pixel_size_um", "image_size_px", "experiment_date", "treatment"]
          rows:
            - ["image_01.tif", "confocal", "Drosophila melanogaster", "actin-GFP", "myosin-mCherry", "0.05", "NA", "2023-01-15", "control"]
            - ["image_02.tif", "NA", "Drosophila melanogaster", "actin-GFP", "myosin-mCherry", "NA", "512x512", "2023-02-15", "drug1"]
            - ["image_03.tif", "NA", "Mus musculus", "actin", "myosin-mCherry", "0.1", "NA", "2023-01-25", "drug2"]
          credit: "One possible answer, written for this playbook"
        lines:
          - "Still to ask: which microscope for rows 2 and 3? Is actin in row 3 actin-GFP? What are drug1 and drug2?"
          - "Record what you changed: new file names, new headers, the moved 512x512"
        prompt: "Some fixes are conventions. Some information is lost unless someone recorded it."
  - title: "Build it FAIR from the start"
    minutes: "36–48"
    short: 10
    checkpoint: true
    cut: "If short of time, cover technical and provenance metadata in full and summarise discovery metadata in one sentence."
    script: "This is the main message of the session. Design your table before you collect a single row. Collect data straight into that Tidy structure. Analyse from a flat copy and keep wide or pivoted views separate. Then when it's time to share, the table is already FAIR and sharing is quick. Every FAIR spreadsheet needs three kinds of metadata. Technical metadata describes the table itself. This is the data dictionary: for each column, its name, type, unit, description and allowed values. Spell out any in-house abbreviations, and define your missing-value code once and use it everywhere. Provenance metadata describes how the data was produced: renamed variables, recoded values, derived columns and quality-control steps. Prefer scripted changes in R or Python over manual edits in Excel, because a script can be rerun and checked. If you use an AI tool to clean or transform data, record exactly what it changed. Discovery metadata lets people find and cite the dataset: title, creator, description, licence and identifiers. Fill it in before the data is public; it costs little now. Use international standards where you can: ISO 8601 for dates, standard units, recognised country codes. You can keep all this in a README file, a README tab in the workbook, or a formal package such as Frictionless Data or RO-Crate."
    tip: "Optional discussion: how much of your work is cleaning up a spreadsheet just before submission or publication? Walk through the example data dictionary (below): sample_id, treatment, collection_date and value. For provenance, name the four things to record: renamed variables, recoded values, derived variables and quality-control steps. The source slides use MedDRA as a vocabulary example; use one closer to your audience, and point them to FAIRsharing to find theirs."
    slides:
      - headline: "Build FAIR from the beginning"
        intro: "Make the table FAIR when you create it, then use that same table throughout the study."
        numbered: true
        cards:
          - title: "Design"
            text: "Plan and document the structure, headers and validation before you collect a single row."
          - title: "Collect"
            text: "Enter data straight into the Tidy structure. Don't let convenience formatting creep in."
          - title: "Use"
            text: "Analyse from a Tidy copy. Keep pivoted or wide views separate, and keep the code that made them."
          - title: "Share"
            text: "The table is already FAIR, so publishing is quick."
        task:
          who: "With your neighbour"
          minutes: 2
          steps:
            - "How much of your work is cleaning up a spreadsheet just before you submit or publish it?"
          then: "A few people share"
      - headline: "Three kinds of metadata, every spreadsheet"
        cards:
          - title: "Technical"
            text: "Describes the table itself. A data dictionary: variable names, types, units, allowed values, abbreviations, validation rules."
          - title: "Provenance"
            text: "Describes how the data was produced. Every renamed, recoded or derived variable, ideally recorded in code."
          - title: "Discovery"
            text: "Describes the dataset so it can be found and cited: title, creator, description, licence, identifiers. Fill it in before going public."
        prompt: "Keep it in a README file, a README tab, or a package such as Frictionless Data or RO-Crate"
      - headline: "The data dictionary is essential"
        intro: "Define every column: spell out abbreviations, and give units, a description, the data type, validation and, for more complex data, keys."
        table:
          head: ["Variable", "Type", "Unit", "Description and allowed values"]
          rows:
            - ["sample_id", "string", "n/a", "Unique identifier; links to all related records"]
            - ["treatment", "string", "n/a", "Controlled list agreed with the study team, never free text"]
            - ["collection_date", "date", "n/a", "ISO 8601 (YYYY-MM-DD)"]
            - ["value", "number", "stated in the metadata", "Use one defined missing-value code (e.g. -9999) for not recorded, never 0"]
      - headline: "Write the data dictionary"
        intro: "Use your fixed table from step 5."
        task:
          who: "In pairs"
          minutes: 4
          steps:
            - "Write the dictionary entry for three columns: organism, pixel_size_um and treatment"
            - "For each: type, unit, description, allowed values, missing-value code"
            - "List the changes you made to the original table. That's your provenance record."
          then: "One pair reads out their treatment entry"
      - headline: "Example entries"
        table:
          head: ["Variable", "Type", "Unit", "Description and allowed values", "Missing"]
          rows:
            - ["organism", "text", "n/a", "Scientific name, e.g. Drosophila melanogaster", "NA"]
            - ["pixel_size_um", "number", "micrometres per pixel", "Physical size of one pixel", "NA"]
            - ["treatment", "text", "n/a", "Controlled list: control; drug1 = [name and dose]; drug2 = [name and dose]", "NA"]
          credit: "One possible answer, written for this playbook"
        lines:
          - "Provenance: renamed the files; Ch2 → channel_2; moved 512x512 to image_size_px; organism names and dates standardised (ISO 8601)"
        prompt: "Nobody outside the team knows what drug1 is until the dictionary says so"
      - headline: "Document every transformation"
        numbered: true
        cards:
          - title: "Renamed variables"
            text: "If you shorten or clean up a column name, record the old and new names."
          - title: "Recoded values"
            text: "If you re-categorise values, for example mapping free text to a controlled list, record the mapping."
          - title: "Derived variables"
            text: "For any calculated column, record the formula or logic as well as the result."
          - title: "Quality control"
            text: "QC steps are part of provenance. Record them explicitly."
      - headline: "Make it findable, even before it's public"
        cards:
          - title: "DataCite-level descriptors"
            items: ["Title", "Creator(s)", "Description", "Licence", "Identifiers", "Funders"]
          - title: "International standards"
            items:
              - "Dates and times: ISO 8601 (YYYY-MM-DD)"
              - "Units: recognised international units, stated in the variable name or the metadata"
              - "Country codes: an internationally recognised standard"
              - "Vocabularies: check FAIRsharing for your discipline's standard (e.g. MedDRA)"
  - title: "Going public with no dedicated repository"
    minutes: "48–53"
    short: 4
    cut: "Show the four points; drop the discussion."
    script: "What do you do when there's no discipline repository for your data? A few things to weigh up. Ask your institution's data lead where to host it; many institutions have their own repository and experts who have already thought this through. Find the data management plan. Ideally there's one before collection starts, and if it's written properly it says where the data will be shared. Anonymise data before publishing it. And watch out for export control: hosting data with an external service can move it abroad without anyone intending to. If your institution doesn't have a repository, a journal may recommend a general repository for data that supports a paper; otherwise look in FAIRsharing for a suitable one. No dedicated repository still means the same technical, provenance and discovery metadata, wherever the data ends up."
    tip: "If someone is required to use a particular repository, their institutional policy comes first. Journals sometimes recommend a general repository for data that supports a paper."
    slides:
      - headline: "Going public when there's no dedicated repository"
        table:
          head: ["Consideration", "What to do"]
          rows:
            - ["Where to host it", "Ask your institution's data lead. Many institutions have their own repository."]
            - ["Data management plan", "Ideally there's one before collection starts. Find it. If it's written properly, it says where the data will be shared."]
            - ["Anonymisation", "Anonymise before publishing, as your ethics or governance process requires."]
            - ["Export controls", "Watch for export control and trusted-research issues. Hosting data externally can move it abroad without anyone intending to, for example to a US-based platform."]
        prompt: "Do you know where your data would go? Hands up if you do."
  - title: "Challenges and wrap-up"
    minutes: "53–60"
    short: 5
    cut: "Read the takeaways and run challenges and failings as one short discussion, or skip it."
    script: "Some challenges you may meet. No dedicated RDM support: templates, checklists and automation take some of the load off researchers. Resistance to change: framing this as protecting your future self works better than compliance. Getting FAIR into postgraduate training, even assessing how FAIR a project's data is, helps in the long run. And AI tools for cleaning data raise provenance questions, so record any use and avoid changes you can't reproduce. Failing is a good way to learn. Four common ones: we'll tidy it up before we publish; the undocumented VLOOKUP; we know what drug1 means; and one workbook doing every job, with raw data, cleaned data and a pivot table in one file and no way to tell which is the source. Does anyone want to share an anonymised example from their own work where this went wrong? To finish: name one thing you'll change in your next spreadsheet."
    tip: "If someone says it isn't worth the time, don't argue in the abstract. A FAIR spreadsheet protects their own ability to reuse the data, supports citation and credit, saves fixing a messy spreadsheet later, and supports research integrity. Ask whether a reanalysis of theirs was ever blocked by poor documentation. Send the data dictionary template and the resources afterwards."
    slides:
      - headline: "Challenges, and how to make the case"
        cards:
          - title: "Lack of dedicated RDM support"
            text: "A real barrier. Templates, checklists and automation take some of the load off researchers."
          - title: "Cultural resistance"
            text: "Common. Framing this as protecting your future self works better than a compliance argument."
          - title: "Embedding FAIR practice early"
            text: "Including FAIR data practice in postgraduate programmes, even assessing it in research projects, is a promising long-term step."
          - title: "AI tools for data cleaning"
            text: "They raise provenance questions. Record any use, and avoid changes you can't reproduce."
      - headline: "Common failings: a good way to learn"
        cards:
          - title: "\"We'll tidy it up before we publish\""
            text: "Fixing it afterwards is slower and less reliable than building it in. By then, half the context is forgotten."
          - title: "The undocumented VLOOKUP"
            text: "A calculated column with no record of its formula or source list. Useful once, unusable by anyone else."
          - title: "\"We know what drug1 means\""
            text: "In-house shorthand becomes meaningless within a year, even to the people who wrote it."
          - title: "One workbook, many jobs"
            text: "Raw data, cleaned data and a pivot table in one file, with no way to tell which is the source."
        prompt: "Has one of these happened to you? Share an anonymised example."
      - headline: "Key takeaways"
        numbered: true
        cards:
          - text: "Design the spreadsheet as a FAIR table before you collect a single row"
          - text: "Tidy Data underlies everything else: one row per observation, one column per variable, one value per cell"
          - text: "You need all three kinds of metadata: technical, provenance and discovery"
          - text: "Use ISO standards for dates, units and country codes, and check FAIRsharing for vocabularies"
          - text: "With no dedicated repository: ask about your institutional repository, anonymise, have a DMP, watch export control"
          - text: "Keep raw, unaltered data in its own file, separate from anything processed"
      - headline: "One thing you'll change"
        task:
          who: "Everyone"
          steps:
            - "Name one thing you'll change in your next spreadsheet"
          then: "Go round the room, or post it in the chat if online"
---

## The situation

A lot of research data has no dedicated public repository, and a spreadsheet is how most researchers hold it. Here, spreadsheet means any tabular format: Excel, Google Sheets, CSV or TSV.

Run this module with researchers, postdocs, PhD students, lab managers, and anyone who creates, curates or hands over tabular data where no discipline repository or standard exists. It assumes they know what FAIR is; if not, run [What is FAIR?](../00-what-is-fair/) first. If their data type does have a community repository, use [When a public repository solves most of the problem](../02-public-repos/) instead. For code and analysis scripts, see [FAIRification of GitHub repositories](../05-github-side-room/).

## The decision

Participants leave able to spot the common problems in a spreadsheet, build their next one Tidy from the start, and name the three kinds of metadata it needs, so that sharing it later is quick wherever the data ends up.

## The session plan

{{ page.timing_note }}

<div class="session-slot"></div>

## Participant materials

| Material | Source | Status |
|---|---|---|
| Exercise table and answers (step 3) | EuroBioimaging training material | **Reused**, as suggested in the Contentathon source material |
| Tidy Data | [data.europa.eu introduction](https://data.europa.eu/apps/data-visualisation-guide/intro-to-tidy-data), [tidyr vignette](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html) | **Linked** |
| Spreadsheet lessons and curation | [Data Carpentry](https://datacarpentry.org), the Data Curation Network's Excel data curation primer (GitHub: DataCurationNetwork/data-primers), Open Data Editor (Open Knowledge Foundation) | **Linked** |
| Describing and packaging a table | [Frictionless Data](https://frictionlessdata.io/introduction/), [RO-Crate](https://www.researchobject.org/ro-crate/), [DataCite](https://datacite.org) for discovery fields | **Linked** |
| Discipline standards and vocabularies | [FAIRsharing](https://fairsharing.org) | **Linked** |
| Longer alternative to the exercise (10 min) | [Data Carpentry, Spreadsheets for ecologists: Formatting data tables](https://datacarpentry.github.io/spreadsheet-ecology-lesson/01-format-data.html), messy survey data [on Figshare](https://ndownloader.figshare.com/files/2252083), CC BY 4.0 | **Reused unchanged**. With the person next to you, open the file, find what's wrong, and discuss how you'd clean the 2013 and 2014 tabs and combine them into one spreadsheet, without changing the original. Use the lesson's [common mistakes](https://datacarpentry.github.io/spreadsheet-ecology-lesson/02-common-mistakes.html) as the answers. |
| Bad habits, tips, example data dictionary, failings and takeaways | Contentathon slide deck (lead: Richard Ostler); the tips reuse EuroBioimaging training material | **Handout**, below |
| Data dictionary template (step 6) | Written at the Contentathon (lead: Richard Ostler) | **Declared gap**, below. Adapt it as a team. |

### Exercise: what can you do with this data?

In pairs, you have five minutes. List every problem that would stop someone else reusing this dataset reliably.

| File Name | Imaging Modality | Organism | Channel 1 | Ch2 | Resolution (um/pixel) | Experiment Date | Treatment |
|---|---|---|---|---|---|---|---|
| image_1.tif | Confocal | fly | actin-GFP | myosin:mCherry | 0.05 | 2023/01/15 | control |
| sample_B.tif | Microscopy | Drosophila | actin:GFP | myosin:mCherry | 512x512 | 02-15-2023 | drug1 |
| sample_3.tiff | | mouse | actin | myosin:mCherry | 0.1 | Jan 25th, 2023 | drug2 |

Source: EuroBioimaging training material.

<details markdown="1">
<summary><strong>Answers:</strong> keep these back until after the exercise.</summary>

| Column | Problem |
|---|---|
| File Name | Inconsistent image names and file extensions (.tif and .tiff). |
| Imaging Modality | "Microscopy" doesn't say which technique; one cell is empty. |
| Organism | Mixes a scientific name (Drosophila) with common names (fly, mouse); "fly" and "Drosophila" are probably the same organism. |
| Channel 1 | Formatted differently between rows (actin-GFP, actin:GFP); unclear whether "actin" in row 3 means the same as actin-GFP. |
| Ch2 | Inconsistent header. Is it Channel 2, or something else? |
| Resolution (um/pixel) | "512x512" isn't a resolution in micrometres per pixel. It's most likely the image size in pixels, in the wrong column. |
| Experiment Date | Three date formats in three rows; none is unambiguous and none is ISO 8601. |
| Treatment | "drug1" and "drug2" can't be interpreted without knowing what the drugs are. |

Across the whole sheet: spaces in headers and file names cause problems for many tools; inconsistent capitalisation of headers makes code error-prone; there's no data dictionary or README, which would have prevented most of these problems; and there's no missing-value code, so the empty Imaging Modality cell has no stated meaning.

</details>

### What a bad spreadsheet looks like (step 4)

1. More than one table per worksheet. Blank rows and columns don't stop a script reading them as one table.
2. Metadata on the same worksheet as the data.
3. Raw and processed data mixed in one workbook, with nothing saying which is which.
4. Many data tables crammed into one file, which makes each harder to find.
5. Colour, fonts, bold or italics used to carry information that a computer can't read.
6. Merged cells in headers or across rows.
7. More than one header row.
8. Mixed naming conventions, such as common and scientific names together.
9. Inconsistent entries for missing data: blank, -9999 and "N/A" are not the same.
10. Special characters in headers or values, and data recorded in cell comments.

### Tips for spreadsheets (step 4)

| Do | Don't |
|---|---|
| Use the first row as the header | Use colour, bold or fonts to carry information |
| Put one fact in each cell | Spread one heading across columns or merge header cells |
| Keep one table per sheet | Use commas as thousands separators (they clash with CSV) |
| Set a format for each cell where you can (date, number) | Record data in cell comments |
| Add a README tab | Mix raw and processed data in one file |
| Decide how you'll code missing values | Use special characters in headers or file names |
| Turn off or control automatic conversions, and check key fields after entry | |

### Example data dictionary (step 6)

| Variable | Type | Unit | Description and allowed values |
|---|---|---|---|
| sample_id | string | | Unique identifier; links to all related records |
| treatment | string | | Controlled list agreed with the study team, never free text |
| collection_date | date | | ISO 8601 (YYYY-MM-DD) |
| value | number | stated in the metadata | Use one defined missing-value code for "not recorded", never 0 |

### Common failings (step 8)

- **"We'll tidy it up before we publish."** Fixing a spreadsheet afterwards is slower and less reliable than building it right, and by then half the context is forgotten.
- **The undocumented VLOOKUP.** A calculated column with no record of its formula or source list: useful once, unusable by anyone else.
- **"We know what drug1 means."** In-house shorthand becomes meaningless within a year, even to the people who wrote it.
- **One workbook, many jobs.** Raw data, cleaned data and a pivot-table summary in one file, with no way to tell which is the source.

### Key takeaways (step 8)

1. Design the spreadsheet as a FAIR table before you collect a single row.
2. Tidy Data underlies everything else: one row per observation, one column per variable, one value per cell.
3. You need all three kinds of metadata: technical (the data dictionary), provenance (every transformation) and discovery (title, creator, description, licence, identifiers).
4. Use ISO standards for dates, units and country codes, and check FAIRsharing for your discipline's vocabularies.
5. With no dedicated repository, ask about your institutional repository, anonymise, have a data management plan and watch for export control.
6. Keep the raw, unaltered data in its own file, separate from anything processed.

### Data dictionary template

A starting point to send after the session. Agree the final structure as a team or institute so data dictionaries can be compared across projects.

| Field | What to record |
|---|---|
| Variable name | The exact column header as it appears in the spreadsheet |
| Data type | For example string, integer, number, date, true/false |
| Unit | If one applies (mg, cm, seconds). Write "n/a" if none applies rather than leaving it blank. |
| Description | A plain-language explanation of what the variable is |
| Allowed values or vocabulary | A fixed list of values, or the ontology or standard used |
| Abbreviations | Whether an abbreviation is a community term (name the standard) or in-house (define it in full here) |
| Missing-value code | The single agreed code for "not recorded", such as NA, used for every variable |
| Validation rule | Any constraint, such as must be positive, must be a date, must be from a fixed list |
| Keys | If this table links to another, how (optional, for more complex datasets) |

The data dictionary is the technical metadata. Keep a separate record of provenance (every change, ideally in code) and fill in the discovery metadata (title, creator, description, licence, identifier) before the dataset is shared.

## What to adapt locally

- **Your institutional repository**: <span class="repo-slot" data-profile-repo>[ your institution's preferred repository ]</span>
- **DMP advice**: <span class="repo-slot" data-profile-help="dmp">[ DMP advice, usually the library ]</span>
- **Anonymisation, ethics and export control**: <span class="repo-slot" data-profile-help="ethics">[ ethics or legal office ]</span>
- **Help with scripts and conversion**: <span class="repo-slot" data-profile-help="it">[ IT or research computing ]</span>
- **The exercise table**: swap in a messy table from your own institution that matches your audience's discipline, keeping the same kinds of problem. A different kind of data from theirs can also work well, because FAIR is about someone else being able to understand the data.
- **The vocabulary example**: use a controlled vocabulary or ontology your audience knows.

Before the session, print the exercise table (one per pair) and keep the answers back. In person, seat people in pairs or threes. Online, use breakout rooms of two or three, or the chat if you can't.

## What goes wrong

**The audience doesn't work with imaging data.** The problems are the same in any table, and people don't need imaging expertise to spot them. Or swap in your own table.

**The exercise runs long.** Cap the feedback at three minutes; the answers cover everything, and the rest of the session depends on the time.

**Someone's institute already has a data dictionary standard.** Use theirs. Check it covers the three kinds of metadata and Tidy Data; the principles matter more than this template.

**Someone asks about a specific standard you don't know.** Point them to FAIRsharing rather than improvising details.

**You run out of time before going public.** Show the four points in under a minute and send the details afterwards. Don't cut the exercise, Tidy Data or the three kinds of metadata. The key message is to use a repository, institutional or general, because repositories support FAIR.

**"It isn't worth the time."** See the tip in step 8. Real examples persuade better than principles.

## If you have more time

**Missing data and coded values** (with step 4). Null, an empty string and zero are different values and are handled differently in code, for example when filtering. Null means no data; zero means a measured value of zero. Software and languages treat blanks and nulls differently. Coded values can categorise missing data, or values at a detection limit, but text codes can turn a numeric column into text, and numeric codes give wrong results if they aren't excluded from calculations. Make sure everyone understands how missing data and codes are handled, and record it in the data dictionary.

**Normalised data** (after Tidy Data). Analysis often uses wide, cross-tabulated tables with duplicated values, lists in cells, or values turned into column headers. Normalised data stores each value once, in related tables: for example one table of monitoring sites and another of the observations made at each. A unique key column (site_id) identifies each site, and the observations table refers to it, so the two can be joined safely. Frictionless Data can describe these relationships.

**Data types** (with step 4 or 6). Excel doesn't enforce data types. Cell formats only change how values are displayed, and you can still type text into a number column. Validation rules help, but they're lost when you save as CSV, and CSV has no column types either. So record column types and validation rules in the data dictionary. Frictionless Data offers a formal way to do this that Python and R can use when loading the data.
