---
title: Unit Testing Isn't About Structure. It's About Behaviour — AI Will Learn Whatever You Practice
pubDatetime: '2026-04-23'
description: The way you practise TDD today is what AI will reproduce tomorrow. Many teams write tests that follow structure instead of behaviour — reinforcing design instead of shaping it. This article shows what effective TDD actually looks like, and why getting it right matters more than ever.
banner: '/images/tdd-ai.jpg'
tags: ['AI', 'Testing', 'Practices']
---

## When the Machine Writes the Code

AI is writing more code than ever before. And with that has come a growing question: do the practices that drove software development for decades still matter when a machine can ship a feature before your standup ends?

I want to challenge that question — using one of the most misunderstood practices in software engineering: Test-Driven Development.

Most developers say they practise TDD, but they don't. Not really. They write tests after the fact, or they write tests that are so coupled to the code structure that they break the moment anyone refactors. And AI, trained on that code, is learning to do exactly the same thing.

The practices aren't less relevant in the AI age. They're more relevant. And to show you why, let me start with a question that most developers assume they've already answered: what exactly is a _unit_ in unit testing?

## The Unit Problem

If you ask a group of developers to define a unit to test, they'd probably give you varied answers. Some may say a unit is a function, some may say it is a class, some may say it is a group of related classes.

It leads us to the question of how to perform TDD if the definition of a unit is ambiguous.

TDD follows the Red-Green-Refactor cycle: write a failing test first, write just enough code to make it pass, then refactor. Repeat to add more behaviour to the program.

Simple in principle — but it immediately raises a problem.

How will you write your first test if you say a unit is a function or a class? More specifically, what will you name the test file, what will you name its first test function, and what will you add in the test function, because doing these things require you to have a blueprint of the function or the class that you want to test against.

But wouldn't that mean you're already thinking of structuring your code into functions or classes even before adding a single test?

Aren't you then breaking the Red-Green-Refactor cycle?

## An Example Nobody Could Start

I once asked a group of colleagues how they would practice TDD when they want to build an API. **An API that should implement CRUD operations by saving the state in another system**.

TDD dictates that the **first** thing you should write is the test program.

But most of the developers in the group mentioned that they'd need to create the skeleton of the program first before they could even begin writing the tests. _This means that they'd write the production code first_.

They also argued that writing tests first would not make sense without creating some abstractions such as the service layer, the repository layer, etc.

Others argued that the unit isn't the API, but the internal layers — so they'd start by testing each layer in isolation, mock everything around it, and run the TDD cycle at that level.

Some colleagues acknowledged that this breaks the test-first mindset but couldn't see a way around it.

Everyone had a different definition of "unit". And that's exactly the problem.

## The Unit Unfolds

Let's attempt to define the "unit" in our API example. Let's put the "program" into perspective again.

_Build an API that implements CRUD operations by saving the state in another system._

The thing that was overlooked by the group was that at a basic level, this program will need to do 3 things — build an endpoint, implement CRUD operations for it, and persist the state.

The group started with the whole system — and that's what blocked them. Yes, the final system needs an endpoint, CRUD operations, and a database. But nothing says all three have to exist to begin with.

A test-first mindset starts with the simplest possible behaviour and builds from there. Each of those three things isn't a prerequisite — it's a behaviour you add in a future iteration.

Tomorrow, you may extend the behaviour of your API to consume another API, or send a message to a queue.

So let's define the first test, when we don't have anything — when we have a clean slate.

Where do we start? What should that test even validate?

## The First Test

The first test that would make sense would be a GET endpoint that returns a 200 status code. Simplest behaviour of our program, right? Hit an endpoint, it should return 200.

- ### Iteration 1: First behaviour: The API exists and responds

```javascript
// test
describe('Health Check', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});
```

And the production code to make the test pass.

```javascript
// app.js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

After this iteration, this is our system's behaviour:

- `GET /health` returns 200

> NOTE: For the purposes of this demonstration, I have chosen to use Javascript, but the concept would land exactly the same with Java or Python or any other programming language or testing framework.

- ### Iteration 2: Add an order: POST to /orders returns a 201 with the created order

Our application's next behaviour is that when the `POST /orders` endpoint is called, it should return a `201` with the newly created order.

```javascript
// test
it('returns 201 with created order', async () => {
  const response = await request(app)
    .post('/orders')
    .send({ customerId: 'C1', item: 'Laptop', quantity: 1 });

  expect(response.status).toBe(201);
  const responseBody = response.body;
  expect(responseBody.customerId).toBe('C1');
  expect(responseBody.item).toBe('Laptop');
  expect(responseBody.quantity).toBe(1);
  expect(responseBody.orderId).toBeUuid();
});
```

And the code to pass the test will be:

```javascript
// app.js
app.post('/orders', (req, res) => {
  const { customerId, item, quantity } = req.body;
  const orderId = randomUUID();
  res.status(201).json({ orderId, customerId, item, quantity });
});
```

After this iteration, this is our system's behaviour:

- `GET /health` returns ok
- `POST /orders` generates a new `orderId` and returns the order

- ### Iteration 3: Persist the order: database enters at the boundary

Next we decide to persist the state of the order to a database.

Now **this** is an appropriate place to introduce a mock. The database is the system boundary — so that's the only thing that is mocked.

```javascript
// test
const db = require('./db'); // Assume there is a db module with reasonable methods
jest.mock('./db'); // Only mock the system boundary

it('saves the order and returns 201 with an id', async () => {
  db.save.mockResolvedValue({
    orderId: 'ORD-1',
    customerId: 'C1',
    item: 'Laptop',
    quantity: 1
  });

  const response = await request(app)
    .post('/orders')
    .send({ customerId: 'C1', item: 'Laptop', quantity: 1 });

  expect(response.status).toBe(201);
  expect(response.body.orderId).toBe('ORD-1');
  expect(db.save).toHaveBeenCalledWith({
    customerId: 'C1',
    item: 'Laptop',
    quantity: 1
  });
});
```

The code to pass the test.

```javascript
// app.js
const db = require('./db');

app.post('/orders', async (req, res) => {
  const { customerId, item, quantity } = req.body;
  // We'll let the database own the `orderId`
  const order = await db.save({ customerId, item, quantity });
  res.status(201).json(order);
});
```

Now, our system's behaviour is:

- `GET /health` returns ok
- `POST /orders` calls a database to persist the order and returns the order

Notice that it did not require us to create the infamous layers — service, repository, middleware etc. at this point — all those will be the side effects of the refactor phase — as we will see soon.

- ### Iteration 4: Refactor: extract a service layer, tests don't change

You extract an `OrderService` internally — but because the test talks to the API boundary, not to `OrderService` directly, the tests don't need to change at all.

Refactored production code with `OrderService`.

```javascript
// app.js (refactored — service extracted internally)
const OrderService = require('./orderService'); // new internal abstraction

app.post('/orders', async (req, res) => {
  const order = await OrderService.create(req.body);
  res.status(201).json(order);
});

// orderService.js
const db = require('./db');

const create = async ({ customerId, item, quantity }) => {
  return db.save({ customerId, item, quantity });
};

module.exports = { create };
```

Notice there is no change to the test file when we do the above refactor. The below test code is the same from Iteration 3.

```javascript
// test — unchanged from iteration 3
it('saves the order and returns 201 with an id', async () => {
  db.save.mockResolvedValue({
    orderId: 'ORD-1',
    customerId: 'C1',
    item: 'Laptop',
    quantity: 1
  });

  const response = await request(app)
    .post('/orders')
    .send({ customerId: 'C1', item: 'Laptop', quantity: 1 });

  expect(response.status).toBe(201);
  expect(response.body.orderId).toBe('ORD-1');
  expect(db.save).toHaveBeenCalledWith({
    customerId: 'C1',
    item: 'Laptop',
    quantity: 1
  });
});
```

Look closely. Your tests are validating the behaviour of the system, not the layers. The layers are formed during the **Refactor** phase from the Red-Green-Refactor cycle.

At this point, we've introduced an internal abstraction — `OrderService`. So far, we haven't written a single test for it, and that's intentional, because this version of the `OrderService` doesn't really do much, except give the control to the database.

But as this service grows — say it starts handling validation, pricing rules, or orchestration — testing it only through the API may become slow, indirect, or insufficient.

This is where more granular tests begin to make sense.

Not because we decided upfront that “services need tests”, but because the behaviour inside this abstraction has now become rich enough to deserve faster, more focused feedback. Not as a starting point, not as a structural rule — but as a response to emerging complexity.

In other words, internal tests are not the foundation of your design — they are a _byproduct_ of it.

No matter how much you change the internal structuring of your code, your tests never change and hence your system behaviour remains intact. And that's the whole point of unit testing: preserving behaviour, regardless of how the code is structured underneath.

What we call a "unit" is often a structural choice. What actually matters is _behaviour_.

> Think of a unit as the smallest behaviour slice that delivers value at a boundary.

## The Brittle Alternative

To give you a glimpse of how a class-level test would look like and why it will be brittle, here is an example.

A test file with a mocked `OrderService`.

```javascript
// class-level approach: OrderService is tested in isolation
// The app mocks OrderService

const OrderService = require('./orderService');
jest.mock('./orderService'); // mocking an internal layer

it('calls OrderService.create and returns 201', async () => {
  OrderService.create.mockResolvedValue({ orderId: 'ORD-1' });

  const response = await request(app)
    .post('/orders')
    .send({ customerId: 'C1', item: 'Laptop', quantity: 1 });

  expect(OrderService.create).toHaveBeenCalled(); // testing wiring, not behaviour
  expect(response.status).toBe(201);
});
```

This approach starts with structure and treats it as the unit of design.

**Consequence:** Rename the `OrderService` to `OrderManager`, or move its logic elsewhere. This test breaks. Not because the behaviour changed, but because the structure changed.

## The Objection

Now, some would argue that what you're testing here is called an integration test, and not a unit test. Well, it isn't.

First of all, the philosophy of testing matters more than the label. Call them what you want — what matters is that these tests survive refactoring, give you honest feedback about behaviour, and don't break every time you rename a class or extract a method.

> A test that breaks when you move code around isn't testing your system; it is testing your file structure.

Secondly, an integration test in its truest form is a much bigger idea that deserves its own space.

## AI Amplifies The Patterns You Practice

Now that you've seen, there are different approaches to how developers have been performing TDD over the years. Both approaches produce working software. But one produces tests that _drive_ design; the other produces tests that _document_ it after the fact. They are not equivalent.

AI reproduces patterns from existing code. If those patterns are flawed, it will scale those flaws.

The same developer who writes brittle, structure-coupled tests is training the next generation of AI models. The pattern compounds.

Hence, it is extremely important to fully understand how these age-old practices were meant to be done, so that you can guide your own agent and not fall blindly to the code that your agent will generate for you.

If the training patterns are weak, the output will be too — unless you correct it. If AI has seen layered architectures everywhere, it will reproduce them — even when they aren't needed. An inexperienced developer won't catch this. They'll accept the generated structure, write tests around it, and inherit every flaw the pattern carries. The practices don't become less important when AI writes the code. They become the only thing standing between a working system and **a well-designed one**.

There's another benefit worth naming. When AI generates code inside a proper TDD loop — one behaviour at a time, with a failing test before every addition — it gets feedback at each step. It can course-correct early, just as a developer does. But if you hand AI a vague requirement and ask it to produce a fully-layered application, it will. And the tests it writes will document that structure, not drive it. The loop only works if someone sets it up correctly. That someone is _you_.

## Practices > Tools

AI is the new shiny thing the industry is chasing. It won't always be. Something better will arrive, and the cycle will repeat.

What will remain constant is the **methodology** of doing things.

AI is trained on datasets — **not on the journey** of how those datasets were created. It has _seen_ the artifact (the tests, the code) but not the reasoning behind each micro-decision in the Red-Green-Refactor loop. _It learned the pattern, not the judgment_.

So it is _you_ who needs to instruct AI on the methodology, and you can do that only if you've learned and lived those methodologies yourself.

AI will build systems for you, much faster than you; practices will guide AI to build the systems the _right way_ — not just a working one.
