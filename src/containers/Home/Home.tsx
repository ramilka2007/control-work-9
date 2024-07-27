import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import {
  deleteTransactions,
  getTransactions,
} from '../../store/TransactionThunk';
import { fetchCategories } from '../../store/categoryThunk';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import Spinner from '../../components/Spinner/Spinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectLoading, selectTransactions} from "../../store/TransactionSlice";
import {selectCategories} from "../../store/categorySlice";

const Home = () => {
  const transaction = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);
  const total = useSelector((state: RootState) => state.transactions.total);
  const isLoading = useAppSelector(selectLoading);
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteTransactionsById = async (id: string) => {
    await dispatch(deleteTransactions(id));
    dispatch(getTransactions());
  };

  return (
    categories && (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h4 className="mt-2">Balance: {total} KGS</h4>

            {transaction.length === 0 ? (
              <h4>No transactions</h4>
            ) : (
              <>
                {transaction.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    categories={categories}
                    transaction={transaction}
                    deleteTransactionsById={deleteTransactionsById}
                  />
                ))}
              </>
            )}
          </>
        )}
      </>
    )
  );
};

export default Home;
