We are living in a time when almost every week new AI capabilities are introduced. It is getting harder to keep up by professionals, let alone non-technical audience.

2 years ago, the term artificial intelligence made its way to people around the world via ChatGPT and it took the world by storm. People adopted the technology at a blazing speed and wanted more from it. Fast forward today, we have agents that can not only give reasoned answers but also perform tasks for you on your computer. They can even perform tasks for you via your e-commerce accounts, as they can with almost any other account that you have.

Yet, the large population still hasn't really understood how the technology works and why it feels so magical.

While the space itself is huge, in this blog, I will explain the most common terminologies of the artificial intelligence space so that you understand it better and can use it to your advantage. Because awareness is the first step to clarity.


## LLM

Let's begin with the brain of the technology — LLM.

LLM stands for Large Language Model. This is the part which is literally like a human brain. Just like a human brain responds to situations based on what it has learned over the years, LLMs respond to inputs based on massive sets of training data that was feeded into it during its creation.

These inputs can be text, voice, image, video etc. The training data too consists of history, economics, all fields of science, climate, pretty much anything and everything that's available online.

Just like a brain stores information so that it can retrieve it later to do something if a similar situation arises, LLMs store this "trained" data so that it can respond to what we ask.

But LLMs do a little more than just information retrieval. They can reason. This is what makes LLMs different than search engines and this is where its power lies. LLMs do reasoning using complex mathematical functions (algorithms).

Think of it like theorems/algorithms of mathematics taught in schools. Only in the case of LLMs, these algorithms are really complex and massive. This is where the "thinking" happens and this is where the computing power of data centers is used.

To interact with a LLM, you need a software application that will send what you provide (text/voice/image/video) to a LLM and give you the response from the LLM (again text/voice/image/video).

In the early phase of the AI era, these applications were famously known as chatbots. ChatGPT is the most common commercial application that did that.

And each LLM is "tuned" to respond to some inputs better. The reason we have so many models — such as Gemini, Sonnet, Mythos etc. — is because each of these LLMs are tuned differently for different use case. This tuning is done based on "parameters" and the more parameters a model can be tuned on, the more powerful it is. When you hear 50B parameter model, this is what it means.

Hence some LLMs are designed for video (e.g. Sora), while some are designed for coding. However, they all can still respond to general user questions because they all may have still be trained on a lot of common data such as history, geography and so on.

Just like we study similar subjects in the early years of schooling and then study specialisations, and we can reason on a wide range of topics but we go to specialised professionals when the problem at hand is specific. The same thought process applies when choosing which LLM to use and when.

---

## Prompt Engineering
Soon, people realised the power


## Agentic AI

Software with tools before they call LLMs. The software decides when and what to send to LLM and the software not only gives you the response but also does some task for you, if you provide it permissions.

LLMs are still the reasoning engine but the whole software with its tools that can do things for you is packaged as one unit, nowadays agentic AI is interchangeably referred as AI, Model, agents and so on.

However, the underlying mechanism is the LLMs are still the reasoning engine. The "capabilities" are the tooling embedded into the software that you use that gives you a feeling the AI is doing everything.

Just like you download a file from a website and saving to your computer is also a "file creation" task that happens on your computer. In the case of agentic AI, your software — ChatGPT, Claude, Gemini etc. can perform similar tasks such as creation, modification, deletion based on your query and permissions. But that's the software that's doing it for you, not the LLM. Together, they're commonly referred to as AI.

## Agent Skills

Write about the need for skills or reusable "prompts".

## Sub Agents or Custom Agents

Write about the need for sub agents and how similar/different they are from default agents.

## MCP

Write about integrating the software - ChatGPT/Claude to another software (Amazon), but LLM is still not in the picture.

Demonstrate with an example of placing an order on Amazon.

## LLM via API

Write about how all the above examples need a software installed on your computer to interact with LLM.

With APIs, you can interact directly with the LLM. This means a website can talk to a LLM directly without a software such as Claude/ChatGPT/Cursor.

Use cases are automation. Trade offs are such interaction is simply a query/response method and no "capabilities". You must build the capabilities that you need around it because you do not have a software that does it for you.

In this section, write and help visualise that it is possible to use LLM without a surrounding agentic software but with tradeoffs. This must resonate with leaders who think or thought giving their people subscription for Claude/Kiro etc. will automate everything in their company.

## Everything together

Show with a diagram all the above components with LLM at the right and ChatGPT/Claude/Cursor and then API as spokes on the left side of LLM. And the skills, custom agent etc. inside ChatGPT/Cursor etc.

The idea is the demonstrate that to truly get agentic capabilities, a software is still required - either you install one or build one.

## Summary

## Conclusion

-----------------------------------
Feedback:

Fix with zero added complexity (just say it right):

LLM inputs → drop "voice, image, video" or just say "mostly text" — no explanation needed, just narrower claim.
Parameters → drop the "tuned on parameters" line entirely. Say "some models are bigger (more parameters) and some are tuned for specific tasks" as two separate, simple ideas. No need to explain RLHF or fine-tuning at all.
Sora → just don't use it as an LLM example. Pick Gemini/GPT/Claude only. No explanation lost.
Mythos → swap for GPT/Gemini, zero cost.
"Thinking" → keep the word, actually — for this audience "thinking" is a fine simplification. I'd reconsider that note; it was a pedant's objection, not a clarity one. Keep it.

Needs one correct sentence, not a lecture:

Agentic AI direction-of-control: this one matters because it's the crux of "what can I reasonably ask my engineers for." The fix isn't technical depth — it's one sentence: "The AI itself decides which tool it needs and asks the software to run it." That's it. No function-calling, no protocol talk. Leaders need to know the AI is choosing, not the software — because that's why it can feel autonomous and why it can also go wrong unpredictably.
MCP: similarly, one line — "MCP is just a standard way for the AI to talk to other apps, like a universal plug instead of a custom cable for each app." Skip "protocol," skip "LLM in the picture" debate entirely.

So the rule of thumb: every fix I flagged is fixable by either deleting a wrong detail (no cost) or replacing it with one correct, equally simple sentence — none require teaching the reader anything new. The only one to actually push back on adding is "thinking," which is fine as-is for this audience.

--------------------------------------
