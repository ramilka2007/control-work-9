import React from 'react';
import AddCategory from "../AddCategory/AddCategory";

const Categories = () => {
    const [showAddModal, setShowAddModal] = React.useState(false);
    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>Categories</h2>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add</button>
            </div>
            <AddCategory show={showAddModal} onClose={() => setShowAddModal(false)}/>
        </>
    );
};

export default Categories;