---
title: 'Why Unit Tests Matter: A Currency Converter Story'
pubDatetime: '2025-09-08'
description: Unit tests aren't optional. A simple USD -> INR converter exposed hidden risks, proving why tests safeguard code, teams, trust, delivery and peace of mind.
banner: '/images/why-unit-tests-matter-unsplash.jpg'
---

## A deceptively simple feature

Let's say your product team gets a simple request: "Add currency conversion to our app — start with USD → INR".

Easy, right? It's just multiplication.

That's how most people think of a feature like a currency converter. It looks simple. It feels like something that shouldn't take more than a day.

"Surely, we don't need to overthink testing for something this basic."

But here is where the story begins.

## The business target

Let's say we're building a currency converter for a payments product. The goal is clear: ship fast, ship reliably. Customers want to know exactly how much they'll be charged, and they won't forgive mistakes.

So the question is: how do we test this?

- Do we put this tiny program into a shared QA environment and test it end-to-end?
- Or do we equip ourselves with unit tests that provide fast, automated feedback without waiting for an environment to be set up?

## The 12 functional test cases

Before we go into the converter and think about adding new currencies, let's list the common use cases that our testing — manual or automated — will need to cover before we can ship the program. _These are not exhaustive tests, but just a representative set._

1.  Convert 1 USD → INR (basic)
2.  Convert 100 USD → INR (basic)
3.  Convert 4.56 USD → INR (fractional)
4.  Convert 100,000 USD → INR (large)
5.  Convert 83 INR → USD (basic)
6.  Convert 8300 INR → USD (basic)
7.  Convert 4500.85 INR → USD (fractional)
8.  Convert 10,00,000 INR → USD (large)
9.  Handle invalid currency code.
10. Handle zero amounts.
11. Handle negative amounts.
12. Handle exchange rate service failure.

In reality, we will end up with many more use cases, but for the purpose of this blog, let's assume these 12 cover 100% of our needs. We will take these 12 scenarios as a reference when we introduce scale in our journey.

## A simple program

Here is how a currency converter might look in pseudocode (not actual Java, just a readable structure):

> The converter is a function that takes an amount, from currency and to currency, grabs the latest exchange rate from an external service and returns the converted amount.

![Currency Converter](/images/currency-converter.png)

### How we test this program manually

A QA environment has to be created, the payments app installed, QAs enter data in forms, and then validate the above 12 scenarios. Let's say running these 12 scenarios manually takes ~3 hours.

> And beyond the hours spent, there's the human cost. Repeating the same steps across dozens of scenarios isn't just time-consuming — it's exhausting. People lose focus, mistakes creep in, and edge cases often get skipped because "we'll come back to it later." The result? Delays, missed bugs, and frustrated teams.

### How we test this program with unit tests

Unit tests are nothing more than a set of methods — each a use case — in _another program_ designed to validate the main program.

![Currency Converter Unit Tests](/images/currency-converter-unit-tests.png)

_In reality, we'd need 12+ such scenarios._

Notice how we didn't need to spin up an app, enter data in forms, or wait for the environment to refresh. All that's needed is to run the test program, and the tests directly validate the logic instantly.

## Change #1: Add a new currency

The business wants to expand beyond USD ←→ INR and **add GBP**. A small change, but suddenly we need to validate conversions in both directions.

**How the scope actually grows:**

- With 2 currencies (USD & INR), we had 2 directions: USD→INR and INR→USD.
- Adding GBP makes it 3 currencies. Now we have 3 pairs of currencies, and each pair has 2 directions = 6 directions in total.
- Each direction still needs our 12 functional scenarios. That's **36 tests** to be thorough.

### Reality in manual testing:

- QAs rarely have the time to prepare test data for 36 tests and run through the UI. They'll pick the most critical 12 and spend ~3 hours.
- That means two-thirds of the coverage is skipped.
- Edge cases (like service failure or large amounts) are often the first to be cut.
- Bugs creep through, timelines slip, and confidence takes a hit.

### With unit tests:

- All 36 scenarios are captured as methods.
- Each runs in milliseconds.
- Entire test suite completes in <1 second.
- Edge cases are always covered, because they cost nothing extra to test.
- Developers get feedback instantly before code even hits QA.

<script src="https://gist.github.com/saraiyakush/c16b4a7d861c70729c44d27dfbf14793.js"></script>

## Change #2: Add four more currencies

Now the business wants to add **CAD, EUR, JPY, and AUD** to the mix. What looked like "just a few more currencies" balloons quickly.

**How the scope explodes:**

- With 7 currencies in play, we now have 42 conversion directions: USD→INR, INR→GBP, EUR→JPY, and so on.
- Adding 4 currencies looks like a day's work, but testing each direction needs 12 scenarios. That's **504 test cases** to fully validate. That's the hidden cost.

**Reality in manual testing:**

- Running all 504 would take ~120 hours of QA effort (about 3 weeks).
- Even if the team shortcuts and tests only 25% of them, that's still 126 cases → ~ 32 hours.
- Test cycles become bottlenecks.
- And here's the kicker: 75% of paths remain untested. Every release becomes a gamble.
- Teams fear changing the code because the cost of verifying grows with every currency.

> That's the silent tax of not having unit tests — every feature request starts to feel expensive, risky, and slow.

**With unit tests:**

- All 504 scenarios run automatically in seconds.
- QA can now spend time on real user journeys and integration flows, instead of arithmetic checks.
- Developers get instant confidence, PMs get predictable timelines.

<script src="https://gist.github.com/saraiyakush/b3c5422d7a8a334a283b7550ab467018.js"></script>

## Change #3: Major modernization

A platform upgrade is to take place (say Java 8 → Java 17). Suddenly, every part of the codebase is touched.

**Without unit tests:**

- QA has to run hundreds of regression scenarios manually.
- Shared environment becomes a bottleneck.
- Weeks of testing.
- High risk of production defects.

**With unit tests:**

- Automated regression suite runs in seconds.
- Developers refactor with confidence.
- Shared environment is used for true integration testing, not safety nets.
- Delivery remains on track.

<script src="https://gist.github.com/saraiyakush/76689071f672dbabf7942c998477142e.js"></script>

## Summary

What began as a "trivial" USD → INR converter snowballed into a testing nightmare. Each new currency, each platform upgrade, turned minutes of logic into weeks of risk when we relied on manual testing.

That's the real story:

- Without unit tests, every change feels like walking through quicksand — slow, tiring, and dangerous.
- With unit tests, change feels like switching lanes on a highway — fast, safe, and predictable.

And there's a psychological dividend too:

- Developers ship with confidence instead of anxiety.
- QAs focus on creative exploration instead of tedious repetition.
- PMs stop dreading scope creep and start welcoming new opportunities.
- Teams sleep better knowing regression isn't lurking in the shadows.

Unit tests aren't a developer's indulgence. They're the seatbelts of software. You rarely notice them when things go right, but the day you skip them, you wish you hadn't.

So the next time someone says, "This feature is too small to need tests", ask, "What happens when we add just one more currency? Or five? Or when we upgrade our platform?"

> The choice isn't between writing tests and shipping fast. The choice is between **shipping once and slowing down forever**, or **investing early and moving with confidence**.

## FAQs

- **"Writing unit tests takes time. I can deliver faster if I skip."**

Maybe once. But without tests, each new change multiplies manual effort. With tests, the upfront investment pays back every single time you touch the code.

- **"Why should I give time to write tests when I have testers dedicated?"**

Testers are great for exploratory and integration testing. Unit tests aren't replacing them; they free testers from wasting time on trivial checks and let them focus on what automation can't catch. _Testers shouldn't re-verify whether USD ←→ INR works after every build._

- **"Can't we just rely on integration or end-to-end tests instead of unit tests?"**

While this is a much larger topic to discuss, the short answer is: Integration or end-to-end tests are slower, costlier, and don't catch logic bugs as fast. They're complementary, not substitutes.
