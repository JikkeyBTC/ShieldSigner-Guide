// One representative image OR typographic mark per card; titles live in route metadata.
export type CardArtwork =
  | { readonly kind: 'image'; readonly key: string; readonly path: string; readonly fit: 'cover' | 'contain'; readonly invert?: boolean }
  | { readonly kind: 'type'; readonly key: string; readonly text: string }

const image = (key: string, path: string, fit: 'cover' | 'contain' = 'contain', invert = false): CardArtwork =>
  ({ kind: 'image', key, path, fit, invert })
const type = (key: string, text: string): CardArtwork => ({ kind: 'type', key, text })

const artwork: Readonly<Record<string, CardArtwork>> = {
  'section-getting-started': image('shieldsigner-device', '/brand/card-artwork/shieldsigner-device-photo.png'),
  'branch-hardware': image('shieldsigner-board', '/brand/card-artwork/shieldsigner-board.png'),
  assembly: image('shieldsigner-assembly', '/brand/card-artwork/shieldsigner-assembly.gif'),
  'section-os': image('shieldsigner-logo', '/brand/shieldsigner-logo-cutout.png'),
  'branch-installation': image('microsd-card', '/brand/card-artwork/microsd-blank.png'),
  'branch-verification': type('sha256', 'SHA256'),
  'section-seedkeeper': image('seedkeeper-logo', '/brand/seedkeeper/seedkeeper_logo_black.png', 'contain', true),
  'branch-concepts': type('applet', 'Applet'),
  javacard: image('jikkey-javacard', '/brand/card-artwork/jikkey-javacard.png', 'cover'),
  'what-is-seedkeeper': image('seedkeeper-icon', '/brand/seedkeeper/seedkeeper_icon.png', 'contain', true),
  'branch-backup-recovery': type('backup-recovery', '↔'),
  'seedkeeper-initialize': type('pin', 'PIN'),
  'seedkeeper-save': type('save', 'SAVE'),
  'seedkeeper-load': type('load', 'LOAD'),
  'section-wallet': type('xpub', 'xpub'),
  'branch-bluewallet': type('bluewallet', 'BlueWallet'),
  bluewallet: type('bluewallet', 'BlueWallet'),
  'branch-coconut': type('coconut', 'Coconut'),
  coconut: type('coconut', 'Coconut'),
  'section-transactions': type('bitcoin', '₿'),
  'branch-receive': type('receive', '↓'),
  'branch-send': type('send', '↑'),
  'branch-signing': type('psbt', 'PSBT'),
  'sign-psbt': type('psbt', 'PSBT'),
  'section-reference': type('reference', '[ref]'),
  'branch-safety': type('safety', '!'),
  security: type('security', 'offline'),
  faq: type('faq', '?'),
  'branch-terms': type('terms', 'Aa'),
  glossary: type('glossary', 'A–Z'),
  sources: type('sources', '</>'),
}

export const getCardArtwork = (id: string): CardArtwork => artwork[id] ?? type('reference', '[ref]')
