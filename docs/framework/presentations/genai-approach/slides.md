---
title: "リバネスグループにおける生成AIへのアプローチ"
template: "technical"
theme: "default"
author: "吉田丈治"
date: "2025-04-04"
description: "生成AIとSlackの活用について、リバネスグループでの実践的な取り組みを詳しく解説"
id: "genai-approach"
---

# リバネスグループにおける生成AIへのアプローチ
<!-- template: title -->

吉田 丈治  
株式会社リバネス  
株式会社リバネスナレッジ

---

# Slack AI議事録を起動します
<!-- template: section -->

---

# はじめまして、吉田丈治(George YOSHIDA)です
<!-- template: content -->
<!-- layout: left-text-right-image -->
<!-- image: /docs/images/profile/george-yoshida.jpg -->

**株式会社リバネス 取締役CIO**

**株式会社リバネスナレッジ 代表取締役社長**

**2002年**
リバネス創業時に参画

**2014年**
Salesforce導入を機にCIOに就任

**2015年**
Slack導入

**2019年**
日本人として初めてSalesforce主催の世界イベントDreamforceにて基調講演  
プロダクトキーノート（AIテーマ）で講演

**Dreamforce 2019 Einstein Keynote**

---

# with VIP
<!-- template: content -->
<!-- layout: center -->

2023.11 with Marc Benioff CEO  
2024.10 with Slack CEO Denise

---

# Slackとの関わり方
<!-- template: content -->

**2013年 - 2014年**
- IT化
- Pardot Standard

**2015年 - 2016年**
- **Slack**

**2017年 - 2018年**
- **Experience Cloud**
- **Heroku**
- **Quip**
- **CRM Analytics**

**2019年**
- **Sales Cloud Einstein**
- **Account Engagement Advance(Einstein)**
- **myTrailhead**
- **Advertising Studio**
- **Tableau**

**2020年 - 2021年**
- **Enterprise Grid**

**2022年 - 2023年**
- **Snowflake**
- **DataCloud**

**2024年**
- **AI**

IT化 → 構造データ化 → AI黎明期/BI活用 → 生成AI革命

---

# リバネスナレッジの紹介
<!-- template: content -->

Salesforce製品を主軸としたITに特化した事業を行う組織です。

株式会社リバネスの業務システム部門が2022年8月に分社化し、設立されました。

"ITを使い倒せる組織を増やす"をミッションとして掲げています。

**株式会社リバネスは2002年に創業された140名強の事業体で現在も成長を続けています。**

**リバネスナレッジは、リバネスで行ってきたIT施策や組織づくりの知見に基づいた提案を行うために作られた組織です。**

**その為、実例をお出しできる事例が豊富に存在しています。**

**私達が試行錯誤してきた知見を元に、提案を行うのがリバネスナレッジの特徴と言えます。**

---

# リバネスナレッジの特徴は、リバネスの存在にあります
<!-- template: content -->

**株式会社リバネス**

リバネスで行った各種施策 → 知見をお届けします

**主な活動領域**
- Salesforce・Slack導入支援/アプリ開発・提供・運用
- Herokuアプリ開発/Salesforceとの同期
- 生成AIアプリ企画開発
- データ基盤(DataCloud,Snowflake)構築
- BI(Tableau/CRM Analytics)開発
- Agentforce開発

平塚 武  
新田 翔

---

# 提供中のSlackアプリケーション
<!-- template: content -->

**Party on Slack** - 生成AI搭載  
OpenAI APIを利用して、Slack内にChatGPTとの対話を可能にするアプリです

**Slack DeepL Translator**  
Slackの投稿、ファイル等をDeepLのAPIを使って翻訳するためのアプリケーションです。スタンプを押すだけで翻訳が始まります

**TimeLine for Slack**  
公開チャンネルのPostを一つのチャンネルへ転送。オフィスにあった「小耳に挟む」をSlack上で実現します。

**TASUKARU-Task All-**  
Slack上でToDo管理をしたいと思ったことはありませんか？

**Slack Salesforce Connector FREE**  
Slack上からSalesforceの活動履歴を登録する為のアプリケーション

**OYASUMI bot**  
Googleカレンダーと連携して、休暇時に自動的にSlackをスヌーズ。メンション時の連絡をお互いにわかりやすく表示してくれるアプリ

**TIPS**  
Slack用高機能リマインダー。一つのスケジュールに複数のメッセージを登録することができ、それらをランダムにチャンネルにpost

**YOKOKU for Slack**  
Googleカレンダーの特定のキーワードにマッチする予定を特定のチャンネルに流すアプリ

*アプリの提供は終了いたしました*

---

# Agent対応
<!-- template: content -->

Slack画面の右上から呼び出すことのできるUIに対応しています

Slack上においては生成AIは既に「使ってみるもの」ではなく当たり前に業務利用するものと位置づけられているように感じます

---

# 生成AIの取り組みについて
<!-- template: section -->

---

# 2023年3月にParty on Slackをリリース
<!-- template: content -->

**対話型の大規模言語モデルの登場**

ChatGPT, Claude, Gemini等に広く対応し、その活用をSlack内で推進

OpenAI, Anthropic, Google等のモデルへの知見の拡大、モデルをホスティングしているMicrosoft AzureやAWSへの接続によって広く多くの組織における活用を促進

現在までに述べ1万人弱が活用

---

# 2024年にParty on Slackで実現してきたこと
<!-- template: content -->

**テキストの入出力量が大幅に向上し業務利用の幅が大幅に広がる**

**2024年はマルチモーダル**

テキストのやり取りに加えて、画像、音声の入出力ができるように進化

画像をインプットして解析させる、テキストから画像を生成する

音声をテキストに変換、テキストから音声を生成

**アシスタントAPIの登場**

現在では随分当たり前になったが、LLMと対話する事でデータの分析をする、コードを書くといった生成AI自体が働いてくれるという時代が到来した

---

# 自社プロダクトへの応用
<!-- template: content -->

**Pompon! https://start.pompon.app**

生成AI対応のドキュメント共有プラットフォーム

生成AI活用
- スライドの文字起こし

---

# 自社プロダクトへの応用
<!-- template: content -->

**Pompon! https://start.pompon.app**

生成AI対応のドキュメント共有プラットフォーム

生成AI活用
- スライドの文字起こし
- 要約

開発中
- Slackアプリによるエージェント機能

---

# 2024年のエポックメイキングな出来事
<!-- template: content -->

**ChatGPTアプリではAdvanced Voice Modeが登場(9月)**

カメラ入力でリアルタイムに会話をすることができるという機能

APIはかなり高額になるため、専用アプリでの実行がメインだと思われる。

---

# そして大幅な革新が続いている2025年へ突入
<!-- template: content -->

**💡 Thinkingモデルの登場**

GoogleがGeminiにDeep Researchを追加。大量のWebサイトを参照した結果をまとめる

ついでOpenAIがo1 pro mode及びDeep Research機能を提供

**テキスト生成は一つ次元を超えた**

大量のコンテキストから情報をまとめるという作業は人間の手を離れたと感じる

出力には時間がかかるようになっているが、人間がやるより圧倒的に早く、うまくまとまる

---

# ChatGPT,ClaudeのプロジェクトおよびNotebookLM
<!-- template: content -->

フォルダに関連するファイルを突っ込んでおき、それらの情報について会話で探索していくという使い方がとにかく便利

大量な情報を手軽に扱うということが現実に

---

# 音声対話はもはや見分けがつかない。ただしまだ英語のみ
<!-- template: content -->

**Sesami AI** https://www.sesame.com/

---

# オペレーター
<!-- template: content -->

ChatGPTがWebブラウザを駆使して自動的に動かしていく  
ChatGPTだとまだ遅いと感じる

---

# AIエンジニア Devinの採用
<!-- template: content -->

https://devin.ai/

エンジニアがコードを書く時代から、AIが書いたコードをエンジニアがレビューする時代へ

素養のある人が使うことでスピード感の向上が期待されている

---

# モバイルアプリ開発 Rork
<!-- template: content -->

**text to Apps**

---

# OpenAIから4o-imageのリリース
<!-- template: content -->

世界中で新しい画像生成サービスがテストされている

技術者のみでなく、沢山の人が利用をしてみようと考える切っ掛けになった出来事と言える

そしてGPU不足へ

---

# ローカルに自分の分身を Second Me
<!-- template: content -->

---

# Slack AI
<!-- template: section -->

---

# Slack連携　＋　Slack AI
<!-- template: content -->

特定のチャンネルにSalesforceからのデータを投稿するようにしておくことで、翌朝7時にSlack AIが内容をまとめてくれるという機能を重宝している

ここは工夫のしがいのあるテーマだと思うので、より最適化していきたい

---

# Slackのまとめに対する"私の"考え方
<!-- template: content -->

極端な話しをすると、今後人間は人間が吐き出した情報を直接接種することは減っていくのではないかと考えています

今は一日の「まとめ」ですが、将来的にはリアルタイムに話された情報を、その人がわかりやすい形に変換して受け取り、それを使って理解するという形に変わっていくはずです。Webミーティング等は早い段階でそのような機能が実装されるのではないか

Slack AIを使っていると、まとめに出てくる情報、出てこない情報がだんだんと分かるようになってくるのではないかと感じています

どのように情報を発信すれば記録に残るのか。これを体感している人としていない人でどちらの方が影響力を与えられる存在になるかというと、当然のように前者になるでしょう

Slackは **生成AIネイティブ** を育てる土壌になり得るのです

---

# 生の情報を接種しないパターン：スレッドの要約
<!-- template: content -->

Slack検索する

長大なスレッドを発掘してしまう

全部読むのか?となることありませんか

要点を掴むだけなら要約でいいか！となる人の方が多いのではないでしょうか

---

# 生の情報を接種しないパターン：チャンネルの要約
<!-- template: content -->

キャッチアップしないとなと思ったタイミングでチャンネルを訪問

全部読むのは流石にしんどい

チャンネルのサマリーボタンを押す

---

# 言語の壁が壊れはじめている
<!-- template: content -->

自分のSlackアカウントの言語設定で要約が走る

海外メンバーが使っているチャンネルを登録しておくことで、何が起きているのかを把握しやすくなった

---

# 情報収集も自動化したほうがよい理由
<!-- template: section -->

---

# Slackには情報収集自動化機能がある
<!-- template: content -->

たとえばRSS登録

自分の気になるRSSを登録しておけばその情報が自動的にチャンネルに流れていく

日経アプリ

日経新聞のニュースがチャンネルに流れる

**Party on SlackへのRSS登録**

内容をLLMが好みの形に変換してチャンネルに投げてくれる

---

# まとめBefore/After
<!-- template: content -->

**これまでのSlack**  
流れてきた情報は全部人間が読まなければいけなかった

**Party on Slackでの実装**  
RSSを生成AIを使って、自分の好みの形に変換して出力させることによって認知コストを下げた

**更にSlack AIまとめを使用**  
認知コストを下げても一日に大量のニュースが来ると読むことは実質不可能  
まとめてしまおう

---

# 人間は一歩目が一番重い
<!-- template: section -->

---

# 議事録を廃止できないか
<!-- template: content -->

**Slack ハドルミーティングAI議事録**

ハドル=SlackのWebミーティングの機能

これを使ってAI議事録をONにすることで、ミーティング後に議事録が書き起こされる

**全員が会議にコミットできることが重要**

議事録要員は不要

必要なメンバーがきっちりとコミットする意味のある会議の実現が期待される

---

# たたき台がまず作られることの重要性
<!-- template: content -->

AI議事録は、ハドルミーティングが終わって数分で作られます

そこで会話されたないようをもとに、概要を作成し、重要だったポイントを抜き出し、次にやるべきことを設定してくれます

ただ、これは完璧ではありません

AI議事録はcanvasとして展開されるので、そこに情報を付け加えればよいのです

初動にかかる心理的コストを0にし、あとは参加者が自分で修正、追記すればよいだけというスピード感は使ってみることで理解が進みます

---

# AI議事録は使い物になるか？
<!-- template: content -->

発展途上ではある

情報が抜け落ちすぎるという指摘はそれなりにあります

先ほど述べた通り、canvasなので追記すれば良い

「まとめ」でも感じるのですが、英語と日本語で内容量が変わる感覚はあるが

**話し方の問題なのでは？**

主語を抜かないみたいな話し方の工夫が必要な可能性

人間がAIに合わせたほうが早いというのが現時点での感覚

一方でそれがずっと継続するかと言うとそんなことも無いだろうと予想

---

# 検索体験が変わっていく
<!-- template: content -->

キーワード検索からセマンティックサーチへ

従来のSlackはキーワード検索

今後は「キーワード＋目的語」の形式で情報を抽出するように変わっていく

ChatGPTに聞くように、Slackに蓄積された情報をもとにして回答をしてくれるのがSlack AIの超重要な機能

---

# 特定の目的を持った情報抽出へ
<!-- template: content -->

**Pompon!に最近追加された機能は？**

このような形で情報検索ができるように変わります

---

# ファイルの自動要約
<!-- template: content -->

概要を把握する時間短縮

恐らくSlackAI検索につながっているのだろうと思いますが(どうなんだろう)

---

# Slack のエンタープライズサーチが良い
<!-- template: content -->

Slack検索の対象に任意のアプリを選ぶことが出来ます(現在はGithubとGoogle Driveのみ)  
Google Driveに入れたファイルが直接検索できるのめちゃくちゃはかどります

---

# Slack Sales Elevateについて
<!-- template: content -->

**Salesforceはリッチすぎる** のである

なんでも出来るが故に、情報量が多くなりがちなのがSalesforce

商談の記録を書きたいだけなのに、トップページ→商談検索→商談開く→記録欄を開く→記録を書いて保存する、というのはステップ数が多すぎるのでアプリを作った

商談リストを見たい時にSalesforceをわざわざ見に行くのではなく、Slackのモバイルアプリで簡単に見たい！→Sales Elevateは想像以上に便利でした

特に外出の多い営業担当にはとても重宝される機能です

---

# 商談の変化をSlackに通知する
<!-- template: content -->

フローを使って簡単に実装できるのは皆さん御存知の通りではないかと思います

**Slack SalesElevate**

Slackのアドオンを使うことで、商談に関するアラートが手軽に実装することができるようになりました

---

# Sales Elevateの良いところ
<!-- template: content -->

Slack上で簡単にレコードの編集ができる

モバイルでもできるので出先でも簡単に編集可能！

外出が多い営業にとってはとても重宝される機能

---

# AI議事録を止めてみましょう
<!-- template: content -->

---

# Agent Builder
<!-- template: section -->

---

# Agentforceは2種類存在している
<!-- template: content -->

Sales Cloudの右上にあるボタンから呼び出すのがEinstein Copilotと書かれているもの

「新しいエージェント」を押して新規に作るエージェントはその他の場所からの呼び出しに利用される

---

# 日本語が選べるようになってました(ついに)
<!-- template: content -->

---

# [New]Agentforce in Slackの活用をスタート
<!-- template: content -->

Slackの中にSalesforceで設定したAIエージェントを呼び出すことが可能

エージェントのカタログ画面から、最適なエージェントを選んで利用することができる

Party on Slackは生成AIの活用にフォーカスしているので沢山のことができるが、Agentforce in Slackは目的を限定することでより直感的に使えるようになったと言える

---

# 社内事例: メール作成に特化したエージェントを設定して呼び出す
<!-- template: content -->

動作は右図の通り→

エージェントは、設定したガイドに従って、ユーザーのレベルに関係なくサポートをしてくれる

結果として、新入社員であっても必要な要素を兼ね備えた最低限のコンテンツ生成が可能となり、ベテランであればコンテンツ作成時間が圧倒的に短縮される

用途を限定できるのが良い

---

# Slackに関するエージェントアクションが増えていた！
<!-- template: content -->

**Create a Slack Canvasが熱い** 🔥

デモの説明

SvCに問い合わせ→Slackアプリがフィールドサービス担当にSlack送信→お客様の家の地図をみて現地に訪問する→訪問の連絡をAgentに投げると何が悪いのか及び対応方法を返してくる→作業をして解決した旨を連絡する→AgentがCanvasに作業報告書を作成する！！

---

# AI議事録の結果は？
<!-- template: content -->

---

# Thank you ！
<!-- template: title -->

ご覧いただき、ありがとうございました！

**株式会社リバネスナレッジ**

https://k.lne.st

登壇履歴：https://lne.st/geeorgey  
note：https://note.com/geeorgey  
Qiita：https://qiita.com/organizations/leaveanest

〒162-0822 東京都新宿区下宮比町1-4 飯田橋御幸ビル

SlackアプリならFunctions：https://functions.lne.st

**公開スライド枚数 2000枚を超えました**

