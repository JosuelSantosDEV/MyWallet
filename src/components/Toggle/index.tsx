import { useState } from "react";
import { Container, ToggleLabel, ToggleSelector } from "./styles"

import Switch from 'react-switch'

const Toggle: React.FC = ()=> {
    const [check, setCheck] = useState(false); // State para controlar a troca de estados do Switch
    return <>
        <Container>
            <ToggleLabel>Light</ToggleLabel>
                <ToggleSelector 
                    checked={check}
                    onChange={()=> setCheck(!check)}
                    uncheckedIcon={false}
                    checkedIcon={false}

                 />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    </>
}

export default  Toggle