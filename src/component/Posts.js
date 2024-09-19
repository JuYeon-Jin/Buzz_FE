import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Posts = () => {

    const { category } = useParams();
    const [ categoryList, setCategoryList ] = useState([]);

    const getRequest = async () => {

        const response = await fetch(`http://localhost:8080/board/categoryType?category=${category}`, {
            method: 'GET'
        })

        const data = await response.json();
        return data;
    }


    useEffect(() => {
        getRequest().then(data => setCategoryList(data));
    }, [category]);


    return (
        <main>
            <div className="center-container">

                <h1>{category} 게시판</h1>


                <select className="select-box font13" name="categoryId"
                        defaultValue="0">
                    <option value="0">카테고리 선택</option>
                    {categoryList.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                    ))}
                </select>


            </div>
        </main>
    );
};

export default Posts;