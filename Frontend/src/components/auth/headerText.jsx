const HeaderText =({text, size='text-5xl'}) => {
    return (
        <span className={`${size} text-primaryGreen`}>{text}</span>
    )
}

export default HeaderText