import React, { Fragment } from 'react';

function Paginacion({ pagination, trigger, filter }) {
    const next = () => {
        const { page, size } = pagination.toJS();
        trigger(page + 1, size);
    };

    const previous = () => {
        const { page, size } = pagination.toJS();
        trigger(page - 1, size);
    };

    return (
        <Fragment>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-link"
                            href="#"
                            onClick={() => previous()}
                            disabled={pagination.get('page') === 1}
                        >
                            Previous
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            href="#"
                            onClick={() => next()}
                            disabled={
                                pagination.get('page') ===
                                Math.ceil(
                                    pagination.get('total') /
                                        pagination.get('size')
                                )
                            }
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
}

export default Paginacion;
