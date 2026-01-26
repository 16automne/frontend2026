import axios from 'axios';
import React, { useState } from 'react'

function Join(props) {

  // [1] 변수 선언
  const [form, setForm] = useState({ //상태변수
    username:'',
    password:'',
    confirmPassword:''
  });
  const [error, setError] = useState(''); //에러 출력을 위한 변수
  const [success, setSuccess] = useState(''); //성공 출력을 위한 변수

  // [2] handleChange - 입력폼에서 사용자가 작성한 내용 담기
  const handleChange =(e)=> { //이벤트 핸들러 함수를 정의
    setForm({ //form이라는 상태(state)를 새 값으로 업데이트. 즉, id와 pw를 각 변수에 담기
      ...form, //기존 form데이터에 추가로 저장
      [e.target.name]:e.target.value //벤트가 발생한 input의 name 속성값을 키(Key)로 사용하고, 그곳에 입력된 값을 값(Value)으로 저장. 즉, id와 pw값 저장
    })
    setError(''); //에러함수 초기화
    setSuccess(''); //성공함수 초기화
  }

  // [3] 유효성 검사
  const handleSubmit = async (e) => { 
    e.preventDefault(); // 이제 매개변수 e를 받아오므로 정상 작동합니다.

    // password, confirmPassword가 동일 여부 확인
    if(form.password !== form.confirmPassword){
      setError('비밀번호 불일치. 다시 확인 바람');
      return;
    }

    try {
      // 비동기 통신 시도
      await axios.post('http://localhost:9070/register', {
        username: form.username,
        password: form.password
      });

      setSuccess('회원 가입 완료');
      setForm({
        username: '',
        password: '',
        confirmPassword: ''
      });
    } catch(err) {
      setError('회원가입 실패 : 아이디 이미 존재 혹은 서버 오류');
      console.error(err);
    }
  }

  return (
    <main>
      <section>
        <div className='join-container'>
          <h2 className='title'>회원가입</h2>
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor='username'>ID : </label>
              <input type='text' 
              id='username' name='username'
              placeholder='아이디 입력해주세요'
              value={form.username}
              onChange={handleChange}
              required/>
            </p>
            <p>
              <label htmlFor='password'>PW : </label>
              <input type='password' 
              id='password' name='password'
              placeholder='비밀번호를 입력해주세요'
              value={form.password}
              onChange={handleChange}
              required/>
            </p>
            <p>
              <label htmlFor='confirmPassword'>PW확인 : </label>
              <input type='password' 
              id='confirmPassword' name='confirmPassword'
              placeholder='비밀번호를 재입력해주세요'
              value={form.confirmPassword}
              onChange={handleChange}
              required/>
            </p>
            <p><button type='submit'>회원가입</button></p>

            {/* 회원가입 에러시 빨간색으로 문자 출력 */}
            {error&&<p style={{color:'red'}}>{error}</p>}
            {/* 회원가입 성공시 초록색으로 문자 출력 */}
            {success&&<p style={{color:'green'}}>{success}</p>}
          </form>
        </div>
      </section>
    </main>
  )
}

export default Join