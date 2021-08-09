# gyeongma
2017 public data - Node.js Project
<br>
공공데이터 API를 활용한 소프트웨어 공모전 출품작 (by esyeon, l2jong)
<br>
경마정보 조회 반응형 웹서비스
<br>
<br>
<b>OS</b>: Linux
<br>
<b>Back-end</b>: Node.js / Express App
<br>
<b>Front-end</b>: NONE
<br>
<b>Database</b>: NONE
<br>
<b>API</b>: data.go.kr -> 경마 관련 API 3개
<br>
<b>Issue</b>
<ul>
  <li>API 과부하로 인한 Shutdown</li>
  <li>API 과부하로 인한 페이지 로딩 속도 지연</li>
</ul>
<b>이제 생각난 Issue 개선 방향</b>
<ul>
  <li>Batch Program을 활용한 API 통신 후 DB 적재</li>
  <li>적재된 데이터를 사용자에게 노출</li>
</ul>
