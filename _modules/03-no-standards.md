---
title: "When there is no community standard or repository"
number: 3
summary: "What to do when researchers have data that doesn't fit a standard repository – bespoke spreadsheets, custom experimental data, mixed file types. Covers minimum-viable FAIR practices, GitHub as an interim home, and how to add structure where none exists."
estimatedMinutes:
  short: 10
  long: 50
prerequisites: ["00-what-is-fair", "01-how-to-do-fair"]
tags: [spreadsheets, github, custom-data]
playbook: [fairification]
audience: [researcher, phd-student, postdoc]
scenario: [starting-project, mid-project]
dataType: [spreadsheet, mixed]
intent: [how-to, hands-on-exercise]
---

This is the harder case, and the one researchers face most often. The usual advice to "just deposit it in ENA" doesn't apply here, but the FAIR principles still do.

## Minimum viable FAIRification for non-standard data

1. **Pick a generic repository** – Zenodo, Figshare, or Dryad. They give you a DOI and stable hosting.
2. **Add a README** – describe what each file is, in plain language. This acts as your interoperability layer.
3. **Use open, sustainable formats** – CSV instead of XLSX, TSV instead of proprietary binary formats, PNG instead of custom image formats.
4. **Document your columns** – even a simple data dictionary makes a spreadsheet much easier for others to understand and reuse.
5. **License explicitly** – CC-BY 4.0 is a safe default for data.

## The "before" and "after" view

Walk through a real example:

> **Before:** `experiment_final_v3_FINAL.xlsx` on a shared drive. Three sheets. Column headers like `Sample`, `Val1`, `Notes`. No licence. No README.
>
> **After:** Zenodo deposit with DOI. CSV per sheet. README explaining the experiment. Data dictionary describing every column. CC-BY 4.0 licence. It's the same researcher's data, and now other people can reuse it.

Showing this contrast helps people see what FAIR means in practice.

## Side conversation: using GitHub repositories

GitHub works well for:

- Code that processed the data
- Analysis scripts
- Small reference datasets (<100MB)
- Documentation and protocols

GitHub is not a long-term data repository. For the data itself, pair it with Zenodo, which mints DOIs from GitHub releases automatically.
