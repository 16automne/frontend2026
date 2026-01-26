import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function GoodsCreate(props) {
  // 상태값 관리를 위한 함수
  const [form, setForm] = useState({
    g_name:'',
    g_cost:''
  });

  // url주소관린
  const navigate = useNavigate();

  // 사용자가 입력박스에 입력하면 호출되는 함수 == 값 저장을 위함
  const handleChange =(e)=> {
    setForm({
      ...FormData,  //기존 배열값에 새롭게 추가
      [e.target.name]:e.target.value
    });
  }

  // 신규상품 등록하기 버튼 클릭시 호출되는 함수 == 서버(back)로 전달을 위함
  const handleSubmit =(e)=> {
    e.preventDefalut(); //새로고침 막기
    axios.post('http://localhost:9070/goods', form)
    .then(()=> {  //통신 성공시
      alert('상품이 등록 완료 되었습니다');
      navigate('/goods'); //상품목록 페이지로 이동
    })
    .catch(err=>console.log(err));  //실패시 콘솔모드에 에러 출력
  }

  return (
    <main>
      <section>
        <h2>Goods DB 입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label>상품명 : </label>
            <input
              name="g_name"
              value={form.g_name}
              onChange={handleChange}
              required
            />
          </p>
        </form>
      </section>
    </main>
  )
}

export default GoodsCreate