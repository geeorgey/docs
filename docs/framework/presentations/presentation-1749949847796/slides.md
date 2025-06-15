---
title: "TDX25'と生成AI活用とAIエージェント"
template: "business"
theme: "default"
author: "吉田丈治(George YOSHIDA)"
date: "2025-03-21"
description: "TDXGG 2025での発表資料。TDX初参加の体験談と生成AI活用、Agentforce in Slackの実践的な活用方法について詳しく解説。"
id: "tdx25-framework-test"
---

# TDX25'と生成AI活用とAIエージェント
<!-- template: title -->

TDXGG 2025での発表資料

株式会社リバネスナレッジ

---

# はじめまして、吉田丈治(George YOSHIDA)です
<!-- template: content -->
<!-- layout: center -->

**株式会社リバネス 取締役CIO**

**株式会社リバネスナレッジ 代表取締役社長**

### 経歴
- **2002年**: リバネス創業時に参画
- **2014年**: Salesforce導入を機にCIOに就任
- **2015年**: Slack導入
- **2019年**: 日本人として初めてSalesforce主催の世界イベントDreamforceにて基調講演

---

# 宣伝：Salesblazer Community Japan キックオフしました 🎉
<!-- template: section -->

一昨日キックオフイベントやってきました。

内容は https://Lne.st/sbjpn

---

# Salesforceとの関わり方
<!-- template: content -->
<!-- layout: center -->

### 導入の歴史

**2013-2014年**: Pardot Standard
**2015-2018年**: Experience Cloud, Heroku, Quip, CRM Analytics
**2019年**: Account Engagement Advance(Einstein), myTrailhead
**2020-2021年**: Slack統合
**2022-2024年**: Sales Cloud Einstein, Enterprise Grid, Snowflake, DataCloud

### 進化の段階
- **IT化** → **構造データ化** → **AI黎明期/BI活用** → **生成AI革命**

---

# @Agentforce Innovation Day Service
<!-- template: content -->
<!-- layout: center -->

**ユースケース教えてくれたよ**

日本版のコンサルテーション受けて来た!

---

# TDXに初参加
<!-- template: content -->
<!-- layout: left-text-right-image -->
<!-- image: /docs/images/moscone-center.jpg -->

**Moscone Centerって本来こういう姿だったんだ...**

冬は寒いからだと思いますが治安が比較的良い気がします

レジストはDreamforce同様Westの一階です

---

# 一番の衝撃は
<!-- template: content -->
<!-- layout: center -->

### 初めて参加した感想

**「かつてのDreamforceみたいだ...」**

### 最も重要なこと：キーノートが少ない！

- 2024のDreamforceはキーノート疲れがすごかった
- TDXはブレイクアウト、ハンズオンにたくさん参加できた

**注意点**: ハンズオンは埋まりがちなのでDrop-inの場合は早めに並ぶこと

---

# TDXは良いぞという話
<!-- template: content -->
<!-- layout: center -->

### ハンズオン・ミニハックは自分のPCで

- **USキーボード**なので慣れてない人は大変かも
- 基本的には資料をDLする形式が多いので、**自分のPCが使える場合はそうした方が楽**

### 一つだけ自分のPCでできなかったハンズオン

**Get Started with Tableau Next**

HTML等のコードがPCに既に入っている状態のスタートだったので自分のPCを使えなかった

---

# 英語なんて怖くない！
<!-- template: section -->

### 生成AI活用

---

# 英語のセッションを深く理解する
<!-- template: content -->
<!-- layout: center -->

### 方法1: スライドと文字起こしを活用

1. **スライドと、文字起こしを写真に撮る**
2. **LLMに渡して説明してもらう**

キーノートだと文字起こしが小さくて難ありか

---

# 英語のセッションを深く理解する２
<!-- template: content -->
<!-- layout: center -->

### 方法2: ChatGPTのAdvanced Voiceモードを使う

- 画面で見せつつ音声を拾う事で、より詳しい解説をしてもらう
- コントロールは結構難しい。時間制限も厳しい

### 注意点

- LLMで処理しながら𝕏に投稿するのは忙しすぎる
- リアルタイムなソーシャルメディア投稿は諦める必要がある

---

# こんな風にセッションを見てました
<!-- template: content -->
<!-- layout: center -->

### Advanced Voice Modeの活用法

1. **文字起こし＆リアルタイムQ&A**をしておく
2. 最後に「このセッションの内容をブログコンテンツにして」と命令
3. **セッション内容がまとまる**という発見

**振り返りコンテンツとしても良い**

今後はこの形式でもいいかもしれない

---

# ChatGPTにコンテンツにしてもらってしまう
<!-- template: content -->
<!-- layout: center -->

URLはこちら: https://x.com/geeorgey/status/

Advanced Voice Modeを使って効率的にセッション内容を整理・活用

---

# Top 10 Best Practices for Building with Agentforce
<!-- template: content -->
<!-- layout: center -->

1. **Start with Clear Use Cases** - 明確なユースケースで始めよう
2. **Start Small and Iterate** - 小さく始めて反復しよう
3. **Nail Down Clear Instructions** - 明確な指示を出す
4. **Experiment with Topics and Behavior** - トピックを実験しまくること
5. **Leverage Pre-built Actions** - 既存のアクションを活用する

---

# Top 10 Best Practices for Building with Agentforce (続き)
<!-- template: content -->
<!-- layout: center -->

6. **Prioritize Security and Compliance** - セキュリティとコンプライアンスを優先する
7. **Involve Humans in the Loop** - AIは人間の意思決定をサポートするものである
8. **Define standardization vs customization** - 標準化とカスタマイズの定義 ←難しそう！
9. **Refactor prompts and outputs** - 試行錯誤しながらリファクタリング ←難しそう！
10. **Think about user adoption** - ユーザーの受け入れと変更管理 ←難しそう！

---

# Agentforceをどうするか
<!-- template: section -->

---

# [New]Agentforce in Slackの活用をスタート
<!-- template: content -->
<!-- layout: left-text-right-image -->
<!-- image: /docs/images/agentforce-slack.jpg -->

### 特徴

- Slackの中にSalesforceで設定したAIエージェントを呼び出すことが可能
- エージェントのカタログ画面から、最適なエージェントを選んで利用
- **目的を限定することでより直感的に使える**

Party on Slackは生成AIの活用にフォーカスしているが、Agentforce in Slackは目的を限定することでより直感的に使えるようになった

---

# 社内事例: メール作成に特化したエージェントを設定して呼び出す
<!-- template: content -->
<!-- layout: center -->

### 効果

- **エージェントは、設定したガイドに従って、ユーザーのレベルに関係なくサポート**
- **新入社員であっても必要な要素を兼ね備えた最低限のコンテンツ生成が可能**
- **ベテランであればコンテンツ作成時間が圧倒的に短縮**

**用途を限定できるのが良い**

---

# Slackに関するエージェントアクションが増えていた！
<!-- template: content -->
<!-- layout: center -->

### Create a Slack Canvasが熱い 🔥

**デモの説明**:
1. SvCに問い合わせ
2. Slackアプリがフィールドサービス担当にSlack送信
3. お客様の家の地図をみて現地に訪問
4. 訪問の連絡をAgentに投げると何が悪いのか及び対応方法を返してくる
5. 作業をして解決した旨を連絡
6. **AgentがCanvasに作業報告書を作成する！！**

---

# エージェントアクションまとめてみた
<!-- template: content -->
<!-- layout: center -->

**詳細情報**: http://lne.st/agentactions

**種別**: フローはこんな感じでフローに飛べます

---

# Thank you ！
<!-- template: title -->

### 株式会社リバネスナレッジ

**Website**: https://k.lne.st

**登壇履歴**: https://lne.st/geeorgey

**note**: https://note.com/geeorgey

**Qiita**: https://qiita.com/organizations/leaveanest

**SlackアプリならFunctions**: https://functions.lne.st

---

**公開スライド枚数 2000枚を超えました**

〒162-0822 東京都新宿区下宮比町1-4 飯田橋御幸ビル

