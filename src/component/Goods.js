import React, { useEffect, useState, useContext } from "react";
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../AlertContext";

export default function Goods(props){
  const [data,setData] = useState([]);  // json데이터 받기 위해
  const navigate = useNavigate();       // url주소 가져오기 위해
  const [keyword, setKeyword] = useState(''); //키워드 상태 변수
  const { setGoodsCount } = useContext(AlertContext);
  
  // 0. 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //상태 변수 선언 - 초기값1 
  const itemsPerPage = 5; //상태 변수 선언 - 한 페이지당 보여진느 게시물 수
  
  // 4. 검색어가 포함된 데이터만 필터링
  const filterData = data.filter(item => //g_name검색어가 포함된 데이터만 필터링
    item.g_name.toLowerCase().includes(keyword.toLowerCase())
  )

  //페이지네이션 계산 -> 현재 게시물 수 50: 5개씩 10페이지
  const indexOfLast = currentPage * itemsPerPage; //현재 페이지에서 보여줄 마지막 아이템이 전체 중 몇 번째인지 계산
  const indexOfFirst = indexOfLast - itemsPerPage; //마지막 번호에서 한 페이지 개수만큼 뒤로 가서, 시작 번호 찾기
  
  // const currentItems = data.slice(indexOfFirst, indexOfLast); //전체 데이터 통에서 '시작 번호'부터 '끝 번호' 앞까지 맛있는 조각만 쏙 잘라내기
  const currentItems = filterData.slice(indexOfFirst, indexOfLast); //전체 데이터 통에서 '시작 번호'부터 '끝 번호' 앞까지 맛있는 조각만 쏙 잘라내기
  // const totalPage = Math.ceil(data.length/itemsPerPage); //필요한 총 페이지 수
  const totalPage = Math.ceil(filterData.length/itemsPerPage); //필요한 총 페이지 수
  
  let startPage = Math.max(1, currentPage - 2); //시작번호 -> 현재 페이지를 중심으로 앞뒤로 버튼이 보이게
  let endPage = Math.min(totalPage, startPage + 4); //끝번호 계산 -> 처음엔 무조건 5개페이지 보임 + 전체 페이지(totalPage)를 넘어가지 않게
  startPage = Math.max(1, endPage - 4); //보정: 끝번호가 마지막에 걸려서 더 뒤로 X -> 시작번호를 앞당겨서 항상 버튼이 5개만 되도록 유지
  const pageNumbers = Array.from({length:endPage-startPage+1}, (_, i) => startPage+i); //배열: 실제 버튼용 숫자 리스트


  // 1. 상품 리스트 조회(출력)
  const loadData=()=>{
    axios.get('https://port-0-backend2026-mkumigxw608a3e4b.sel3.cloudtype.app/goods')
    // 성공시 데이터를 저장
    .then(res=>{
      setData(res.data);
      setGoodsCount(res.data.length);
    })
    // 실패시
    .catch(err=>console.log(err));
  }
  useEffect(()=>{
    loadData();
  },[]);

  // 3. deletData함수 - 해당 g_code에 대한 자료 삭제
  const deleteDate =(g_code)=> {
    if(window.confirm('정말 삭제?')){
      axios // 서버에 delete요청 전송
        .delete(`https://port-0-backend2026-mkumigxw608a3e4b.sel3.cloudtype.app/goods/${g_code}`)
        .then(()=>{ // 성공일 때 실행
          alert('데이터 삭제 성공');
          loadData(); //데이터 삭제 완료시 목록 재갱신
        })
        .catch(err=> console.log(err)); // 실패시 에러 출력
    }
  };


  return(
    <main>
      <h2>1. Goods 페이지</h2>
      <div><button className="btn" onClick={()=>navigate(`/goods/goodscreate`)}>글쓰기</button></div>
      <table className="data_list">
        <caption>Goods테이블 출력</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>Code(코드번호)</th>
            <th>Name(상품명)</th>
            <th>Cost(상품가격)</th>
            <th>메뉴(삭제, 수정)</th>
          </tr>
        </thead>

        <tbody>
          {
            //삼향조건 연산자 사용 > 검색된 결과글자가 0보다 크면 출력
            currentItems.length > 0 ? (
              currentItems.map((item, i) => (
              // data.map((item,i)=>(
                <tr key={item.g_code}>
                  <td>{indexOfFirst + i + 1}</td>
                  <td>{item.g_code}</td>
                  <td>{item.g_name}</td>
                  <td>{Number(item.g_cost).toLocaleString()}원</td>
                  <td>
                    <button className="btn update_btn" onClick={() => navigate(`/goods/update/${item.g_code}`)}>수정</button> &nbsp;
                    <button className="btn del_btn" onClick={() => deleteDate(item.g_code)}>삭제</button>
                  </td>
                </tr>
              ))
            ):(<tr><td colspan='4'>검색된결과가 없습니다</td></tr>)
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
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setCurrentPage(1);
          }}
          style={{width:'250px', padding:'8px', border:'1px solid #ccc', borderRadius:'4px'}}
        />
      </div>

    </main>
  );

};

