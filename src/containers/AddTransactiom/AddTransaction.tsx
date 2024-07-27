import React  from 'react';
import TransactionForm from "../../components/Forms/TransactionForm";
import {ApiTransaction} from "../../types";
import {addTransaction} from "../../store/TransactionThunk";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AddTransaction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (transaction: ApiTransaction) => {
        if (transaction.category.trim().length === 0) {
            confirm('Category must be selected');
        } else {
            try {
                await dispatch(addTransaction(transaction));
                navigate('/');
                toast.success('Transaction created');
            } catch (e) {
                toast.error('Could not create transaction!');
            }
        }
    }
    return (
        <div>
            <TransactionForm onSubmit={onSubmit}/>
        </div>
    );
};

export default AddTransaction;