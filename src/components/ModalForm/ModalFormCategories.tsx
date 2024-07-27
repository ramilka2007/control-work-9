import React, {useState} from 'react';
import {Category} from "../../types";

interface Props {
    onSubmit: (category: Category) => void,
    show: boolean,
    onClose: React.MouseEventHandler,
}

const ModalFormTransactions: React.FC<Props> = ({onSubmit, show, onClose}) => {
    const [category, setCategory] = useState<Category>({
        type: 'income',
        name: '',
    });

    const changeInfo = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setCategory((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit({
            ...category
        });
    };

    return (
        <>
            <div
                className="modal-backdrop show"
                style={{display: show ? 'block' : 'none'}}
            />
            <div
                className="modal show"
                style={{display: show ? 'block' : 'none'}}
                onClick={onClose}
            >
                <div
                    className="modal-dialog"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add category</h1>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onFormSubmit}>
                                <div className="form-group d-flex justify-content-evenly mb-4">
                                    <h4 className="w-25">
                                        <label htmlFor="type">Type</label>
                                    </h4>
                                    <select name="type" id="type" onChange={changeInfo} className="form-control w-75">
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                </div>
                                <div className="form-group d-flex justify-content-evenly mb-4">
                                    <h4 className="w-25">
                                        <label htmlFor="name">Name</label>
                                    </h4>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        min="1"
                                        className="form-control w-75"
                                        onChange={changeInfo}
                                        value={category.name}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFormTransactions;
