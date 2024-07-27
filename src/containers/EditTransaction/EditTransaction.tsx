import React, { useEffect } from 'react';
import TransactionForm from '../../components/Forms/TransactionForm';
import { Transaction } from '../../types';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchOneTransaction,
  updateTransaction,
} from '../../store/TransactionThunk';
import { useAppSelector } from '../../app/hooks';
import { selectOneTransaction } from '../../store/TransactionSlice';

const EditTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const transaction = useAppSelector(selectOneTransaction);
  const onSubmit = async (apiTransaction: Transaction) => {
    try {
      await dispatch(updateTransaction({ id, apiTransaction })).unwrap();
      navigate('/');
      toast.success('Contact updated!');
    } catch (e) {
      toast.error('Could not update contact!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [dispatch, id]);

  return (
    <div>
      {transaction && <TransactionForm onSubmit={onSubmit} existingTransaction={transaction} />}
    </div>
  );
};

export default EditTransaction;
