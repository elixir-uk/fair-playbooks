---
title: "FAIR or Unfair?"
summary: "Show a data-sharing scenario, the whole room votes FAIR or Unfair, then you reveal the answer and why. It makes an abstract idea concrete in about 90 seconds a card, and the 'obvious' answers often start the best arguments."
barrier: "\"FAIR is abstract\" – I can't picture what it means"
audience_label: "Students, researchers, mixed groups – works well in a lecture hall"
group_size: "Whole room (any size)"
time: "10–15 min"
prep: "Print or project the cards. Optional: a live poll (Slido/Menti) for the vote."
materials: "Scenario cards (below), a way to vote (hands, or a live poll)"
drop_in: "About 30 seconds a visitor. Two jars and a pile of tokens."
source: "Original to this playbook. The format is a common 'FAIR or not?' engagement pattern; the scenarios are new."
licence: "CC BY 4.0 – add your own scenarios"
playbook: [communicate-advocate]
# For Build a session (values in _data/choices.yml)
audience: [researcher, phd-student, postdoc, pi, decision-maker, rdm-peer]
scenario: [advocating-internally, training-team, starting-project]
dataType: [n-a, mixed]
intent: [motivate, hands-on-exercise]
tags: [activity, game, voting, auditorium, printable]
---

## How to run it (10–15 min)

1. **Set up (1 min).** Say: "I'll show you a data-sharing situation. You vote: is it FAIR or unfair? Then we find out." People vote with hands up, or with a live poll if you have one.
2. **Play the cards (about 90 seconds each).** Read a scenario, take the vote, then reveal the verdict and the one-line reason. Keep the pace up.
3. **Use the split votes.** The best discussions come from cards that split the room. Before you reveal the answer, ask one "FAIR" voter and one "Unfair" voter to explain their choice. Hearing each other's reasons is where most of the learning happens.
4. **Wrap up (1 min).** Say: "These are all real situations. They show the difference between data someone can reuse and data that sits unused on a hard drive."

## Debrief questions

- Which one surprised you most?
- What do the "unfair" ones have in common? (Usually: no persistent link, no licence, no metadata, or access controlled by one person.)
- Which mistake do you recognise from your own field?

## Facilitator tip

Put the debatable cards in the middle (the Trusted Research Environment, the DOI with no metadata, the dataset with no licence). These split the room and lead to the best discussion. The clear-cut ones are there to warm up the voting.

## Run it as a drop-in stand

Set it up in a faculty foyer, atrium or café and let people vote as they walk past. Nobody needs to know what FAIR is to have an opinion on "I email the Excel file to anyone who asks".

- **Bring:** three or four scenario cards printed large (A3), two jars or tubs labelled FAIR and UNFAIR, a bowl of tokens (dried beans, pom-poms or sticky dots), the sign below, and something to hide the answers under, such as a folded flap of card.
- **Set up:** one card per jar pair, or rotate cards through the day. Put the verdict and the one-line reason under a flap beneath each card.
- **A visit:** read the card, drop a token in a jar, lift the flap. If you're staffing the stand, ask "what made you pick that one?" and talk it through.
- **Keep it going:** the jars fill up and show how the building voted, which draws people over. Card 4 (the Trusted Research Environment) and card 3 (the DOI with no description) divide opinion most.
- **Follow up:** put a poster from the [promo kit]({{ '/promo/' | relative_url }}) next to the stand with a QR code for your next session.

## Make it yours

Add two or three scenarios from your own discipline or institution, such as a repository your researchers use or a real "available on request" horror story. Local examples make the strongest impression.

<div class="print-sheet">
<div class="sheet-kicker">Scenario cards – project or print &amp; hold up</div>
<h3>FAIR or Unfair?</h3>
<style>
  .vote-deck { display:grid; grid-template-columns:1fr 1fr; gap:0.7rem; }
  .vote-card { border:1.5px solid var(--border-strong); border-radius:10px; padding:0.8rem 0.9rem; }
  .vote-card b { display:block; font:600 0.72rem/1 var(--font-mono); color:var(--coral); margin-bottom:0.35rem; }
  .vote-card p { margin:0; font-size:0.92rem; }
</style>
<div class="vote-deck">
  <div class="vote-card"><b>Card 1</b><p>"I shared my data – I email the Excel file to anyone who asks."</p></div>
  <div class="vote-card"><b>Card 2</b><p>Deposited in a domain repository (e.g. ENA) with an accession number, standard metadata, openly downloadable.</p></div>
  <div class="vote-card"><b>Card 3</b><p>It's on Zenodo with a DOI, but it's a ZIP file with no description and no README.</p></div>
  <div class="vote-card"><b>Card 4</b><p>Sensitive health data in a Trusted Research Environment. The metadata is public and searchable; access is by application.</p></div>
  <div class="vote-card"><b>Card 5</b><p>A thoroughly documented dataset, but no licence is stated anywhere.</p></div>
  <div class="vote-card"><b>Card 6</b><p>"Data available from the authors on request", mentioned in the paper's methods.</p></div>
  <div class="vote-card"><b>Card 7</b><p>A CSV with a README data dictionary, in the institutional repository with a persistent handle.</p></div>
  <div class="vote-card"><b>Card 8</b><p>Analysis code on GitHub with a README, an open licence, and a tagged Zenodo release (DOI).</p></div>
</div>
</div>

<div class="print-sheet">
<div class="sheet-kicker">Facilitator answer key – keep to yourself</div>
<h3>Verdicts and reasons</h3>
<ol>
<li><strong>UNFAIR.</strong> No persistent link, not findable, access depends on one person, proprietary format. Sharing on request does not make data FAIR. [F, A]</li>
<li><strong>FAIR.</strong> Persistent ID, community-standard metadata, indexed and openly retrievable. A good example to follow. [F, A, I, R]</li>
<li><strong>Not really.</strong> Findable (it has a DOI), but with no metadata, no README and no licence nobody can understand or reuse it. A DOI on its own does not make data FAIR. [I, R]</li>
<li><strong>FAIR.</strong> This is the key card, because FAIR does not mean open. The metadata is findable and accessible, and controlled access by application is fine (A1.2). [F, A]</li>
<li><strong>UNFAIR.</strong> Without a licence, legally no one can reuse it. One missing line is enough to fail R. [R]</li>
<li><strong>UNFAIR.</strong> Not findable and not accessible. Access depends on the author (who may leave or stop replying), and there is no persistent identifier. [F, A]</li>
<li><strong>FAIR.</strong> Open format, documented with a data dictionary, with a persistent handle. A simple setup that works. [F, A, I, R]</li>
<li><strong>FAIR.</strong> Code can be FAIR too. Persistent ID, open licence, documented, archived. FAIR applies to software as well as data. [F, A, I, R]</li>
</ol>
</div>

<div class="print-sheet stand-sign">
<div class="sheet-kicker">Stand sign – print A4 or A3</div>
<h3>FAIR or Unfair?</h3>
<p class="sign-sub">Is this a good way to share research data? You decide.</p>
<ol>
<li>Read the card.</li>
<li>Drop a token in the FAIR jar or the UNFAIR jar.</li>
<li>Lift the flap to see if you were right.</li>
</ol>
</div>
