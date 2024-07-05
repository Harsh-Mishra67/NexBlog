import { AppBar,Toolbar,Typography,styled} from "@mui/material";
import { NavLink } from "react-router-dom";
const Component = styled(AppBar)`
    background: #FFFFFF;
    color: #000;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a{
        padding: 20px;
        color: #000;
        text-decoration:none;
        &.active {
            color: #3C33FF;
        }
    }
`;

const Header = () =>{

    return (
        <Component>
            <Container>
                 {/* NavLink helps us to add css in the components */}
                <NavLink activeclassname="active" to='/'>HOME</NavLink>
                <NavLink activeclassname="active" to='/about'>ABOUT</NavLink>
                <NavLink activeclassname="active" to='/contact'>CONTACT</NavLink>
                <NavLink activeclassname="active" to='/login'>LOGOUT</NavLink>
            </Container>
        </Component>
    )
}
export default Header;


