---
title: What is JavaCard?
description: The smart-card platform used by SeedKeeper
---

# What is JavaCard?

JavaCard is a constrained smart-card platform that runs security applets and keeps sensitive operations inside the card boundary. It is not a general-purpose desktop operating system.

## Three layers

| Layer | Role | Location |
| --- | --- | --- |
| JavaCard platform | Runs smart-card applets | Secure card chip |
| SeedKeeper applet | Protects seeds and secrets | Inside JavaCard |
| ShieldSigner | Creates and signs offline | ShieldSigner device |

