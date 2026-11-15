---
title: "Spot the Mess"
summary: "Hand people a deliberately awful dataset and ask them to find everything wrong with it. In ten minutes it shows what 'not FAIR' looks like in practice, gets a few laughs and needs no theory."
barrier: "\"It's dry admin, not 'real' research\""
audience_label: "Students, PhDs, researchers – any size"
group_size: "Small groups of 2–5"
time: "15–20 min"
prep: "Print the handout (1 per group). Facilitator keeps the answer key."
materials: "Printed dataset handout, pens; answer key on your screen"
drop_in: "2–3 minutes a visitor. The dataset printed as a big poster, sticky notes."
source: "In the spirit of the classic 'messy spreadsheet' exercises from Data Carpentry and EMBL-EBI / EuroBioimaging FAIR training. This dataset is original to this playbook."
source_url: "https://datacarpentry.org/spreadsheet-ecology-lesson/"
licence: "CC BY 4.0 – swap the dataset for one from your own field"
playbook: [communicate-advocate]
tags: [activity, game, spreadsheet, hands-on, printable]
---

## How to run it (15–20 min)

1. **Set it up (2 min).** Give each small group the printed dataset and say: "A colleague sent you this dataset to reuse. Find everything wrong with it, anything that would slow you (or a computer) down." Don't use FAIR jargon yet.
2. **Hunt (7 min).** Groups mark up the sheet: circle, annotate, discuss. Encourage them to find as many problems as they can.
3. **Share back (5 min).** Go round the room. Each group names one problem that nobody else has mentioned yet. Tally them on the board. The list usually gets surprisingly long.
4. **Wrap up (3 min).** Ask which of these problems would stop a machine finding or using the data, and which would stop a human. Map a handful onto F‑A‑I‑R. Then close with: "This is what 'not FAIR' looks like in practice."

## Debrief questions

- If this landed in your inbox in two years, could you use it?
- Which single change would make the biggest difference? (Usually: consistent naming, one date format and a README.)
- How much of this takes extra effort, and how much is habit?

## Facilitator tip

Don't try to cover the complete list. The point is that a small, boring spreadsheet can hide this many problems. If a group stalls, give them a hint ("look at the dates…") and let them carry on.

## Run it as a drop-in stand

Print the messy dataset as a big poster (A1 or A2, or tape four A3 sheets together) in a faculty foyer or atrium, and let passers-by find the problems.

- **Bring:** the dataset poster, sticky notes, pens, the sign below, and the answer key printed on a separate sheet.
- **Set up:** put the poster at eye level with sticky notes and pens next to it. Add a tally on the sign: "Problems found so far: \_\_ / 10".
- **A visit:** spot a problem, write it on a sticky note and stick it where it is. Most people stop to read what others have found, then try to find one nobody has spotted yet.
- **Keep it going:** update the tally through the day. Pin the answer key up at the end of the day, or at a set time ("Answers at 3pm") to bring people back.
- **Follow up:** put a poster from the [promo kit]({{ '/promo/' | relative_url }}) next to the stand with a QR code for your next session.

## Make it yours

Swap in a messy example from your own domain or institution, such as imaging, sequencing metadata or survey exports. The messier and more realistic it is, the more people laugh and the clearer the point.

<div class="print-sheet">
<div class="sheet-kicker">Participant handout – print 1 per group</div>
<h3>Spot the mess</h3>
<p class="print-hint">A colleague sent you this dataset to reuse. Mark up everything that's wrong with it, anything that would slow down you, a collaborator or a computer.</p>
<table>
<thead>
<tr><th>Sample</th><th>Organism</th><th>Tissue</th><th>Treatment</th><th>conc (mg/ml)</th><th>Date collected</th><th>Reading 1</th><th>notes</th></tr>
</thead>
<tbody>
<tr><td>S1</td><td>mouse</td><td>liver</td><td>control</td><td>0.5</td><td>03/04/2024</td><td>12.3</td><td>ok</td></tr>
<tr><td>sample_2</td><td>Mus musculus</td><td>Liver</td><td>Drug A 10uM</td><td>0.5</td><td>4 March 2024</td><td>11.8</td><td></td></tr>
<tr><td>3</td><td>mouse</td><td>liver + spleen</td><td>drugA</td><td>n/a</td><td>2024-03-05</td><td>high</td><td>recheck?? (marked in red)</td></tr>
<tr><td>S4</td><td>human</td><td>Liver</td><td>DrugA_10</td><td>0,5</td><td>05/04/24</td><td>9.1</td><td>see comment</td></tr>
</tbody>
</table>
<p class="print-hint">Your list: ________________________________________________________________________________________</p>
</div>

<div class="print-sheet">
<div class="sheet-kicker">Facilitator answer key – keep to yourself</div>
<h3>What's wrong (and the fix)</h3>
<ol>
<li><strong>Sample IDs have no scheme</strong> (<code>S1 / sample_2 / 3 / S4</code>), so you can't reliably reference or link them. → one consistent ID format. [Findable, Reusable]</li>
<li><strong>Organism mixes common and scientific names</strong> (mouse vs Mus musculus), and one row is human. Is this one dataset or several? → one column, scientific names, controlled vocabulary. [Interoperable, Reusable]</li>
<li><strong>Tissue has inconsistent case</strong> (liver/Liver) and a non-atomic value ("liver + spleen" is two values in one cell). → one value per cell; consistent terms. [Interoperable]</li>
<li><strong>Treatment written 4+ ways</strong> for what is probably the same thing (<code>control</code>, <code>Drug A 10uM</code>, <code>drugA</code>, <code>DrugA_10</code>), with the dose sometimes buried in the label. → controlled vocabulary and a separate dose column. [Interoperable, Reusable]</li>
<li><strong>conc: "0,5" uses a comma decimal</strong>, which breaks in most software, and "n/a" vs blank means there is no defined missing-value convention. → dot decimals; one agreed code for missing (e.g. <code>NA</code>). [Interoperable, Reusable]</li>
<li><strong>Dates in four formats</strong> (<code>03/04/2024</code>, <code>4 March 2024</code>, <code>2024-03-05</code>, <code>05/04/24</code>), and DD/MM vs MM/DD is ambiguous. → ISO 8601 (<code>YYYY-MM-DD</code>). [Interoperable]</li>
<li><strong>"Reading 1" mixes numbers with text</strong> ("high") and gives no units. → numbers only; put units in the header or metadata. [Interoperable, Reusable]</li>
<li><strong>Flag hidden in a cell colour</strong> ("recheck??" in red). Machines can't read it, it isn't accessible, and it's lost if printed in black and white. → a proper <code>QC</code> column with values instead of colour. [Accessible, Interoperable]</li>
<li><strong>Header quirks</strong>: spaces and brackets (<code>conc (mg/ml)</code>, <code>Reading 1</code>) and inconsistent case. → simple, consistent, code-friendly headers. [Interoperable]</li>
<li><strong>No README or data dictionary</strong>. What is "Reading 1"? What does "ok" mean? → a short README tab defining every column. [Reusable]</li>
</ol>
<p class="print-hint"><strong>Biggest payoff first:</strong> consistent IDs · one date format (ISO 8601) · a README. These three habits get you most of the way.</p>
</div>

<div class="print-sheet stand-sign">
<div class="sheet-kicker">Stand sign – print A4 or A3</div>
<h3>Spot the mess</h3>
<p class="sign-sub">A colleague sent this dataset to reuse. How many problems can you find?</p>
<ol>
<li>Spot a problem in the spreadsheet.</li>
<li>Write it on a sticky note and stick it on.</li>
<li>Found one nobody else has? Nice.</li>
</ol>
<p class="sign-tally">Problems found so far: ______ / 10</p>
</div>
