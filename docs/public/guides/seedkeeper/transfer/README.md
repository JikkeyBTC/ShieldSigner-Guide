# SeedKeeper save and load screenshots

Captured on 2026-09-06 for the Korean `seedkeeper/save` and `seedkeeper/load` guides.

## Environment and provenance

- Simulator: https://github.com/JikkeyBTC/seedsigner-simulator
- Simulator commit: `ba5082bec95f863c0bfbd74545e59c1f9082e50e`
- Firmware: `SeSi-0.8.7+ShSi-B12`, upstream commit `6faaffcb06a2ba578a96fdef689d97e21793ec23`
- Local capture URL: `http://127.0.0.1:8770/wallet.html?firmware=smartcard&wallet=1&debug=1&lang=ko`
- Fresh Playwright Chromium context, 1320 × 1100 viewport, device scale factor 2
- Korean website controls; unchanged English firmware display
- Fresh demo SeedKeeper card A, disposable demo PIN `aaaa`
- Public BIP39 test vector supplied by the simulator's existing `test/artifacts/qr.y4m`
  through Chromium's fake camera, not a real webcam or a real wallet
- Test seed fingerprint before saving and after loading: `b2269592`; no BIP39 passphrase
- No real seed, private key, wallet, or card was used

All images are native captures. Whole-device PNGs are 2176 × 1156 element
screenshots of `#device` with `omitBackground: true`. In the capture browser only,
the backgrounds of `html`, `body`, `#stage-device`, and `#device` were transparent,
and `body::before` had no background. This removes the orange suede surroundings
without altering the device geometry, controls, or real firmware framebuffer.

Screen-only PNGs are unmodified 1920 × 1920 exports of the live `#screen` canvas.
There is no image-generation, post-processing, or composited firmware screen.
The simulator repository and normal website styling were not changed.

## Capture sequence

1. Initialize fresh card A through Tools → Smartcard Tools → Common Functions →
   Card Info, using the same first-setup flow as the initialization guide.
2. Scan the public test SeedQR through the simulator's real scanner.
3. Capture the fingerprint at Finalize Seed, then select Done.
4. Choose Backup seed → To SeedKeeper, enter the demo card PIN, and keep the
   default Seed Label `b2269592`.
5. Capture Secret Saved and return to the seed menu.
6. Choose Discard seed → Discard to clear the device's in-memory copy. Card A
   still holds the saved seed.
7. Choose Seeds → From SeedKeeper, authenticate, select `b2269592`, and capture
   Finalize Seed with the same fingerprint. Select Done and capture the seed menu.

## Published files

Save guide: `01-seed-ready-screen.png`, `02-backup-seed-device.png`,
`03-to-seedkeeper-screen.png`, `04-card-pin-screen.png`,
`05-seed-label-screen.png`, `06-secret-saved-device.png`.

Load guide: `09-home-seeds-device.png`, `10-from-seedkeeper-screen.png`,
`11-load-pin-screen.png`, `12-select-secret-screen.png`,
`13-loaded-fingerprint-screen.png`, `14-seed-loaded-device.png`,
`07-discard-seed-screen.png`, `08-discard-confirm-screen.png`.

The discard captures were taken between saving and loading. They illustrate
the same menu used to clear the temporary device copy after finishing work.
Only empty PIN keyboards are published. The seed label and wallet fingerprint
in the screenshots are public test data, not the card secret's internal checksum.

## Implementation reference

[B12 seed workflows](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py):
`SeedBackupView`, `SaveToSeedkeeperView`, `SeedKeeperSelectView`, `SeedDiscardView`.
The BIP39 save path includes the applied passphrase and uses an export policy
that permits the device to read the seed after card PIN authentication. It is
not the card-to-card encrypted clone workflow described by the retired pages.
