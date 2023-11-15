import { FC } from "react";

interface MIconProps {
	type: string;
}

const MIcon: FC<MIconProps> = ({ type }) => {
	return <i className={`kj kj-${type}`} />;
};

export default MIcon;
