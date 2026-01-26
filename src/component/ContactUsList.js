import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ContactUsList(props) {
  
  // [1] 변수
  const [data, setData] = useState([]); //상태변수 - 여러개라서 대괄호 사용
  const navigate = useNavigate();
  
  // [2] 데이터 리스트 - 비동기로 받아서 출력
  const loadData =()=> {
    axios //비동기
    .get('http://localhost:9070/contactus') //파일 가져오기
    .then(res => setData(res.data)) //성공시 데이터 저장
    .catch(err => console.log(err)) //실패시 에러 출력
  }

  // [3] useEffect - 컴포넌트 생명주기에서 데이터를 한번만 불러오기
  useEffect(()=> {loadData();}, []); //비동기 방식으로 함수 1번 실행

  // [4] 날짜 포맷 함수 수정
  const formatData =(date)=> {
    const d = new Date(date); 
    return d.toLocaleDateString('ko-KR'); //한국지역날짜
  }

  return (
    <>
      <section>
        <table className='data_list5'>
          <thead>
            <tr>
                <th>No.</th>
                <th>성함</th>
                <th>연락처</th>
                <th>이메일</th>
                <th>문의 내용</th>
                <th>문의일</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  {/* 문의 내용이 너무 길면 잘라서 보여주기 */}
                  {/* <td>{item.content.length > 20 ? item.content.substring(0, 20) + "..." : item.content}</td> */}
                  <td>{item.content}</td>
                  <td>{formatData(item.date)}</td>
                </tr>
                ))
              ) : (
              <tr>
                <td colSpan='6' style={{textAlign:'center'}}>접수된 내용이 없습니다</td>
              </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default ContactUsList