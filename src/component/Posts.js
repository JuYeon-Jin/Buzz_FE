import {Link, Outlet, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useState} from "react";

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
    const [pageLimit, setPageLimit] = useState(10);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('');


    /**
     * 조건 (page, startDate, endDate, categoryId, keyword, pageLimit, sortBy, order) 으로 새로운 쿼리 스트링을 구성한다.
     */
    const buildQueryParams = () => {
        const queryParams = new URLSearchParams();

        if (startDate !== '') queryParams.append('startDate', startDate);
        if (endDate !== '') queryParams.append('endDate', endDate);
        if (categoryId !== 0) queryParams.append('categoryId',  String(categoryId));
        if (keyword !== '') queryParams.append('keyword', keyword);
        if (pageLimit !== 10) queryParams.append('pageLimit', String(pageLimit));
        if (sortBy !== '') queryParams.append('sortBy', sortBy);
        if (order !== '') queryParams.append('sortOrder', order);

        return queryParams;
    }


    /**
     * 주어진 쿼리 스트링을 사용하여 FE 의 URL 을 변경하는 라우팅을 수행한다.
     */
    const navigateWithParams = (queryParams) => {
        navigate(`/board/community?${queryParams}`);
    }


    // 페이지(page, pageLimit, sortBy, sortOrder) 변경시에는 기존 검색조건을 그대로 유지한채 서버에 요청.
    // 이때, page 는 무조건 1 로 돌아감.
    const fetchFilteredPosts = () => {

    }






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
                            <option value="postId">등록일시</option>
                            <option value="views">조회수</option>
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
                        <button className="write-post">글쓰기</button>
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