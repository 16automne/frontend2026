import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BookStoreCreate(props) {

  // [1] 상태변수 - 폼양식에 입력한 상태값 관리
  const [form, setForm] = useState({
    name:'',
    area1:'',
    area2:'',
    area3:'',
    book_cnt:'',
    owner_nm:'',
    tel_num:''
  });

  // [2] 사용자가 입력폼에 데이터 입력시 발생하는 함수
  const handleChange =(e)=>{
    const {name, value} = e.target; //입력값 저장
    setForm((prev)=>({
      ...prev, //기존 배열값에 추가
      [name]:name === 'book_cnt'?Number(value):value
    }));
  }

  // [3] 신규 상품 등록하기 버튼 클릭 > 내용을 백엔드로 주소전송
  const handleSubmit =(e)=> {
    e.preventDefault(); //새로고침방지
    axios.post('http://localhost:9070/bookstore', form)
    .then(()=> {alert('상품이 등록 완료'); navigate('/bookstore');}) //통신 성공시상품목록 페이지로 이동
    .catch(err=>console.log(err)); //오류시 에러출력
  }

  // [4] url주소 관리
  const navigate = useNavigate();

  return (
    <main>
      <section>
        <h2>4. bookstore db입력을 위한 페이지</h2>
        <form name='입력' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>서점명 : </label>
            <input 
              id='name' name='name' 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor='area1'>시도/광역시 : </label>
            <select
              id='area1' name='area1'
              value={form.area1}
              onChange={handleChange}
            >
              <option value=''>시도/광역시 선택</option>
              <option value='서울'>서울</option>
              <option value='부산'>부산</option>
              <option value='인천'>인천</option>
              <option value='대구'>대구</option>
              <option value='광주'>광주</option>
              <option value='대전'>대전</option>
              <option value='울산'>울산</option>
              <option value='세종'>세종</option>
              <option value='강원도'>강원도</option>
              <option value='충청도'>충청도</option>
              <option value='전라도'>전라도</option>
              <option value='경상도'>경상도</option>
              <option value='제주도'>제주도</option>
            </select>
          </div>
          <div>
            <label htmlFor='area2'>시/군/구 : </label>
            <select
              id='area2' name='area2'
              value={form.area2}
              onChange={handleChange}
            >
              <option value=''>시/군/구 선택</option>
              <option value='강남구'>강남구</option>
              <option value='관악구'>관악구</option>
              <option value='광진구'>광진구</option>
              <option value='노원구'>노원구</option>
              <option value='중랑구'>중랑구</option>
              <option value='동래구'>동래구</option>
              <option value='수성구'>수성구</option>
              <option value='미추홀구'>미추홀구</option>
              <option value='광산구'>광산구</option>
              <option value='유성구'>유성구</option>
              <option value='울주군'>울주군</option>
              <option value='수원시'>수원시</option>
            </select>
          </div>
          <div>
            <label htmlFor='area3'>읍/면/동 : </label>
            <select
              id='area3' name='area3'
              value={form.area3}
              onChange={handleChange}
            >
              <option value=''>읍/면/동 선택</option>
              <option value='역삼동'>역삼동</option>
              <option value='혜화동'>혜화동</option>
              <option value='평창동'>평창동</option>
              <option value='면목동'>면목동</option>
              <option value='중랑구'>중랑구</option>
              <option value='망원동'>망원동</option>
              <option value='우동'>우동</option>
              <option value='광안동'>광안동</option>
              <option value='봉선동'>봉선동</option>
              <option value='첨단동'>첨단동</option>
              <option value='인계동'>인계동</option>
              <option value='남양읍'>남양읍</option>
            </select>
          </div>
          <div>
            <label htmlFor='book_cnt'>주문개수 : </label>
            <input 
              id='book_cnt' name='book_cnt' 
              value={form.book_cnt} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor='owner_nm'>주문자 : </label>
            <input 
              id='owner_nm' name='owner_nm' 
              value={form.owner_nm} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor='tel_num'>주문자 연락처 : </label>
            <input 
              id='tel_num' name='tel_num' 
              value={form.tel_num} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='btn_group'>
            <button className='btn'>글쓰기</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default BookStoreCreate