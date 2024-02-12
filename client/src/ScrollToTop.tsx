import { useEffect, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IScrollToTopProps extends RouteComponentProps {
    children: React.ReactNode;
}

function ScrollToTop({ history, children }: IScrollToTopProps) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);

    return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);