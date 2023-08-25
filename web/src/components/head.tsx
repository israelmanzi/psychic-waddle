interface HeaderProps {
  title: string;
  desc?: string;
}
export default function Header(props: HeaderProps) {
  return (
    <div className="w-fit">
      <h6 className="text-black-500 text-xs font-bold md:text-base">{props.title}</h6>
      {props.desc && <p className="text-black-300 font-light text-sm">{props.desc}</p>}
    </div>
  );
}
