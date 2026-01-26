import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function FruitsUpdate(props) {

  // 변수
  const{num} = useParams(); // url경로에서 num값을 추출해 가져옴

  const [form, setForm] = useState({
    num:'',
    name:'',
    price:'',
    color:'',
    country:''
  });

  const navigate = useNavigate();
  // 서버측에 넘길 num값을 비동기 통신 후 성공여부 출력 뒤, 컴포넌트가 마운트 될 때 해당num값에 데이터를 조회 후 출력

  useEffect(()=>{
    axios.get(`http://localhost:9070/fruits/${num}`)
    .then(res=>{ //성공시 출력
      console.log('서버 응답 값 : ', res.data);
      setForm(res.data);
    })
    .catch(err=>console.log('조회 오류 : ', err)); //실패시 오류
  }, [num])
  

  // [1] 입력폼에 입력 > 데이터 입력을 위한 함수
  const handleChange =(e)=> {
    setForm({
      ...form, //기존 배열에 새롭게 추가
      [e.target.name]:e.target.value //값 저장
    });
  }

  // [2] 수정하기 버튼 클릭 > 내용 전송을 위한 함수
  const handleSubmit =(e)=> {
    e.preventDefault();
    // 비동기로 업데이트 할 내용을 백엔드로 전달
    axios.put(`http://localhost:9070/fruits/${num}`,{
      num:form.num,
      name:form.name,
      price:form.price,
      color:form.color,
      country:form.country
    })
    .then(()=>{ //데이터 전송이 성공적일 경우
      alert('상품 정보 수정 완료');
      navigate('/fruits'); //fruits페이지로 이동
    })
    .catch(err => console.log('수정 실패 : ', err)); //통신 실패 
  }

  return (
    <main>
      <section>
        <h2>FruitsUpdate DB 수정 페이지</h2>
        <form name='과일정보입력' onSubmit={handleSubmit}>
          <p>
            <label htmlFor='num'>Num : </label>
            <input name='num' id='num' value={form.num} readOnly />
          </p>
          <p>
            <label htmlFor='name'>과일명 : </label>
            <input name='name' id='name' value={form.name} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor='price'>가격 : </label>
            <input name='price' id='price' value={form.price} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor='color'>색상명 : </label>
            <input name='color' id='color' value={form.color} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor='country'>원산지 : </label>
            <input name='country' id='country' value={form.country} onChange={handleChange} required />
          </p>
          <p>
            <button type='submit' className='btn'>상품 수정 완료</button>
          </p>
        </form>
      </section>
    </main>
  )
}

export default FruitsUpdate