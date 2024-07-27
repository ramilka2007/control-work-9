import React, { useEffect, useState } from 'react';
import {  ApiTransaction } from '../../types';
import { getCategoriesType } from '../../store/categoryThunk';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../store/categorySlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit: (transaction: ApiTransaction) => void;
  existingTransaction?: ApiTransaction;
}

const emptyState: ApiTransaction = {
  transactionSum: 0,
  type: 'income',
  category: '',
  date: new Date().toISOString(),
};

const TransactionForm: React.FC<Props> = ({
  onSubmit,
  existingTransaction,
}) => {
  const initialState: ApiTransaction = existingTransaction
    ? { ...existingTransaction }
    : emptyState;

  const dispatch = useDispatch();
  useNavigate();
  const type = [
    { name: 'income', id: 'income' },
    { name: 'expense', id: 'expense' },
  ];
  const [transaction, setTransactions] = useState<ApiTransaction>(initialState);

  const changeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTransactions((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...transaction,
    });
  };

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (transaction.type !== undefined && transaction.type?.trim().length > 0) {
      dispatch(getCategoriesType(transaction.type));
    }
  }, [transaction.type]);

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="form-group d-flex justify-content-evenly mb-4">
          <h4 className="w-25">
            <label htmlFor="type">Type:</label>
          </h4>
          <select
            name="type"
            id="type"
            className="form-control w-75"
            onChange={changeForm}
            disabled={existingTransaction}
          >
            {type.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group d-flex justify-content-evenly mb-4">
          <h4 className="w-25">
            <label htmlFor="category">Category:</label>
          </h4>
          <select
            name="category"
            id="category"
            value={transaction.category}
            className="form-control w-75"
            disabled={existingTransaction}
            onChange={(e) => changeForm(e)}
          >
            <option value="" disabled defaultValue={transaction.category}>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group d-flex justify-content-evenly mb-4">
          <h4 className="w-25">
            <label htmlFor="transactionSum">Sum:</label>
          </h4>
          <input
            type="number"
            name="transactionSum"
            id="transactionSum"
            required
            min="1"
            className="form-control w-75"
            onChange={changeForm}
            value={transaction.transactionSum}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {existingTransaction ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
