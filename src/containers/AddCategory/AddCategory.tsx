import React from 'react';
import {Category} from "../../types";
import ModalFormCategories from "../../components/ModalForm/ModalFormCategories";

interface Props {
    show: boolean;
    onClose: React.MouseEventHandler
}

const AddCategory: React.FC<Props> = ({show, onClose}) => {
    const onSubmit = async (category: Category) => {
        try {
            console.log(category);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <ModalFormCategories onSubmit={onSubmit} show={show} onClose={onClose}/>
        </div>
    );
};

export default AddCategory;