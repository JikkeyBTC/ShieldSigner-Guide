# Guide card artwork

Representative artwork for the title + single-visual card rail. Existing project assets are copied unchanged; externally sourced and edited artwork is documented below.

| File | Original project source |
| --- | --- |
| `shieldsigner-device.png` | `ShieldSigner/image/generated/shieldsigner-cyberpunk-dropped-10/shieldsigner-exact-product-cutout.png` |
| `shieldsigner-device-photo.png` | User-provided `ShieldSigner/메인이미지/1.png`; locally masked cutout, current Getting started card |
| `shieldsigner-board.png` | `ShieldSigner/image/used/smartcard_hat_rev1_1_detailed_3d_jlcpcb_blue_cutout.png` |
| `shieldsigner-assembly.png` | `ShieldSigner/picture/professional-exploded-product-cutout.png` |
| `shieldsigner-assembly.gif` | User-provided `ShieldSigner/메인이미지/shieldsigner_disassemble_360_assemble_white_860_hq.gif`; current kit assembly card |
| `jikkey-javacard.png` | `seedsigner-simulator/.worktrees/jikkey-simulator/src/web/jikkey-card-photo.png`, also used by the JikKey simulator showcase |

The SeedKeeper wordmark and icon are the existing transparent PNGs in `../seedkeeper/`. Their black artwork is inverted only at render time on the dark card surface.

The ShieldSigner OS card and global top-left brand both use `../shieldsigner-logo-cutout.png`, derived from the user's `ShieldSigner/image/used/logo.png` on 2026-09-09. The original byte-for-byte copy remains at `../shieldsigner-logo.png`.

The cutout removes only the black background connected to the four outer corners, within 64px corner regions. Partially covered edge pixels have their black matte removed for smooth transparency. All interior artwork, lettering, chip details, and colors are preserved pixel-for-pixel; the image remains 1214 × 389 without cropping or resizing. The previous SVG and original PNG are retained but no longer used by these two surfaces. The header keeps its intrinsic aspect ratio and responsive sizing; the OS artwork remains centered on the whole card. Browser tests check the alpha of both displayed logos, including opaque interior details.

## Original Getting started product photo

`shieldsigner-device-photo.png` is a local, non-generative cutout of the user's `1.png`, applied on 2026-09-09 with explicit approval for local image processing. The original and previously used card image are preserved.

Only light regions connected to the outside were removed (Pillow grayscale threshold 110), retaining enclosed bright details such as the dial and screws. A 0.45px alpha-edge feather removes hard stair-stepping. The mask is cropped to its nontransparent bounds with 20px of equal padding on every side, so the product stays centered within the existing whole-card layout.

The resulting 1079 × 787 RGBA PNG preserves the original photo's RGB pixels exactly inside the crop `(86, 238, 1165, 1025)`; only the alpha channel changes. Transparent background and opaque product details were verified before use. No AI-regenerated product or checkerboard preview is used.

## Plain microSD cutout

- File: `microsd-blank.png` (Installation card, shared by all locales).
- Original photograph: [INF JG64GS-11D product listing on MediaMarkt](https://www.mediamarkt.be/nl/product/_inf-jg64gs-11d-64-gb-99772774.html), [source PNG](https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_99772750/fee_786_587_png).
- Background extraction: built-in imagegen, 2026-09-09. The card is unbranded, with no printed text. The resulting PNG has a real alpha channel; original source was not overwritten. No open-license status was established for the source photograph.
- Final prompt:

> Use case: background-extraction. Image 1 is the edit target: an unbranded black microSD memory card. Remove only the white background and the colored edge strips, leaving the identical microSD alone on a genuinely transparent background with actual PNG alpha=0 outside the silhouette. Preserve the exact outline, surface texture, black color, orientation, and blank unprinted front face. Do not add text, branding, patterns, decorations, props, reflections or cast shadows. Retain clean softly antialiased edges. Keep the full card centered, tightly framed with a small equal transparent margin. Deliver the cutout itself, not a picture of a cutout preview. It will be placed directly on a dark website card.
