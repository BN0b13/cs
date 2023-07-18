import { useEffect, useState } from 'react';

import {
    CollapsibleButton,
    CollapsibleContainer,
    CollapsibleContentContainer
} from './collapsible.styles';

const Collapsible = ({child, title = 'Click to Open', showStatus, checkoutInteract}) => {
    const [ show, setShow ] = useState(showStatus);

    useEffect(() => {
        setShow(!show);
    }, [ showStatus ]);

    const interact = () => {
        checkoutInteract(title);
    }

    return (
        <CollapsibleContainer>
            <CollapsibleButton onClick={() => interact()}>
                { title }
            </CollapsibleButton>
            <CollapsibleContentContainer show={show}>
                { child }
            </CollapsibleContentContainer>
        </CollapsibleContainer>
    )
}

export default Collapsible;