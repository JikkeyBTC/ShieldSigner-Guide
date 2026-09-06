# OS guide illustrations and captures

These assets accompany only the Korean installation and verification pages.

## Captures

- `release-assets.png`: unmodified browser capture of the expanded Assets section at https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12 (2026-09-06). GitHub's asset digests apply to the downloaded ZIPs, not the extracted images.
- `message-signature.png`: browser capture of the input fields and actual `Valid signature` result at https://www.verifybitcoinmessage.com/ (2026-09-06). Uses the release's five-line message, its Bitcoin signature, and the author's address `37hiiSB1Poj6Shs8WawPS2HjT2jzHkFSQi`. No private data is present. The message field is scrollable; the capture shows its beginning, not every line.

The signing address was also checked against https://cryptoguide.tips/send-me-a-tip/. The Pi Zero ZIP was downloaded from the pinned release; its only entry is a 536,870,912-byte `.img`. Both Python SHA-256 and the documented PowerShell command returned `1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6`.

## Original vector diagrams

`zip-to-image.svg`, `verification-flow.svg`, `etcher-steps.svg`, and `first-boot.svg` are purpose-made explanatory diagrams, not application screenshots or hardware photographs. Etcher button labels follow https://etcher.balena.io/. The site shell and existing brand assets are unchanged.

For a new firmware release, check the assets, signed message, address and image hashes again before updating the instructions. Do not replace only the release number. Screenshots are examples, not a substitute for the reader's own verification.
