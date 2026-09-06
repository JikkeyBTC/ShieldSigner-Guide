---
title: 카드 사용하기
description: SeedKeeper 카드에 PIN을 정하고 시드를 저장한 뒤 다시 불러오는 방법
---

# 카드 사용하기

처음 쓰는 카드는 PIN부터 정해 주세요. 준비한 카드에 ShieldSigner의 시드를 저장하고, 필요할 때 기기로 다시 불러올 수 있어요.

<div class="ss-summary-card">

### 01 · 카드 초기화와 PIN

새 카드의 첫 설정을 마쳐요. 이미 설정한 카드라면 기존 PIN을 사용해 주세요.

[카드 초기화 안내](./initialize)

</div>

<div class="ss-summary-card">

### 02 · 시드를 카드에 저장하기

ShieldSigner에 불러온 시드를 고르고, 카드 PIN과 저장할 이름을 입력해요.

[시드 저장 방법](./save)

</div>

<div class="ss-summary-card">

### 03 · 카드에서 시드 불러오기

카드에 저장한 시드를 읽고, 저장하기 전과 같은 지문인지 확인해요.

[시드 불러오기 방법](./load)

</div>

<Callout type="info" title="저장과 불러오기는 방향이 달라요">

저장은 ShieldSigner에서 카드로, 불러오기는 카드에서 ShieldSigner로 시드를 옮기는 과정이에요. 불러와도 카드에 저장한 시드가 지워지지는 않아요.

</Callout>
