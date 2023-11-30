// const saveToLocaleStorage = (state) => {
//     try {
//         const serialiedState = JSON.stringify(state);
//         localStorage.setItem('reduxState', serialiedState);
//     } catch (err) {
//         console.error('Error saving to localStorage:', err)
//     }
// };

// const reduxMiddleware = (store) => (next) => (action) => {
//     const result = next(action);
//     saveToLocaleStorage(store.getState());
//     return result
// };

// export default reduxMiddleware;