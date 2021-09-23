import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";
import rootReducer from "../redux/reducers";
import rootSaga from "../redux/sagas";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: localforage,
  whitelist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, thunk];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(persistedReducer, composeEnhancers(...enhancers));

  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
