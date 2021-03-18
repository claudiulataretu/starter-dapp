interface SvgIconType {
  src?: string;
  className?: string,
  width?: string;
  height?: string;
}


const SvgIcon = ({ src, className, width, height }: SvgIconType) => (
  <img className={className} src={`/img/svg/${src}`} alt={src} width={width} height={height} />
);

export default SvgIcon;
