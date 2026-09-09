# Transaction guide evidence

Captured on 2026-09-09 (Asia/Seoul), using public test secrets only.

- Firmware: ShieldSigner SeSi-0.8.7+ShSi-B12, upstream commit 6faaffcb06a2ba578a96fdef689d97e21793ec23.
- Firmware ZIP SHA-256 recorded in the simulator build metadata: 99f38dddf65717d6656205fc747eb553f3b1af48a6d57a32cfee78e96b1a061c.
- UI and hardware shims: seedsigner-simulator local main fe1533a, with the locally built B12 archive. The JikKey worktree hides its wallet opener, so its UI was not used for this flow.
- Local test server used an explicit JavaScript MIME type on Windows. The existing signet_bridge helper served local UI at the allowed bitsaga.be origin; API traffic went to the real public signet.bitsaga.be API, not a mocked faucet or broadcast endpoint.
- Public BIP39 vector: army van defense carry jealous true garbage claim echo media make crunch. Fingerprint b2269592; no passphrase.
- Testnet single-sig Native Segwit account m/84h/1h/0h. Never use this seed for real funds.
- Network: Bitsaga Signet, custom challenge 0014cb5c938876427c86a068fba6d6ddd09ed4fa183f. Not public Testnet, not public Signet, no real BTC.
- Address verification succeeded at receiving index 0.
- A separate Address explorer check reached receiving index 19 through Native Segwit, Receive addresses and Next 10. Decoding the device's rendered QR returned tb1qnhsxm0uqxuc8fgt4jzejx4prwjm96rad6evy4e, matching the wallet's Receive screen. The index-0 import check is not presented as verification of the later faucet destination.
- One faucet claim: 1,000,000 sats, TXID 936a01372cb2e115d27f6aed46eb1aef687b579b50468968a4ef0b374573293d, confirmed block 104773.
- Self-transfer: TXID e0942d2fbe013d9d6329b334bc0c49a853b9de5de992f2cd68402bfe64c2457f, confirmed block 104780.
- Reviewed on device: 1 input, input total 1,000,000 sats, recipient 20,000 sats, fee 282 sats, verified change 979,718 sats (change index 17).
- Returned signature was read from the real firmware QR, finalized and automatically broadcast by Simulator wallet.
- The public tx-proof API independently of the UI reported inclusion height 104780; parsing its raw transaction confirmed the two output amounts and actual fee. This is not independent-node consensus verification.
- Wallet balance: 7,994,798 before faucet; 8,994,798 after faucet; 8,994,516 after self-transfer. The public seed had historical test transactions.
- confirmed.json preserves the public proof response and amounts; deposit.json preserves the faucet transaction and block.

Screenshots are actual browser/widget captures or PNG exports of the simulator's device canvas. They are not generated illustrations and contain no real user seed, PIN or keys. Screen proportions can differ from the physical Pi Zero v1.3 device. Only the public test account appears. Asset names follow the capture order; not every diagnostic capture is published.

Sources:
- https://github.com/3rdIteration/seedsigner/tree/6faaffcb06a2ba578a96fdef689d97e21793ec23
- https://bitsaga.be/seedsigner-simulator/
- https://bitsaga.be/signet
- https://signet.bitsaga.be/api/tx-proof?txid=e0942d2fbe013d9d6329b334bc0c49a853b9de5de992f2cd68402bfe64c2457f
