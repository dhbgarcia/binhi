import  {useNavigate} from 'react-router-dom';

const PSMessage =({text, clickable, route})=> {
    const navigate = useNavigate(); 
    return(
        <>
            <div className="text-primaryGreen text-xs">{text} <span className="text-primaryYellow text-xs font-semibold cursor-pointer" onClick={() => navigate(route)}>{clickable}</span></div>
        </>
    )
}

export default PSMessage;