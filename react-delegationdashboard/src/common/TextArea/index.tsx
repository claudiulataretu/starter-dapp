import * as S from './styles';

interface TextAreaType {
  name?: string;
  id?: string;
  placeholder?: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}


const TextArea = ({ name, id, placeholder, onChange }: TextAreaType) => (
  <S.Container>
    <label htmlFor={name}>{id}</label>
    <S.TextArea
      placeholder={placeholder}
      id={name}
      name={name}
      onChange={onChange}
    />
  </S.Container>
);

export default TextArea;
