import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function BookStoreUpdate(props) {

  // [1] url경로에서 code값을 추출해 가져옴
  const{code} = useParams();

  // [2] 상태변수
  const [form, setForm] = useState({
      name:'',
      area1:'',
      area2:'',
      area3:'',
      book_cnt:'',
      owner_nm:'',
      tel_num:''
    });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9070/book_store/${code}`)
    .then(res=>{ //성공시 출력
      console.log('서버 응답 값 : ', res.data);
      setForm(res.data);
    })
    .catch(err=>console.log('조회 오류 : ', err)); //실패시 오류
  }, [code]);

  // [2] 폼태그 입력시 발생되는 함수 - 값 저장
  const handleChange =(e)=> {
    setForm({
      ...form,
      [e.target.name]:e.target.value //입력한 값을 각각 저장
    })
  }

  // [3] 수정하기 버튼 클릭시 내용 전송
  const handleSubmit =(e)=> {
    e.preventDefault(); //새로고침방지

    // 비동기방식으로 업데이트할 내용을 백엔드로 전달
    axios.put(`http://localhost:9070/bookstore/bookstoreupdate/${code}`, {
      name:form.name,
      area1:form.area1,
      area2:form.area2,
      area3:form.area3,
      book_cnt:form.book_cnt,
      owner_nm:form.owner_nm,
      tel_num:form.tel_num
    })
    .then(()=>{ //데이터 전송이 성공적일 경우
      alert('상품 정보 수정 완료');
      navigate('/bookstore'); //Z페이지로 이동
    })
    .catch(err => console.log('수정 실패 : ', err)); //통신 실패 
  }

  return (
    <main>
      <section>
        <h2>4. books data 수정/업데이트를 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p>
              <label htmlFor='code'>CODE : </label>
              <input
                id='code' name='code'
                value={form.code}
                readOnly
              />
            </p>
            <p>
              <label htmlFor='name'>서점명 : </label>
              <input
                id='name' name='name'
                value={form.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='area1'>시도/광역시 : </label>
              <input
                id='area1' name='area1'
                value={form.area1}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='area2'>시/군/구 : </label>
              <input
                id='area2' name='area2'
                value={form.area2}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='area3'>읍/면/동 : </label>
              <input
                id='area3' name='area3'
                value={form.area3}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='book_cnt'>주문개수 : </label>
              <input
                id='book_cnt' name='book_cnt'
                value={form.book_cnt}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='owner_nm'>주문자 : </label>
              <input
                id='owner_nm' name='owner_nm'
                value={form.owner_nm}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='tel_num'>주문자 연락처 : </label>
              <input
                id='tel_num' name='tel_num'
                value={form.tel_num}
                onChange={handleChange}
              />
            </p>
            <p>
              <button type='submit' className='btn'>수정 완료</button>
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}

export default BookStoreUpdate