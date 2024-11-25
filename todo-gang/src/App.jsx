import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import router from "./libs/router/route";
import GlobalStyle from "./style/global-style";
import { store } from "./libs/redux/store/store.js";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
