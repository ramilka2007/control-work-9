import React from 'react';

interface Props extends React.PropsWithChildren {

}

const ModalFormTransactions: React.FC<Props> = ({ show, children, onClose }) => {
    return (
        <>
            <div
                className="modal-backdrop show"
                style={{ display: show ? 'block' : 'none' }}
            />
            <div
                className="modal show"
                style={{ display: show ? 'block' : 'none' }}
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
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFormTransactions;
