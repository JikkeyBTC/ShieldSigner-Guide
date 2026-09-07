# SeedKeeper initialization screenshots

Captured on 2026-09-06 for `docs/ko/seedkeeper/initialize.md`.

The menu and PIN screen captures are from the Jikkey SeedSigner simulator. The first
whole-device image (`03-home-tools-device.png`) uses the user's physical-device photo
with the background replaced by bright orange suede. The Applet installation images
(`15`–`17`) are clean simulator-style redraws based on the user's physical-device
display photos. The simulator supports navigation through DIY Tools → Install Applet,
but it does not perform the actual Applet installation.

## Capture environment

- Simulator repository: https://github.com/JikkeyBTC/seedsigner-simulator
- Simulator checkout: `ba5082bec95f863c0bfbd74545e59c1f9082e50e`
- Local capture URL: `http://127.0.0.1:8770/wallet.html?firmware=smartcard&wallet=1&debug=1&lang=ko`
- Firmware: `SeSi-0.8.7+ShSi-B12`
- Firmware upstream commit: `6faaffcb06a2ba578a96fdef689d97e21793ec23`
- Bundled pysatochip commit: `d77e311e0cd39193c9b2c03a1ab5f69421b8f4d5`
- Browser: Playwright Chromium, fresh context, viewport 1320 × 1100, device scale factor 2
- Website language: Korean; firmware screen language: English
- Card: fresh simulated SeedKeeper card A; cards B and C were not initialized
- No seed or other wallet secret was created, imported, or displayed

The temporary demo PIN was `aaaa`, used only to reach the completion screen in
an isolated simulator session. It is not a recommended real PIN. Published PIN
keyboard screenshots were captured before text entry. Card identifiers and
applet status values shown in the images belong to the simulator, not a physical
card; they do not establish the version or authenticity of a purchased card.

## Published files

| File | Capture |
| --- | --- |
| `03-home-tools-device.png` | User-provided physical-device photo with orange suede background |
| `05-smartcard-selected-screen.png` | Tools → Smartcard Tools highlighted |
| `06-smartcard-menu-screen.png` | Smartcard Tools → Common Functions highlighted |
| `08-card-info-selected-screen.png` | Common Tools → Card Info highlighted |
| `09-card-uninitialised-screen.png` | First-time setup notice |
| `10-new-pin-device.png` | Whole device with empty New Card PIN keyboard |
| `10-new-pin-screen.png` | Raw display of the same empty PIN keyboard |
| `12-confirm-pin-screen.png` | Empty Confirm Card PIN keyboard |
| `13-card-setup-complete-device.png` | Whole device with Card Setup success |
| `14-card-info-done-screen.png` | Card Info showing Setup: Done |
| `15-select-applet-screen.png` | Simulator-style redraw with `SeedKeeper-0.2-official.cap` selected |
| `16-select-storage-screen.png` | Simulator-style redraw with `8 KB (default)` selected |
| `17-applet-installed-screen.png` | Simulator-style redraw showing `Success` and `Applet Installed` |
| `18-diy-tools-screen.png` | Smartcard Tools → DIY Tools highlighted |
| `19-install-applet-screen.png` | Javacard DIY → Install Applet highlighted |

`*-device.png` files are native browser element screenshots of `#device`
(2176 × 1156). The original simulator `*-screen.png` files are unmodified PNG
exports from the simulator's `#screen` canvas (1920 × 1920). Files `15`–`17` are
1920 × 1920 redraws based on the supplied physical-device display photos and match
the simulator's black background, typography, menu geometry, and orange controls.
The guide displays all images responsively and links each image to its source asset
at full resolution.

## Reproduce

1. Start the simulator with the B12 smartcard bundle and open a fresh browser context.
2. Wait until the firmware main menu is ready; connect fresh demo card A.
3. Select Tools → Smartcard Tools → Common Functions → Card Info.
4. At Card Uninitialised, select I Understand.
5. Capture New Card PIN before entering a disposable demo PIN; confirm with KEY3.
6. Capture Confirm Card PIN before entering the same demo PIN; confirm with KEY3.
7. Capture Card Setup, press OK, then capture Card Info with Setup: Done.
8. In the capture browser only, set the backgrounds of `html`, `body`,
   `#stage-device`, and `#device` to transparent and remove `body::before`'s background.
   Capture whole-device images with Playwright
   `locator('#device').screenshot({ omitBackground: true })`;
   export the actual display using `document.querySelector('#screen').toDataURL('image/png')`.

The browser build's startup warning is specific to the simulator. This guide
does not instruct users to dismiss a security warning on a physical device.

## Procedure references

- [B12 release](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)
- [Card menus and Card Info](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/smartcard_views.py)
- [New PIN, confirmation, and setup flow](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/helpers/seedkeeper_utils.py)
- PIN bounds were checked in `pysatochip/JCconstants.py` inside the captured
  `wallet-smartcard.zip`: `PIN_MIN_SIZE = 4`, `PIN_MAX_SIZE = 16`.

The simulator was used only to capture this walkthrough; its implementation
was not changed for the guide.
