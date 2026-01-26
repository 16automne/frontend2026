import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function GoodsUpdate(props) {

  // 1. 변수 선언
  const {g_code} = useParams(); //받아온 code파라미터값 변수
  const [form, setForm] = useState({
    g_code:'',
    g_name:'',
    g_cost:''
  });
  const navigate = useNavigate();

  // 2.백엔드 서버측으로 넘길 데이터를 통신해서 성공,실패 여부 출력
  useEffect(()=> {
    axios.get(`http://localhost:9070/goods/${g_code}`)
    .then(res=>{ //성공이면 출력
      console.log('서버 응답 값 : ', res.data);
      setForm(res.data);
    })
    .catch(err=>console.log('조회 오류 : ', err)); //실패시 오류
  }, [g_code]);

  // 3.사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장
  const handleChange =(e)=> {
    setForm({
      ...form, //기존 배열에 새롭게 추가
      [e.target.name]:e.target.value //값 저장
    });
  }

  // 4. 수정하기 버튼 클릭시 실행되는 함수
  const handleSubmit =(e)=> {
    e.preventDefault();
    // 비동기로 업데이트 할 내용을 백엔드로 전달
    axios.put(`http://localhost:9070/goods/${g_code}`,{
      g_name:form.g_name, //상품명
      g_cost:form.g_cost //가격정보
    })
    .then(()=>{ //통신이 성공적일 경우
      alert('상품 정보 수정 완료');
      navigate('/goods'); //goods페이지로 이동
    })
    .catch(err => console.log('수정 실패 : ', err)); //통신 실패 
  }
  return (
    <main>
      <section>
        <h2>GoodsUpdate DB 수정 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="g_code">코드번호 : </label>
            <input name='g_code' id='g_code' value={form.g_code} readOnly />
          </p>
          <p>
            <label htmlFor="g_name">상품명 : </label>
            <input name='g_name' id='g_name' onChange={handleChange} value={form.g_name} required />
          </p>
          <p>
            <label htmlFor="g_cost">가격정보 : </label>
            <input name='g_cost' id='g_cost' onChange={handleChange} value={form.g_cost} required />
          </p>
          <button type='submit'>수정완료</button>
        </form>
      </section>
    </main>
  )
}

export default GoodsUpdate