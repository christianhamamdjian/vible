import React from 'react'

const Order = ({ id, handleMoveToFront, handleMoveToBack, handleMoveForward, handleMoveBackward }) => {
    return (
        <div className='path-edit-form'>
            <div className='field'>
                <label>Order: </label>
                <div>
                    <button
                        title="Move to back"
                        className='path-edit-form-button'
                        onClick={() => handleMoveToBack(id)}>
                        <div className='move-item'
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.75735 5.63605L6.34314 7.05026L12 12.7071L17.6569 7.05029L16.2427 5.63608L12 9.87872L7.75735 5.63605Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M6.34314 12.7071L7.75735 11.2929L12 15.5356L16.2427 11.2929L17.6569 12.7071L12 18.364L6.34314 12.7071Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </button>
                    <button
                        title="Move to front"
                        className='path-edit-form-button'
                        onClick={() => handleMoveToFront(id)}>
                        <div className='move-item'
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.6569 11.2929L16.2427 12.7071L12 8.46444L7.75735 12.7071L6.34314 11.2929L12 5.63605L17.6569 11.2929Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M17.6569 16.9497L16.2427 18.3639L12 14.1213L7.75735 18.364L6.34314 16.9498L12 11.2929L17.6569 16.9497Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </button>
                    <button
                        title="Move backward"
                        className='path-edit-form-button'
                        onClick={() => handleMoveBackward(id)}>
                        <div className='move-item'
                        ><svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                                <path
                                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                    fill="currentColor"
                                />
                            </svg></div>
                    </button>
                    <button
                        title="Move forward"
                        className='path-edit-form-button'
                        onClick={() => handleMoveForward(id)}>
                        <div className='move-item'
                        ><svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                                <path
                                    d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                                    fill="currentColor"
                                />
                            </svg></div>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Order



