---
title: JavaCard란?
description: SeedKeeper 카드의 실행 환경과 ShieldSigner의 역할 구분
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

# JavaCard란?

카드 안에 아주 작은 컴퓨터가 들어 있다고 생각해 보세요.<br>실제로 Java Card를 지원하는 스마트카드에는 정보를 저장하고 계산도 할 수 있는 칩이 들어 있어요.<br><br>

Java Card는 그 작은 컴퓨터에서 프로그램을 실행할 수 있게 해주는 기술이에요. <br>Java라는 컴퓨터 언어로 만든 프로그램을 카드 안에서 사용할 수 있도록 해주는 거죠.<br>
정확히 말하면 Java Card는 플라스틱 카드 자체가 아니라, 카드 속 프로그램을 위한 기술의 이름이라고 할 수 있습니다.<br>
# Applet 이란?
Applet(애플릿)은 그 카드 안에 설치해서 사용하는 작은 앱이에요.<br>스마트폰에 계산기 앱을 설치하는 것처럼, 카드에도 특정 일을 하는 프로그램을 넣는 거예요.<br><br>
ShieldSigner 에서는 JavaCard에 SeedKeeper 라는 Applet을 설치할 수 있도록 기능이 내장되어 있어요.<br>
니모닉 문구를 카드속 보안금고에 넣고, PIN 번호가 일치하면 다시 읽을수도 있어요<br><br>

공식 참고자료: [SeedKeeper Applet GitHub (Toporin)](https://github.com/Toporin/Seedkeeper-Applet) · [SeedKeeper 공식 빠른 시작](https://seedkeeper.io/quick-start/)

## 다음 단계

[← Guide 개요](../) · [다음: SeedKeeper란? →](./what-is-seedkeeper)
