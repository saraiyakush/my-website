---
title: Code coverage — Yay or Nay?
pubDatetime: '2023-09-08'
description: Why code coverage alone isn't enough to ensure quality tests
banner: '/images/code-coverage-unsplash.jpg'
tags: ['Unit Testing', 'Development', 'Testing']
---

## We're 100% covered! 🎉

This image makes us feel so good about our code, isn't it? 😍

Most organisations shoot for achieving this number (as close as possible) when it comes code coverage.

Yet, many of those organisations struggle to keep their defect rates to a lower number with each code release — leading to lower confidence in their engineering teams and processes.

## We ship defects with every release!!! 🤕 But our coverage is 100%. What's going on?…

Let's break this metric down.

> Code Coverage — A metric that measures how much of our source code is executed as part of our test suite.

The more source code is covered as part of our tests, the better, right? Well…not entirely. The metric only measures how much of the code is **executed** in our tests.

Let's use an example to demonstrate what exactly this means.

## Show and tell, bro!

We'll take two Java projects that are exactly similar in terms of the source code and the code coverage, but they give different feedback to source code changes (as we'll see in a moment).

- ### What is the project about?

The sample project we'll be considering in this demonstration is a Springboot project that has a `EmployeeService` class with one method.

**`findEmployeesByFirstName`** that takes `firstName` and returns a list of employees with a matching `firstName`, else returns an empty list. For simplicity, we've considered an in-memory list of `employees` to perform the lookup.

![EmployeeService.java](/images/employee-service-coverage.png)

- ### Both projects have identical source code

The `src/main` of the projects at [Github](https://github.com/saraiyakush/code-coverage) shows no differences.

- ### Both projects have identical code coverage

**Sample 1**

![Sample1 Service Coverage](/images/sample-service1-coverage.png)

**Sample 2**

![Sample2 Service Coverage](/images/sample-service2-coverage.png)

### Add a bug in the code

Now let's say someone accidentally adds a bug in the code. They feel that inside the `EmployeeService > findEmployeesByFirstName` method, the match on the first name should be case-insensitive and not an exact match. They go ahead and do the change.

Let's see how both the projects react to this (accidental or intentional) change.

![Sample1 Service Change](/images/sample1-change.gif)

![Sample2 Service Change](/images/sample2-change.gif)

As we can see, `sample1` correctly catches this behaviour change and prompts us to either fix the change or fix the test. However, `sample2` does not report any such anomaly. With both the projects reporting the same amount of code coverage!

It is clear from this demo that better code coverage does not mean better quality of the code! While coverage does indicate the percentage of the code that was executed at least once as part of our test suite, the metric alone does not give us enough confidence in our tests.

So what is it that gives us confidence in our tests? Let's now take a look at the tests for both the projects and compare them.

## AAA Pattern

The test class `EmployeeServiceTest` from both the projects reveal that in `sample1`, an extra assertion for case-sensitive check is added to validate the behaviour of the class, whereas in `sample2`, no such assertion is added.

![EmployeeServiceTest.java in Sample1](/images/sample1-employee-service-test.png)

![EmployeeServiceTest.java in Sample2](/images/sample2-employee-service-test.png)

However, since the method is invoked (at least once) from within the test in `sample2`, the code coverage tool will still report the same coverage because technically, the code was _**executed**_ from the tests (for the case-sensitive scenario).

So, a few things come to light from this example.

- Code coverage by itself isn't a good measure of the quality of the code or the tests.
- Appropriate assertions are what is going to give you meaningful feedback about how your code is going to react.

These assertions are part of an important pattern for writing good tests.

> **Arrange — Prepare the system into a state/scenario where it can be tested.**
>
> **Act — Invoke the system that we're trying to test.**
>
> **Assert — Validate what the system should do (or not do)**

![Arrange Act Assert](/images/arrange-act-assert-coverage.png)

In our example, the _**arrange**_ part is similar in both the tests — the _input_ to the method. The _**act**_ part is similar as well — _calling the method_. If you notice, a combination of arrange (input) and act (invoke) is enough to influence the code coverage — even without a single assert! 😮

But it is the _**assert**_ part that's validating the behaviour of the method. This is the part that's going to give you confidence in your tests and code coverage does not take this into account.

> Confidence in your tests is built not by code coverage, but by the assertions you put. A code with 70% coverage that properly validates a system behaviour is better than a code with 100% coverage with no/invalid assertions.

## So should we just stop looking at code coverage?

Well...no.

Code coverage is driven largely by the arrange part and the more exhaustive your arrange part is, the better — in other words, you've thought about a wide range of possible inputs to your system. For example, the coverage report also gives some good insights into the % of branches (if-else, switch, etc.) covered. In our example, the report indicates we've missed a test for `null` input. So coverage does help in finding out what inputs (arrange) are missed in our tests.

![Missing Null Test Code Coverage](/images/missing-null-test-coverage.png)

But this is only the first part of writing good tests. The second part is to put appropriate assertions that validate how the system should behave for each arrange.

## Conclusion

Long story short, code coverage should not be the target, writing proper assertions that depict the system's behaviour should be. A higher code coverage will be a side effect of this practice 💡

So if we want our tests to give us meaningful feedback about a change we introduce, looking only at a dashboard that shows some number in green isn't enough. We also need to keep a close eye on the assert(s) for every arrange inside our tests.

Happy coding. Cheers! 🍻
