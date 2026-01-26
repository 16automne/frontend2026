import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ContactUsList from './ContactUsList';
import { AlertContext } from '../AlertContext';

function ContactUs(props) {

  // [1] 상태 변수
  const [agree, setAgree] = useState(false); //checkbook 선택X 기본값
  const [formData, setFormData] = useState({ //폼태그 입력 받을 값
    name:'', phone:'', email:'', content:''});
  const navigate = useNavigate(); //url주소로 이동하기위한 변수
  const { setQuestionCount } = useContext(AlertContext);

  // [2] handleChange함수 - 입력양식에 입력시 발생
  const handleChange =(e)=> {
    const{name, value} = e.target; //사용자가 입력하는 값
    setFormData(prev => ({
      ...prev, [name]:value //상태함수에 각각 키:값 으로 저장
    }))
  }


  // [3] 유효성검사 - 문의하기 버튼 동의 여부 체크
  const handleSubmit =(e)=> {
    e.preventDefault(); //새로고침방지
    if(!agree){ //체크박스 미체크시 실행
      alert('개인정보처리방침에 동의해주세요');
      return;
    }
    // 체크박스 체크시, 비동기로 전송'
    axios.post('http://localhost:9070/api/contactus', formData) //데이터용 주소 - 서버에서 데이터만 쏙 가져오는 주소
    .then(() => { //통신성공
      alert('문의사항 접수 완료');
      setQuestionCount(count => count + 1); //숫자증가
      setFormData({name:'', phone:'', email:'', content:''}); //전송 후 초기화(입력란)
      setAgree(false); //전송 후 초기화(체크박스)
      navigate('/contactus'); //문의 페이지로 이동
    })
    .catch(err => console.log(err)); //통신시개시 에러출력
  }


  // [process] 변수 선언 → 함수작성 → 호출해 내용 실행 → 결과전송

  return (
    <main>
      <section>
        <h2>ContactUs DB 입력/출력</h2>
        <form onSubmit={handleSubmit} className='cohtact'>
          <h3>정성을 다해 답변을 해드리겠습니다</h3>
          <div className='contactWrap'>
            {/* 이름, 전화번호, 이메일, 내용 */}
            <div className='contactTop'>
              <div className='contactTopLeft'>
                <label htmlFor='name'>성함</label>
                <input type='text' placeholder='성함을 입력해주세요'
                  id='name' name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                
                <label htmlFor='phone'>연락받으실 번호</label>
                <input type='number' placeholder="'-'를 제외하고 전화번호를 입력해주세요"
                  id='phone' name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                
                <label htmlFor='email'>이메일</label>
                <input type='text' placeholder='이메일을 입력해주세요'
                  id='email' name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='contactTopRight'>
                <label htmlFor='content'>문의 내용</label>
                <textarea placeholder='문의하실 내용을을 입력해주세요'
                  id='content' name='content'
                  cols='30' rows='10'
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* 개인정보처리, 전송버튼 */}
            <div className='contactBottom'>
              <input type='checkbox'
                id='agree'
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)} //직접상태변경 - true, false값을 setAgree함수에 넣기
              />
              <label htmlFor='agree'>개인정보처리방침에 동의합니다</label>
              <button type='submit'>문의 접수</button>
            </div>
          </div>
        </form>
      </section>

      <ContactUsList />
    </main>
  )
}

export default ContactUs