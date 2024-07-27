import React from 'react';
import {Category, Transaction} from "../../types";
import dayjs from "dayjs";

interface Props {
    transaction: Transaction;
    categories: Category[],
    deleteTransactionsById: (id: string) => void;
}


const TransactionCard: React.FC<Props> = ({categories, transaction, deleteTransactionsById }) => {
    let categoryFromTransaction: string = transaction.category;

    categories.map(category => {
        if (category.id === categoryFromTransaction) {
            categoryFromTransaction = category.name;
        }
    });

    return (
        <>
            <div className="card w-50 mx-auto p-4 mb-3">
                <div className="card-body">
                    <h5 className="card-title">{transaction.name}</h5>
                    <p className="card-text">   {transaction.type === 'income' ?
                        <span className="text-success fs-3"><b>+{transaction.transactionSum} KGS</b></span> :
                        <span className="text-danger fs-3"><b>-{transaction.transactionSum} KGS</b></span>
                    }
                    </p>
                    <p className="card-text fs-3"><b>Category:</b> {categoryFromTransaction}</p>
                    <p className="card-text fs-3"><b>Type:</b> {transaction.type}</p>
                    <p className="card-text fs-3"><b>Date:</b> {dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</p>
                </div>

                <button className="btn btn-success ms-3 mb-2">Edit</button>

                <button
                    onClick={() => deleteTransactionsById(transaction.id)}
                    type="button"
                    className="ms-3 btn btn-danger"
                >Delete</button>
            </div>
        </>
    );
};


export default TransactionCard;