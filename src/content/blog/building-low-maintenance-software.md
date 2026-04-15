---
title: 'Building a low-maintenance software'
description: 'Why do simple fixes take so long — and why do they often involve multiple teams? This piece explores how design decisions made during development quietly drive long-term maintenance cost, and how a shift in thinking can lead to more resilient, low-maintenance systems.'
pubDatetime: '2022-08-04'
banner: '/images/low-maintenance-unsplash.jpg'
tags: ['Software Development', 'Software Maintenance']
---

Most product and engineering teams have come across these questions:

> Why does it take so long to fix issues after they're raised?

> Why do we need so many developers (or teams) to fix a single defect?

> What can be done to reduce both the cost and time to deliver a fix?

While the questions may seem more applicable after the product is live, it may surprise you that they're equally valid during development as well. Also, most organisations would dive straight into reviewing the processes that are created around software delivery and incident management, which includes but are not limited to delivery pipelines, issue reporting and RCA.

While improving the pipelines and processes will aid in a faster time to market, are they the only areas of improvement? Certainly, not.

## The plumbing crisis

Every household has complained about one or the other issue with the plumbing in their houses. Let's imagine you have a faucet that has gathered dirt and mud over some years and as a result, it is not pumping water with the right amount of pressure. You call a plumber and he gives you an estimate of Rs. 1500 and 3 days of work. (For the sake of discussion, assume that these figures are quite expensive compared to what your neighbour paid for similar work).

Upon asking the reason for such high cost, the plumber mentions that your faucet is not built like the one at your neighbour — its internal design is linked to the connected pipe more than necessary. Hence it is not possible to clean the faucet just by removing it. The connected pipe may also have gathered some of the dirt and it needs to be removed and cleaned as well. Of course, you'll pay for the service but you're clearly not happy with the faucet in your home.

Drawing an analogy here, the faucet here is the product in software engineering and the cleaning service is the maintenance (or a change) request. The faucet is _tightly coupled_ with the pipe hence costs more to do regular maintenance. It is safe to assume that the team that built the faucet did not put a lot of thought into how easy (or difficult) it would be to make changes to the faucet once it is _deployed_. Sure, they would have been able to build and deploy the faucet in record time, yet the cost of maintaining it is pretty high. And this is exactly where the room for opportunity to build low-maintenance software lies.

## Think more, write less

When engineering teams are given a requirement to build a product (or add a new feature), it is important to not jump into implementing it right away and instead, spend some time brainstorming about the request and understanding the purpose behind adding the feature. This not only provides more clarity early on, but it also lets you see what may come a few months or years down the line. That's the first part.

Next is to discuss the solution to the problem at hand while keeping in mind the (derived) future scope. Of course, we don't have to build the feature for the future scope — that'll be overkill — but at least the solution needs to be extensible to address the changes that may come our way _with minimal effort_. This last part is important — it is not possible to predict every change and it may be too expensive to write software that'll cater to all scenarios. As long as a change can be implemented in a _reasonable_ amount of time (for a team), such a solution should be enough to go ahead with. And how exactly do we do that? Well, think of SOLID principles, design patterns, and data modelling in this step and try to find one that's more applicable to the case at hand.

Finally, the last question teams need to be asking themselves is how easy would it be to make a change to the solution once the product is released to the customer. This part is the one that's missed more often than we'd think. Till now, we questioned ourselves about the whys of the feature and picked up the most applicable design pattern(s), but if we do not think of the maintainability (post-production cost/effort), we're more likely to build a product like the faucet at our home. Spending a little bit of time to chart down the operational steps will give us an idea of what it's going to cost the team when we want to add a change to the feature. This data is very valuable if we have it early on. For example, if a change to the feature is going to involve multiple engineering teams every time, we still have a dependency problem, if not a designing problem and we will run into the challenge of competing priorities between those teams, leading to slow time to market and increased cost (every team will charge against that effort, right?).

So the next time we receive a feature request, we should hold our enthusiasm for a moment and spend a few hours with the team to pen down answers to these three questions — **_What is the purpose of the feature? Is the solution extensible with minimal effort?_** and **_What will be the time/cost of adding changes to the feature?_** Once you get into this habit, you'll start thinking about maintenance while development (interesting, isn't it? 🙂). This will in turn enable you to think about lowering the maintenance costs, thereby building a low maintenance software.

Happy coding!
