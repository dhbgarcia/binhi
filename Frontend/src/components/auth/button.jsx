const Button =({text, type})=> {
    return(
        <>
            <button type={type} className="w-1/3 text-[13px] self-center py-4 font-poppins-medium bg-primaryGreen rounded-full text-white font-semibold">{text}</button>
        </>
    )
}

export default Button;