import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AlertContext } from '../AlertContext';

function Fruits(props) {

  //// ----- 상태 변수 ----- ////
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //페이지 초기값
  const [inputKeyword, setInputKeyword] = useState(''); //타자 치는 용도
  const [keyword, setKeyword] = useState(''); //실제 검색 실행용
  
  const { setFruitsCount } = useContext(AlertContext); 

  const navigate = useNavigate(); //글쓰기버튼 - 해당 컴포넌트주소로 이동
  const handleSearch =()=> { // 검색버튼 - 검색을 위한 함수
    setKeyword(inputKeyword); // 여기서 실제 keyword가 바뀌며 filterData가 재계산됨
    setCurrentPage(1);        // 검색 시 1페이지로 이동
  }

  const loadData =()=>{
    axios.get('http://localhost:9070/fruits')
    .then(res => {
      setData(res.data);
      setFruitsCount(res.data.length); //data개수 가져옴
    }) // 성공시 데이터를 저장
    .catch(err => console.log(err)); // 실패시
  }
  useEffect(()=>{
    loadData(); //컴포넌트 실행시 한번만 데이터 로딩
  },[]);

  // -- [1] 선택 자료 삭제 - 기준:num -- //
  const deleteData=(num) => {
    if(window.confirm('정말 삭제?')){
      axios
        .delete(`http://localhost:9070/fruits/${num}`)
        .then(() => { //성공시
          alert('삭제 완료');
          loadData(); // 삭제 후 다시 불러와서 목록 새로 고침
        })
        .catch(err => console.log(err)); //오류시, 에러출력
    }
  }

  // -- [3] 검색 -- //
  const filterData = data.filter(item => //필터링: 검색시 nmae(과일명)기준 검색
    item.name.toLowerCase().includes(keyword.toLowerCase())
  )
  const handleReset =()=> { //검색폼에 입력된 데이터 초기화
    setInputKeyword(''); //입력값 초기화
    setKeyword(''); //검색키워드 제거
    setCurrentPage(1); //1페이지로 이동
  }

  const handleKeyDown =(e)=> {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  // -- [2] 페이지네이션 -- //
  // 계산 공식
    const itemsPerPage = 5; // 한페이지에 보여줄 페이지 수

    // [현재 페이지에 보여줄 실제 데이터 조각 찾기]
    const indexOfLast = currentPage * itemsPerPage; //현재 페이지의 마지막 아이템 번호
    const indexOfFirst = indexOfLast - itemsPerPage; //현재 페이지의 시작 아이템 번호
    // const currentItems = data.slice(indexOfFirst, indexOfLast); //현재 페이지에 보여줄 실제 데이터 조각 (페이지의 시작번호 ~ 페이지의 끝번호의 바로 앞 보여주기)
    const currentItems = filterData.slice(indexOfFirst, indexOfLast); //현재 페이지에 보여줄 실제 데이터 조각은 filterData (페이지의 시작번호 ~ 페이지의 끝번호의 바로 앞 보여주기)

    // [하단 페이지 버튼을 위한 계산]
    //const totalPage = Math.ceil(data.length / itemsPerPage); //전체 페이지 개수(올림 처리)
    // const totalPage = Math.ceil(filterData.length / itemsPerPage); //필터링 된 데이터
    const totalPage = Math.max(1, Math.ceil(filterData.length / itemsPerPage)); //필터링 된 데이터

    let startPage = Math.max(1, currentPage - 2); //화면에 보일 시작 페이지 번호 (아무리 작아도 1번부터 시작)
    let endPage = Math.min(totalPage, startPage + 4); //화면에 보일 끝 페이지 번호 (전체 페이지의 끝 번호를 넘지 않게하기)
    startPage = Math.max(1, endPage - 4); //끝 페이지 기준으로 시작 페이지 재보정(5개 이상의 페이지가 있을 때 항상 버튼이 5개씩 보이게 하기 위해)

    // [버튼을 그리기 위한 숫자 배열 생성]
    const pageNumbers = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
      // length: endPage - startPage + 1 (상자 준비 개수, i는 자동으로 번호 매겨짐)
      // (_, i) => startPage + i (상자에 숫자 적기, i는 상자의 순서)
        //let startPage = 6; ( 공장 밖에서 미리 준비 ex.6 )
        //const pageNumbers = Array.from(
        //   { length: 5 }, ( 상자 5개 준비 )
        //   (_, i) => startPage + i );( 밖에서가져온 startPage + 공장이 준 i )


  return (
    <main>
      <section>
        <h2>2. Fruits DB 입력/출력/수정/삭제</h2>

        {/* 전체 개수 표시 추가 */}
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          현재 등록된 과일: <span style={{ color: '#4caf50' }}>{data.length}</span>개
          {keyword && ` (검색 결과: ${filterData.length}개)`}
        </div>
        
        <button className='btn' onClick={() => navigate('/fruits/fruitscreate')}>글쓰기</button>
        <table className='data_list2'>
          <caption>fruits data map함수로 출력</caption>
          <thead>
            <tr>
                <th>Num</th>
                <th>name</th>
                <th>price</th>
                <th>color</th>
                <th>country</th>
                <th>menu</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.length > 0 ? (
              currentItems.map((item, i) => (
                <tr key={item.num}>
                  {/* 번호 계산: (시작번호 + 인덱스 + 1) */}
                  <td>{indexOfFirst + i + 1}</td>
                  <td>{item.name}</td> {/* <td td> 오타 수정 */}
                  <td>{Number(item.price).toLocaleString()}원</td>
                  <td>{item.color}</td>
                  <td>{item.country}</td>
                  <td>
                    <button className='btn update_btn' onClick={() => navigate(`/fruits/fruitsupdate/${item.num}`)}>수정</button>
                    &nbsp;
                    <button className='btn del_btn' onClick={() => deleteData(item.num)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' style={{ textAlign: 'center' }}>검색된 결과가 없습니다</td>
              </tr>
            )
          }
        </tbody>
        </table>

          {/* 페이지네이션 */}
        <div style={{marginTop:'20px', textAlign:'center', widht:'700px'}}>
          {/* 이전 */}
          {
            currentPage > 1 &&
            <button 
              onClick={()=>setCurrentPage(currentPage-1)} 
              style={{color:'#333', marginRight:'5px', padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:'#e0e0e0'}}>이전</button>
          }
          {/*currentPage > 1 && <button>이전</button> /*1초과일 때 나와라*/}

          {/* 페이지번호 */}
          {pageNumbers.map(number => (
            <button
            key={number}
            onClick={()=>setCurrentPage(number)} 
            style={{marginRight:'5px', padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:currentPage===number?'#4caf50':'#f0f0f0'}}>
              {number}
            </button>
          ))}
          {/* 다음 */}
          {
            currentPage < totalPage &&
              <button
                onClick={()=>setCurrentPage(currentPage+1)}
                style={{color:'#333', marginRight:'5px', padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:'#e0e0e0'}}>다음</button>
          }
        </div>

        {/* 키워드검색 */}
        <div style={{marginTop:'30px', textAlign:'center'}}>
          <input type="text" placeholder="상품명 검색"
            value={inputKeyword}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setInputKeyword(e.target.value);
              setCurrentPage(1);
            }}
            style={{width:'250px', padding:'8px', border:'1px solid #ccc', borderRadius:'4px'}}
          />
          <button
            onClick={handleSearch}
            style={{marginLeft: '10px', padding:'8px 15px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:'#4caf50', color:'#fff', cursor:'pointer'}}
          >검색</button>
          <button
            onClick={handleReset}
            style={{marginLeft: '10px', padding:'8px 15px', border:'1px solid #ccc', borderRadius:'4px', backgroundColor:'#ccc', color:'#fff', cursor:'pointer'}}
          >초기화</button>
        </div>
      </section>
    </main>
  )
}

export default Fruits