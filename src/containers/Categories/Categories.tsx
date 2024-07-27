import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategoryById, fetchCategories } from '../../store/categoryThunk';
import { Link } from 'react-router-dom';
import {
  selectCategories,
  selectFetchCategoriesLoading,
} from '../../store/categorySlice';
import Spinner from '../../components/Spinner/Spinner';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isFetching = useAppSelector(selectFetchCategoriesLoading);

  const deleteCategory = async (id: string) => {
    await dispatch(deleteCategoryById(id));
    await dispatch(fetchCategories());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <>
        {isFetching ? (
          <Spinner />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-5">
              <h2>Categories</h2>
              <Link to="/categories/add-category" className="btn btn-primary">
                Add
              </Link>
            </div>
            <div>
              {categories.map((categoryItem) => (
                <div key={categoryItem.id}>
                  <div className="d-flex justify-content-between align-items-center border border-1 border-black p-4 mb-3">
                    <div className="w-50 text-start">
                      <h1>{categoryItem.name}</h1>
                    </div>
                    <div className="w-50 d-flex justify-content-between text-end">
                      {categoryItem.type === 'income' ? (
                        <span className="text-success fs-3 ms-auto fw-bold text-capitalize">
                          {categoryItem.type}
                        </span>
                      ) : (
                        <span className="text-danger fs-3 ms-auto fw-bold text-capitalize">
                          {categoryItem.type}
                        </span>
                      )}
                      <div className="d-flex justify-content-between w-50 justify-content-evenly">
                        <Link
                          to={`/categories/edit-category/${categoryItem.id}`}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCategory(categoryItem.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Categories;
