import * as S from './styles';

interface InputType {
  id?: string;
  name?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}


const Input = ({ id, name, placeholder, onChange }: InputType) => (
  <S.Container>
    <label htmlFor={name}>{id}</label>
    <S.Input
      placeholder={placeholder}
      name={name}
      id={name}
      onChange={onChange}
    />
  </S.Container>
);

export default Input;
