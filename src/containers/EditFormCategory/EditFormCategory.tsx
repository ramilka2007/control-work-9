import React, {useEffect} from 'react';
import {selectOneCategory} from "../../store/categorySlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {fetchOneCategory, updateCategory} from "../../store/categoryThunk";
import {ApiCategory} from "../../types";
import CategoryForm from "../../components/Forms/CategoryForm";

const EditFormCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const category = useAppSelector(selectOneCategory);

    const onSubmit = async (apiCategory: ApiCategory) => {
        try {
            await dispatch(updateCategory({ id, apiCategory })).unwrap();
            navigate('/categories');
            toast.success('Category updated!');
        } catch (e) {
            toast.error('Could not update category!');
        }
    };

    useEffect(() => {
        dispatch(fetchOneCategory(id));
    }, [dispatch, id]);

    return (
        <div>
            {category && (
                <CategoryForm
                    onSubmit={onSubmit}
                    existingCategory={category}
                />
            )}
        </div>
    );
};

export default EditFormCategory;