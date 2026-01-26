import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function NoodleCreate(props) {

  // url 관련 이동 도구 (?)
  const navigate = useNavigate();

  // 1. 폼양식에 입력한 상태값 관리
  const [form, setForm] = useState({
    name:'',
    company:'',
    kind:'',
    price:'',
    e_date:''
  });

  // 2. 폼 양식에 데이터 입력 > handleChange함수 호출
  const handleChange =(e)=> {
    setForm({
      ...form, //기존 배열 값에 추가하기
      [e.target.name]:e.target.value
    });
  }

  // 3. 'submit'버튼 클릭 >  handleSubmit 함수 호출
    const handleSubmit =(e)=> { // 데이터를 가지고 서버로 이동
      e.preventDefault(); //새로고침방지
      axios.post('http://localhost:9070/noodle', form) //비동기로 백 서버에 데이터 넘김
        .then(() => {//통신 성공시 
          alert('상품이 등록 완료 되었습니다');
          navigate('/noodle'); //상품목록 페이지로 이동
        })
        .catch(err => console.log(err)); //오류시 에러출력
    }

  return (
    <main>
      <section>
        <h2>DB 입력 페이지</h2>
        <form name='라면정보입력' onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor='name'>이름 | </label>
              <input
                id='name' name='name' value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='company'>회사 | </label>
              <input
                id='company' name='company' value={form.company}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='kind'>종류 | </label>
              <input
                id='kind' name='kind' value={form.kind}
                onChange={handleChange}
                required
              />
              <p style={{fontSize:'10px', paddingBottom:'5px'}}> * C는 컵라면, M은 봉지라면</p>
            </div>
            <div>
              <label htmlFor='price'>금액 | </label>
              <input
                id='price' name='price' value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='e_date'>유통기한 | </label>
              <input
                id='e_date' name='e_date' value={form.e_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type='submit' className='btn'>신규상품 등록</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default NoodleCreate