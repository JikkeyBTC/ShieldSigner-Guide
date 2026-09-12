// One representative visual per card; titles live in route metadata.
export type CardArtwork =
  | { readonly kind: 'image'; readonly key: string; readonly path: string; readonly fit: 'cover' | 'contain'; readonly invert?: boolean }
  | { readonly kind: 'type'; readonly key: string; readonly text: string }
  | { readonly kind: 'bitcoin'; readonly key: string; readonly direction: 'send' | 'receive' }
  | { readonly kind: 'transaction'; readonly key: string }

const image = (key: string, path: string, fit: 'cover' | 'contain' = 'contain', invert = false): CardArtwork =>
  ({ kind: 'image', key, path, fit, invert })
const type = (key: string, text: string): CardArtwork => ({ kind: 'type', key, text })

const artwork: Readonly<Record<string, CardArtwork>> = {
  'section-getting-started': image('shieldsigner-device', '/brand/card-artwork/shieldsigner-device-photo.png'),
  'what-is-shieldsigner': image('shieldsigner-logo', '/brand/shieldsigner-logo-cutout.png'),
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
  'seedkeeper-initialize': image('seedkeeper-pin', '/guides/seedkeeper/initialize/10-new-pin-device.png'),
  'seedkeeper-save': image('seedkeeper-save', '/guides/seedkeeper/transfer/06-secret-saved-device.png'),
  'seedkeeper-load': image('seedkeeper-load', '/guides/seedkeeper/transfer/14-seed-loaded-device.png'),
  'section-wallet': type('xpub', 'xpub'),
  'branch-bluewallet': type('bluewallet', 'BlueWallet'),
  bluewallet: type('bluewallet', 'BlueWallet'),
  'branch-coconut': type('coconut', 'Coconut'),
  coconut: type('coconut', 'Coconut'),
  'section-transactions': { kind: 'transaction', key: 'transaction-check' },
  'branch-receive': { kind: 'bitcoin', key: 'receive', direction: 'receive' },
  'branch-send': { kind: 'bitcoin', key: 'send', direction: 'send' },
  'branch-signing': { kind: 'transaction', key: 'transaction-check' },
  'sign-psbt': { kind: 'transaction', key: 'transaction-check' },
  'section-reference': type('reference', '[ref]'),
  'branch-safety': type('safety', '!'),
  security: type('security', 'offline'),
  faq: type('faq', '?'),
  'branch-terms': type('terms', 'Aa'),
  glossary: type('glossary', 'A–Z'),
  sources: type('sources', '</>'),
}

export const getCardArtwork = (id: string): CardArtwork => artwork[id] ?? type('reference', '[ref]')
