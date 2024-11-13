import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Posts = () => {

    // TODO 데이터가 다 불러와지기 전에 랜더링 되는 문제가 있음. 조치필요.
    // TODO URL 을 먼저 입력시에 VALUE 반영 안되는 부분 확인됨. VALUE 에 추가시킬 것.

    const navigate = useNavigate();
    const location = useLocation();
    const boardPath  = location.pathname;

    const [category, setCategory] = useState([]);
    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({});

    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(10);
    const [sortCriteria, setSortCriteria] = useState('recent');
    const [sortDirection, setSortDirection] = useState('desc')


    /**
     * 현재 웹 브라우저 URL 의 쿼리 파라미터를 가져옵니다.
     *
     * @returns {URLSearchParams} 쿼리 파라미터가 포함된 URLSearchParams 객체
     */
    const getQueryParams = () => {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams;
    }


    /**
     * SERVER 에 GET 요청을 보내고 받아온 데이터를 JSON 으로 변환해 반환합니다.
     *
     * @param {string} path - 서버에 요청할 경로
     * @param {URLSearchParams|null} params - 요청에 사용할 쿼리 파라미터, null인 경우 파라미터 없이 요청
     * @returns {Promise<Object>} 요청으로부터 반환된 JSON 데이터
     */
    const getRequest = async (path, params) => {
        const url= new URL(`${path}${params ? `?${params}` : ''}`, 'http://localhost:8080');
        const response = await fetch(url, {
            method: 'GET'
        })
        const data = await response.json();
        return data;
    }


    /**
     * 네비게이션을 변경해서 웹 브라우저의 URL 을 변경하고,
     * 서버에 요청한 데이터를 받아서 게시물 목록(postList, pagination)을 업데이트합니다.
     *
     * @param {URLSearchParams|null} params - 요청에 사용할 쿼리 파라미터, null인 경우 파라미터 없이 요청
     * @returns {Promise<void>}
     */
    const updatePosts = async (params) => {
        navigate(`${boardPath}${params ? `?${params}` : ''}`);

        try {
            const data = await getRequest(`/user${boardPath}`, params);
            const { pagination, postList } = data;
            setPagination(pagination);
            setPostList(postList);

        } catch (error) {
            console.log("updatePosts Error: " + error);
        }
    }


    // TODO async 란 뭘까? 뭐길래 이곳저곳 붙여줘야 하는걸까? @returns {Promise<void>} 는 뭘까?
    /**
     * 검색(startDate, endDate, categoryId, keyword) 조건을 기반으로 새로운 게시물 목록으로 업데이트합니다.
     *
     * @returns {Promise<void>}
     */
    const filterRequest = async () => {
        const parameter = getQueryParams();

        if (parameter.has('page')) {
            parameter.delete('page');
            setPage(1);
        }

        if (startDate !== '') parameter.set('startDate', startDate);
        if (endDate !== '') parameter.set('endDate', endDate);
        if (categoryId !== 0) parameter.set('categoryId',  String(categoryId));
        if (keyword !== '') parameter.set('keyword', keyword);

        await updatePosts(parameter);
    }


    /**
     * 정렬 기준(sortCriteria)을 변경하고, 새로운 게시물 목록으로 업데이트합니다.
     *
     * @param {Event} event - select 요소의 change 이벤트
     * @returns {Promise<void>}
     */
    const sortCriteriaRequest = async (event) => {
        const newData = event.target.value;
        setPage(1);
        setSortCriteria(newData);
        const parameter = getQueryParams();
        parameter.set('sortCriteria', newData);
        await updatePosts(parameter);
    }


    /**
     * 정렬 방향(sortDirection)을 변경하고, 새로운 게시물 목록으로 업데이트합니다.
     *
     * @param {Event} event - select 요소의 change 이벤트
     * @returns {Promise<void>}
     */
    const sortDirectionRequest = async (event) => {
        const newData = event.target.value;
        setPage(1);
        setSortDirection(newData);
        const parameter = getQueryParams();
        parameter.set('sortDirection', newData);
        await updatePosts(parameter);
    }


    /**
     * 페이지 번호를 변경하고, 새로운 게시물 목록으로 업데이트합니다.
     *
     * @param {Event} event - button 요소의 click 이벤트
     * @returns {Promise<void>}
     */
    const pageRequest = async (newData) => {
        setPage(newData);
        const parameter = getQueryParams();
        parameter.set('page', newData);
        await updatePosts(parameter);
    }


    /**
     * 다음 10페이지 점프 (예: 4 -> 11, 11 -> 21)
     */
    const forwardPageJump = () => {
        const newPage = (Math.floor(page / 10) + 1) * 10 + 1;
        return Math.min(newPage, pagination.maxListIndex);
    }


    /**
     * 이전 10페이지 점프 (예: 14 -> 10, 30 -> 10)
     */
    const backwardPageJump = () => {
        const newPage = Math.floor((page - 1) / 10) * 10;
        return Math.max(newPage, 1);
    }


    /**
     * 한 페이지에 표시할 게시물 수(limit)를 변경하고, 새로운 게시물 목록으로 업데이트합니다.
     *
     * @param {Event} event - select 요소의 change 이벤트
     * @returns {Promise<void>}
     */
    const limitRequest = async (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit);
        const newPage = calculateNewPage(page, limit, newLimit);
        setPage(newPage);

        const parameter = getQueryParams();
        parameter.set('page', String(newPage));
        parameter.set('limit', String(newLimit));

        await updatePosts(parameter);
    }


    /**
     * 페이지 번호를 새로 계산합니다.
     *
     * @param {number} currentPage - 현재 페이지 번호
     * @param {number} currentLimit - 현재 페이지당 표시할 게시물 수
     * @param {number} newLimit - 변경할 페이지당 게시물 수
     * @returns {number} 새로 계산된 페이지 번호
     */
    const calculateNewPage = (currentPage, currentLimit, newLimit) => {
        const offset = (currentPage - 1) * currentLimit + 1;
        const newPage = Math.ceil(offset / newLimit);
        return newPage;
    };


    /**
     * 표시할 게시물 번호를 새로 계산합니다.
     *
     * @returns {number} 현재 페이지의 첫 번째 게시물 번호
     */
    const calculatePostNumber = () => {
        return  pagination.totalPostNumber - ((page-1) * limit);
    }


    /**
     * 모든 필터와 정렬 조건을 초기화하고 게시물 목록을 업데이트합니다.
     *
     * @returns {Promise<void>}
     */
    const handleReset = async () => {
        setPage(1);
        setStartDate('');
        setEndDate('');
        setCategoryId(0);
        setKeyword('');
        setLimit(10);
        setSortCriteria('recent');
        setSortDirection('desc');

        await updatePosts(null);
    }


    /**
     * 카테고리(categoryId)를 변경합니다.
     */
    const handleCategoryChange= (e) => {
        setCategoryId(e.target.value);
    };

    /**
     * 검색어(keyword)를 변경합니다.
     */
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    // TODO startDate 와 endDate 를 입력할 때 조건 추가 필요 (startDate 는 endDate 이후일 수 없다 같은거..)
    /**
     * 작성일 조건(startDate)을 변경합니다.
     */
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    /**
     * 작성일 조건(endDate)을 변경합니다.
     */
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };


    /**
     * [useEffect]
     * FE 의 path 경로가 바뀔 때,
     * 해당 path 를 사용하는 게시판의 카테고리와 최초 게시물 목록을 가져온다.
     */
    useEffect(() => {
        const parameter = getQueryParams();

        const categoryUrl = `/user${boardPath}/category`;
        const postsUrl = `/user${boardPath}`;

        getRequest(categoryUrl, null).then(data => {setCategory(data);});
        getRequest(postsUrl, parameter).then(data => {
            const { pagination, postList } = data;
            setPagination(pagination);
            setPostList(postList);
        });

    }, [boardPath, location.search]);


    /**
     * 게시글 작성 페이지로 이동.
     */
    const writePost = () => {
        navigate(`${boardPath}/new`);
    }


    return (
        <main>
            <div className="post-container">

                <div className="filter-container">
                    <div className="category-filter">
                        <select value={categoryId} onChange={handleCategoryChange}>
                            <option key='0' value='0'>카테고리 선택</option>
                            {category.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                            ))}
                        </select>
                        <input placeholder="검색어" value={keyword} onChange={handleKeywordChange}/>
                        <button onClick={filterRequest}>
                            <img src="../img/glass.png" className="img-search" alt=""/>
                        </button>
                    </div>

                    <div className="date-filter">
                        <input type="date" value={startDate} onChange={handleStartDateChange}/>
                        ~
                        <input type="date" value={endDate} onChange={handleEndDateChange}/>
                    </div>

                    <div className="reset-option">
                        <button onClick={handleReset}>
                            <img src="../img/reset.png" className="img-reset" alt=""/>
                            옵션초기화
                        </button>
                    </div>

                </div>

                <div className="sort-container">

                    <div className="sort-option">
                        <select value={sortCriteria} onChange={sortCriteriaRequest} className="option-select-l">
                            <option key='recent' value='recent'>등록일시</option>
                            <option key='views' value='views'>조회수</option>
                        </select>
                        <select value={sortDirection} onChange={sortDirectionRequest} className="option-select-l">
                            <option key='desc' value='desc'>내림차순</option>
                            <option key='asc' value='asc'>오름차순</option>
                        </select>
                        <select value={limit} onChange={limitRequest} className="option-select-s">
                            <option key='10' value='10'>10개</option>
                            <option key='20' value='20'>20개</option>
                            <option key='30' value='30'>30개</option>
                            <option key='40' value='40'>40개</option>
                            <option key='50' value='50'>50개</option>
                        </select>
                        <button className="write-post" onClick={writePost}>글쓰기</button>
                    </div>
                </div>

                <Outlet context={{ postList:postList, postNumber: calculatePostNumber() }}/>

                <div className="pages">
                    <button className="page-jump"
                            onClick={() => pageRequest(backwardPageJump())}
                            disabled={pagination.startListIndex === 1}
                    >◀</button>
                    {/* 만약 pagination.listStartIndex 가 1이라면 비활성화 */}
                    {pagination ? (
                        Array.from({length: pagination.endListIndex - pagination.startListIndex + 1}, (_, i) => {

                            const eachPage = i + pagination.startListIndex;
                            return (
                                <button
                                    key={eachPage} value={eachPage}
                                    className={eachPage === pagination.currentPage ? 'active-page' : ''}
                                    onClick={() => pageRequest(eachPage)}
                                >
                                    {eachPage}
                                </button>
                            );
                        })) : (
                        <button className="active-page">
                            1
                        </button>
                    )}

                    <button className="page-jump"
                            onClick={() => pageRequest(forwardPageJump())}
                            disabled={pagination.endListIndex === pagination.maxListIndex}
                    >▶</button>
                </div>

            </div>
        </main>
    );
};

export default Posts;