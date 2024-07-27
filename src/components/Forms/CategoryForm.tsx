import React, {useState} from 'react';
import {ApiCategory} from "../../types";

interface Props {
    onSubmit: (category: ApiCategory) => void,
    existingCategory?: ApiCategory,
}

const emptyState: ApiCategory = {
    type: 'income',
    name: '',
};

const CategoryForm: React.FC<Props> = ({onSubmit, existingCategory}) => {
    const initialState: ApiCategory = existingCategory
        ? { ...existingCategory}
        : emptyState;

    const [category, setCategory] = useState<ApiCategory>(initialState);

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
            ...category,
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group d-flex justify-content-evenly mb-4">
                <h4 className="w-25">
                    <label htmlFor="type">Type:</label>
                </h4>
                <select name="type" id="type" onChange={changeInfo} value={category.type} className="form-control w-75">
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
                {existingCategory ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default CategoryForm;
