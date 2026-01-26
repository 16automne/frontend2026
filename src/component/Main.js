import React from "react";

export default function Main(props){
  return(
    <main>
      <h2>첫페이지 - Main</h2>
      <p>MySql DB에 있는 Table자료들을 React에서 불러와 입력/출력/수정/삭제 기능을 실습하기</p>
      <dl>
        <dt>기능 추가 사항</dt>
        <dd>1. create메뉴: 새로우 페이지로 이동하여 자료 입력할 수 있도록 함.</dd>
        <dd>2. update메뉴 : 수정페이지로 이동하여 자료 수정할 수 있도록 함.</dd>
        <dd>3. delete메뉴: 해당 id값에 일치하는 자료 삭제 요청(axios.delete)</dd>
        <dd>4. 삭제 후 목록 다시 불러오기(자동 갱신)</dd>
        <dd>5. 데이터베이스(DB)에서 자료가 변경되면 자동을 인식하여 메뉴목록 옆에 '숫자 뱃지'가 자동으로 카운트 되도록 하기</dd>
      </dl>
    </main>
  );
};