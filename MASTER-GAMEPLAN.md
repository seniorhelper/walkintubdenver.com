# walkintubdenver.com · MASTER GAMEPLAN
Last updated 2026-11-08 (overnight aging-network push). Network plan: Desktop\02 AGING SAFELY BATHS\07 Aging Safely Website Network\MASTER GAMEPLAN.md. Rules: C:\Users\zachw\aging-sweep\notes\RULES.md.

## Lane
Denver metro: cost, conversion, installers, suburbs, Colorado programs.

Every page here supports agingsafelybaths.com (quotes, installs) and never targets its head terms (walk in tubs, walk in tub cost, handicap showers, roll in showers, Medicaid/grants head terms). Max 2 followed network links per page; other network links nofollow; one nofollow Eye To Ad credit.

## Business facts
Aging Safely Baths & More, LLC. 1-888-779-2284, sales@agingsafelybaths.com. BBB A+ since 2012. Published prices only (RULES.md): walk-in tub about $15,500 installed after the $2,000 promo, $15,250 veterans, roll-in showers $13,500 to $17,000, wide/transfer/bariatric from about $19,000.

## Targets (one page owns one term)
- walk in tub denver
- tub to shower conversion denver
- walk in tub aurora co (and suburbs)

## Competitors (live check 2026-11-08; search results, not verified rank)
- consumeraffairs.com/denver: Safe Step top pick, $2,000 to $30,000 range
- retirementliving.com Denver: $10,000 to $20,000, generic
- bathplanet.com / kohlerwalkinbath.com Denver dealer pages

**How we beat them:** Health First Colorado process specifics, suburb pages with real local data, honest prices.

## Done tonight (2026-11-08)
- Quote forms now post to the company lead server (clients.eyetoad.com/lead/send.php, saves to disk first, then emails sales) through /lead-send.js, with the old sender (FormSubmit or EmailJS) as automatic fallback. Pilot verified in a live browser on walkintubsflorida.com.
- GA4 tag (property per site, events generate_lead, phone_click, estimator_use) confirmed on every indexable page; Search Console verification file googleadb17462a109b3ca.html present.
- Lighthouse (home page, live, 2026-11-08 early morning) recorded before and after in _overnight-reports/aging-sites-report.md.
- New /privacy/ page with footer link on all 37 pages.
- Home page and sitewide contrast fixes (section labels, footer, invisible dark-on-dark banner heading), underlined in-text links.
- GSC 28-day: 480 impressions, 0 clicks; 'walk in tub denver' 63 impressions: title/meta CTR is the lever.

## Next
1. Health First Colorado home modification benefit step by step (verify $14,000 cap and OT/PT evaluation on hcpf.colorado.gov in a browser; 403 to scripts)
1. Medicaid changes 2026-27 explainer for Colorado seniors (65+ exempt from work rules)
1. Denver hard water page only with Denver Water's annual report figures
1. Speed: TBT 330 ms mobile; defer non-critical scripts

## Morning to-dos (network)
- Add the six EmailJS satellites (seniorwalkintub, utahwalkintubs, walkintubdenver, walkintubscalifornia, walkintubschicago, walkintubstexas) to lead-config.php on clients.eyetoad.com so they stop falling back to EmailJS.
- Confirm where aging-site leads from the lead server are emailed (sales@agingsafelybaths.com?) and that the mail lands; fix eyetoad.com SPF/DMARC.
- Request indexing in Search Console for every new or changed URL listed in the report.
- AdSense: not added to these lead-gen pages on purpose (ads next to a quote form cost leads). Decide if any info-only page should carry it.

## Measurement
GA4 property per site (account 45765285), key events generate_lead and phone_click. Search Console: bare domain property, sitemap.xml submitted. Check queries and positions in GA4's Search Console report at the start of every project.

## 2026-11-10 (branch seo-leads-2026-11-10, not pushed)
Based on GSC Oct 25 to Nov 8 (side-session-notes GSC-GA4-DIAGNOSIS-2026-11-10.md): 581 impressions, 0 clicks; "walk in tub denver" 71 impr pos 12.9; 34 of 38 pages had no inline form.
- Inline quote form added near the end of 31 pages (17 city pages + 14 guides incl. areas-we-serve.html). Markup copied byte-for-byte from contact.html (#quoteForm), loads the same EmailJS SDK + /assets/quote-form.js + /lead-send.js, so lead-send.js wraps emailjs.sendForm exactly as on contact.html (checked in a browser: wrapper active, no console errors, no sideways scroll at 390px). Phone callbar "Free quote" on those pages now jumps to #free-quote instead of leaving for contact.html. Not submitted.
- Home title/meta rewritten for CTR: "Walk In Tubs Denver | Free Quote, Local Installer Since 2012".
- Timnath: the Fort Collins page already covers Timnath fully (title, permit office, FAQ), so nothing added. Watch "walk in bathtub timnath" (53 impr, pos 17.4) after the form change.
- Skipped on purpose: privacy, denver-senior-resources, denver-winter-help-older-adults (info pages) and denver-home-repair-accessibility-programs (has its own finder form).
Next: request indexing for the home page; recheck CTR on "walk in tub denver" around Nov 24.
