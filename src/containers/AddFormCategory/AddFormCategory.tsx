import React from 'react';
import { ApiCategory } from '../../types';
import { addCategory } from '../../store/categoryThunk';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import CategoryForm from '../../components/Forms/CategoryForm';
import { useNavigate } from 'react-router-dom';

const AddFormCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (category: ApiCategory) => {
    try {
      await dispatch(addCategory(category)).unwrap();
      navigate('/categories');
      toast.success('Category created');
    } catch (error) {
      toast.error('Could not create category!');
    }
  };
  return (
    <div>
      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
};

export default AddFormCategory;
