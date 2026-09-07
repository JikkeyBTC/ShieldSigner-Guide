---
title: What is JavaCard?
description: Learn how JavaCard applets provide an isolated card environment
---

# What is JavaCard?

JavaCard is a platform for running small applets on secure cards.<br> The card executes the applet internally, so a host device can request operations without receiving the card's protected secrets.

## Why it matters

The applet controls access to protected data and operations.<br> SeedKeeper uses this environment to protect stored seeds with a PIN.

## In this guide

You install the SeedKeeper applet on a physical card, set a PIN, and then use the card for backup and recovery.<br> The applet version and device firmware are separate things, so confirm both when troubleshooting.

## Next step

[Initialize the card and set a PIN](./initialize)

