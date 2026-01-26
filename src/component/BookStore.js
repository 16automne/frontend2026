import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BookStore(props) {

  // [1] 변수
  const [data, setData] = useState([]); //상태변수 - 여러개라서 대괄호 사용
  const navigate = useNavigate();
  
  // [2] 데이터 리스트 - 비동기로 받아서 출력
  const loadData =()=> {
    axios
    .get('http://localhost:9070/book_store') //파일 가져오기
    .then(res => setData(res.data)) //성공시 데이터 저장
    .catch(err => console.log(err)) //실패시 에러 출력
  }

  // [3] useEffect - 컴포넌트 생명주기에서 데이터를 한번만 불러오기
  useEffect(()=> {loadData();}, []); //비동기 방식으로 함수 1번 실행

  // [4] 삭제 deleteData
  const deleteData =(code)=> {
    if(window.confirm('정말 삭제?')){
      axios
      .delete(`http://localhost:9070/book_store/${code}`)
      .then(()=>{alert('삭제완료'); loadData();}) //삭제 성공시 다시 불러와서 목록 새로 고침
      .catch(err => console.log(err)); //실패시 에러출력
    }
  }

  return (
    <main>
      <section>
        <h2>BookStore DB 입력/출력/수정/삭제</h2>
        <p>MYSQL DB에 있는 자료를 출력select, 자료 입력insert, 삭제 delete, 수정update하기를 실습 응용 - URUD</p>

        <div className='btn_group'>
          <button className='btn' onClick={() => navigate('/book_store/bookstorecreate')}>글쓰기</button>
        </div>
        
        <table className='data_list3'>
          <thead>
            <tr>
              <th>코드</th>
              <th>서점명</th>
              <th>시도/광역시</th>
              <th>시/군/구</th>
              <th>읍/면/동</th>
              <th>주문개수</th>
              <th>주문자</th>
              <th>주문자 연락처</th>
              <th>편집</th>
            </tr>
          </thead>
          <tbody>
            {/* backend에서 db요청해 결과를 json으로 받아서 map함수로 출력 */}
            {
              data.map(item => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.area1}</td>
                  <td>{item.area2}</td>
                  <td>{item.area3}</td>
                  <td>{Number(item.book_cnt).toLocaleString()}</td>
                  <td>{item.owner_nm}</td>
                  <td>{item.tel_num}</td>
                  <td>
                    <button className='btn update_btn' onClick={()=>{navigate(`/bookstore/bookstoreupdate/${item.code}`)}}>수정</button> &nbsp;
                    <button className='btn del_btn' onClick={() => deleteData(item.code)}>삭제</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default BookStore