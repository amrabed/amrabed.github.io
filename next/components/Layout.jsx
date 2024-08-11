// import Social from './Social';
import { Header } from './Header';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
            <div className="w-1/5 p-8 bg-white dark:bg-gray-900">
                <Header />
                {/* <Social /> */}
            </div>
            <div className="flex-1 p-8">{children}</div>
        </div>
    );
};

export default Layout;
