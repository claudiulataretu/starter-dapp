import * as S from './styles';

interface ButtonType {
    name?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    color?: string;
    width?: string;
    children: any;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ name, type, color, width, children, onClick }: ButtonType) => (
    <S.Button name={name} type={type} color={color} width={width} onClick={onClick}>
        {children}
    </S.Button>
);

export default Button;