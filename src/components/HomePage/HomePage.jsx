import NavBar from '../Navbar/NavBar';
import GetStarted from '../GetStarted/GetStarted';
import { useSearchParams } from 'react-router-dom';

import SetNewPasswordForm from '../SetNewPasswordForm/SetNewPasswordForm';

export default function HomePage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const func = searchParams.get('func');
    console.log(func);
    if (token === null)
        return (
            <div>
                <NavBar />
                <GetStarted />
            </div>
        );

    return <SetNewPasswordForm token={token} />;
}
