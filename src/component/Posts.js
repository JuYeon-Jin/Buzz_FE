import {Link, Outlet, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Posts = () => {


    const navigate = useNavigate();
    const { boardType } = useParams();
    const [searchParams] = useSearchParams();


    const [category, setCategory] = useState([]);
    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({});

    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(10);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('')


    /**
     * 게시글 작성 페이지로 이동.
     */
    const handleWritePost = () => {
        const newPath = window.location.pathname + '/new';
        navigate(newPath);
    }


    /**
     * 조건 (page, startDate, endDate, categoryId, keyword, limit, sortField, sortDirection) 으로 새로운 쿼리 스트링을 구성한다.
     */
    const buildQueryParams = () => {
        const queryParams = new URLSearchParams();

        if (sortField !== '') queryParams.append('sortField', sortField);
        if (sortDirection !== '') queryParams.append('sortDirection', sortDirection);
        if (limit !== 10) queryParams.append('limit', String(limit));

        if (startDate !== '') queryParams.append('startDate', startDate);
        if (endDate !== '') queryParams.append('endDate', endDate);
        if (categoryId !== 0) queryParams.append('categoryId',  String(categoryId));
        if (keyword !== '') queryParams.append('keyword', keyword);

        return queryParams;
    }


    /**
     * 주어진 쿼리 스트링을 사용하여 FE 의 URL 을 변경하는 라우팅을 수행한다.
     */
    const navigateWithParams = (queryParams) => {
        const path = window.location.pathname;
        navigate(`${path}?${queryParams}`);
    }


    /**
     * GET HTTP Method 방식으로 fetch 요청을 보낸다.
     */
    const getRequest = async (path, params) => {

        const url = params === null
            ? new URL(`${path}`, 'http://localhost:8080')
            : new URL(`${path}?${params}`, 'http://localhost:8080');

        const response = await fetch(url, {
            method: 'GET'
        })

        const data = await response.json();
        return data;
    }


    // 페이지 이동 시 동작
    const pageRequest = (newPage) => {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has("page")) {
            queryParams.set('page', newPage);
        } else {
            queryParams.append('page', newPage);
        }

        navigateWithParams(queryParams);
    }


    // 검색 버튼 누를시 동작
    const searchFilterRequest = () => {
        setPage(1);

        const parameter = buildQueryParams();
        navigateWithParams(parameter);
    }


    // 한 페이지당 게시물 갯수 변경시 동작,
    const limitRequest = (newLimit) => {
        setPage(1);
        setLimit(newLimit);

        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has("limit")) {
            queryParams.set('limit', newLimit);
        } else {
            queryParams.append('limit', newLimit);
        }

        navigateWithParams(queryParams);
    }

    // 정렬 기준 변경시 동작,
    const sortCriteriaRequest = (newField) => {
        setPage(1);
        setSortField(newField);

        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has("sortField")) {
            queryParams.set('sortField', newField);
        } else {
            queryParams.append('sortField', newField);
        }

        navigateWithParams(queryParams);
    }

    // 정렬 순서 변경시 동작, sortDirection
    const sortOrderRequest = (newDirection) => {
        setPage(1);
        setSortDirection(newDirection);

        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has("sortDirection")) {
            queryParams.set('sortDirection', newDirection);
        } else {
            queryParams.append('sortDirection', newDirection);
        }

        navigateWithParams(queryParams);
    }


    /**
     * [useEffect]
     * FE 의 path 경로가 바뀔 때, 해당 path 를 사용하는 게시판의 카테고리를 가져온다.
     */
    useEffect(() => {
        const url = `/user${location.pathname}/category`

        getRequest(url, null).then(data => setCategory(data));
    }, [location.pathname]);


    /**
     * [useEffect]
     * FE 의 parameter 가 변경될 때, 새로은 게시물 목록을 서버에서 가져온다.
     */
    useEffect(() => {
        const url = `/user${location.pathname}`

        getRequest(url, searchParams).then(data => {
            const { pagination, postList } = data;
            setPagination(pagination);
            setPostList(postList);
        });
    }, [searchParams]); // 페이지나 검색 파라미터가 바뀔 때 호출됨


    return (
        <main>
            <div className="post-container">

                <div className="filter-container">
                    <div className="category-filter">
                        <select>
                            <option value="0">카테고리 선택</option>
                        </select>
                        <input placeholder="검색어"/>
                        <button>
                            <img src="../img/glass.png" className="img-search" alt=""/>
                        </button>
                    </div>

                    <div className="date-filter">
                        <input type="date"/>
                        ~
                        <input type="date"/>
                    </div>

                    <div className="reset-option">
                        <button>
                            <img src="../img/reset.png" className="img-reset" alt=""/>
                            옵션초기화
                        </button>
                    </div>

                </div>

                <div className="sort-container">

                    <div className="sort-option">
                        <select defaultValue="postId" className="option-select-l">
                            <option value="recent">등록일시</option>
                            <option value="popular">조회수</option>
                        </select>
                        <select defaultValue="desc" className="option-select-l">
                            <option value="desc">내림차순</option>
                            <option value="asc">오름차순</option>
                        </select>
                        <select className="option-select-s">
                            <option value="10">10개</option>
                            <option value="20">20개</option>
                            <option value="30">30개</option>
                            <option value="40">40개</option>
                            <option value="50">50개</option>
                        </select>
                        <button className="write-post" onClick={handleWritePost}>글쓰기</button>
                    </div>
                </div>

                <Outlet context={{ test: "데이터" }}/>

                <div className="pages">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                </div>

            </div>
        </main>
    );
};

export default Posts;